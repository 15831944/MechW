$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let cafdd2 = $("#d2");
    let cafdd3 = $("#d3");
    let cafdd2d3 = $('#d2d3');

    $("#cal").html("<table id='cafd'></table>");
    let pg = $("#cafd");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/c/a/f/d/CAFD.json", function (result) {

        let CAFDDT;
        let CAFDSCategory, CAFDSCategoryVal, CAFDSType, CAFDSTypeVal, CAFDSSTD, CAFDSSTDVal, CAFDSName,
            CAFDJCategory, CAFDJCategoryVal, CAFDJType, CAFDJTypeVal, CAFDJSTD, CAFDJSTDVal, CAFDJName;
        let columns, rows, ed;

        // 2D Sketch
        function cafd2d(djo, thkjn, rsi, thksn) {

            if (!djo) djo = "ϕdjo";
            if (!thkjn) thkjn = "δjn";
            if (!rsi) rsi = "Rsi";
            if (!thksn) thksn = "δsn";

            cafdd2.empty();

            let width = cafdd2.width();
            let height = cafdd2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "CAFDSVG")
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
            let padding = 120;
            let straightHeight = 30;
            let thickness = 15;

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

            // 直边段
            drawLine(padding, padding, width - padding, padding);
            drawLine(padding, padding + straightHeight, width - padding, padding + straightHeight);
            drawLine(padding, padding + straightHeight, padding, padding);
            drawLine(padding + thickness, padding + straightHeight, padding + thickness, padding);
            drawLine(width - padding, padding + straightHeight, width - padding, padding);
            drawLine(width - padding - thickness, padding + straightHeight, width - padding - thickness, padding);

            // 转角半径
            let cornerRadiusInner = 0.1 * (width - 2 * padding - 2 * thickness);
            let cornerRadiusOuter = cornerRadiusInner + thickness;

            // 球冠半径
            let crownRadiusInner = width - 2 * padding - 2 * thickness;
            let crownRadiusOuter = crownRadiusInner + thickness;

            let ANG = Math.acos(((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) / ((width - 2 * padding - 2 * thickness) - cornerRadiusInner));

            drawArc(cornerRadiusInner, cornerRadiusInner,
                width - padding - thickness, padding + straightHeight,
                width - padding - thickness - cornerRadiusInner + cornerRadiusInner * Math.cos(ANG), padding + straightHeight + cornerRadiusInner * Math.sin(ANG));
            drawArc(cornerRadiusOuter, cornerRadiusOuter,
                width - padding, padding + straightHeight,
                width - padding - cornerRadiusOuter + cornerRadiusOuter * Math.cos(ANG), padding + straightHeight + cornerRadiusOuter * Math.sin(ANG));
            drawArc(cornerRadiusInner, cornerRadiusInner,
                padding + thickness + cornerRadiusInner - cornerRadiusInner * Math.cos(ANG), padding + straightHeight + cornerRadiusInner * Math.sin(ANG),
                padding + thickness, padding + straightHeight);
            drawArc(cornerRadiusOuter, cornerRadiusOuter,
                padding + cornerRadiusOuter - cornerRadiusOuter * Math.cos(ANG), padding + straightHeight + cornerRadiusOuter * Math.sin(ANG),
                padding, padding + straightHeight);
            drawArc(crownRadiusInner, crownRadiusInner,
                width - padding - thickness - cornerRadiusInner + cornerRadiusInner * Math.cos(ANG), padding + straightHeight + cornerRadiusInner * Math.sin(ANG),
                padding + thickness + cornerRadiusInner - cornerRadiusInner * Math.cos(ANG), padding + straightHeight + cornerRadiusInner * Math.sin(ANG));
            drawArc(crownRadiusOuter, crownRadiusOuter,
                width - padding - cornerRadiusOuter + cornerRadiusOuter * Math.cos(ANG), padding + straightHeight + cornerRadiusOuter * Math.sin(ANG),
                padding + cornerRadiusOuter - cornerRadiusOuter * Math.cos(ANG), padding + straightHeight + cornerRadiusOuter * Math.sin(ANG));

            // 封头厚度标注
            extLineTopV(padding, padding);
            extLineTopV(padding + thickness, padding);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding, y: padding - 30},
                    {x: padding - 15, y: padding - 30 - 3},
                    {x: padding - 15, y: padding - 30 + 3},
                    {x: padding, y: padding - 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + thickness, y: padding - 30},
                    {x: padding + thickness + 15, y: padding - 30 - 3},
                    {x: padding + thickness + 15, y: padding - 30 + 3},
                    {x: padding + thickness, y: padding - 30}
                ]));
            drawLine(padding + thickness + 15, padding - 30, padding + thickness + 30, padding - 30);
            drawLine(padding + thickness, padding - 30, padding, padding - 30);
            svg.append("path").attr("d", line([
                {x: padding - 15 - 40, y: padding - 30},
                {x: padding - 15, y: padding - 30}
            ])).attr("id", "CAFDSketchTHKSN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CAFDSketchTHKSN").attr("startOffset", "50%").text(thksn);

            // 球冠内半径标注
            let cx = width / 2;
            let cy = padding + straightHeight - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG);

            // 中心线
            drawCenterLine(cx, padding - 10, cx, cy + crownRadiusOuter + 10);

            svg.append("path").attr("d", line([
                {x: cx, y: cy + crownRadiusInner},
                {x: cx, y: cy + crownRadiusInner - 120}
            ])).attr("id", "CAFDSketchRSI").classed("sketch", true)
                .attr("transform", "rotate(" + (90 - ANG / Math.PI * 180) / 3 + ", " + cx + " " + cy + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CAFDSketchRSI").attr("startOffset", "50%").text(rsi);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx, y: cy + crownRadiusInner},
                    {x: cx - 3, y: cy + crownRadiusInner - 15},
                    {x: cx + 3, y: cy + crownRadiusInner - 15},
                    {x: cx, y: cy + crownRadiusInner}
                ])).attr("transform", "rotate(" + (90 - ANG / Math.PI * 180) / 3 + ", " + cx + " " + cy + ")");

            // 夹套内半径
            let CAFDSketchJRI = 0.05 * crownRadiusInner;

            // 夹套外半径
            let CAFDSketchJRO = CAFDSketchJRI + 5;

            // 夹套内壁对应的半顶角
            let CAFDSketchHalfRadI = 2 * Math.asin(CAFDSketchJRI / 2 / crownRadiusOuter);

            // 夹套外壁对应的半顶角
            let CAFDSketchHalfRadO = 2 * Math.asin(CAFDSketchJRO / 2 / crownRadiusOuter);

            svg.append("path").attr("d", "M "
                + (cx - crownRadiusOuter * Math.cos(CAFDSketchHalfRadI)) + " " + (cy + crownRadiusOuter * Math.sin(CAFDSketchHalfRadI)) + " "
                + "A" + CAFDSketchJRI + " " + CAFDSketchJRI + " "
                + "1 0 1" + " "
                + (cx - crownRadiusOuter * Math.cos(CAFDSketchHalfRadI)) + " " + (cy - crownRadiusOuter * Math.sin(CAFDSketchHalfRadI))
            ).classed("sketch", true).attr("transform", "rotate(" + -80 + ", " + cx + " " + cy + ")");
            svg.append("path").attr("d", "M "
                + (cx - crownRadiusOuter * Math.cos(CAFDSketchHalfRadO)) + " " + (cy + crownRadiusOuter * Math.sin(CAFDSketchHalfRadO)) + " "
                + "A" + CAFDSketchJRO + " " + CAFDSketchJRO + " "
                + "1 0 1" + " "
                + (cx - crownRadiusOuter * Math.cos(CAFDSketchHalfRadO)) + " " + (cy - crownRadiusOuter * Math.sin(CAFDSketchHalfRadO))
            ).classed("sketch", true).attr("transform", "rotate(" + -80 + ", " + cx + " " + cy + ")");
            svg.append("path").attr("d", line([
                {x: cx - crownRadiusOuter - CAFDSketchJRO - 10, y: cy},
                {x: cx - crownRadiusOuter + 10, y: cy}
            ])).attr("stroke-dasharray", "25,5,5,5")
                .classed("sketch", true).attr("transform", "rotate(" + -80 + ", " + cx + " " + cy + ")");

            svg.append("path").attr("d", "M "
                + (cx - crownRadiusOuter * Math.cos(CAFDSketchHalfRadI)) + " " + (cy + crownRadiusOuter * Math.sin(CAFDSketchHalfRadI)) + " "
                + "A" + CAFDSketchJRI + " " + CAFDSketchJRI + " "
                + "1 0 1" + " "
                + (cx - crownRadiusOuter * Math.cos(CAFDSketchHalfRadI)) + " " + (cy - crownRadiusOuter * Math.sin(CAFDSketchHalfRadI))
            ).classed("sketch", true).attr("transform", "rotate(" + -100 + ", " + cx + " " + cy + ")");
            svg.append("path").attr("d", "M "
                + (cx - crownRadiusOuter * Math.cos(CAFDSketchHalfRadO)) + " " + (cy + crownRadiusOuter * Math.sin(CAFDSketchHalfRadO)) + " "
                + "A" + CAFDSketchJRO + " " + CAFDSketchJRO + " "
                + "1 0 1" + " "
                + (cx - crownRadiusOuter * Math.cos(CAFDSketchHalfRadO)) + " " + (cy - crownRadiusOuter * Math.sin(CAFDSketchHalfRadO))
            ).classed("sketch", true).attr("transform", "rotate(" + -100 + ", " + cx + " " + cy + ")");
            svg.append("path").attr("d", line([
                {x: cx - crownRadiusOuter - CAFDSketchJRO - 10, y: cy},
                {x: cx - crownRadiusOuter + 10, y: cy}
            ])).attr("stroke-dasharray", "25,5,5,5")
                .classed("sketch", true).attr("transform", "rotate(" + -100 + ", " + cx + " " + cy + ")");

            // 左侧盘管圆心
            let ljx = cx - crownRadiusOuter * Math.sin(10 / 180 * Math.PI);
            let ljy = cy + crownRadiusOuter * Math.cos(10 / 180 * Math.PI);

            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: ljx, y: ljy + CAFDSketchJRI},
                    {x: ljx + 3, y: ljy + CAFDSketchJRI - 15},
                    {x: ljx - 3, y: ljy + CAFDSketchJRI - 15},
                    {x: ljx, y: ljy + CAFDSketchJRI}
                ])).classed("sketch", true).attr("transform", "rotate(" + 30 + ", " + ljx + " " + ljy + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: ljx, y: ljy + CAFDSketchJRO},
                    {x: ljx + 3, y: ljy + CAFDSketchJRO + 15},
                    {x: ljx - 3, y: ljy + CAFDSketchJRO + 15},
                    {x: ljx, y: ljy + CAFDSketchJRO}
                ])).classed("sketch", true).attr("transform", "rotate(" + 30 + ", " + ljx + " " + ljy + ")");
            svg.append("path").attr("d", line([
                {x: ljx, y: ljy + CAFDSketchJRI},
                {x: ljx, y: ljy + CAFDSketchJRO}
            ])).classed("sketch", true).attr("transform", "rotate(" + 30 + ", " + ljx + " " + ljy + ")");
            svg.append("path").attr("d", line([
                {x: ljx, y: ljy + CAFDSketchJRI - 15},
                {x: ljx, y: ljy + CAFDSketchJRI - 15 - 10}
            ])).classed("sketch", true).attr("transform", "rotate(" + 30 + ", " + ljx + " " + ljy + ")");
            svg.append("path").attr("d", line([
                {x: ljx, y: ljy + CAFDSketchJRO + 15 + 40},
                {x: ljx, y: ljy + CAFDSketchJRO + 15}
            ])).attr("id", "CAFDSketchTHKJN").classed("sketch", true)
                .classed("sketch", true).attr("transform", "rotate(" + 30 + ", " + ljx + " " + ljy + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CAFDSketchTHKJN").attr("startOffset", "50%").text(thkjn);

            let rjx = cx + crownRadiusOuter * Math.sin(10 / 180 * Math.PI);
            let rjy = cy + crownRadiusOuter * Math.cos(10 / 180 * Math.PI);
            svg.append("path").attr("d", line([
                {x: rjx, y: rjy},
                {x: rjx, y: rjy + CAFDSketchJRO}
            ])).classed("sketch", true).attr("transform", "rotate(" + -45 + ", " + rjx + " " + rjy + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: rjx, y: rjy + CAFDSketchJRO},
                    {x: rjx + 3, y: rjy + CAFDSketchJRO + 15},
                    {x: rjx - 3, y: rjy + CAFDSketchJRO + 15},
                    {x: rjx, y: rjy + CAFDSketchJRO}
                ])).classed("sketch", true).attr("transform", "rotate(" + -45 + ", " + rjx + " " + rjy + ")");
            svg.append("path").attr("d", line([
                {x: rjx, y: rjy + CAFDSketchJRO + 15},
                {x: rjx, y: rjy + CAFDSketchJRO + 40}
            ])).classed("sketch", true).attr("transform", "rotate(" + -45 + ", " + rjx + " " + rjy + ")");
            svg.append("path").attr("d", line([
                {x: rjx + 0.707 * (CAFDSketchJRO + 40), y: rjy + 0.707 * (CAFDSketchJRO + 40)},
                {x: rjx + 0.707 * (CAFDSketchJRO + 40) + 50, y: rjy + 0.707 * (CAFDSketchJRO + 40)}
            ])).attr("id", "CAFDSketchDJO").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CAFDSketchDJO").attr("startOffset", "50%").text(djo);

        }

        currentTabIndex = cafdd2d3.tabs('getTabIndex', cafdd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            cafd2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#cafd").length > 0) {
                    cafd2d();
                }
            });
        }
        cafdd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    cafd2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#cafd").length > 0) {
                            cafd2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20582-2011 半圆管夹套碟形封头校核",
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
                    $(ed.target).combobox("loadData", CAFDJCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", CAFDJType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", CAFDJSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", CAFDJName);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", CAFDSCategory);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", CAFDSType);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", CAFDSSTD);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", CAFDSName);
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
                    cafdd2.empty();

                    // model
                    cafdd3.empty();

                    // sketch
                    currentTabIndex = cafdd2d3.tabs('getTabIndex', cafdd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        cafd2d();
                        cafdd2.off("resize").on("resize", function () {
                            if ($("#cafd").length > 0) {
                                cafd2d();
                            }
                        });
                    }
                    cafdd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                cafd2d();
                                cafdd2.off("resize").on("resize", function () {
                                    if ($("#cafd").length > 0) {
                                        cafd2d();
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

                        CAFDDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CAFDJCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CAFDJType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        CAFDJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        CAFDJName = null;

                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CAFDSCategory = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CAFDSType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        CAFDSSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        CAFDSName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: CAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFDJCategory = [];
                                CAFDSCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + CAFDDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                } else {
                                    $(result).each(function (index, element) {
                                        CAFDJCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        CAFDSCategory[index] = {
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

                        CAFDJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CAFDJType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        CAFDJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        CAFDJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFDJCategoryVal,
                                temp: CAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFDJType = [];
                                $(result).each(function (index, element) {
                                    CAFDJType[index] = {
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

                        CAFDJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        CAFDJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        CAFDJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFDJCategoryVal,
                                type: CAFDJTypeVal,
                                temp: CAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFDJSTD = [];
                                $(result).each(function (index, element) {
                                    CAFDJSTD[index] = {
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

                        CAFDJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        CAFDJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFDJCategoryVal,
                                type: CAFDJTypeVal,
                                std: CAFDJSTDVal,
                                temp: CAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFDJName = [];
                                $(result).each(function (index, element) {
                                    CAFDJName[index] = {
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

                        CAFDSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CAFDSType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        CAFDSSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        CAFDSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFDSCategoryVal,
                                temp: CAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFDSType = [];
                                $(result).each(function (index, element) {
                                    CAFDSType[index] = {
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

                        CAFDSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        CAFDSSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        CAFDSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFDSCategoryVal,
                                type: CAFDSTypeVal,
                                temp: CAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFDSSTD = [];
                                $(result).each(function (index, element) {
                                    CAFDSSTD[index] = {
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

                        CAFDSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        CAFDSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFDSCategoryVal,
                                type: CAFDSTypeVal,
                                std: CAFDSSTDVal,
                                temp: CAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFDSName = [];
                                $(result).each(function (index, element) {
                                    CAFDSName[index] = {
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
                            let CAFDTestVal = rows[1][columns[0][1].field];

                            // 夹套设计压力
                            if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                                let CAFDPJD = parseFloat(rows[2][columns[0][1].field]);

                                // 夹套静压力
                                if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                                    let CAFDPJS = parseFloat(rows[3][columns[0][1].field]);

                                    // 夹套计算压力
                                    let CAFDPJC = CAFDPJD + CAFDPJS;

                                    // 夹套材料名称
                                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                        let CAFDJNameVal = rows[7][columns[0][1].field];

                                        // AJAX 获取夹套材料密度、最大最小厚度
                                        let CAFDJDensity, CAFDJThkMin, CAFDJThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_gbt_150_2011_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": CAFDJCategoryVal,
                                                "type": CAFDJTypeVal,
                                                "std": CAFDJSTDVal,
                                                "name": CAFDJNameVal,
                                                "temp": CAFDDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {
                                                CAFDJDensity = parseFloat(result.density);
                                                CAFDJThkMin = parseFloat(result.thkMin);
                                                CAFDJThkMax = parseFloat(result.thkMax);

                                                // 夹套外直径
                                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                                    let CAFDDJO = parseFloat(rows[8][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        cafd2d("ϕ" + CAFDDJO);
                                                        cafdd2.off("resize").on("resize", function () {
                                                            if ($("#cafd").length > 0) {
                                                                cafd2d("ϕ" + CAFDDJO);
                                                            }
                                                        });
                                                    }
                                                    cafdd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                cafd2d("ϕ" + CAFDDJO);
                                                                cafdd2.off("resize").on("resize", function () {
                                                                    if ($("#cafd").length > 0) {
                                                                        cafd2d("ϕ" + CAFDDJO);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 标准限制的壳体厚度
                                                    let shellThkMaximum;
                                                    if (CAFDDJO === 60) {
                                                        shellThkMaximum = 25.4;
                                                    }
                                                    else {
                                                        shellThkMaximum = 50.8;
                                                    }

                                                    // 夹套名义厚度
                                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > CAFDJThkMin
                                                        && parseFloat(rows[9][columns[0][1].field]) <= Math.min(CAFDDJO / 2, CAFDJThkMax)) {
                                                        let CAFDTHKJN = parseFloat(rows[9][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            cafd2d("ϕ" + CAFDDJO, CAFDTHKJN);
                                                            cafdd2.off("resize").on("resize", function () {
                                                                if ($("#cafd").length > 0) {
                                                                    cafd2d("ϕ" + CAFDDJO, CAFDTHKJN);
                                                                }
                                                            });
                                                        }

                                                        cafdd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    cafd2d("ϕ" + CAFDDJO, CAFDTHKJN);
                                                                    cafdd2.off("resize").on("resize", function () {
                                                                        if ($("#cafd").length > 0) {
                                                                            cafd2d("ϕ" + CAFDDJO, CAFDTHKJN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let CAFDDJI = CAFDDJO - 2 * CAFDTHKJN;

                                                        let CAFDJOT, CAFDJO, CAFDJOT1, CAFDJREL, CAFDCJ1;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_gbt_150_2011_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": CAFDJCategoryVal,
                                                                "type": CAFDJTypeVal,
                                                                "std": CAFDJSTDVal,
                                                                "name": CAFDJNameVal,
                                                                "thk": CAFDTHKJN,
                                                                "temp": CAFDDT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": CAFDDJO
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                CAFDJOT = parseFloat(result.ot);
                                                                if (CAFDJOT < 0) {
                                                                    south.html("查询盘管材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                CAFDJO = parseFloat(result.o);
                                                                if (CAFDJO < 0) {
                                                                    south.html("查询盘管材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                CAFDJREL = parseFloat(result.rel);
                                                                if (CAFDJREL < 0) {
                                                                    south.html("查询盘管材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                CAFDCJ1 = parseFloat(result.c1);
                                                                if (CAFDCJ1 < 0) {
                                                                    south.html("查询盘管材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                CAFDJOT1 = parseFloat(result.ot1);

                                                                // 夹套腐蚀裕量
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) < CAFDTHKJN) {
                                                                    let CAFDCJ2 = parseFloat(rows[10][columns[0][1].field]);

                                                                    // 夹套焊接接头系数
                                                                    let CAFDEJ = parseFloat(rows[11][columns[0][1].field]);

                                                                    // 夹套厚度附加量C
                                                                    let CAFDCJ = CAFDCJ1 + CAFDCJ2;

                                                                    // 夹套有效厚度
                                                                    let CAFDTHKJE = CAFDTHKJN - CAFDCJ;

                                                                    // 计算夹套内半径R
                                                                    let CAFDRJI = CAFDDJI / 2;

                                                                    // 夹套计算厚度
                                                                    let CAFDTHKJC = (CAFDPJC * CAFDRJI) / (CAFDEJ * CAFDJOT - 0.6 * CAFDPJC);

                                                                    // 设计厚度
                                                                    let CAFDTHKJD = CAFDTHKJC + CAFDCJ2;

                                                                    // 所需厚度提示信息
                                                                    south.html(
                                                                        "<span style='color:#444444;'>" +
                                                                        "夹套所需厚度：" + (CAFDTHKJD + CAFDCJ1).toFixed(2) + " mm" +
                                                                        "</span>");

                                                                    // 夹套厚度校核
                                                                    let CAFDTHKJCHK;
                                                                    if (CAFDTHKJN >= (CAFDTHKJD + CAFDCJ1).toFixed(2)) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "输入厚度：" + CAFDTHKJN + " mm" +
                                                                            "</span>");
                                                                        CAFDTHKJCHK = "合格";
                                                                    } else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "输入厚度：" + CAFDTHKJN + " mm" +
                                                                            "</span>");
                                                                        CAFDTHKJCHK = "不合格";
                                                                    }

                                                                    // 夹套试验压力
                                                                    let CAFDPJT;
                                                                    if (CAFDTestVal === "液压试验") {
                                                                        CAFDPJT = 1.25 * CAFDPJD * CAFDJO / Math.max(CAFDJOT, CAFDJOT1);
                                                                    }
                                                                    else if (CAFDTestVal === "气压试验") {
                                                                        CAFDPJT = 1.1 * CAFDPJD * CAFDJO / Math.max(CAFDJOT, CAFDJOT1);
                                                                    }
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "夹套试验压力：" + CAFDPJT.toFixed(4) + " MPa" +
                                                                        "</span>");

                                                                    // 环向应力限制的夹套 MAWPJJ
                                                                    let CAFDMAWPJJ = CAFDTHKJE * CAFDEJ * CAFDJOT / (CAFDRJI + 0.6 * CAFDTHKJE) - CAFDPJS;

                                                                    // 封头设计压力
                                                                    if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                                                        let CAFDPSD = parseFloat(rows[12][columns[0][1].field]);

                                                                        // 封头静压力
                                                                        if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                                                            let CAFDPSS = parseFloat(rows[13][columns[0][1].field]);

                                                                            // 封头计算压力
                                                                            let CAFDPSC = CAFDPSD + CAFDPSS;

                                                                            // 封头材料名称
                                                                            if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])) {
                                                                                let CAFDSNameVal = rows[17][columns[0][1].field];

                                                                                // AJAX 获取封头材料密度、最大最小厚度
                                                                                let CAFDSDensity, CAFDSThkMin,
                                                                                    CAFDSThkMax;
                                                                                $.ajax({
                                                                                    type: "POST",
                                                                                    contentType: "application/json; charset=utf-8",
                                                                                    url: "web_get_gbt_150_2011_index.action",
                                                                                    async: true,
                                                                                    dataType: "json",
                                                                                    data: JSON.stringify({
                                                                                        "category": CAFDSCategoryVal,
                                                                                        "type": CAFDSTypeVal,
                                                                                        "std": CAFDSSTDVal,
                                                                                        "name": CAFDSNameVal,
                                                                                        "temp": CAFDDT
                                                                                    }),
                                                                                    beforeSend: function () {
                                                                                    },
                                                                                    success: function (result) {

                                                                                        CAFDSDensity = parseFloat(result.density);
                                                                                        CAFDSThkMin = parseFloat(result.thkMin);
                                                                                        CAFDSThkMax = parseFloat(result.thkMax);

                                                                                        // 封头球冠区内半径
                                                                                        if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                            && parseFloat(rows[18][columns[0][1].field]) >= 762 / 2
                                                                                            && parseFloat(rows[18][columns[0][1].field]) <= 4318 / 2) {
                                                                                            let CAFDRSI = parseFloat(rows[18][columns[0][1].field]);

                                                                                            // 封头球冠区内直径
                                                                                            let CAFDDSI = 2 * CAFDRSI;

                                                                                            // Sketch
                                                                                            if (currentTabIndex === 0) {
                                                                                                cafd2d("ϕ" + CAFDDJO, CAFDTHKJN, "R" + CAFDRSI);
                                                                                                cafdd2.off("resize").on("resize", function () {
                                                                                                    if ($("#cafd").length > 0) {
                                                                                                        cafd2d("ϕ" + CAFDDJO, CAFDTHKJN, "R" + CAFDRSI);
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                            cafdd2d3.tabs({
                                                                                                onSelect: function (title, index) {
                                                                                                    if (index === 0) {
                                                                                                        cafd2d("ϕ" + CAFDDJO, CAFDTHKJN, "R" + CAFDRSI);
                                                                                                        cafdd2.off("resize").on("resize", function () {
                                                                                                            if ($("#cafd").length > 0) {
                                                                                                                cafd2d("ϕ" + CAFDDJO, CAFDTHKJN, "R" + CAFDRSI);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                }
                                                                                            });

                                                                                            // 封头名义厚度
                                                                                            if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                                                                && parseFloat(rows[19][columns[0][1].field]) > Math.max(CAFDSThkMin, 4.8)
                                                                                                && parseFloat(rows[19][columns[0][1].field]) <= Math.min(CAFDSThkMax, shellThkMaximum)) {
                                                                                                let CAFDTHKSN = parseFloat(rows[19][columns[0][1].field]);

                                                                                                // Sketch
                                                                                                if (currentTabIndex === 0) {
                                                                                                    cafd2d("ϕ" + CAFDDJO, CAFDTHKJN, "R" + CAFDRSI, CAFDTHKSN);
                                                                                                    cafdd2.off("resize").on("resize", function () {
                                                                                                        if ($("#cafd").length > 0) {
                                                                                                            cafd2d("ϕ" + CAFDDJO, CAFDTHKJN, "R" + CAFDRSI, CAFDTHKSN);
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                                cafdd2d3.tabs({
                                                                                                    onSelect: function (title, index) {
                                                                                                        if (index === 0) {
                                                                                                            cafd2d("ϕ" + CAFDDJO, CAFDTHKJN, "R" + CAFDRSI, CAFDTHKSN);
                                                                                                            cafdd2.off("resize").on("resize", function () {
                                                                                                                if ($("#cafd").length > 0) {
                                                                                                                    cafd2d("ϕ" + CAFDDJO, CAFDTHKJN, "R" + CAFDRSI, CAFDTHKSN);
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                    }
                                                                                                });

                                                                                                let CAFDDSO = CAFDDSI + 2 * CAFDTHKSN;

                                                                                                let CAFDSOT, CAFDSO,
                                                                                                    CAFDSOT1, CAFDSREL,
                                                                                                    CAFDCS1;
                                                                                                $.ajax({
                                                                                                    type: "POST",
                                                                                                    contentType: "application/json; charset=utf-8",
                                                                                                    url: "web_get_gbt_150_2011_com_property.action",
                                                                                                    async: true,
                                                                                                    dataType: "json",
                                                                                                    data: JSON.stringify({
                                                                                                        "category": CAFDSCategoryVal,
                                                                                                        "type": CAFDSTypeVal,
                                                                                                        "std": CAFDSSTDVal,
                                                                                                        "name": CAFDSNameVal,
                                                                                                        "thk": CAFDTHKSN,
                                                                                                        "temp": CAFDDT,
                                                                                                        "highLow": 3,
                                                                                                        "isTube": 0,
                                                                                                        "od": CAFDDSO
                                                                                                    }),
                                                                                                    beforeSend: function () {
                                                                                                    },
                                                                                                    success: function (result) {

                                                                                                        CAFDSOT = parseFloat(result.ot);
                                                                                                        if (CAFDSOT < 0) {
                                                                                                            south.html("查询封头材料设计温度许用应力失败！").css("color", "red");
                                                                                                            return false;
                                                                                                        }
                                                                                                        CAFDSO = parseFloat(result.o);
                                                                                                        if (CAFDSO < 0) {
                                                                                                            south.html("查询封头材料常温许用应力失败！").css("color", "red");
                                                                                                            return false;
                                                                                                        }
                                                                                                        CAFDSREL = parseFloat(result.rel);
                                                                                                        if (CAFDSREL < 0) {
                                                                                                            south.html("查询封头材料常温屈服强度失败！").css("color", "red");
                                                                                                            return false;
                                                                                                        }
                                                                                                        CAFDCS1 = parseFloat(result.c1);
                                                                                                        if (CAFDCS1 < 0) {
                                                                                                            south.html("查询封头材料厚度负偏差失败！").css("color", "red");
                                                                                                            return false;
                                                                                                        }
                                                                                                        CAFDSOT1 = parseFloat(result.ot1);

                                                                                                        // 封头腐蚀裕量
                                                                                                        if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                                                            && parseFloat(rows[20][columns[0][1].field]) <= (CAFDTHKSN - 4.8 - CAFDCS1)) {
                                                                                                            let CAFDCS2 = parseFloat(rows[20][columns[0][1].field]);

                                                                                                            // 封头焊接接头系数
                                                                                                            let CAFDES = parseFloat(rows[21][columns[0][1].field]);

                                                                                                            // 封头厚度附加量C
                                                                                                            let CAFDCS = CAFDCS1 + CAFDCS2;

                                                                                                            // 封头有效厚度
                                                                                                            let CAFDTHKSE = CAFDTHKSN - CAFDCS;

                                                                                                            // 封头许用应力
                                                                                                            let CAFDO15 = 1.5 * CAFDSOT;

                                                                                                            // 内压轴向拉应力
                                                                                                            let CAFDOPie = CAFDPSC * CAFDRSI / (2 * CAFDTHKSE);

                                                                                                            // 获取应力系数
                                                                                                            let CAFDK;
                                                                                                            $.ajax({
                                                                                                                type: "POST",
                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                url: "hgt_20582_2011_table_3_2_get_k.action",
                                                                                                                async: true,
                                                                                                                dataType: "json",
                                                                                                                data: JSON.stringify({
                                                                                                                    "jacketDo": CAFDDJO,
                                                                                                                    "shellDi": CAFDDSI,
                                                                                                                    "shellThk": CAFDTHKSE,
                                                                                                                }),
                                                                                                                beforeSend: function () {
                                                                                                                },
                                                                                                                success: function (result) {
                                                                                                                    CAFDK = result;

                                                                                                                    // 夹套引起的轴向弯曲应力
                                                                                                                    let CAFDF = CAFDK * CAFDPJC;

                                                                                                                    // 计算总应力
                                                                                                                    let CAFDO = CAFDF + CAFDOPie;

                                                                                                                    // 封头限制的夹套MAWP
                                                                                                                    let m = CAFDPJC,
                                                                                                                        n = CAFDF + CAFDOPie;
                                                                                                                    for (; n <= CAFDO15; m += 0.0001) {
                                                                                                                        n = CAFDK * m + CAFDOPie;
                                                                                                                    }
                                                                                                                    let CAFDMAWPJS = m - 0.0001 - CAFDPJS;

                                                                                                                    let CAFDMAWPJ = Math.min(CAFDMAWPJJ, CAFDMAWPJS);
                                                                                                                    south.append(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                        "夹套MAWP：" + CAFDMAWPJ.toFixed(4) + " MPa" +
                                                                                                                        "</span>");

                                                                                                                    south.append(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                        "封头许用应力：" + CAFDO15.toFixed(2) + " MPa" +
                                                                                                                        "</span>");

                                                                                                                    // 封头应力校核
                                                                                                                    let CAFDOCHK;
                                                                                                                    if (CAFDO <= CAFDO15) {
                                                                                                                        south.append(
                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "封头实际应力：" + CAFDO.toFixed(2) + " MPa" +
                                                                                                                            "</span>");
                                                                                                                        CAFDOCHK = "合格";
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        south.append(
                                                                                                                            "<span style='color:red;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "封头实际应力：" + CAFDO.toFixed(2) + " MPa" +
                                                                                                                            "</span>");
                                                                                                                        CAFDOCHK = "不合格";
                                                                                                                    }

                                                                                                                    // 封头试验压力
                                                                                                                    let CAFDPST;
                                                                                                                    if (CAFDTestVal === "液压试验") {
                                                                                                                        CAFDPST = 1.25 * CAFDPSD * CAFDSO / Math.max(CAFDSOT, CAFDSOT1);
                                                                                                                    }
                                                                                                                    else if (CAFDTestVal === "气压试验") {
                                                                                                                        CAFDPST = 1.10 * CAFDPSD * CAFDSO / Math.max(CAFDSOT, CAFDSOT1);
                                                                                                                    }

                                                                                                                    south.append(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                        "封头试验压力：" + CAFDPST.toFixed(4) + " MPa" +
                                                                                                                        "</span>");

                                                                                                                    // 封头受环向应力限制的 MAWPSS
                                                                                                                    let CAFDMAWPSS = 4 * CAFDTHKSE * CAFDSOT * CAFDES / (CAFDDSI + CAFDTHKSE) - CAFDPSS;

                                                                                                                    // 封头受夹套限制的 MAWPSJ
                                                                                                                    let i = CAFDPSC,
                                                                                                                        j = CAFDF + CAFDOPie;
                                                                                                                    for (; j <= CAFDO15; i += 0.0001) {
                                                                                                                        j = CAFDF + i * CAFDRSI / (2 * CAFDTHKSE);
                                                                                                                    }
                                                                                                                    let CAFDMAWPSJ = i - 0.0001 - CAFDPSS;
                                                                                                                    let CAFDMAWPS = Math.min(CAFDMAWPSS, CAFDMAWPSJ);
                                                                                                                    south.append(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                        "封头MAWP：" + CAFDMAWPS.toFixed(4) + " MPa" +
                                                                                                                        "</span>");

                                                                                                                    // docx
                                                                                                                    let CAFDPayJS = $('#payjs');

                                                                                                                    function getDocx() {
                                                                                                                        $.ajax({
                                                                                                                            type: "POST",
                                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                                            url: "cafddocx.action",
                                                                                                                            async: true,
                                                                                                                            dataType: "json",
                                                                                                                            data: JSON.stringify({
                                                                                                                                ribbonName: "CAFD",

                                                                                                                                t: CAFDDT,
                                                                                                                                psd: CAFDPSD,
                                                                                                                                pss: CAFDPSS,
                                                                                                                                sstd: CAFDSSTDVal,
                                                                                                                                sname: CAFDSNameVal,
                                                                                                                                rsi: CAFDRSI,
                                                                                                                                thksn: CAFDTHKSN,
                                                                                                                                cs2: CAFDCS2,
                                                                                                                                es: CAFDES,
                                                                                                                                pjd: CAFDPJD,
                                                                                                                                pjs: CAFDPJS,
                                                                                                                                jstd: CAFDJSTDVal,
                                                                                                                                jname: CAFDJNameVal,
                                                                                                                                djo: CAFDDJO,
                                                                                                                                thkjn: CAFDTHKJN,
                                                                                                                                cj2: CAFDCJ2,
                                                                                                                                ej: CAFDEJ,
                                                                                                                                test: CAFDTestVal,
                                                                                                                                densityj: CAFDJDensity.toFixed(4),
                                                                                                                                densitys: CAFDSDensity.toFixed(4),
                                                                                                                                ojt: CAFDJOT.toFixed(4),
                                                                                                                                ost: CAFDSOT.toFixed(4),
                                                                                                                                oj: CAFDJO.toFixed(4),
                                                                                                                                os: CAFDSO.toFixed(4),
                                                                                                                                rjrel: CAFDJREL.toFixed(4),
                                                                                                                                rsrel: CAFDSREL.toFixed(4),
                                                                                                                                ojt1: CAFDJOT1.toFixed(4),
                                                                                                                                ost1: CAFDSOT1.toFixed(4),
                                                                                                                                cj1: CAFDCJ1.toFixed(4),
                                                                                                                                cs1: CAFDCS1.toFixed(4),
                                                                                                                                psc: CAFDPSC.toFixed(4),
                                                                                                                                pjc: CAFDPJC.toFixed(4),
                                                                                                                                cj: CAFDCJ.toFixed(4),
                                                                                                                                thkje: CAFDTHKJE.toFixed(4),
                                                                                                                                rji: CAFDRJI.toFixed(4),
                                                                                                                                thkjc: CAFDTHKJC.toFixed(4),
                                                                                                                                thkjd: CAFDTHKJD.toFixed(4),
                                                                                                                                thkjchk: CAFDTHKJCHK,
                                                                                                                                cs: CAFDCS.toFixed(4),
                                                                                                                                thkse: CAFDTHKSE.toFixed(4),
                                                                                                                                dsi: CAFDDSI.toFixed(4),
                                                                                                                                opie: CAFDOPie.toFixed(4),
                                                                                                                                k: CAFDK.toFixed(4),
                                                                                                                                f: CAFDF.toFixed(4),
                                                                                                                                o: CAFDO.toFixed(4),
                                                                                                                                o15: CAFDO15.toFixed(4),
                                                                                                                                ochk: CAFDOCHK,
                                                                                                                                pjt: CAFDPJT.toFixed(4),
                                                                                                                                pst: CAFDPST.toFixed(4),
                                                                                                                                mawpjj: CAFDMAWPJJ.toFixed(4),
                                                                                                                                mawpjs: CAFDMAWPJS.toFixed(4),
                                                                                                                                mawpj: CAFDMAWPJ.toFixed(4),
                                                                                                                                mawpss: CAFDMAWPSS.toFixed(4),
                                                                                                                                mawpsj: CAFDMAWPSJ.toFixed(4),
                                                                                                                                mawps: CAFDMAWPS.toFixed(4)
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
                                                                                                                                    CAFDPayJS.dialog({
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
                                                                                                                                                CAFDPayJS.dialog("close");
                                                                                                                                                CAFDPayJS.dialog("clear");
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
                                                                                                                                                            CAFDPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                    CAFDPayJS.dialog('close');
                                                                                                                                                                    CAFDPayJS.dialog('clear');
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
                                                                                                            && parseFloat(rows[20][columns[0][1].field]) > (CAFDTHKSN - 4.8 - CAFDCS1)) {
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
                                                                                                && parseFloat(rows[19][columns[0][1].field]) <= Math.max(CAFDSThkMin, 4.8)) {
                                                                                                south.html("封头名义厚度不能小于等于 " + Math.max(CAFDSThkMin, 4.8) + " mm").css("color", "red");
                                                                                            }
                                                                                            else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                                                                && parseFloat(rows[19][columns[0][1].field]) > Math.min(CAFDSThkMax, shellThkMaximum)) {
                                                                                                south.html("封头名义厚度不能大于 " + Math.min(CAFDSThkMax, shellThkMaximum) + " mm").css("color", "red");
                                                                                            }
                                                                                        }
                                                                                        else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                            && parseFloat(rows[18][columns[0][1].field]) < 762 / 2) {
                                                                                            south.html("封头球冠区内半径不能小于 " + 762 / 2 + " mm").css("color", "red");
                                                                                        }
                                                                                        else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                            && parseFloat(rows[18][columns[0][1].field]) > 4318 / 2) {
                                                                                            south.html("封头球冠区内半径不能大于 " + 4318 / 2 + " mm").css("color", "red");
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
                                                                    && parseFloat(rows[10][columns[0][1].field]) >= CAFDTHKJN) {
                                                                    south.html("夹套腐蚀裕量不能大于等于 " + CAFDTHKJN + " mm").css("color", "red");
                                                                }
                                                            },
                                                            error: function () {
                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                            }
                                                        });
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) <= CAFDJThkMin) {
                                                        south.html("夹套名义厚度不能小于等于 " + CAFDJThkMin + " mm").css("color", "red");
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > Math.min(CAFDDJO / 2, CAFDJThkMax)) {
                                                        south.html("夹套名义厚度不能大于 " + Math.min(CAFDDJO / 2, CAFDJThkMax) + " mm").css("color", "red");
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