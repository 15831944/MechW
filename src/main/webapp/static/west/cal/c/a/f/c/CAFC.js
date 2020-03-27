$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let cafcd2 = $("#d2");
    let cafcd3 = $("#d3");
    let cafcd2d3 = $('#d2d3');

    $("#cal").html("<table id='cafc'></table>");
    let pg = $("#cafc");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/c/a/f/c/CAFC.json", function (result) {

        let CAFCDT;
        let CAFCSCategory, CAFCSCategoryVal, CAFCSType, CAFCSTypeVal, CAFCSSTD, CAFCSSTDVal, CAFCSName,
            CAFCJCategory, CAFCJCategoryVal, CAFCJType, CAFCJTypeVal, CAFCJSTD, CAFCJSTDVal, CAFCJName;
        let columns, rows, ed;

        // 2D Sketch
        function cafc2d(djo, thkjn, dsi, thksn) {

            if (!djo) djo = "ϕdjo";
            if (!thkjn) thkjn = "δjn";
            if (!dsi) dsi = "ϕDsi";
            if (!thksn) thksn = "δsn";

            cafcd2.empty();

            let width = cafcd2.width();
            let height = cafcd2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "CAFCSVG")
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
            let cornerRadiusInner = 0.17275 * (width - 2 * padding - 2 * thickness);
            let cornerRadiusOuter = cornerRadiusInner + thickness;

            // 球冠半径
            let crownRadiusInner = 0.9045 * (width - 2 * padding - 2 * thickness);
            let crownRadiusOuter = crownRadiusInner + thickness;

            let ANG = Math.acos(((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) / (0.9045 * (width - 2 * padding - 2 * thickness) - cornerRadiusInner));

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
            ])).attr("id", "CAFCSketchTHKSN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CAFCSketchTHKSN").attr("startOffset", "50%").text(thksn);

            // 球冠内半径标注
            let cx = width / 2;
            let cy = padding + straightHeight - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG);

            // 中心线
            drawCenterLine(cx, padding - 10, cx, cy + crownRadiusOuter + 10);

            dimTopH(padding + thickness, padding, width - padding - thickness, padding, dsi, "CAFCSketchDSI");

            // 夹套内半径
            let CAFCSketchJRI = 0.05 * crownRadiusInner;

            // 夹套外半径
            let CAFCSketchJRO = CAFCSketchJRI + 5;

            // 夹套内壁对应的半顶角
            let CAFCSketchHalfRadI = 2 * Math.asin(CAFCSketchJRI / 2 / crownRadiusOuter);

            // 夹套外壁对应的半顶角
            let CAFCSketchHalfRadO = 2 * Math.asin(CAFCSketchJRO / 2 / crownRadiusOuter);

            svg.append("path").attr("d", "M "
                + (cx - crownRadiusOuter * Math.cos(CAFCSketchHalfRadI)) + " " + (cy + crownRadiusOuter * Math.sin(CAFCSketchHalfRadI)) + " "
                + "A" + CAFCSketchJRI + " " + CAFCSketchJRI + " "
                + "1 0 1" + " "
                + (cx - crownRadiusOuter * Math.cos(CAFCSketchHalfRadI)) + " " + (cy - crownRadiusOuter * Math.sin(CAFCSketchHalfRadI))
            ).classed("sketch", true).attr("transform", "rotate(" + -80 + ", " + cx + " " + cy + ")");
            svg.append("path").attr("d", "M "
                + (cx - crownRadiusOuter * Math.cos(CAFCSketchHalfRadO)) + " " + (cy + crownRadiusOuter * Math.sin(CAFCSketchHalfRadO)) + " "
                + "A" + CAFCSketchJRO + " " + CAFCSketchJRO + " "
                + "1 0 1" + " "
                + (cx - crownRadiusOuter * Math.cos(CAFCSketchHalfRadO)) + " " + (cy - crownRadiusOuter * Math.sin(CAFCSketchHalfRadO))
            ).classed("sketch", true).attr("transform", "rotate(" + -80 + ", " + cx + " " + cy + ")");
            svg.append("path").attr("d", line([
                {x: cx - crownRadiusOuter - CAFCSketchJRO - 10, y: cy},
                {x: cx - crownRadiusOuter + 10, y: cy}
            ])).attr("stroke-dasharray", "25,5,5,5")
                .classed("sketch", true).attr("transform", "rotate(" + -80 + ", " + cx + " " + cy + ")");

            svg.append("path").attr("d", "M "
                + (cx - crownRadiusOuter * Math.cos(CAFCSketchHalfRadI)) + " " + (cy + crownRadiusOuter * Math.sin(CAFCSketchHalfRadI)) + " "
                + "A" + CAFCSketchJRI + " " + CAFCSketchJRI + " "
                + "1 0 1" + " "
                + (cx - crownRadiusOuter * Math.cos(CAFCSketchHalfRadI)) + " " + (cy - crownRadiusOuter * Math.sin(CAFCSketchHalfRadI))
            ).classed("sketch", true).attr("transform", "rotate(" + -100 + ", " + cx + " " + cy + ")");
            svg.append("path").attr("d", "M "
                + (cx - crownRadiusOuter * Math.cos(CAFCSketchHalfRadO)) + " " + (cy + crownRadiusOuter * Math.sin(CAFCSketchHalfRadO)) + " "
                + "A" + CAFCSketchJRO + " " + CAFCSketchJRO + " "
                + "1 0 1" + " "
                + (cx - crownRadiusOuter * Math.cos(CAFCSketchHalfRadO)) + " " + (cy - crownRadiusOuter * Math.sin(CAFCSketchHalfRadO))
            ).classed("sketch", true).attr("transform", "rotate(" + -100 + ", " + cx + " " + cy + ")");
            svg.append("path").attr("d", line([
                {x: cx - crownRadiusOuter - CAFCSketchJRO - 10, y: cy},
                {x: cx - crownRadiusOuter + 10, y: cy}
            ])).attr("stroke-dasharray", "25,5,5,5")
                .classed("sketch", true).attr("transform", "rotate(" + -100 + ", " + cx + " " + cy + ")");

            // 左侧盘管圆心
            let ljx = cx - crownRadiusOuter * Math.sin(10 / 180 * Math.PI);
            let ljy = cy + crownRadiusOuter * Math.cos(10 / 180 * Math.PI);

            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: ljx, y: ljy + CAFCSketchJRI},
                    {x: ljx + 3, y: ljy + CAFCSketchJRI - 15},
                    {x: ljx - 3, y: ljy + CAFCSketchJRI - 15},
                    {x: ljx, y: ljy + CAFCSketchJRI}
                ])).classed("sketch", true).attr("transform", "rotate(" + 30 + ", " + ljx + " " + ljy + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: ljx, y: ljy + CAFCSketchJRO},
                    {x: ljx + 3, y: ljy + CAFCSketchJRO + 15},
                    {x: ljx - 3, y: ljy + CAFCSketchJRO + 15},
                    {x: ljx, y: ljy + CAFCSketchJRO}
                ])).classed("sketch", true).attr("transform", "rotate(" + 30 + ", " + ljx + " " + ljy + ")");
            svg.append("path").attr("d", line([
                {x: ljx, y: ljy + CAFCSketchJRI},
                {x: ljx, y: ljy + CAFCSketchJRO}
            ])).classed("sketch", true).attr("transform", "rotate(" + 30 + ", " + ljx + " " + ljy + ")");
            svg.append("path").attr("d", line([
                {x: ljx, y: ljy + CAFCSketchJRI - 15},
                {x: ljx, y: ljy + CAFCSketchJRI - 15 - 10}
            ])).classed("sketch", true).attr("transform", "rotate(" + 30 + ", " + ljx + " " + ljy + ")");
            svg.append("path").attr("d", line([
                {x: ljx, y: ljy + CAFCSketchJRO + 15 + 40},
                {x: ljx, y: ljy + CAFCSketchJRO + 15}
            ])).attr("id", "CAFCSketchTHKJN").classed("sketch", true)
                .classed("sketch", true).attr("transform", "rotate(" + 30 + ", " + ljx + " " + ljy + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CAFCSketchTHKJN").attr("startOffset", "50%").text(thkjn);

            let rjx = cx + crownRadiusOuter * Math.sin(10 / 180 * Math.PI);
            let rjy = cy + crownRadiusOuter * Math.cos(10 / 180 * Math.PI);
            svg.append("path").attr("d", line([
                {x: rjx, y: rjy},
                {x: rjx, y: rjy + CAFCSketchJRO}
            ])).classed("sketch", true).attr("transform", "rotate(" + -45 + ", " + rjx + " " + rjy + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: rjx, y: rjy + CAFCSketchJRO},
                    {x: rjx + 3, y: rjy + CAFCSketchJRO + 15},
                    {x: rjx - 3, y: rjy + CAFCSketchJRO + 15},
                    {x: rjx, y: rjy + CAFCSketchJRO}
                ])).classed("sketch", true).attr("transform", "rotate(" + -45 + ", " + rjx + " " + rjy + ")");
            svg.append("path").attr("d", line([
                {x: rjx, y: rjy + CAFCSketchJRO + 15},
                {x: rjx, y: rjy + CAFCSketchJRO + 40}
            ])).classed("sketch", true).attr("transform", "rotate(" + -45 + ", " + rjx + " " + rjy + ")");
            svg.append("path").attr("d", line([
                {x: rjx + 0.707 * (CAFCSketchJRO + 40), y: rjy + 0.707 * (CAFCSketchJRO + 40)},
                {x: rjx + 0.707 * (CAFCSketchJRO + 40) + 50, y: rjy + 0.707 * (CAFCSketchJRO + 40)}
            ])).attr("id", "CAFCSketchDJO").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CAFCSketchDJO").attr("startOffset", "50%").text(djo);


        }

        currentTabIndex = cafcd2d3.tabs('getTabIndex', cafcd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            cafc2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#cafc").length > 0) {
                    cafc2d();
                }
            });
        }
        cafcd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    cafc2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#cafc").length > 0) {
                            cafc2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20582-2011 半圆管夹套椭圆(2:1)封头校核",
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
                    $(ed.target).combobox("loadData", CAFCJCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", CAFCJType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", CAFCJSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", CAFCJName);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", CAFCSCategory);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", CAFCSType);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", CAFCSSTD);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", CAFCSName);
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
                    cafcd2.empty();

                    // model
                    cafcd3.empty();

                    // sketch
                    currentTabIndex = cafcd2d3.tabs('getTabIndex', cafcd2d3.tabs('getSelected'));

                    // 初始化 Sketch
                    if (currentTabIndex === 0) {
                        cafc2d();
                        cafcd2.off("resize").on("resize", function () {
                            if ($("#cafc").length > 0) {
                                cafc2d();
                            }
                        });
                    }
                    cafcd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                cafc2d();
                                cafcd2.off("resize").on("resize", function () {
                                    if ($("#cafc").length > 0) {
                                        cafc2d();
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

                        CAFCDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CAFCJCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CAFCJType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        CAFCJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        CAFCJName = null;

                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CAFCSCategory = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CAFCSType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        CAFCSSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        CAFCSName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: CAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFCJCategory = [];
                                CAFCSCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + CAFCDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                } else {
                                    $(result).each(function (index, element) {
                                        CAFCJCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        CAFCSCategory[index] = {
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

                        CAFCJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CAFCJType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        CAFCJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        CAFCJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFCJCategoryVal,
                                temp: CAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFCJType = [];
                                $(result).each(function (index, element) {
                                    CAFCJType[index] = {
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

                        CAFCJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        CAFCJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        CAFCJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFCJCategoryVal,
                                type: CAFCJTypeVal,
                                temp: CAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFCJSTD = [];
                                $(result).each(function (index, element) {
                                    CAFCJSTD[index] = {
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

                        CAFCJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        CAFCJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFCJCategoryVal,
                                type: CAFCJTypeVal,
                                std: CAFCJSTDVal,
                                temp: CAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFCJName = [];
                                $(result).each(function (index, element) {
                                    CAFCJName[index] = {
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

                        CAFCSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CAFCSType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        CAFCSSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        CAFCSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFCSCategoryVal,
                                temp: CAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFCSType = [];
                                $(result).each(function (index, element) {
                                    CAFCSType[index] = {
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

                        CAFCSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        CAFCSSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        CAFCSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFCSCategoryVal,
                                type: CAFCSTypeVal,
                                temp: CAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFCSSTD = [];
                                $(result).each(function (index, element) {
                                    CAFCSSTD[index] = {
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

                        CAFCSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        CAFCSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFCSCategoryVal,
                                type: CAFCSTypeVal,
                                std: CAFCSSTDVal,
                                temp: CAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFCSName = [];
                                $(result).each(function (index, element) {
                                    CAFCSName[index] = {
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
                            let CAFCTestVal = rows[1][columns[0][1].field];

                            // 夹套设计压力
                            if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                                let CAFCPJD = parseFloat(rows[2][columns[0][1].field]);

                                // 夹套静压力
                                if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                                    let CAFCPJS = parseFloat(rows[3][columns[0][1].field]);

                                    // 夹套计算压力
                                    let CAFCPJC = CAFCPJD + CAFCPJS;

                                    // 夹套材料名称
                                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                        let CAFCJNameVal = rows[7][columns[0][1].field];

                                        // AJAX 获取夹套材料密度、最大最小厚度
                                        let CAFCJDensity, CAFCJThkMin, CAFCJThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_gbt_150_2011_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": CAFCJCategoryVal,
                                                "type": CAFCJTypeVal,
                                                "std": CAFCJSTDVal,
                                                "name": CAFCJNameVal,
                                                "temp": CAFCDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {
                                                CAFCJDensity = parseFloat(result.density);
                                                CAFCJThkMin = parseFloat(result.thkMin);
                                                CAFCJThkMax = parseFloat(result.thkMax);

                                                // 夹套外直径
                                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                                    let CAFCDJO = parseFloat(rows[8][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        cafc2d("ϕ" + CAFCDJO);
                                                        cafcd2.off("resize").on("resize", function () {
                                                            if ($("#cafc").length > 0) {
                                                                cafc2d("ϕ" + CAFCDJO);
                                                            }
                                                        });
                                                    }
                                                    cafcd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                cafc2d("ϕ" + CAFCDJO);
                                                                cafcd2.off("resize").on("resize", function () {
                                                                    if ($("#cafc").length > 0) {
                                                                        cafc2d("ϕ" + CAFCDJO);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 标准限制的壳体厚度
                                                    let shellThkMaximum;
                                                    if (CAFCDJO === 60) {
                                                        shellThkMaximum = 25.4;
                                                    }
                                                    else {
                                                        shellThkMaximum = 50.8;
                                                    }

                                                    // 夹套名义厚度
                                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > CAFCJThkMin
                                                        && parseFloat(rows[9][columns[0][1].field]) <= Math.min(CAFCDJO / 2, CAFCJThkMax)) {
                                                        let CAFCTHKJN = parseFloat(rows[9][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            cafc2d("ϕ" + CAFCDJO, CAFCTHKJN);
                                                            cafcd2.off("resize").on("resize", function () {
                                                                if ($("#cafc").length > 0) {
                                                                    cafc2d("ϕ" + CAFCDJO, CAFCTHKJN);
                                                                }
                                                            });
                                                        }
                                                        cafcd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    cafc2d("ϕ" + CAFCDJO, CAFCTHKJN);
                                                                    cafcd2.off("resize").on("resize", function () {
                                                                        if ($("#cafc").length > 0) {
                                                                            cafc2d("ϕ" + CAFCDJO, CAFCTHKJN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let CAFCDJI = CAFCDJO - 2 * CAFCTHKJN;

                                                        let CAFCJOT, CAFCJO, CAFCJOT1, CAFCJREL, CAFCCJ1;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_gbt_150_2011_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": CAFCJCategoryVal,
                                                                "type": CAFCJTypeVal,
                                                                "std": CAFCJSTDVal,
                                                                "name": CAFCJNameVal,
                                                                "thk": CAFCTHKJN,
                                                                "temp": CAFCDT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": CAFCDJO
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                CAFCJOT = parseFloat(result.ot);
                                                                if (CAFCJOT < 0) {
                                                                    south.html("查询盘管材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                CAFCJO = parseFloat(result.o);
                                                                if (CAFCJO < 0) {
                                                                    south.html("查询盘管材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                CAFCJREL = parseFloat(result.rel);
                                                                if (CAFCJREL < 0) {
                                                                    south.html("查询盘管材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                CAFCCJ1 = parseFloat(result.c1);
                                                                if (CAFCCJ1 < 0) {
                                                                    south.html("查询盘管材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                CAFCJOT1 = parseFloat(result.ot1);

                                                                // 夹套腐蚀裕量
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) < CAFCTHKJN) {
                                                                    let CAFCCJ2 = parseFloat(rows[10][columns[0][1].field]);

                                                                    // 夹套焊接接头系数
                                                                    let CAFCEJ = parseFloat(rows[11][columns[0][1].field]);

                                                                    // 夹套厚度附加量C
                                                                    let CAFCCJ = CAFCCJ1 + CAFCCJ2;

                                                                    // 夹套有效厚度
                                                                    let CAFCTHKJE = CAFCTHKJN - CAFCCJ;

                                                                    // 计算夹套内半径R
                                                                    let CAFCRJI = CAFCDJI / 2;

                                                                    // 夹套计算厚度
                                                                    let CAFCTHKJC = (CAFCPJC * CAFCRJI) / (CAFCEJ * CAFCJOT - 0.6 * CAFCPJC);

                                                                    // 设计厚度
                                                                    let CAFCTHKJD = CAFCTHKJC + CAFCCJ2;

                                                                    // 所需厚度提示信息
                                                                    south.html(
                                                                        "<span style='color:#444444;'>" +
                                                                        "夹套所需厚度：" + (CAFCTHKJD + CAFCCJ1).toFixed(2) + " mm" +
                                                                        "</span>");

                                                                    // 夹套厚度校核
                                                                    let CAFCTHKJCHK;
                                                                    if (CAFCTHKJN >= (CAFCTHKJD + CAFCCJ1).toFixed(2)) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "输入厚度：" + CAFCTHKJN + " mm" +
                                                                            "</span>");
                                                                        CAFCTHKJCHK = "合格";
                                                                    } else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "输入厚度：" + CAFCTHKJN + " mm" +
                                                                            "</span>");
                                                                        CAFCTHKJCHK = "不合格";
                                                                    }

                                                                    // 夹套试验压力
                                                                    let CAFCPJT;
                                                                    if (CAFCTestVal === "液压试验") {
                                                                        CAFCPJT = 1.25 * CAFCPJD * CAFCJO / Math.max(CAFCJOT, CAFCJOT1);
                                                                    }
                                                                    else if (CAFCTestVal === "气压试验") {
                                                                        CAFCPJT = 1.1 * CAFCPJD * CAFCJO / Math.max(CAFCJOT, CAFCJOT1);
                                                                    }
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "夹套试验压力：" + CAFCPJT.toFixed(4) + " MPa" +
                                                                        "</span>");

                                                                    // 环向应力限制的夹套 MAWPJJ
                                                                    let CAFCMAWPJJ = CAFCTHKJE * CAFCEJ * CAFCJOT / (CAFCRJI + 0.6 * CAFCTHKJE) - CAFCPJS;

                                                                    // 封头设计压力
                                                                    if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                                                        let CAFCPSD = parseFloat(rows[12][columns[0][1].field]);

                                                                        // 封头静压力
                                                                        if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                                                            let CAFCPSS = parseFloat(rows[13][columns[0][1].field]);

                                                                            // 封头计算压力
                                                                            let CAFCPSC = CAFCPSD + CAFCPSS;

                                                                            // 封头材料名称
                                                                            if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])) {
                                                                                let CAFCSNameVal = rows[17][columns[0][1].field];

                                                                                // AJAX 获取封头材料密度、最大最小厚度
                                                                                let CAFCSDensity, CAFCSThkMin,
                                                                                    CAFCSThkMax;
                                                                                $.ajax({
                                                                                    type: "POST",
                                                                                    contentType: "application/json; charset=utf-8",
                                                                                    url: "web_get_gbt_150_2011_index.action",
                                                                                    async: true,
                                                                                    dataType: "json",
                                                                                    data: JSON.stringify({
                                                                                        "category": CAFCSCategoryVal,
                                                                                        "type": CAFCSTypeVal,
                                                                                        "std": CAFCSSTDVal,
                                                                                        "name": CAFCSNameVal,
                                                                                        "temp": CAFCDT
                                                                                    }),
                                                                                    beforeSend: function () {
                                                                                    },
                                                                                    success: function (result) {

                                                                                        CAFCSDensity = parseFloat(result.density);
                                                                                        CAFCSThkMin = parseFloat(result.thkMin);
                                                                                        CAFCSThkMax = parseFloat(result.thkMax);

                                                                                        // 封头内直径
                                                                                        if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                            && parseFloat(rows[18][columns[0][1].field]) >= 762
                                                                                            && parseFloat(rows[18][columns[0][1].field]) <= 4318) {
                                                                                            let CAFCDSI = parseFloat(rows[18][columns[0][1].field]);

                                                                                            // 封头内半径
                                                                                            let CAFCRSI = CAFCDSI / 2;

                                                                                            // Sketch
                                                                                            if (currentTabIndex === 0) {
                                                                                                cafc2d("ϕ" + CAFCDJO, CAFCTHKJN, "ϕ" + CAFCDSI);
                                                                                                cafcd2.off("resize").on("resize", function () {
                                                                                                    if ($("#cafc").length > 0) {
                                                                                                        cafc2d("ϕ" + CAFCDJO, CAFCTHKJN, "ϕ" + CAFCDSI);
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                            cafcd2d3.tabs({
                                                                                                onSelect: function (title, index) {
                                                                                                    if (index === 0) {
                                                                                                        cafc2d("ϕ" + CAFCDJO, CAFCTHKJN, "ϕ" + CAFCDSI);
                                                                                                        cafcd2.off("resize").on("resize", function () {
                                                                                                            if ($("#cafc").length > 0) {
                                                                                                                cafc2d("ϕ" + CAFCDJO, CAFCTHKJN, "ϕ" + CAFCDSI);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                }
                                                                                            });

                                                                                            // 封头名义厚度
                                                                                            if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                                                                && parseFloat(rows[19][columns[0][1].field]) > Math.max(CAFCSThkMin, 4.8)
                                                                                                && parseFloat(rows[19][columns[0][1].field]) <= Math.min(CAFCSThkMax, shellThkMaximum)) {
                                                                                                let CAFCTHKSN = parseFloat(rows[19][columns[0][1].field]);

                                                                                                // Sketch
                                                                                                if (currentTabIndex === 0) {
                                                                                                    cafc2d("ϕ" + CAFCDJO, CAFCTHKJN, "ϕ" + CAFCDSI, CAFCTHKSN);
                                                                                                    cafcd2.off("resize").on("resize", function () {
                                                                                                        if ($("#cafc").length > 0) {
                                                                                                            cafc2d("ϕ" + CAFCDJO, CAFCTHKJN, "ϕ" + CAFCDSI, CAFCTHKSN);
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                                cafcd2d3.tabs({
                                                                                                    onSelect: function (title, index) {
                                                                                                        if (index === 0) {
                                                                                                            cafc2d("ϕ" + CAFCDJO, CAFCTHKJN, "ϕ" + CAFCDSI, CAFCTHKSN);
                                                                                                            cafcd2.off("resize").on("resize", function () {
                                                                                                                if ($("#cafc").length > 0) {
                                                                                                                    cafc2d("ϕ" + CAFCDJO, CAFCTHKJN, "ϕ" + CAFCDSI, CAFCTHKSN);
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                    }
                                                                                                });

                                                                                                let CAFCDSO = CAFCDSI + 2 * CAFCTHKSN;

                                                                                                let CAFCSOT, CAFCSO,
                                                                                                    CAFCSOT1, CAFCSREL,
                                                                                                    CAFCCS1;
                                                                                                $.ajax({
                                                                                                    type: "POST",
                                                                                                    contentType: "application/json; charset=utf-8",
                                                                                                    url: "web_get_gbt_150_2011_com_property.action",
                                                                                                    async: true,
                                                                                                    dataType: "json",
                                                                                                    data: JSON.stringify({
                                                                                                        "category": CAFCSCategoryVal,
                                                                                                        "type": CAFCSTypeVal,
                                                                                                        "std": CAFCSSTDVal,
                                                                                                        "name": CAFCSNameVal,
                                                                                                        "thk": CAFCTHKSN,
                                                                                                        "temp": CAFCDT,
                                                                                                        "highLow": 3,
                                                                                                        "isTube": 0,
                                                                                                        "od": CAFCDSO
                                                                                                    }),
                                                                                                    beforeSend: function () {
                                                                                                    },
                                                                                                    success: function (result) {

                                                                                                        CAFCSOT = parseFloat(result.ot);
                                                                                                        if (CAFCSOT < 0) {
                                                                                                            south.html("查询封头材料设计温度许用应力失败！").css("color", "red");
                                                                                                            return false;
                                                                                                        }
                                                                                                        CAFCSO = parseFloat(result.o);
                                                                                                        if (CAFCSO < 0) {
                                                                                                            south.html("查询封头材料常温许用应力失败！").css("color", "red");
                                                                                                            return false;
                                                                                                        }
                                                                                                        CAFCSREL = parseFloat(result.rel);
                                                                                                        if (CAFCSREL < 0) {
                                                                                                            south.html("查询封头材料常温屈服强度失败！").css("color", "red");
                                                                                                            return false;
                                                                                                        }
                                                                                                        CAFCCS1 = parseFloat(result.c1);
                                                                                                        if (CAFCCS1 < 0) {
                                                                                                            south.html("查询封头材料厚度负偏差失败！").css("color", "red");
                                                                                                            return false;
                                                                                                        }
                                                                                                        CAFCSOT1 = parseFloat(result.ot1);

                                                                                                        // 封头腐蚀裕量
                                                                                                        if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                                                            && parseFloat(rows[20][columns[0][1].field]) <= (CAFCTHKSN - 4.8 - CAFCCS1)) {
                                                                                                            let CAFCCS2 = parseFloat(rows[20][columns[0][1].field]);

                                                                                                            // 封头焊接接头系数
                                                                                                            let CAFCES = parseFloat(rows[21][columns[0][1].field]);

                                                                                                            // 封头厚度附加量C
                                                                                                            let CAFCCS = CAFCCS1 + CAFCCS2;

                                                                                                            // 封头有效厚度
                                                                                                            let CAFCTHKSE = CAFCTHKSN - CAFCCS;

                                                                                                            // 封头许用应力
                                                                                                            let CAFCO15 = 1.5 * CAFCSOT;

                                                                                                            // 内压轴向拉应力
                                                                                                            let CAFCOPie = CAFCPSC * CAFCRSI / (2 * CAFCTHKSE);

                                                                                                            // 获取应力系数
                                                                                                            let CAFCK;
                                                                                                            $.ajax({
                                                                                                                type: "POST",
                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                url: "hgt_20582_2011_table_3_2_get_k.action",
                                                                                                                async: true,
                                                                                                                dataType: "json",
                                                                                                                data: JSON.stringify({
                                                                                                                    "jacketDo": CAFCDJO,
                                                                                                                    "shellDi": CAFCDSI,
                                                                                                                    "shellThk": CAFCTHKSE,
                                                                                                                }),
                                                                                                                beforeSend: function () {
                                                                                                                },
                                                                                                                success: function (result) {
                                                                                                                    CAFCK = result;

                                                                                                                    // 夹套引起的轴向弯曲应力
                                                                                                                    let CAFCF = CAFCK * CAFCPJC;

                                                                                                                    // 计算总应力
                                                                                                                    let CAFCO = CAFCF + CAFCOPie;

                                                                                                                    // 封头限制的夹套MAWP
                                                                                                                    let m = CAFCPJC,
                                                                                                                        n = CAFCF + CAFCOPie;
                                                                                                                    for (; n <= CAFCO15; m += 0.0001) {
                                                                                                                        n = CAFCK * m + CAFCOPie;
                                                                                                                    }
                                                                                                                    let CAFCMAWPJS = m - 0.0001 - CAFCPJS;

                                                                                                                    let CAFCMAWPJ = Math.min(CAFCMAWPJJ, CAFCMAWPJS);
                                                                                                                    south.append(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                        "夹套MAWP：" + CAFCMAWPJ.toFixed(4) + " MPa" +
                                                                                                                        "</span>");

                                                                                                                    south.append(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                        "封头许用应力：" + CAFCO15.toFixed(2) + " MPa" +
                                                                                                                        "</span>");

                                                                                                                    // 封头应力校核
                                                                                                                    let CAFCOCHK;
                                                                                                                    if (CAFCO <= CAFCO15) {
                                                                                                                        south.append(
                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "封头实际应力：" + CAFCO.toFixed(2) + " MPa" +
                                                                                                                            "</span>");
                                                                                                                        CAFCOCHK = "合格";
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        south.append(
                                                                                                                            "<span style='color:red;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "封头实际应力：" + CAFCO.toFixed(2) + " MPa" +
                                                                                                                            "</span>");
                                                                                                                        CAFCOCHK = "不合格";
                                                                                                                    }

                                                                                                                    // 封头试验压力
                                                                                                                    let CAFCPST;
                                                                                                                    if (CAFCTestVal === "液压试验") {
                                                                                                                        CAFCPST = 1.25 * CAFCPSD * CAFCSO / Math.max(CAFCSOT, CAFCSOT1);
                                                                                                                    }
                                                                                                                    else if (CAFCTestVal === "气压试验") {
                                                                                                                        CAFCPST = 1.10 * CAFCPSD * CAFCSO / Math.max(CAFCSOT, CAFCSOT1);
                                                                                                                    }

                                                                                                                    south.append(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                        "封头试验压力：" + CAFCPST.toFixed(4) + " MPa" +
                                                                                                                        "</span>");

                                                                                                                    // 封头受环向应力限制的 MAWPSS
                                                                                                                    let CAFCMAWPSS = 2 * CAFCTHKSE * CAFCSOT * CAFCES / (CAFCDSI + 0.5 * CAFCTHKSE) - CAFCPSS;

                                                                                                                    // 封头受夹套限制的 MAWPSJ
                                                                                                                    let i = CAFCPSC,
                                                                                                                        j = CAFCF + CAFCOPie;
                                                                                                                    for (; j <= CAFCO15; i += 0.0001) {
                                                                                                                        j = CAFCF + i * CAFCRSI / (2 * CAFCTHKSE);
                                                                                                                    }
                                                                                                                    let CAFCMAWPSJ = i - 0.0001 - CAFCPSS;
                                                                                                                    let CAFCMAWPS = Math.min(CAFCMAWPSS, CAFCMAWPSJ);
                                                                                                                    south.append(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                        "封头MAWP：" + CAFCMAWPS.toFixed(4) + " MPa" +
                                                                                                                        "</span>");

                                                                                                                    // docx
                                                                                                                    let CAFCPayJS = $('#payjs');

                                                                                                                    function getDocx() {
                                                                                                                        $.ajax({
                                                                                                                            type: "POST",
                                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                                            url: "cafcdocx.action",
                                                                                                                            async: true,
                                                                                                                            dataType: "json",
                                                                                                                            data: JSON.stringify({
                                                                                                                                ribbonName: "CAFC",
                                                                                                                                t: CAFCDT,
                                                                                                                                psd: CAFCPSD,
                                                                                                                                pss: CAFCPSS,
                                                                                                                                sstd: CAFCSSTDVal,
                                                                                                                                sname: CAFCSNameVal,
                                                                                                                                dsi: CAFCDSI,
                                                                                                                                thksn: CAFCTHKSN,
                                                                                                                                cs2: CAFCCS2,
                                                                                                                                es: CAFCES,
                                                                                                                                pjd: CAFCPJD,
                                                                                                                                pjs: CAFCPJS,
                                                                                                                                jstd: CAFCJSTDVal,
                                                                                                                                jname: CAFCJNameVal,
                                                                                                                                djo: CAFCDJO,
                                                                                                                                thkjn: CAFCTHKJN,
                                                                                                                                cj2: CAFCCJ2,
                                                                                                                                ej: CAFCEJ,
                                                                                                                                test: CAFCTestVal,
                                                                                                                                densityj: CAFCJDensity.toFixed(4),
                                                                                                                                densitys: CAFCSDensity.toFixed(4),
                                                                                                                                ojt: CAFCJOT.toFixed(4),
                                                                                                                                ost: CAFCSOT.toFixed(4),
                                                                                                                                oj: CAFCJO.toFixed(4),
                                                                                                                                os: CAFCSO.toFixed(4),
                                                                                                                                rjrel: CAFCJREL.toFixed(4),
                                                                                                                                rsrel: CAFCSREL.toFixed(4),
                                                                                                                                ojt1: CAFCJOT1.toFixed(4),
                                                                                                                                ost1: CAFCSOT1.toFixed(4),
                                                                                                                                cj1: CAFCCJ1.toFixed(4),
                                                                                                                                cs1: CAFCCS1.toFixed(4),
                                                                                                                                psc: CAFCPSC.toFixed(4),
                                                                                                                                pjc: CAFCPJC.toFixed(4),
                                                                                                                                cj: CAFCCJ.toFixed(4),
                                                                                                                                thkje: CAFCTHKJE.toFixed(4),
                                                                                                                                rji: CAFCRJI.toFixed(4),
                                                                                                                                thkjc: CAFCTHKJC.toFixed(4),
                                                                                                                                thkjd: CAFCTHKJD.toFixed(4),
                                                                                                                                thkjchk: CAFCTHKJCHK,
                                                                                                                                cs: CAFCCS.toFixed(4),
                                                                                                                                thkse: CAFCTHKSE.toFixed(4),
                                                                                                                                rsi: CAFCRSI.toFixed(4),
                                                                                                                                opie: CAFCOPie.toFixed(4),
                                                                                                                                k: CAFCK.toFixed(4),
                                                                                                                                f: CAFCF.toFixed(4),
                                                                                                                                o: CAFCO.toFixed(4),
                                                                                                                                o15: CAFCO15.toFixed(4),
                                                                                                                                ochk: CAFCOCHK,
                                                                                                                                pjt: CAFCPJT.toFixed(4),
                                                                                                                                pst: CAFCPST.toFixed(4),
                                                                                                                                mawpjj: CAFCMAWPJJ.toFixed(4),
                                                                                                                                mawpjs: CAFCMAWPJS.toFixed(4),
                                                                                                                                mawpj: CAFCMAWPJ.toFixed(4),
                                                                                                                                mawpss: CAFCMAWPSS.toFixed(4),
                                                                                                                                mawpsj: CAFCMAWPSJ.toFixed(4),
                                                                                                                                mawps: CAFCMAWPS.toFixed(4)
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
                                                                                                                                    CAFCPayJS.dialog({
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
                                                                                                                                                CAFCPayJS.dialog("close");
                                                                                                                                                CAFCPayJS.dialog("clear");
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
                                                                                                                                                            CAFCPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                    CAFCPayJS.dialog('close');
                                                                                                                                                                    CAFCPayJS.dialog('clear');
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
                                                                                                            && parseFloat(rows[20][columns[0][1].field]) > (CAFCTHKSN - 4.8 - CAFCCS1)) {
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
                                                                                                && parseFloat(rows[19][columns[0][1].field]) <= Math.max(CAFCSThkMin, 4.8)) {
                                                                                                south.html("封头名义厚度不能小于等于 " + Math.max(CAFCSThkMin, 4.8) + " mm").css("color", "red");
                                                                                            }
                                                                                            else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                                                                && parseFloat(rows[19][columns[0][1].field]) > Math.min(CAFCSThkMax, shellThkMaximum)) {
                                                                                                south.html("封头名义厚度不能大于 " + Math.min(CAFCSThkMax, shellThkMaximum) + " mm").css("color", "red");
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
                                                                    && parseFloat(rows[10][columns[0][1].field]) >= CAFCTHKJN) {
                                                                    south.html("夹套腐蚀裕量不能大于等于 " + CAFCTHKJN + " mm").css("color", "red");
                                                                }
                                                            },
                                                            error: function () {
                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                            }
                                                        });
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) <= CAFCJThkMin) {
                                                        south.html("夹套名义厚度不能小于等于 " + CAFCJThkMin + " mm").css("color", "red");
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > Math.min(CAFCDJO / 2, CAFCJThkMax)) {
                                                        south.html("夹套名义厚度不能大于 " + Math.min(CAFCDJO / 2, CAFCJThkMax) + " mm").css("color", "red");
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