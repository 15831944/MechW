$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let zbbSketch = $("#d2");
    let zbbModel = $("#d3");
    let zbbd2d3 = $('#d2d3');

    $("#cal").html("<table id='zbb'></table>");
    let pg = $("#zbb");

    let south = $("#south");
    let currentTabIndex = null;

    $.getJSON("/static/west/cal/z/b/b/ZBB.json", function (result) {

        let columns, rows;

        function zbb2d(bd = "ϕD", sd = "ϕd") {

            zbbSketch.empty();

            let width = zbbSketch.width();
            let height = zbbSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "ZBBSVG").attr("height", height);

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

            // 底部水平标注
            function dimBottomH(startX, startY, endX, endY, text) {

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
                ])).attr("id", "AAEBSketchDI").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#AAEBSketchDI").attr("startOffset", "50%").text(text);

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
            let padding = 80;

            let wg = (width - 2 * padding) / 2;
            let hg = (height - 2 * padding) / 2;
            let r = Math.min(wg, hg);
            let cx = width / 2;
            let cy = height / 2;

            svg.append("path").attr("d", "M "
                + cx + " " + (cy + 2) + " "
                + "A" + 2 + " " + 2 + " "
                + "1 0 1" + " "
                + cx + " " + (cy - 2)
            ).classed("arrow sketch", true);
            svg.append("path").attr("d", "M "
                + cx + " " + (cy - 2) + " "
                + "A" + 2 + " " + 2 + " "
                + "1 0 1" + " "
                + cx + " " + (cy + 2)
            ).classed("arrow sketch", true);

            svg.append("path").attr("d", "M "
                + cx + " " + (cy + r) + " "
                + "A" + r + " " + r + " "
                + "1 0 1" + " "
                + cx + " " + (cy - r)
            ).classed("sketch", true);
            svg.append("path").attr("d", "M "
                + cx + " " + (cy - r) + " "
                + "A" + r + " " + r + " "
                + "1 0 1" + " "
                + cx + " " + (cy + r)
            ).classed("sketch", true);

            svg.append("path").attr("d", "M "
                + cx + " " + (cy + r - r / 4) + " "
                + "A" + (r - r / 4) + " " + (r - r / 4) + " "
                + "1 0 1" + " "
                + cx + " " + (cy - r + r / 4)
            ).classed("sketch", true);
            svg.append("path").attr("d", "M "
                + cx + " " + (cy - r + r / 4) + " "
                + "A" + (r - r / 4) + " " + (r - r / 4) + " "
                + "1 0 1" + " "
                + cx + " " + (cy + r - r / 4)
            ).classed("sketch", true);

            drawCenterLine(cx, cy - r - 10, cx, cy + r + 10);
            drawCenterLine(cx - r - 10, cy, cx + r + 10, cy);

            svg.append("path").attr("d", line([
                {x: cx - r - 10 - 30, y: cy},
                {x: cx - r - 10, y: cy}
            ])).attr("id", "ZBBSketchX1");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", 0).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBBSketchX1").attr("startOffset", "50%").text("x");

            svg.append("path").attr("d", line([
                {x: cx + r + 10, y: cy},
                {x: cx + r + 10 + 30, y: cy}
            ])).attr("id", "ZBBSketchX2");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", 0).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBBSketchX2").attr("startOffset", "50%").text("x");

            svg.append("path").attr("d", line([
                {x: cx - 15, y: cy - r - 10 - 15},
                {x: cx + 15, y: cy - r - 10 - 15}
            ])).attr("id", "ZBBSketchY1");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", 0).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBBSketchY1").attr("startOffset", "50%").text("y");

            svg.append("path").attr("d", line([
                {x: cx - 15, y: cy + r + 10 + 20},
                {x: cx + 15, y: cy + r + 10 + 20}
            ])).attr("id", "ZBBSketchY2");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", 0).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBBSketchY2").attr("startOffset", "50%").text("y");

            svg.append("path").attr("d", line([
                {x: cx - 15, y: cy - 5},
                {x: cx, y: cy - 5}
            ])).attr("id", "ZBBSketchS");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", 0).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBBSketchS").attr("startOffset", "50%").text("S");

            // BD
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx + r, y: cy},
                    {x: cx + r + 15, y: cy - 3},
                    {x: cx + r + 15, y: cy + 3},
                    {x: cx + r, y: cy}
                ])).attr("transform", "rotate(" + -45 + ", " + cx + " " + cy + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx + r, y: cy},
                    {x: cx + r + 15 + 30, y: cy}
                ])).attr("transform", "rotate(" + -45 + ", " + cx + " " + cy + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx + 0.707 * (r + 15 + 30), y: cy - 0.707 * (r + 15 + 30)},
                    {x: cx + 0.707 * (r + 15 + 30) + 40, y: cy - 0.707 * (r + 15 + 30)}
                ])).classed("sketch", true).attr("id", "ZBBSketchBD");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBBSketchBD")
                .attr("startOffset", "50%").text(bd);

            // SD
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx + r - r / 4, y: cy},
                    {x: cx + r - r / 4 + 15, y: cy - 3},
                    {x: cx + r - r / 4 + 15, y: cy + 3},
                    {x: cx + r - r / 4, y: cy}
                ])).attr("transform", "rotate(" + -225 + ", " + cx + " " + cy + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx + r - r / 4, y: cy},
                    {x: cx + r + 15 + 30, y: cy}
                ])).attr("transform", "rotate(" + -225 + ", " + cx + " " + cy + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx - 0.707 * (r + 15 + 30) - 40, y: cy + 0.707 * (r + 15 + 30)},
                    {x: cx - 0.707 * (r + 15 + 30), y: cy + 0.707 * (r + 15 + 30)}
                ])).classed("sketch", true).attr("id", "ZBBSketchSD");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBBSketchSD")
                .attr("startOffset", "50%").text(sd);

        }

        currentTabIndex = zbbd2d3.tabs('getTabIndex', zbbd2d3.tabs('getSelected'));

        // init Sketch
        if (currentTabIndex === 0) {
            zbb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#zbb").length > 0) {
                    zbb2d();
                }
            });
        }
        zbbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    zbb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#zbb").length > 0) {
                            zbb2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "截面力学特性计算",
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
                    zbbSketch.empty();
                    zbbModel.empty();

                    // sketch
                    currentTabIndex = zbbd2d3.tabs('getTabIndex', zbbd2d3.tabs('getSelected'));

                    // 初始化 Sketch
                    if (currentTabIndex === 0) {
                        zbb2d();
                        zbbSketch.off("resize").on("resize", function () {
                            if ($("#zbb").length > 0) {
                                zbb2d();
                            }
                        });
                    }
                    zbbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                zbb2d();
                                zbbSketch.off("resize").on("resize", function () {
                                    if ($("#zbb").length > 0) {
                                        zbb2d();
                                    }
                                });
                            }
                        }
                    });

                    // alert
                    south.empty();

                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    // bd
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        let ZBBBD = parseFloat(rows[0][columns[0][1].field]);

                        // Sketch
                        if (currentTabIndex === 0) {
                            zbb2d("Φ" + ZBBBD);
                            zbbSketch.off("resize").on("resize", function () {
                                if ($("#zbb").length > 0) {
                                    zbb2d("Φ" + ZBBBD);
                                }
                            });
                        }
                        zbbd2d3.tabs({
                            onSelect: function (title, index) {
                                if (index === 0) {
                                    zbb2d("Φ" + ZBBBD);
                                    zbbSketch.off("resize").on("resize", function () {
                                        if ($("#zbb").length > 0) {
                                            zbb2d("Φ" + ZBBBD);
                                        }
                                    });
                                }
                            }
                        });

                        // sd
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])
                            && parseFloat(rows[1][columns[0][1].field]) < ZBBBD) {
                            let ZBBSD = parseFloat(rows[1][columns[0][1].field]);

                            // Sketch
                            if (currentTabIndex === 0) {
                                zbb2d("Φ" + ZBBBD, "Φ" + ZBBSD);
                                zbbSketch.off("resize").on("resize", function () {
                                    if ($("#zbb").length > 0) {
                                        zbb2d("Φ" + ZBBBD, "Φ" + ZBBSD);
                                    }
                                });
                            }
                            zbbd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        zbb2d("Φ" + ZBBBD, "Φ" + ZBBSD);
                                        zbbSketch.off("resize").on("resize", function () {
                                            if ($("#zbb").length > 0) {
                                                zbb2d("Φ" + ZBBBD, "Φ" + ZBBSD);
                                            }
                                        });
                                    }
                                }
                            });

                            let ZBBA = Math.PI * (ZBBBD * ZBBBD - ZBBSD * ZBBSD) / 4;
                            south.html(
                                "<span style='color:#444444;'>" +
                                "截面积 A = " + ZBBA.toFixed(4) + " mm²" +
                                "</span>");

                            let ZBBEX = ZBBBD / 2;
                            south.append(
                                "<span style='color:#444444;'>" +
                                "&ensp;|&ensp;" +
                                "重心 S 的 x 轴外边距离 e<sub>x</sub> = " + ZBBEX.toFixed(4) + " mm" +
                                "</span>");

                            let ZBBIX = Math.PI * (Math.pow(ZBBBD, 4) - Math.pow(ZBBSD, 4)) / 64;
                            south.append(
                                "<span style='color:#444444;'>" +
                                "&ensp;|&ensp;" +
                                "x 轴惯性矩 I<sub>x</sub> = " + ZBBIX.toFixed(4) + " mm⁴" +
                                "</span>");

                            let ZBBWX = ZBBIX / ZBBEX;
                            south.append(
                                "<span style='color:#444444;'>" +
                                "&ensp;|&ensp;" +
                                "x 轴抗弯截面系数 W<sub>x</sub> = " + ZBBWX.toFixed(4) + " mm³" +
                                "</span>");

                            let ZBBRX = Math.sqrt(ZBBIX / ZBBA);
                            south.append(
                                "<span style='color:#444444;'>" +
                                "&ensp;|&ensp;" +
                                "x 轴惯性半径 r<sub>x</sub> = " + ZBBRX.toFixed(4) + " mm" +
                                "</span>");

                            let ZBBEY = ZBBBD / 2;
                            south.append(
                                "<span style='color:#444444;'>" +
                                "&ensp;|&ensp;" +
                                "重心 S 的 y 轴外边距离 e<sub>y</sub> = " + ZBBEY.toFixed(4) + " mm" +
                                "</span>");

                            let ZBBIY = Math.PI * (Math.pow(ZBBBD, 4) - Math.pow(ZBBSD, 4)) / 64;
                            south.append(
                                "<span style='color:#444444;'>" +
                                "&ensp;|&ensp;" +
                                "y 轴惯性矩 I<sub>y</sub> = " + ZBBIY.toFixed(4) + " mm⁴" +
                                "</span>");

                            let ZBBWY = ZBBIY / ZBBEY;
                            south.append(
                                "<span style='color:#444444;'>" +
                                "&ensp;|&ensp;" +
                                "y 轴抗弯截面系数 W<sub>y</sub> = " + ZBBWY.toFixed(4) + " mm³" +
                                "</span>");

                            let ZBBRY = Math.sqrt(ZBBIY / ZBBA);
                            south.append(
                                "<span style='color:#444444;'>" +
                                "&ensp;|&ensp;" +
                                "y 轴惯性半径 r<sub>y</sub> = " + ZBBRY.toFixed(4) + " mm" +
                                "</span>");

                            let ZBBIZ = Math.PI * (Math.pow(ZBBBD, 4) - Math.pow(ZBBSD, 4)) / 32;
                            south.append(
                                "<span style='color:#444444;'>" +
                                "&ensp;|&ensp;" +
                                "抗扭惯性矩 I<sub>z</sub> = " + ZBBIZ.toFixed(4) + " mm⁴" +
                                "</span>");

                            let ZBBWZ = Math.PI * (Math.pow(ZBBBD, 4) - Math.pow(ZBBSD, 4)) / ZBBBD / 16;
                            south.append(
                                "<span style='color:#444444;'>" +
                                "&ensp;|&ensp;" +
                                "抗扭截面系数 W<sub>z</sub> = " + ZBBWZ.toFixed(4) + " mm³" +
                                "</span>");

                            // docx
                            let ZBBPayJS = $('#payjs');

                            function getDocx() {
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "zbbdocx.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        ribbonName: "ZBB",

                                        bd: ZBBBD,
                                        sd: ZBBSD,
                                        a: ZBBA.toFixed(4),
                                        ex: ZBBEX.toFixed(4),
                                        ix: ZBBIX.toFixed(4),
                                        wx: ZBBWX.toFixed(4),
                                        rx: ZBBRX.toFixed(4),
                                        ey: ZBBEY.toFixed(4),
                                        iy: ZBBIY.toFixed(4),
                                        wy: ZBBWY.toFixed(4),
                                        ry: ZBBRY.toFixed(4),
                                        iz: ZBBIZ.toFixed(4),
                                        wz: ZBBWZ.toFixed(4)
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
                                            ZBBPayJS.dialog({
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
                                                        ZBBPayJS.dialog("close");
                                                        ZBBPayJS.dialog("clear");
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
                                                                    ZBBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                    // 倒计时计数器
                                                                    let maxTime = 4, timer;

                                                                    function CountDown() {
                                                                        if (maxTime >= 0) {
                                                                            $("#payjs_timer").html(maxTime);
                                                                            --maxTime;
                                                                        } else {

                                                                            clearInterval(timer);
                                                                            // 关闭并清空收银台
                                                                            ZBBPayJS.dialog('close');
                                                                            ZBBPayJS.dialog('clear');
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
                        else if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])
                            && parseFloat(rows[1][columns[0][1].field]) >= ZBBBD) {
                            south.html("内直径 d 不能大于等于 " + ZBBBD + " mm").css("color", "red");
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