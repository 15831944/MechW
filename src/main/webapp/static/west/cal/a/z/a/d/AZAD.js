$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let azadSketch = $("#d2");
    let azadModel = $("#d3");
    let azadd2d3 = $('#d2d3');

    $("#cal").html("<table id='azad'></table>");
    let pg = $("#azad");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/z/a/d/AZAD.json", function (result) {

        let columns, rows;
        let AZADType = -1, AZADInsulation = -1, AZADDO = -1, AZADQ = -1,
            AZADL = -1,
            AZADA75 = -1,
            AZADH1 = -1,
            AZADCover = -1,
            AZADF = -1,
            AZADTHK = -1, AZADLAMUDA = -1, AZADT = -1,
            AZADAR = -1, AZADWS = -1,
            AZADFire = -1;

        function azad2d() {

            azadSketch.empty();

            let width = azadSketch.width();
            let height = azadSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "AZADSVG").attr("height", height);

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

            // 图形边距
            let padding = 40;
            let hg = (height - 2 * padding) / 4;
            let wg = (width - 2 * padding) / 4;

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
                        {x: startX + 10, y: startY - 28},
                        {x: startX + 10, y: startY - 32},
                        {x: startX, y: startY - 30}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX, y: endY - 30},
                        {x: endX - 10, y: endY - 28},
                        {x: endX - 10, y: endY - 32},
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
                        {x: startX + 10, y: startY + 28},
                        {x: startX + 10, y: startY + 32},
                        {x: startX, y: startY + 30}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX, y: endY + 30},
                        {x: endX - 10, y: endY + 28},
                        {x: endX - 10, y: endY + 32},
                        {x: endX, y: endY + 30}
                    ]));
                svg.append("path").attr("d", line([
                    {x: startX, y: startY + 30},
                    {x: endX, y: endY + 30}
                ])).attr("id", id).classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%")
                    .text(text);

            }

            // 左侧垂直标注
            function dimLeftV(startX, startY, endX, endY, text, id) {

                extLineLeftH(startX, startY);
                extLineLeftH(endX, endY);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: startX - 30, y: startY},
                        {x: startX - 28, y: startY - 10},
                        {x: startX - 32, y: startY - 10},
                        {x: startX - 30, y: startY}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX - 30, y: endY},
                        {x: endX - 28, y: endY + 10},
                        {x: endX - 32, y: endY + 10},
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
                        {x: startX + 28, y: startY - 10},
                        {x: startX + 32, y: startY - 10},
                        {x: startX + 30, y: startY}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX + 30, y: endY},
                        {x: endX + 28, y: endY + 10},
                        {x: endX + 32, y: endY + 10},
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

            // 卧式容器
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg, y: padding + 0.5 * hg},
                {x: padding + 1.5 * wg, y: padding + 0.5 * hg},
                {x: padding + 1.5 * wg, y: padding + 1.5 * hg},
                {x: padding + 0.5 * wg, y: padding + 1.5 * hg},
                {x: padding + 0.5 * wg, y: padding + 0.5 * hg}
            ])).classed("sketch", true);
            drawArc(hg / 4, hg / 2, padding + 0.5 * wg, padding + 1.5 * hg, padding + 0.5 * wg, padding + 0.5 * hg);
            drawArc(hg / 4, hg / 2, padding + 1.5 * wg, padding + 0.5 * hg, padding + 1.5 * wg, padding + 1.5 * hg);
            drawCenterLine(padding + 0.5 * wg - hg / 4 - 10, padding + hg, padding + 1.5 * wg + hg / 4 + 10, padding + hg);

            // 球罐
            let r = Math.min(hg, wg);
            let cx0 = padding + wg;
            let cy0 = padding + 3 * hg;
            drawArc(r, r, cx0, cy0 + r, cx0, cy0 - r);
            drawArc(r, r, cx0, cy0 - r, cx0, cy0 + r);
            drawCenterLine(cx0, cy0 - r - 10, cx0, cy0 + r + 10);
            drawCenterLine(cx0 - r - 10, cy0, cx0 + r + 10, cy0);
            // 支腿
            drawLine(cx0 - r, padding + 3 * hg, cx0 - r, padding + 4 * hg);
            drawLine(cx0 + r, padding + 3 * hg, cx0 + r, padding + 4 * hg);
            drawLine(cx0 + r - 10, padding + 4 * hg, cx0 + r + 10, padding + 4 * hg);
            drawLine(cx0 - r - 10, padding + 4 * hg, cx0 - r + 10, padding + 4 * hg);

            // 立式容器
            svg.append("path").attr("d", line([
                {x: padding + 2.5 * wg, y: padding + hg},
                {x: padding + 3.5 * wg, y: padding + hg},
                {x: padding + 3.5 * wg, y: padding + 3 * hg},
                {x: padding + 2.5 * wg, y: padding + 3 * hg},
                {x: padding + 2.5 * wg, y: padding + hg}
            ])).classed("sketch", true);
            drawArc(wg / 2, wg / 4, padding + 2.5 * wg, padding + hg, padding + 3.5 * wg, padding + hg);
            drawArc(wg / 2, wg / 4, padding + 3.5 * wg, padding + 3 * hg, padding + 2.5 * wg, padding + 3 * hg);
            drawCenterLine(padding + 3 * wg, padding + hg - wg / 4 - 10, padding + 3 * wg, padding + 3 * hg + wg / 4 + 10);
            // 支腿
            drawLine(padding + 2.5 * wg, padding + 3 * hg, padding + 2.5 * wg, padding + 4 * hg);
            drawLine(padding + 3.5 * wg, padding + 3 * hg, padding + 3.5 * wg, padding + 4 * hg);
            drawLine(padding + 3.5 * wg - 10, padding + 4 * hg, padding + 3.5 * wg + 10, padding + 4 * hg);
            drawLine(padding + 2.5 * wg - 10, padding + 4 * hg, padding + 2.5 * wg + 10, padding + 4 * hg);
        }

        currentTabIndex = azadd2d3.tabs('getTabIndex', azadd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            azad2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#azad").length > 0) {
                    azad2d();
                }
            });
        }
        azadd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    azad2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#azad").length > 0) {
                            azad2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 非易爆液化气体容器安全泄放量计算",
            data: result,
            showHeader: false,
            showGroup: true,
            scrollbarSize: 0,
            autoRowHeight: true,
            columns: [[
                {
                    field: "name",
                    title: "名称",
                    width: 190,
                    resizable: true,
                    sortable: false,
                    align: "left"
                },
                {
                    field: 'value',
                    title: '值',
                    width: 133,
                    resizable: false,
                    sortable: false,
                    align: "center",
                    styler: function () {
                        return "color:#222222;";
                    }
                }
            ]],
            rowStyler: function (index) {
                if (index === 4 || index === 5 || index === 6
                    || index === 7
                    || index === 8 || index === 9 || index === 10) {
                    pg.propertygrid('options').finder.getTr(this, index).hide();
                }
            },
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
                    azadSketch.empty();
                    azadModel.empty();

                    // sketch
                    currentTabIndex = azadd2d3.tabs('getTabIndex', azadd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        azad2d();
                        $("#d2").off("resize").on("resize", function () {
                            if ($("#azad").length > 0) {
                                azad2d();
                            }
                        });
                    }
                    azadd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                azad2d();
                                $("#d2").off("resize").on("resize", function () {
                                    if ($("#azad").length > 0) {
                                        azad2d();
                                    }
                                });
                            }
                        }
                    });

                    south.empty();
                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    // Type
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        AZADType = rows[0][columns[0][1].field];
                        if (AZADType === "卧式容器(半球封头)") {
                            pg.propertygrid('options').finder.getTr(this, 4).show();
                            pg.propertygrid('options').finder.getTr(this, 5).hide();
                            pg.propertygrid('options').finder.getTr(this, 6).hide();
                        }
                        else if (AZADType === "卧式容器(椭圆封头)") {
                            pg.propertygrid('options').finder.getTr(this, 4).show();
                            pg.propertygrid('options').finder.getTr(this, 5).hide();
                            pg.propertygrid('options').finder.getTr(this, 6).hide();
                        }
                        else if (AZADType === "球形容器") {
                            pg.propertygrid('options').finder.getTr(this, 4).hide();
                            pg.propertygrid('options').finder.getTr(this, 5).hide();
                            pg.propertygrid('options').finder.getTr(this, 6).show();
                        }
                        else if (AZADType === "立式容器") {
                            pg.propertygrid('options').finder.getTr(this, 4).hide();
                            pg.propertygrid('options').finder.getTr(this, 5).show();
                            pg.propertygrid('options').finder.getTr(this, 6).hide();
                        }
                    }
                    else {
                        return false;
                    }

                    // Insulation
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        AZADInsulation = rows[1][columns[0][1].field];
                        if (AZADInsulation === "有") {
                            pg.propertygrid('options').finder.getTr(this, 7).hide();
                            pg.propertygrid('options').finder.getTr(this, 8).show();
                            pg.propertygrid('options').finder.getTr(this, 9).show();
                            pg.propertygrid('options').finder.getTr(this, 10).show();
                        }
                        else if (AZADInsulation === "无") {
                            pg.propertygrid('options').finder.getTr(this, 7).show();
                            pg.propertygrid('options').finder.getTr(this, 8).hide();
                            pg.propertygrid('options').finder.getTr(this, 9).hide();
                            pg.propertygrid('options').finder.getTr(this, 10).hide();
                        }
                    }
                    else {
                        return false;
                    }

                    // do
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        AZADDO = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // q
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        AZADQ = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    if (AZADType === "卧式容器(半球封头)") {

                        // L
                        if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                            AZADL = parseFloat(rows[4][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        if (AZADInsulation === "有") {

                            // THK
                            if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                AZADTHK = parseFloat(rows[8][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // LAMUDA
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                AZADLAMUDA = parseFloat(rows[9][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // T
                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                AZADT = parseFloat(rows[10][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // Fire
                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                AZADFire = rows[11][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            if (AZADFire === "是") {

                                AZADAR = 3.14 * AZADDO * AZADL;
                                AZADWS = (2.61 * (650 - AZADT) * AZADLAMUDA * Math.pow(AZADAR, 0.82)) / (AZADTHK * AZADQ);
                                south.html(
                                    "<span style='color:#444444;'>" +
                                    "容器的安全泄放量：" + AZADWS.toFixed(2) + " kg/h" +
                                    "</span>");
                            }
                            else if (AZADFire === "否") {
                                AZADAR = 3.14 * AZADDO * AZADL;
                                AZADWS = 0.3 * (2.61 * (650 - AZADT) * AZADLAMUDA * Math.pow(AZADAR, 0.82)) / (AZADTHK * AZADQ);
                                south.html(
                                    "<span style='color:#444444;'>" +
                                    "容器的安全泄放量：" + AZADWS.toFixed(2) + " kg/h" +
                                    "</span>");
                            }
                            else {
                                return false;
                            }
                        }
                        else if (AZADInsulation === "无") {

                            // Cover
                            if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                AZADCover = rows[7][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            if (AZADCover === "地面上") {
                                AZADF = 1.0;
                            }
                            else if (AZADCover === "地面以下砂土覆盖") {
                                AZADF = 0.3;
                            }
                            else if (AZADCover === "喷淋装置>10L/(m²·min)") {
                                AZADF = 0.6;
                            }
                            else {
                                return false;
                            }

                            // Fire
                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                AZADFire = rows[11][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            if (AZADFire === "是") {

                                AZADAR = 3.14 * AZADDO * AZADL;
                                AZADWS = 2.55 * 100000 * AZADF * Math.pow(AZADAR, 0.82) / AZADQ;
                                south.html(
                                    "<span style='color:#444444;'>" +
                                    "容器的安全泄放量：" + AZADWS.toFixed(2) + " kg/h" +
                                    "</span>");
                            }
                            else if (AZADFire === "否") {
                                AZADAR = 3.14 * AZADDO * AZADL;
                                AZADWS = 0.3 * 2.55 * 100000 * AZADF * Math.pow(AZADAR, 0.82) / AZADQ;
                                south.html(
                                    "<span style='color:#444444;'>" +
                                    "容器的安全泄放量：" + AZADWS.toFixed(2) + " kg/h" +
                                    "</span>");
                            }
                            else {
                                return false;
                            }
                        }
                        else {
                            return false;
                        }
                    }
                    else if (AZADType === "卧式容器(椭圆封头)") {

                        // L
                        if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                            AZADL = parseFloat(rows[4][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        if (AZADInsulation === "有") {

                            // THK
                            if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                AZADTHK = parseFloat(rows[8][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // LAMUDA
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                AZADLAMUDA = parseFloat(rows[9][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // T
                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                AZADT = parseFloat(rows[10][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // Fire
                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                AZADFire = rows[11][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            if (AZADFire === "是") {
                                AZADAR = 3.14 * AZADDO * (AZADL + 0.3 * AZADDO);
                                AZADWS = (2.61 * (650 - AZADT) * AZADLAMUDA * Math.pow(AZADAR, 0.82)) / (AZADTHK * AZADQ);
                                south.html(
                                    "<span style='color:#444444;'>" +
                                    "容器的安全泄放量：" + AZADWS.toFixed(2) + " kg/h" +
                                    "</span>");
                            }
                            else if (AZADFire === "否") {
                                AZADAR = 3.14 * AZADDO * (AZADL + 0.3 * AZADDO);
                                AZADWS = 0.3 * (2.61 * (650 - AZADT) * AZADLAMUDA * Math.pow(AZADAR, 0.82)) / (AZADTHK * AZADQ);
                                south.html(
                                    "<span style='color:#444444;'>" +
                                    "容器的安全泄放量：" + AZADWS.toFixed(2) + " kg/h" +
                                    "</span>");
                            }
                            else {
                                return false;
                            }
                        }
                        else if (AZADInsulation === "无") {

                            // Cover
                            if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                AZADCover = rows[7][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            if (AZADCover === "地面上") {
                                AZADF = 1.0;
                            }
                            else if (AZADCover === "地面以下砂土覆盖") {
                                AZADF = 0.3;
                            }
                            else if (AZADCover === "喷淋装置>10L/(m²·min)") {
                                AZADF = 0.6;
                            }
                            else {
                                return false;
                            }

                            // Fire
                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                AZADFire = rows[11][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            if (AZADFire === "是") {

                                AZADAR = 3.14 * AZADDO * (AZADL + 0.3 * AZADDO);
                                AZADWS = 2.55 * 100000 * AZADF * Math.pow(AZADAR, 0.82) / AZADQ;
                                south.html(
                                    "<span style='color:#444444;'>" +
                                    "容器的安全泄放量：" + AZADWS.toFixed(2) + " kg/h" +
                                    "</span>");
                            }
                            else if (AZADFire === "否") {

                                AZADAR = 3.14 * AZADDO * (AZADL + 0.3 * AZADDO);
                                AZADWS = 0.3 * 2.55 * 100000 * AZADF * Math.pow(AZADAR, 0.82) / AZADQ;
                                south.html(
                                    "<span style='color:#444444;'>" +
                                    "容器的安全泄放量：" + AZADWS.toFixed(2) + " kg/h" +
                                    "</span>");
                            }
                            else {
                                return false;
                            }
                        }
                        else {
                            return false;
                        }
                    }
                    else if (AZADType === "球形容器") {

                        // A75
                        if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                            AZADA75 = parseFloat(rows[6][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        if (AZADInsulation === "有") {

                            // THK
                            if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                AZADTHK = parseFloat(rows[8][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // LAMUDA
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                AZADLAMUDA = parseFloat(rows[9][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // T
                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                AZADT = parseFloat(rows[10][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // Fire
                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                AZADFire = rows[11][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            if (AZADFire === "是") {

                                AZADAR = Math.max(AZADA75, 1.57 * AZADDO * AZADDO);
                                AZADWS = (2.61 * (650 - AZADT) * AZADLAMUDA * Math.pow(AZADAR, 0.82)) / (AZADTHK * AZADQ);
                                south.html(
                                    "<span style='color:#444444;'>" +
                                    "容器的安全泄放量：" + AZADWS.toFixed(2) + " kg/h" +
                                    "</span>");
                            }
                            else if (AZADFire === "否") {

                                AZADAR = Math.max(AZADA75, 1.57 * AZADDO * AZADDO);
                                AZADWS = 0.3 * (2.61 * (650 - AZADT) * AZADLAMUDA * Math.pow(AZADAR, 0.82)) / (AZADTHK * AZADQ);
                                south.html(
                                    "<span style='color:#444444;'>" +
                                    "容器的安全泄放量：" + AZADWS.toFixed(2) + " kg/h" +
                                    "</span>");
                            }
                            else {
                                return false;
                            }
                        }
                        else if (AZADInsulation === "无") {

                            // Cover
                            if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                AZADCover = rows[7][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            if (AZADCover === "地面上") {
                                AZADF = 1.0;
                            }
                            else if (AZADCover === "地面以下砂土覆盖") {
                                AZADF = 0.3;
                            }
                            else if (AZADCover === "喷淋装置>10L/(m²·min)") {
                                AZADF = 0.6;
                            }
                            else {
                                return false;
                            }

                            // Fire
                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                AZADFire = rows[11][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            if (AZADFire === "是") {

                                AZADAR = Math.max(AZADA75, 1.57 * AZADDO * AZADDO);
                                AZADWS = 2.55 * 100000 * AZADF * Math.pow(AZADAR, 0.82) / AZADQ;
                                south.html(
                                    "<span style='color:#444444;'>" +
                                    "容器的安全泄放量：" + AZADWS.toFixed(2) + " kg/h" +
                                    "</span>");
                            }
                            else if (AZADFire === "否") {

                                AZADAR = Math.max(AZADA75, 1.57 * AZADDO * AZADDO);
                                AZADWS = 0.3 * 2.55 * 100000 * AZADF * Math.pow(AZADAR, 0.82) / AZADQ;
                                south.html(
                                    "<span style='color:#444444;'>" +
                                    "容器的安全泄放量：" + AZADWS.toFixed(2) + " kg/h" +
                                    "</span>");
                            }
                            else {
                                return false;
                            }
                        }
                        else {
                            return false;
                        }
                    }
                    else if (AZADType === "立式容器") {

                        // H1
                        if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                            AZADH1 = parseFloat(rows[5][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        if (AZADInsulation === "有") {

                            // THK
                            if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                AZADTHK = parseFloat(rows[8][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // LAMUDA
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                AZADLAMUDA = parseFloat(rows[9][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // T
                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                AZADT = parseFloat(rows[10][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // Fire
                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                AZADFire = rows[11][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            if (AZADFire === "是") {

                                AZADAR = 3.14 * AZADDO * AZADH1;
                                AZADWS = (2.61 * (650 - AZADT) * AZADLAMUDA * Math.pow(AZADAR, 0.82)) / (AZADTHK * AZADQ);
                                south.html(
                                    "<span style='color:#444444;'>" +
                                    "容器的安全泄放量：" + AZADWS.toFixed(2) + " kg/h" +
                                    "</span>");
                            }
                            else if (AZADFire === "否") {
                                AZADAR = 3.14 * AZADDO * AZADH1;
                                AZADWS = 0.3 * (2.61 * (650 - AZADT) * AZADLAMUDA * Math.pow(AZADAR, 0.82)) / (AZADTHK * AZADQ);
                                south.html(
                                    "<span style='color:#444444;'>" +
                                    "容器的安全泄放量：" + AZADWS.toFixed(2) + " kg/h" +
                                    "</span>");
                            }
                            else {
                                return false;
                            }

                        }
                        else if (AZADInsulation === "无") {

                            // Cover
                            if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                AZADCover = rows[7][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            if (AZADCover === "地面上") {
                                AZADF = 1.0;
                            }
                            else if (AZADCover === "地面以下砂土覆盖") {
                                AZADF = 0.3;
                            }
                            else if (AZADCover === "喷淋装置>10L/(m²·min)") {
                                AZADF = 0.6;
                            }
                            else {
                                return false;
                            }

                            // Fire
                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                AZADFire = rows[11][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            if (AZADFire === "是") {

                                AZADAR = 3.14 * AZADDO * AZADH1;
                                AZADWS = 2.55 * 100000 * AZADF * Math.pow(AZADAR, 0.82) / AZADQ;
                                south.html(
                                    "<span style='color:#444444;'>" +
                                    "容器的安全泄放量：" + AZADWS.toFixed(2) + " kg/h" +
                                    "</span>");
                            }
                            else if (AZADFire === "否") {
                                AZADAR = 3.14 * AZADDO * AZADH1;
                                AZADWS = 0.3 * 2.55 * 100000 * AZADF * Math.pow(AZADAR, 0.82) / AZADQ;
                                south.html(
                                    "<span style='color:#444444;'>" +
                                    "容器的安全泄放量：" + AZADWS.toFixed(2) + " kg/h" +
                                    "</span>");
                            }
                            else {
                                return false;
                            }

                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        return false;
                    }

                    // docx
                    let AZADPayJS = $('#payjs');

                    function getDocx() {
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "azaddocx.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                ribbonName: "AZAD",

                                type: AZADType,
                                l: AZADL,
                                dout: AZADDO,
                                isInsulation: AZADInsulation,
                                cover: AZADCover,
                                q: AZADQ,
                                f: AZADF,
                                ar: AZADAR.toFixed(2),
                                ws: AZADWS.toFixed(2),
                                a75: AZADA75,
                                h1: AZADH1,
                                thk: AZADTHK,
                                lamuda: AZADLAMUDA,
                                t: AZADT,
                                fire: AZADFire
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
                                    AZADPayJS.dialog({
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
                                                AZADPayJS.dialog("close");
                                                AZADPayJS.dialog("clear");
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
                                                            AZADPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                            // 倒计时计数器
                                                            let maxTime = 4, timer;

                                                            function CountDown() {
                                                                if (maxTime >= 0) {
                                                                    $("#payjs_timer").html(maxTime);
                                                                    --maxTime;
                                                                } else {

                                                                    clearInterval(timer);
                                                                    // 关闭并清空收银台
                                                                    AZADPayJS.dialog('close');
                                                                    AZADPayJS.dialog('clear');
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
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
                pg.propertygrid('options').finder.getTr(this, 4).hide();
                pg.propertygrid('options').finder.getTr(this, 5).hide();
                pg.propertygrid('options').finder.getTr(this, 6).hide();
                pg.propertygrid('options').finder.getTr(this, 7).hide();
                pg.propertygrid('options').finder.getTr(this, 8).hide();
                pg.propertygrid('options').finder.getTr(this, 9).hide();
                pg.propertygrid('options').finder.getTr(this, 10).hide();
            }
        });
    });
});