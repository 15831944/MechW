$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let xcdSketch = $("#d2");
    let xcdModel = $("#d3");
    let xcdd2d3 = $('#d2d3');

    $("#cal").html("<table id='xcd'></table>");
    let pg = $("#xcd");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/x/c/d/XCD.json", function (result) {

        let XCDDT = 20,
            XCDCategory, XCDCategoryVal, XCDType, XCDTypeVal, XCDSTD, XCDSTDVal, XCDName,
            columns, rows, ed;

        function xcd2d(dout = "ϕDo", thkn = "δn", l = "L") {

            xcdSketch.empty();

            let width = xcdSketch.width();
            let height = xcdSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "XCDSVG").attr("height", height);

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

            // 图形边距
            let padding = 80;
            let thk = 10;

            // 图形外形尺寸
            let w = width - 2 * padding;
            let h = height - 2 * padding;

            // 壳体
            drawLine(width - padding - w / 4, padding, width - padding - w / 4, height - padding);
            drawLine(width - padding - w / 4 - thk, padding, width - padding - w / 4 - thk, height - padding);

            // 垫板
            drawLine(width - padding - w / 4 - 2 * thk, padding + h / 8, width - padding - w / 4 - thk, padding + h / 8);
            drawLine(width - padding - w / 4 - 2 * thk, height - padding - h / 8, width - padding - w / 4 - thk, height - padding - h / 8);
            drawLine(width - padding - w / 4 - 2 * thk, padding + h / 8, width - padding - w / 4 - 2 * thk, height - padding - h / 8);

            // 管轴
            drawLine(padding + w / 4, padding + h / 4, width - padding - w / 4 - 2 * thk, padding + h / 4);
            drawLine(padding + w / 4, padding + h / 4 + thk, width - padding - w / 4 - 2 * thk, padding + h / 4 + thk);
            drawLine(padding + w / 4, height - padding - h / 4, width - padding - w / 4 - 2 * thk, height - padding - h / 4);
            drawLine(padding + w / 4, height - padding - h / 4 - thk, width - padding - w / 4 - 2 * thk, height - padding - h / 4 - thk);
            drawLine(padding + w / 4, padding + h / 4, padding + w / 4, height - padding - h / 4);
            drawCenterLine(padding + w / 4 - 10, height / 2, width - padding - w / 4 + 10, height / 2);

            //AXB
            // drawLine(padding+w/4, height/2-thk/2, width-padding-w/4-2*thk, height/2-thk/2);
            // drawLine(padding+w/4, height/2+thk/2, width-padding-w/4-2*thk, height/2+thk/2);

            // AXC
            // drawLine(padding+w/4, height/2-((height-padding-h/4-thk)-(padding+h/4+thk))/6-thk/2, width-padding-w/4-2*thk, height/2-((height-padding-h/4-thk)-(padding+h/4+thk))/6-thk/2);
            // drawLine(padding+w/4, height/2-((height-padding-h/4-thk)-(padding+h/4+thk))/6+thk/2, width-padding-w/4-2*thk, height/2-((height-padding-h/4-thk)-(padding+h/4+thk))/6+thk/2);
            // drawLine(padding+w/4, height/2+((height-padding-h/4-thk)-(padding+h/4+thk))/6-thk/2, width-padding-w/4-2*thk, height/2+((height-padding-h/4-thk)-(padding+h/4+thk))/6-thk/2);
            // drawLine(padding+w/4, height/2+((height-padding-h/4-thk)-(padding+h/4+thk))/6+thk/2, width-padding-w/4-2*thk, height/2+((height-padding-h/4-thk)-(padding+h/4+thk))/6+thk/2);

            // 挡板
            drawLine(padding + w / 4 + thk, padding + h / 6, padding + w / 4 + thk, padding + h / 4);
            drawLine(padding + w / 4 + 2 * thk, padding + h / 6, padding + w / 4 + 2 * thk, padding + h / 4);
            drawLine(padding + w / 4 + thk, padding + h / 6, padding + w / 4 + 2 * thk, padding + h / 6);
            drawLine(padding + w / 4 + thk, height - padding - h / 6, padding + w / 4 + thk, height - padding - h / 4);
            drawLine(padding + w / 4 + 2 * thk, height - padding - h / 6, padding + w / 4 + 2 * thk, height - padding - h / 4);
            drawLine(padding + w / 4 + thk, height - padding - h / 6, padding + w / 4 + 2 * thk, height - padding - h / 6);

            // DO
            dimLeftV(padding + w / 4, height - padding - h / 4, padding + w / 4, padding + h / 4, dout, "XCDSketchDO");

            // THKN
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: padding + h / 4},
                    {x: width / 2 + 3, y: padding + h / 4 - 15},
                    {x: width / 2 - 3, y: padding + h / 4 - 15},
                    {x: width / 2, y: padding + h / 4}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: padding + h / 4 + thk},
                    {x: width / 2 + 3, y: padding + h / 4 + thk + 15},
                    {x: width / 2 - 3, y: padding + h / 4 + thk + 15},
                    {x: width / 2, y: padding + h / 4 + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: width / 2, y: padding + h / 4 - 15},
                {x: width / 2, y: padding + h / 4 - 55}
            ])).attr("id", "XCDSketchTHKN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCDSketchTHKN")
                .attr("startOffset", "50%").text(thkn);
            svg.append("path").attr("d", line([
                {x: width / 2, y: padding + h / 4},
                {x: width / 2, y: padding + h / 4 + thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: width / 2, y: padding + h / 4 + thk + 15},
                {x: width / 2, y: padding + h / 4 + thk + 30}
            ])).classed("sketch", true);

            // L
            dimBottomH(padding + w / 4 + 2 * thk, height - padding - h / 8, width - padding - w / 4 - 2 * thk, height - padding - h / 8, l, "XCDSketchL");
            drawLine(padding + w / 4 + 2 * thk, height - padding - h / 6 + 3, padding + w / 4 + 2 * thk, height - padding - h / 8 + 3);

            // 吊索方向
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + w / 4 + 2 * thk + h / 2, y: height / 2},
                    {x: padding + w / 4 + 2 * thk + h / 2 - 15, y: height / 2 - 3},
                    {x: padding + w / 4 + 2 * thk + h / 2 - 15, y: height / 2 + 3},
                    {x: padding + w / 4 + 2 * thk + h / 2, y: height / 2}
                ])).attr("transform", "rotate(" + -105 + ", " + (padding + w / 4 + 2 * thk) + " " + height / 2 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + w / 4 + 2 * thk, y: height / 2},
                    {x: padding + w / 4 + 2 * thk + h / 2 - 15, y: height / 2}
                ])).attr("transform", "rotate(" + -105 + ", " + (padding + w / 4 + 2 * thk) + " " + height / 2 + ")");
            svg.append("path")
                .attr("d", line([
                    {x: padding + w / 4 + 2 * thk + h / 2, y: height / 2 - 20},
                    {x: padding + w / 4 + 2 * thk + h / 2, y: height / 2 + 20}
                ])).attr("id", "XCDSketchLUG").attr("transform", "rotate(" + -105 + ", " + (padding + w / 4 + 2 * thk) + " " + height / 2 + ")");
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCDSketchLUG")
                .attr("startOffset", "50%").text("吊索方向");

            // 15°
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {
                        x: padding + w / 4 + 2 * thk + h / 2 - 30,
                        y: height / 2 - (h / 2 - 30) * Math.sin(7.5 / 180 * Math.PI)
                    },
                    {
                        x: padding + w / 4 + 2 * thk + h / 2 - 30 + 3,
                        y: height / 2 - (h / 2 - 30) * Math.sin(7.5 / 180 * Math.PI) + 15
                    },
                    {
                        x: padding + w / 4 + 2 * thk + h / 2 - 30 - 3,
                        y: height / 2 - (h / 2 - 30) * Math.sin(7.5 / 180 * Math.PI) + 15
                    },
                    {
                        x: padding + w / 4 + 2 * thk + h / 2 - 30,
                        y: height / 2 - (h / 2 - 30) * Math.sin(7.5 / 180 * Math.PI)
                    }
                ])).attr("transform", "rotate(" + -97.5 + ", " + (padding + w / 4 + 2 * thk) + " " + height / 2 + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + w / 4 + 2 * thk + h / 2 - 30, y: height / 2},
                    {x: padding + w / 4 + 2 * thk + h / 2 - 30 + 3, y: height / 2 - 15},
                    {x: padding + w / 4 + 2 * thk + h / 2 - 30 - 3, y: height / 2 - 15},
                    {x: padding + w / 4 + 2 * thk + h / 2 - 30, y: height / 2}
                ]));

            svg.append("path").attr("d", "M "
                + (padding + w / 4 + 2 * thk + (h / 2 - 30) * Math.cos(52.5 / 180 * Math.PI)) + " " + (height / 2 - (h / 2 - 30) * Math.sin(52.5 / 180 * Math.PI)) + " "
                + "A" + (h / 2 - 30) + " " + (h / 2 - 30) + " "
                + "1 0 1" + " "
                + (padding + w / 4 + 2 * thk + (h / 2 - 30) * Math.cos(52.5 / 180 * Math.PI)) + " " + (height / 2 + (h / 2 - 30) * Math.sin(52.5 / 180 * Math.PI))
            ).classed("sketch", true).attr("id", "XCDSketch105").attr("transform", "rotate(" + -52.5 + ", " + (padding + w / 4 + 2 * thk) + " " + height / 2 + ")");
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCDSketch105")
                .attr("startOffset", "50%").text("105°");

        }

        currentTabIndex = xcdd2d3.tabs('getTabIndex', xcdd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            xcd2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#xcd").length > 0) {
                    xcd2d();
                }
            });
        }
        xcdd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    xcd2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#xcd").length > 0) {
                            xcd2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 21574-2008 轴式吊耳(AXA/B/C)计算",
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
                    $(ed.target).combobox("loadData", XCDCategory);
                }
                else if (index === 2) {
                    $(ed.target).combobox("loadData", XCDType);
                }
                else if (index === 3) {
                    $(ed.target).combobox("loadData", XCDSTD);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", XCDName);
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
                    xcdSketch.empty();

                    // model
                    xcdModel.empty();

                    // sketch
                    currentTabIndex = xcdd2d3.tabs('getTabIndex', xcdd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        xcd2d();
                        xcdSketch.off("resize").on("resize", function () {
                            if ($("#xcd").length > 0) {
                                xcd2d();
                            }
                        });
                    }
                    xcdd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                xcd2d();
                                xcdSketch.off("resize").on("resize", function () {
                                    if ($("#xcd").length > 0) {
                                        xcd2d();
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

                        XCDCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        XCDType = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        XCDSTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XCDName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XCDCategoryVal,
                                temp: XCDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XCDType = [];
                                $(result).each(function (index, element) {
                                    XCDType[index] = {
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

                        XCDTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        XCDSTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XCDName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XCDCategoryVal,
                                type: XCDTypeVal,
                                temp: XCDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XCDSTD = [];
                                $(result).each(function (index, element) {
                                    XCDSTD[index] = {
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

                        XCDSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XCDName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XCDCategoryVal,
                                type: XCDTypeVal,
                                std: XCDSTDVal,
                                temp: XCDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XCDName = [];
                                $(result).each(function (index, element) {
                                    XCDName[index] = {
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

                        // 材料名称
                        if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                            let XCDNameVal = rows[4][columns[0][1].field];

                            // AJAX 获取材料密度、最大最小厚度
                            let XCDDensity, XCDThkMin, XCDThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": XCDCategoryVal,
                                    "type": XCDTypeVal,
                                    "std": XCDSTDVal,
                                    "name": XCDNameVal,
                                    "temp": XCDDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    XCDDensity = parseFloat(result.density);
                                    XCDThkMin = parseFloat(result.thkMin);
                                    XCDThkMax = parseFloat(result.thkMax);

                                    if (XCDNameVal === "Q235B" || XCDNameVal === "Q235C") {
                                        XCDThkMax = 200;
                                    }

                                    // Do
                                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                                        let XCDDO = parseFloat(rows[5][columns[0][1].field]);

                                        // Sketch
                                        if (currentTabIndex === 0) {
                                            xcd2d("ϕ" + XCDDO);
                                            xcdSketch.off("resize").on("resize", function () {
                                                if ($("#xcd").length > 0) {
                                                    xcd2d("ϕ" + XCDDO);
                                                }
                                            });
                                        }
                                        xcdd2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    xcd2d("ϕ" + XCDDO);
                                                    xcdSketch.off("resize").on("resize", function () {
                                                        if ($("#xcd").length > 0) {
                                                            xcd2d("ϕ" + XCDDO);
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // 名义厚度
                                        if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])
                                            && parseFloat(rows[6][columns[0][1].field]) > XCDThkMin
                                            && parseFloat(rows[6][columns[0][1].field]) <= XCDThkMax) {
                                            let XCDTHKN = parseFloat(rows[6][columns[0][1].field]);

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                xcd2d("ϕ" + XCDDO, XCDTHKN);
                                                xcdSketch.off("resize").on("resize", function () {
                                                    if ($("#xcd").length > 0) {
                                                        xcd2d("ϕ" + XCDDO, XCDTHKN);
                                                    }
                                                });
                                            }
                                            xcdd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        xcd2d("ϕ" + XCDDO, XCDTHKN);
                                                        xcdSketch.off("resize").on("resize", function () {
                                                            if ($("#xcd").length > 0) {
                                                                xcd2d("ϕ" + XCDDO, XCDTHKN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // ajax 获取 设计应力、常温应力、标记应力、常温屈服强度、厚度负偏差
                                            let XCDDesignTStress, XCDTestRel, XCDC1;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_gbt_150_2011_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": XCDCategoryVal,
                                                    "type": XCDTypeVal,
                                                    "std": XCDSTDVal,
                                                    "name": XCDNameVal,
                                                    "thk": XCDTHKN,
                                                    "temp": XCDDT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": 100000
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    XCDTestRel = parseFloat(result.rel);
                                                    if (XCDTestRel < 0) {
                                                        south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    XCDC1 = parseFloat(result.c1);
                                                    if (XCDC1 < 0) {
                                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    XCDDesignTStress = XCDTestRel / 1.6;

                                                    // L
                                                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                                        let XCDL = parseFloat(rows[7][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            xcd2d("ϕ" + XCDDO, XCDTHKN, XCDL);
                                                            xcdSketch.off("resize").on("resize", function () {
                                                                if ($("#xcd").length > 0) {
                                                                    xcd2d("ϕ" + XCDDO, XCDTHKN, XCDL);
                                                                }
                                                            });
                                                        }
                                                        xcdd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    xcd2d("ϕ" + XCDDO, XCDTHKN, XCDL);
                                                                    xcdSketch.off("resize").on("resize", function () {
                                                                        if ($("#xcd").length > 0) {
                                                                            xcd2d("ϕ" + XCDDO, XCDTHKN, XCDL);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        // 腐蚀裕量
                                                        if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                                            && parseFloat(rows[8][columns[0][1].field]) < XCDTHKN) {
                                                            let XCDC2 = parseFloat(rows[8][columns[0][1].field]);

                                                            // 吊重
                                                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                                                let XCDMASS = parseFloat(rows[9][columns[0][1].field]);

                                                                // 厚度附加量
                                                                let XCDC = XCDC1 + XCDC2;

                                                                // 有效厚度
                                                                let XCDTHKE = XCDTHKN - XCDC;

                                                                // 综合影响系数 K
                                                                let XCDK = 1.65;

                                                                // 竖向载荷 FV
                                                                let XCDFV = XCDMASS * 9.81 * XCDK;

                                                                // 横向载荷 FH
                                                                let XCDFH = XCDFV * Math.tan(15 / 180 * Math.PI);

                                                                // 弯矩 M
                                                                let XCDM = XCDFV * XCDL;

                                                                // 角焊缝面积 A
                                                                let XCDA = Math.PI * (XCDDO - XCDTHKN) * XCDTHKE;

                                                                // 计算参数阿尔法
                                                                let XCDALPHA = (XCDDO - 2 * XCDTHKE) / XCDDO;

                                                                // 计算参数 J
                                                                let XCDJ = Math.PI * Math.pow(XCDDO, 4) * (1 - Math.pow(XCDALPHA, 4)) / 64;

                                                                // 计算参数W
                                                                let XCDW = XCDJ / (0.5 * XCDDO);

                                                                let XCDOLT = XCDFH / XCDA;

                                                                let XCDOLB = XCDM / XCDW;

                                                                let XCDOL = XCDOLT + XCDOLB;

                                                                south.html(
                                                                    "<span style='color:#444444;'>" +
                                                                    "管轴组合应力许用值：" + XCDDesignTStress + " MPa" +
                                                                    "</span>");

                                                                // 管轴组合应力校核
                                                                let XCDOLCHK;
                                                                if (XCDOL.toFixed(4) <= XCDDesignTStress) {
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "实际值：" + XCDOL.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                    XCDOLCHK = "合格";
                                                                } else {
                                                                    south.append(
                                                                        "<span style='color:red;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "实际值：" + XCDOL.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                    XCDOLCHK = "不合格";
                                                                }

                                                                // docx
                                                                let XCDPayJS = $('#payjs');

                                                                function getDocx() {
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "xcddocx.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            ribbonName: "XCD",

                                                                            std: XCDSTDVal,
                                                                            name: XCDNameVal,
                                                                            dout: XCDDO,
                                                                            thkn: XCDTHKN,
                                                                            l: XCDL,
                                                                            c2: XCDC2,
                                                                            mass: XCDMASS,
                                                                            density: XCDDensity.toFixed(4),
                                                                            rel: XCDTestRel.toFixed(4),
                                                                            c1: XCDC1.toFixed(4),
                                                                            c: XCDC.toFixed(4),
                                                                            thke: XCDTHKE.toFixed(4),
                                                                            o: XCDDesignTStress.toFixed(4),
                                                                            k: XCDK.toFixed(4),
                                                                            fv: XCDFV.toFixed(4),
                                                                            fh: XCDFH.toFixed(4),
                                                                            m: XCDM.toFixed(4),
                                                                            a: XCDA.toFixed(4),
                                                                            alpha: XCDALPHA.toFixed(4),
                                                                            j: XCDJ.toFixed(4),
                                                                            w: XCDW.toFixed(4),
                                                                            olt: XCDOLT.toFixed(4),
                                                                            olb: XCDOLB.toFixed(4),
                                                                            ol: XCDOL.toFixed(4),
                                                                            olchk: XCDOLCHK
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
                                                                                XCDPayJS.dialog({
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
                                                                                            XCDPayJS.dialog("close");
                                                                                            XCDPayJS.dialog("clear");
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
                                                                                                        XCDPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                XCDPayJS.dialog('close');
                                                                                                                XCDPayJS.dialog('clear');
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
                                                        else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                                            && parseFloat(rows[8][columns[0][1].field]) >= XCDTHKN) {
                                                            south.html("腐蚀裕量不能大于等于 " + XCDTHKN + " mm").css("color", "red");
                                                        }
                                                    }
                                                },
                                                error: function () {
                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                        "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                }
                                            });
                                        }
                                        else if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])
                                            && parseFloat(rows[6][columns[0][1].field]) <= XCDThkMin) {
                                            south.html("材料厚度不能小于等于 " + XCDThkMin + " mm").css("color", "red");
                                        }
                                        else if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])
                                            && parseFloat(rows[6][columns[0][1].field]) > XCDThkMax) {
                                            south.html("材料厚度不能大于 " + XCDThkMax + " mm").css("color", "red");
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
                        temp: XCDDT
                    }),
                    beforeSend: function () {
                    },
                    success: function (result) {
                        XCDCategory = [];
                        if (result.length <= 0) {
                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                "&ensp;" + "<span style='color:red;'>" + XCDDT + "</span>" +
                                "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                        }
                        else {
                            $(result).each(function (index, element) {
                                XCDCategory[index] = {
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