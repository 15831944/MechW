$(document).ready(function () {

    // 计算书变量
    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    // 模型变量
    let asmprt = $("#ASMPRT");
    let asmprttext = $("#ASMPRTTEXT");

    // 2D 3D 变量
    let daad2 = $("#d2");
    let daad3 = $("#d3");
    let daad2d3 = $('#d2d3');

    $("#cal").html("<table id='daa'></table>");
    let pg = $("#daa");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/d/a/a/DAA.json", function (result) {

        let DAADT,
            DAAName, DAANameVal, DAAForm, DAAFormVal,
            columns, rows, ed;

        function daa2d(idod, di = "I.D.", dout = "O.D.", thkn = "tn", l = "L") {

            daad2.empty();

            let width = daad2.width();
            let height = daad2.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "DAASVG").attr("height", height);

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
            let padding = 80;
            let thk = 10;

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
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%").text(text);

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

            // 轮廓及中心线
            svg.append("path").attr("d", line([
                {x: padding, y: padding},
                {x: width - padding, y: padding},
                {x: width - padding, y: height - padding},
                {x: padding, y: height - padding},
                {x: padding, y: padding}
            ])).classed("sketch", true);
            drawLine(padding, padding + thk, width - padding, padding + thk);
            drawLine(padding, height - padding - thk, width - padding, height - padding - thk);
            drawCenterLine(padding - 10, height / 2, width - padding + 10, height / 2);

            // idod
            if (idod === "内径") {
                dimLeftV(padding, height - padding - thk, padding, padding + thk, di, "DAASketchDI");
            }
            else if (idod === "外径") {
                dimLeftV(padding, height - padding, padding, padding, dout, "DAASketchDOUT");
            }

            // thkn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: padding},
                    {x: width / 2 + 2, y: padding - 15},
                    {x: width / 2 - 2, y: padding - 15},
                    {x: width / 2, y: padding}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: padding + thk},
                    {x: width / 2 + 2, y: padding + thk + 15},
                    {x: width / 2 - 2, y: padding + thk + 15},
                    {x: width / 2, y: padding + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: width / 2, y: padding - 15 - 10},
                {x: width / 2, y: padding + thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: width / 2, y: padding + thk + 15 + 40},
                {x: width / 2, y: padding + thk + 15}
            ])).attr("id", "DAASketchTHKN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#DAASketchTHKN").attr("startOffset", "50%").text(thkn);

            // L
            dimBottomH(padding, height - padding, width - padding, height - padding, l, "DAASketchL");
        }

        currentTabIndex = daad2d3.tabs('getTabIndex', daad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            daa2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#daa").length > 0) {
                    daa2d();
                }
            });
        }
        daad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    daa2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#daa").length > 0) {
                            daa2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "ASME VIII.1-2017 内压圆筒强度计算",
            data: result,
            showHeader: false,
            showGroup: true,
            scrollbarSize: 0,
            autoRowHeight: true,
            columns: [[
                {
                    field: "name",
                    title: "Name",
                    width: 173,
                    resizable: true,
                    sortable: false,
                    align: "left"
                },
                {
                    field: 'value',
                    title: 'Value',
                    width: 150,
                    resizable: false,
                    sortable: false,
                    align: "center",
                    styler: function () {
                        return "color:#222222;";
                    }
                }
            ]],
            rowStyler: function (index) {

                if (index === 14) {
                    pg.propertygrid('options').finder.getTr(this, index).hide();
                }
            },
            onClickRow: function (index) {

                if (index !== lastIndex) {
                    pg.datagrid('endEdit', lastIndex);
                }

                pg.propertygrid('beginEdit', index);
                ed = pg.propertygrid("getEditor", {index: index, field: "value"});

                if (index === 10) {
                    $(ed.target).combobox("loadData", DAAName);

                    $(ed.target).combobox({
                        filter: function (q, row) {
                            let opts = $(this).combobox("options");

                            // 头位置匹配
                            //return row[opts.textField].indexOf(q)==0;

                            // 任意匹配
                            return row[opts.textField].indexOf(q) > -1;
                        }
                    });
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", DAAForm);
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
                        onSelect: function () {
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

                    asmprt.addClass("l-btn-disabled").off("click").attr("href", null);
                    asmprttext.html("下载模型");

                    // sketch & model
                    daad2.empty();
                    daad3.empty();

                    // sketch
                    currentTabIndex = daad2d3.tabs('getTabIndex', daad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        daa2d();
                        daad2.off("resize").on("resize", function () {
                            if ($("#daa").length > 0) {
                                daa2d();
                            }
                        });
                    }
                    daad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                daa2d();
                                daad2.off("resize").on("resize", function () {
                                    if ($("#daa").length > 0) {
                                        daa2d();
                                    }
                                });
                            }
                        }
                    });

                    // alert
                    south.empty();

                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    // t → name form
                    if (index === 2) {

                        DAADT = parseFloat(changes.value);

                        // name form
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        DAAName = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        DAAForm = null;

                        // Name List
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_asme_viii_1_2017_material_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: DAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                DAAName = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "<span style='color:red;'>&ensp;" + DAADT + "</span>" +
                                        "<span style='color:red;'>&ensp;°C</span>" +
                                        "<span style='color:red;'>&ensp;下没有可用材料</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        DAAName[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                    });
                                }
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;获取材料名称失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // name → form
                    if (index === 10) {

                        DAANameVal = changes.value;

                        // form
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        DAAForm = null;

                        // Form list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_asme_viii_1_2017_product_form.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: DAADT,
                                materialName: DAANameVal
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                DAAForm = [];
                                $(result).each(function (index, element) {
                                    DAAForm[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;获取材料形式失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // UI：DI DOUT
                    if (index === 12) {
                        if (rows[12][columns[0][1].field] === "内径") {
                            pg.datagrid('options').finder.getTr(this, 13).show();
                            pg.datagrid('options').finder.getTr(this, 14).hide();
                        }
                        else if (rows[12][columns[0][1].field] === "外径") {
                            pg.datagrid('options').finder.getTr(this, 13).hide();
                            pg.datagrid('options').finder.getTr(this, 14).show();
                        }
                        else {
                            return false;
                        }
                    }

                    let DAAPD;
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        DAAPD = parseFloat(rows[0][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let DAAPS;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        DAAPS = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let DAAMDMT;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        DAAMDMT = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let DAATest;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        DAATest = rows[4][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    let DAAPTS;
                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                        DAAPTS = parseFloat(rows[5][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let DAACI;
                    if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                        DAACI = parseFloat(rows[6][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let DAACE;
                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                        DAACE = parseFloat(rows[7][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let DAAEL;
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        DAAEL = parseFloat(rows[8][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let DAAEC;
                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                        DAAEC = parseFloat(rows[9][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // FormVal
                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                        DAAFormVal = rows[11][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    let DAADensity,
                        DAAThkMin, DAAThkMax, DAAODMin, DAAODMax,
                        DAAProductForm = "/", DAANominalComposition,
                        DAAPNo = "/", DAAGroupNo = "/",
                        DAACSLowAlloy, DAAUCS66Curve;

                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_asme_viii_1_2017_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "temp": DAADT,
                            "materialName": DAANameVal,
                            "productForm": DAAFormVal
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            DAADensity = parseFloat(result.density);

                            DAAThkMin = parseFloat(result.thkMin);
                            DAAThkMax = parseFloat(result.thkMax);
                            DAAODMin = parseFloat(result.odMin);
                            DAAODMax = parseFloat(result.odMax);

                            DAAProductForm = result.productForm;
                            DAANominalComposition = result.nominalComposition;

                            // P-No groupNo
                            DAAPNo = result.pNo;
                            DAAGroupNo = result.groupNo;

                            // 材料是否是碳钢和低合金钢
                            DAACSLowAlloy = result.csLowAlloy;

                            // UCS-66 曲线值
                            DAAUCS66Curve = result.ucs66Curve;

                            let DAAIDOD;
                            if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                DAAIDOD = rows[12][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                daa2d(DAAIDOD);
                                daad2.off("resize").on("resize", function () {
                                    if ($("#daa").length > 0) {
                                        daa2d(DAAIDOD);
                                    }
                                });
                            }
                            daad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        daa2d(DAAIDOD);
                                        daad2.off("resize").on("resize", function () {
                                            if ($("#daa").length > 0) {
                                                daa2d(DAAIDOD);
                                            }
                                        });
                                    }
                                }
                            });

                            let DAADI = -1, DAADO = -1;
                            if (DAAIDOD === "内径") {

                                if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                    DAADI = parseFloat(rows[13][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }
                            }
                            else if (DAAIDOD === "外径") {

                                if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                    DAADO = parseFloat(rows[14][columns[0][1].field]);
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
                                daa2d(DAAIDOD, "I.D. " + DAADI, "O.D. " + DAADO);
                                daad2.off("resize").on("resize", function () {
                                    if ($("#daa").length > 0) {
                                        daa2d(DAAIDOD, "I.D. " + DAADI, "O.D. " + DAADO);
                                    }
                                });
                            }
                            daad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        daa2d(DAAIDOD, "I.D. " + DAADI, "O.D. " + DAADO);
                                        daad2.off("resize").on("resize", function () {
                                            if ($("#daa").length > 0) {
                                                daa2d(DAAIDOD, "I.D. " + DAADI, "O.D. " + DAADO);
                                            }
                                        });
                                    }
                                }
                            });

                            let DAATHKN;
                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                && parseFloat(rows[15][columns[0][1].field]) > Math.max(DAACI + DAACE, DAAThkMin)
                                && parseFloat(rows[15][columns[0][1].field]) <= DAAThkMax) {
                                DAATHKN = parseFloat(rows[15][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                && parseFloat(rows[15][columns[0][1].field]) <= Math.max(DAACI + DAACE, DAAThkMin)) {
                                south.html("材料名义厚度应当位于如下区间：[" + Math.max(DAACI + DAACE, DAAThkMin) + "mm, " + Math.max(DAACI + DAACE, DAAThkMin) + "mm]").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                && parseFloat(rows[15][columns[0][1].field]) > DAAThkMax) {
                                south.html("材料名义厚度应当位于如下区间：[" + Math.max(DAACI + DAACE, DAAThkMin) + "mm, " + Math.max(DAACI + DAACE, DAAThkMin) + "mm]").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // ID & OD
                            if (DAAIDOD === "内径") {
                                DAADO = DAADI + 2 * DAATHKN;
                            }
                            else if (DAAIDOD === "外径") {
                                DAADI = DAADO - 2 * DAATHKN;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                daa2d(DAAIDOD, "I.D. " + DAADI, "O.D. " + DAADO, DAATHKN);
                                daad2.off("resize").on("resize", function () {
                                    if ($("#daa").length > 0) {
                                        daa2d(DAAIDOD, "I.D. " + DAADI, "O.D. " + DAADO, DAATHKN);
                                    }
                                });
                            }
                            daad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        daa2d(DAAIDOD, "I.D. " + DAADI, "O.D. " + DAADO, DAATHKN);
                                        daad2.off("resize").on("resize", function () {
                                            if ($("#daa").length > 0) {
                                                daa2d(DAAIDOD, "I.D. " + DAADI, "O.D. " + DAADO, DAATHKN);
                                            }
                                        });
                                    }
                                }
                            });

                            // OD CHK
                            if (DAADO < DAAODMin || DAADO > DAAODMax) {
                                south.html("圆筒外直径应当位于如下区间：[" + DAAODMin + "mm, " + DAAODMax + "mm]").css("color", "red");
                                return false;
                            }

                            let DAAS, DAASA, DAASY;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_query_asme_viii_1_2017_stress.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "temp": DAADT,
                                    "materialName": DAANameVal,
                                    "productForm": DAAFormVal,
                                    "thk": DAATHKN,
                                    "od": DAADO,
                                    "highLow": 3
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    // S
                                    DAAS = parseFloat(result.designStress);
                                    if (DAAS < 0) {
                                        south.html("获取材料设计许用应力失败，清检查网络后重试").css("color", "red");
                                        return false;
                                    }

                                    // SA
                                    DAASA = parseFloat(result.ambientStress);
                                    if (DAASA < 0) {
                                        south.html("获取材料常温许用应力失败，清检查网络后重试").css("color", "red");
                                        return false;
                                    }

                                    // SY
                                    DAASY = parseFloat(result.rel);
                                    if (DAASY < 0) {
                                        south.html("获取材料常温屈服点失败，请检查网络后重试").css("color", "red");
                                        return false;
                                    }

                                    let DAATHKF;
                                    if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                        && parseFloat(rows[16][columns[0][1].field]) <= DAATHKN) {
                                        DAATHKF = parseFloat(rows[16][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                        && parseFloat(rows[16][columns[0][1].field]) > DAATHKN) {
                                        south.html("最小成形厚度应当 <=" + DAATHKN + "mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    let DAAL;
                                    if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])) {
                                        DAAL = parseFloat(rows[17][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Intermediate Parameters
                                    let DAAPC = DAAPD + DAAPS;
                                    let DAAC = DAACI + DAACE;
                                    let DAATHKE = DAATHKF - DAAC;

                                    let DAARI = DAADI / 2;
                                    let DAARO = DAADO / 2;

                                    let DAADIC = DAADI + 2 * DAACI;
                                    let DAADOC = DAADO - 2 * DAACE;
                                    let DAARIC = DAADIC / 2;
                                    let DAAROC = DAADOC / 2;

                                    // Strength Calculation
                                    let DAATRC, DAATRL;
                                    if (DAAIDOD === "内径") {
                                        DAATRC = DAAPC * DAARIC / (DAAS * DAAEC - 0.6 * DAAPC) + DAAC;
                                        DAATRL = DAAPC * DAARIC / (2 * DAAS * DAAEL + 0.4 * DAAPC) + DAAC;
                                    }
                                    else if (DAAIDOD === "外径") {
                                        DAATRC = DAAPC * DAAROC / (DAAS * DAAEC + 0.4 * DAAPC) + DAAC;
                                        DAATRL = DAAPC * DAARIC / (2 * DAAS * DAAEL + 0.4 * DAAPC) + DAAC;
                                    }
                                    else {
                                        return false;
                                    }

                                    let DAATR = Math.max(DAATRC, DAATRL);
                                    south.html(
                                        "<span style='color:#444444;'>" +
                                        "所需最小成形厚度:&ensp;" + DAATR.toFixed(2) + " mm" +
                                        "</span>");

                                    let DAATHKCHK;
                                    if (DAATHKF >= DAATR.toFixed(2)) {
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "输入最小成形厚度:&ensp;" + DAATHKF + " mm" +
                                            "</span>");
                                        DAATHKCHK = "Pass";
                                    }
                                    else {
                                        south.append(
                                            "<span style='color:red;'>" +
                                            "&ensp;|&ensp;" +
                                            "输入最小成形厚度:&ensp;" + DAATHKF + " mm" +
                                            "</span>");
                                        DAATHKCHK = "Failed";
                                    }

                                    let DAASACT;
                                    if (DAAIDOD === "内径") {
                                        DAASACT = DAAPC * (DAARIC + 0.6 * DAATHKE) / (DAAEC * DAATHKE);
                                    }
                                    else if (DAAIDOD === "外径") {
                                        DAASACT = DAAPC * (DAAROC - 0.4 * DAATHKE) / (DAAEC * DAATHKE);
                                    }
                                    else {

                                    }

                                    // MAWP
                                    let DAAMAWP;
                                    if (DAAIDOD === "内径") {
                                        DAAMAWP = DAAS * DAAEC * DAATHKE / (DAARIC + 0.6 * DAATHKE) - DAAPS;
                                    }
                                    else if (DAAIDOD === "外径") {
                                        DAAMAWP = DAAS * DAAEC * DAATHKE / (DAAROC - 0.4 * DAATHKE) - DAAPS;
                                    }
                                    else {
                                        return false;
                                    }
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "MAWP:&ensp;" + DAAMAWP.toFixed(4) + " MPa" +
                                        "</span>");

                                    // MAPNC
                                    let DAAMAPNC;
                                    if (DAAIDOD === "内径") {
                                        DAAMAPNC = DAASA * DAAEC * DAATHKF / (DAARI + 0.6 * DAATHKF);
                                    }
                                    else if (DAAIDOD === "外径") {
                                        DAAMAPNC = DAASA * DAAEC * DAATHKF / (DAARO - 0.4 * DAATHKF);
                                    }
                                    else {
                                        return false;
                                    }
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "MAPnc:&ensp;" + DAAMAPNC.toFixed(4) + " MPa" +
                                        "</span>");

                                    // Pressure Test
                                    let DAAETA;
                                    if (DAATest === "液压试验") {
                                        DAAETA = 1.3;
                                    }
                                    else if (DAATest === "气压试验") {
                                        DAAETA = 1.1;
                                    }
                                    else {
                                        return false;
                                    }

                                    let DAAPT = DAAETA * DAAMAWP * DAASA / DAAS;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "压力试验:&ensp;" + DAATest + "/" + DAAPT.toFixed(4) + " MPa" +
                                        "</span>");

                                    let DAAPTC = DAAPT + DAAPTS;

                                    let DAAZETA;
                                    if (DAATest === "液压试验") {
                                        DAAZETA = 0.9;
                                    }
                                    else if (DAATest === "气压试验") {
                                        DAAZETA = 0.8;
                                    }
                                    else {
                                        return false;
                                    }

                                    let DAASALLTEST = DAAZETA * DAASY;

                                    let DAASACTTESTNEW;
                                    if (DAAIDOD === "内径") {
                                        DAASACTTESTNEW = DAAPTC * (DAARI + 0.6 * DAATHKF) / (DAAEC * DAATHKF);
                                    }
                                    else if (DAAIDOD === "外径") {
                                        DAASACTTESTNEW = DAAPTC * (DAARO - 0.4 * DAATHKF) / (DAAEC * DAATHKF);
                                    }
                                    else {
                                        return false;
                                    }
                                    let DAASACTTESTNEWCHK;
                                    if (DAASACTTESTNEW <= DAASALLTEST) {
                                        DAASACTTESTNEWCHK = "Pass";
                                    }
                                    else {
                                        DAASACTTESTNEWCHK = "Failed";
                                    }

                                    let DAASACTTESTCOD;
                                    if (DAAIDOD === "内径") {
                                        DAASACTTESTCOD = DAAPTC * (DAARIC + 0.6 * DAATHKE) / (DAAEC * DAATHKE);
                                    }
                                    else if (DAAIDOD === "外径") {
                                        DAASACTTESTCOD = DAAPTC * (DAAROC - 0.4 * DAATHKE) / (DAAEC * DAATHKE);
                                    }
                                    else {
                                        return false;
                                    }
                                    let DAASACTTESTCODCHK;
                                    if (DAASACTTESTCOD <= DAASALLTEST) {
                                        DAASACTTESTCODCHK = "Pass";
                                    }
                                    else {
                                        DAASACTTESTCODCHK = "Failed";
                                    }

                                    /*
                                    需要进行 MDMT 计算
                                     */
                                    let DAATG = DAATHKF, DAAUG20Exemption = false;
                                    if (DAACSLowAlloy === "Y") {

                                        // UG-20 豁免判断
                                        if (DAADT <= 345
                                            && DAADT >= -29
                                            && DAAPNo === "1"
                                            && (DAAGroupNo === "1" || DAAGroupNo === "2")
                                            && ((DAAUCS66Curve === "A" && DAATG <= 13)
                                                || (DAAUCS66Curve === "B" && DAATG <= 25)
                                                || (DAAUCS66Curve === "C" && DAATG <= 25)
                                                || (DAAUCS66Curve === "D" && DAATG <= 25))) {

                                            DAAUG20Exemption = true;
                                        }
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "UG-20(f)冲击豁免:&ensp;" + (DAAUG20Exemption ? "是" : "否") +
                                            "</span>");
                                    }

                                    // Forming Strains
                                    let DAARF = -1.0, DAARORG = -1.0, DAAEpsilonF = -1.0;
                                    if (DAAProductForm.indexOf("Plate") !== -1
                                        || DAAProductForm.indexOf("Sheet") !== -1
                                        || DAAProductForm.indexOf("Strip") !== -1) {
                                        DAARF = DAARI + DAATHKF / 2;
                                        DAARORG = "Infinity";
                                        DAAEpsilonF = 50 * DAATHKN / DAARF;
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "成形变形率:&ensp;" + DAAEpsilonF.toFixed(2) + "%" +
                                            "</span>");
                                    }

                                    // Part Properties
                                    let DAAAON = Math.PI * DAADO * DAAL / 1000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "外表面积:&ensp;" + DAAAON.toFixed(4) + "&ensp;m²" +
                                        "</span>");

                                    let DAAAIN = Math.PI * DAADI * DAAL / 1000000;
                                    let DAAVON = Math.PI * DAADO * DAADO * DAAL / 4 / 1000000000;
                                    let DAAVIN = Math.PI * DAADI * DAADI * DAAL / 4 / 1000000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "内容积:&ensp;" + DAAVIN.toFixed(4) + "&ensp;m³" +
                                        "</span>");

                                    let DAAWN = DAADensity * (DAAVON - DAAVIN);
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "重量:&ensp;" + DAAWN.toFixed(4) + "&ensp;kg" +
                                        "</span>");

                                    let DAAAOC = Math.PI * DAADOC * DAAL / 1000000;
                                    let DAAAIC = Math.PI * DAADIC * DAAL / 1000000;
                                    let DAAVOC = Math.PI * DAADOC * DAADOC * DAAL / 4 / 1000000000;
                                    let DAAVIC = Math.PI * DAADIC * DAADIC * DAAL / 4 / 1000000000;
                                    let DAAWC = DAADensity * (DAAVOC - DAAVIC);

                                    // docx
                                    let DAAPayJS = $('#payjs');
                                    let DAATestEN = DAATest === "气压试验" ? "Pneumatic" : "Hydrostatic";
                                    let DAAIDODEN = DAAIDOD === "内径" ? "ID" : "OD";

                                    function getDocx() {
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "daadocx.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                ribbonName: "DAA",

                                                idod: DAAIDODEN,

                                                pd: DAAPD,
                                                ps: DAAPS,
                                                pts: DAAPTS,
                                                t: DAADT,

                                                name: DAANameVal,
                                                form: DAAFormVal,

                                                ci: DAACI,
                                                ce: DAACE,
                                                el: DAAEL,
                                                ec: DAAEC,

                                                di: DAADI,
                                                l: DAAL,
                                                tn: DAATHKN,
                                                tf: DAATHKF,

                                                test: DAATestEN,

                                                density: DAADensity.toFixed(4),
                                                sy: DAASY.toFixed(4),
                                                s: DAAS.toFixed(4),
                                                sa: DAASA.toFixed(4),

                                                pc: DAAPC.toFixed(4),
                                                c: DAAC.toFixed(4),
                                                te: DAATHKE.toFixed(4),

                                                dout: DAADO.toFixed(4),
                                                ri: DAARI.toFixed(4),
                                                ro: DAARO.toFixed(4),

                                                dic: DAADIC.toFixed(4),
                                                doc: DAADOC.toFixed(4),
                                                ric: DAARIC.toFixed(4),
                                                roc: DAAROC.toFixed(4),

                                                trc: DAATRC.toFixed(4),
                                                trl: DAATRL.toFixed(4),
                                                tr: DAATR.toFixed(4),
                                                tchk: DAATHKCHK,
                                                sact: DAASACT.toFixed(4),

                                                mawp: DAAMAWP.toFixed(4),
                                                mapnc: DAAMAPNC.toFixed(4),

                                                eta: DAAETA.toFixed(4),
                                                pt: DAAPT.toFixed(4),
                                                ptc: DAAPTC.toFixed(4),
                                                zeta: DAAZETA.toFixed(4),

                                                salltest: DAASALLTEST.toFixed(4),
                                                sacttestnew: DAASACTTESTNEW.toFixed(4),
                                                sacttestnewchk: DAASACTTESTNEWCHK,

                                                sacttestcod: DAASACTTESTCOD.toFixed(4),
                                                sacttestcodchk: DAASACTTESTCODCHK,

                                                rf: DAARF.toFixed(4),
                                                rorg: DAARORG,
                                                ef: DAAEpsilonF.toFixed(4),

                                                aon: DAAAON.toFixed(4),
                                                vin: DAAVIN.toFixed(4),
                                                ain: DAAAIN.toFixed(4),
                                                wn: DAAWN.toFixed(4),

                                                aoc: DAAAOC.toFixed(4),
                                                vic: DAAVIC.toFixed(4),
                                                aic: DAAAIC.toFixed(4),
                                                wc: DAAWC.toFixed(4),

                                                pNo: DAAPNo,
                                                groupNo: DAAGroupNo
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
                                                    DAAPayJS.dialog({
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
                                                                DAAPayJS.dialog("close");
                                                                DAAPayJS.dialog("clear");
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
                                                                            DAAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                            // 倒计时计数器
                                                                            let maxTime = 4, timer;

                                                                            function CountDown() {
                                                                                if (maxTime >= 0) {
                                                                                    $("#payjs_timer").html(maxTime);
                                                                                    --maxTime;
                                                                                } else {

                                                                                    clearInterval(timer);
                                                                                    // 关闭并清空收银台
                                                                                    DAAPayJS.dialog('close');
                                                                                    DAAPayJS.dialog('clear');
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
                                        "<span style='color:red;'>&ensp;筒体材料力学特性获取失败，请检查网络后重试</span>");
                                }
                            });
                        },
                        error: function () {
                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                "<span style='color:red;'>&ensp;筒体材料性质获取失败，请检查网络后重试</span>");
                        }
                    });
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
                pg.propertygrid('options').finder.getTr(this, 14).hide();
            }
        });
    });
});