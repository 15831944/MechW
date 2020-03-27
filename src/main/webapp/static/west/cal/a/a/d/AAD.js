$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aadd2 = $("#d2");
    let aadd3 = $("#d3");
    let aadd2d3 = $('#d2d3');

    $("#cal").html("<table id='aad'></table>");
    let pg = $("#aad");

    let south = $("#south");
    let currentTabIndex = null;

    let AADPayJS = $('#payjs');
    $.getJSON("/static/west/cal/a/a/d/AAD.json", function (result) {

        let AADDT,
            AADCategory, AADCategoryVal, AADType, AADTypeVal, AADSTD, AADSTDVal, AADName, AADNameVal,
            columns, rows, ed;

        currentTabIndex = aadd2d3.tabs('getTabIndex', aadd2d3.tabs('getSelected'));

        // Sketch
        function aad2d(idod, di = "ϕDi", dout = "ϕDo", bri = "Ri", bro = "Ro", sri = "ri", sro = "ro", thkn = "δn", h = "h") {

            aadd2.empty();

            let width = aadd2.width();
            let height = aadd2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "AADSVG")
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
            let straightHeight = 50;
            let thickness = 20;

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
            function dimLeftV(startX, startY, endX, endY, text) {

                extLineLeftH(startX, startY);
                extLineLeftH(endX, endY);

                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: startX - 30, y: startY},
                        {x: startX - 27, y: startY + 15},
                        {x: startX - 33, y: startY + 15},
                        {x: startX - 30, y: startY}
                    ]));

                drawLine(startX - 30, startY + 15, startX - 30, startY + 30);

                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX - 30, y: endY},
                        {x: endX - 27, y: endY - 15},
                        {x: endX - 33, y: endY - 15},
                        {x: endX - 30, y: endY}
                    ]));

                drawLine(endX - 30, endY - 15, endX - 30, endY - 30);

                svg.append("path").attr("d", line([
                    {x: startX - 30, y: startY},
                    {x: endX - 30, y: endY}
                ])).attr("id", "AADSketchH").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#AADSketchH").attr("startOffset", "50%").text(text);

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
            drawLine(padding, height - padding, width - padding, height - padding);
            drawLine(padding, height - padding - straightHeight, width - padding, height - padding - straightHeight);
            drawLine(padding, height - padding - straightHeight, padding, height - padding);
            drawLine(padding + thickness, height - padding - straightHeight, padding + thickness, height - padding);
            drawLine(width - padding, height - padding - straightHeight, width - padding, height - padding);
            drawLine(width - padding - thickness, height - padding - straightHeight, width - padding - thickness, height - padding);

            // 轮廓弧线
            let cornerRadiusInner = 0.1 * (width - 2 * padding - 2 * thickness);
            let cornerRadiusOuter = cornerRadiusInner + thickness;
            let crownRadiusInner = width - 2 * padding - 2 * thickness;
            let crownRadiusOuter = crownRadiusInner + thickness;

            let ANG = Math.acos(((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) / ((width - 2 * padding - 2 * thickness) - cornerRadiusInner));

            drawArc(cornerRadiusInner, cornerRadiusInner, width - padding - thickness - cornerRadiusInner + cornerRadiusInner * Math.cos(ANG), height - padding - straightHeight - cornerRadiusInner * Math.sin(ANG), width - padding - thickness, height - padding - straightHeight);
            drawArc(cornerRadiusOuter, cornerRadiusOuter, width - padding - cornerRadiusOuter + cornerRadiusOuter * Math.cos(ANG), height - padding - straightHeight - cornerRadiusOuter * Math.sin(ANG), width - padding, height - padding - straightHeight);
            drawArc(cornerRadiusInner, cornerRadiusInner, padding + thickness, height - padding - straightHeight, padding + thickness + cornerRadiusInner - cornerRadiusInner * Math.cos(ANG), height - padding - straightHeight - cornerRadiusInner * Math.sin(ANG));
            drawArc(cornerRadiusOuter, cornerRadiusOuter, padding, height - padding - straightHeight, padding + cornerRadiusOuter - cornerRadiusOuter * Math.cos(ANG), height - padding - straightHeight - cornerRadiusOuter * Math.sin(ANG));
            drawArc(crownRadiusInner, crownRadiusInner, padding + thickness + cornerRadiusInner - cornerRadiusInner * Math.cos(ANG), height - padding - straightHeight - cornerRadiusInner * Math.sin(ANG), width - padding - thickness - cornerRadiusInner + cornerRadiusInner * Math.cos(ANG), height - padding - straightHeight - cornerRadiusInner * Math.sin(ANG));
            drawArc(crownRadiusOuter, crownRadiusOuter, padding + cornerRadiusOuter - cornerRadiusOuter * Math.cos(ANG), height - padding - straightHeight - cornerRadiusOuter * Math.sin(ANG), width - padding - cornerRadiusOuter + cornerRadiusOuter * Math.cos(ANG), height - padding - straightHeight - cornerRadiusOuter * Math.sin(ANG));

            // 中心线
            drawCenterLine(width / 2, height - padding + 10, width / 2, height - padding - straightHeight - ((1 - Math.sin(ANG)) * crownRadiusOuter + cornerRadiusOuter * Math.sin(ANG)) - 10);

            // DI DOUT
            if (idod === "内径") {
                dimBottomH(padding + thickness, height - padding, width - padding - thickness, height - padding, di, "AADSketchDI");
            }
            else if (idod === "外径") {
                dimBottomH(padding, height - padding, width - padding, height - padding, dout, "AADSketchDOUT");
            }

            // thkn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding, y: height - padding - straightHeight / 2},
                    {x: width - padding + 15, y: height - padding - straightHeight / 2 - 3},
                    {x: width - padding + 15, y: height - padding - straightHeight / 2 + 3},
                    {x: width - padding, y: height - padding - straightHeight / 2}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding - thickness, y: height - padding - straightHeight / 2},
                    {x: width - padding - thickness - 15, y: height - padding - straightHeight / 2 - 3},
                    {x: width - padding - thickness - 15, y: height - padding - straightHeight / 2 + 3},
                    {x: width - padding - thickness, y: height - padding - straightHeight / 2}
                ]));
            drawLine(width - padding - thickness - 15 - 10, height - padding - straightHeight / 2, width - padding, height - padding - straightHeight / 2);
            svg.append("path").attr("d", line([
                {x: width - padding + 15, y: height - padding - straightHeight / 2},
                {x: width - padding + 15 + 40, y: height - padding - straightHeight / 2}
            ])).attr("id", "AADSketchTHKN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AADSketchTHKN").attr("startOffset", "50%").text(thkn);

            // h
            dimLeftV(padding, height - padding, padding, height - padding - straightHeight, h);

            if (idod === "内径") {

                // 球冠内半径标注
                svg.append("path").attr("d", line([
                    {
                        x: width / 2,
                        y: height - padding - straightHeight - (crownRadiusInner * Math.sin(ANG) - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))
                    },
                    {
                        x: width / 2,
                        y: height - padding - straightHeight - (crownRadiusInner - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))
                    }
                ])).attr("id", "AADSketchBRI").classed("sketch", true).attr("transform", "rotate(" + (90 - ANG / Math.PI * 180) / 2 + ", " + width / 2 + " " + (crownRadiusInner + height - padding - straightHeight - (crownRadiusInner - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))) + ")");
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {
                            x: width / 2,
                            y: height - padding - straightHeight - (crownRadiusInner - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))
                        },
                        {
                            x: width / 2 - 3,
                            y: (height - padding - straightHeight - (crownRadiusInner - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))) + 15
                        },
                        {
                            x: width / 2 + 3,
                            y: (height - padding - straightHeight - (crownRadiusInner - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))) + 15
                        },
                        {
                            x: width / 2,
                            y: height - padding - straightHeight - (crownRadiusInner - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))
                        }
                    ])).attr("transform", "rotate(" + (90 - ANG / Math.PI * 180) / 2 + ", " + width / 2 + " " + (crownRadiusInner + height - padding - straightHeight - (crownRadiusInner - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))) + ")");
                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#AADSketchBRI").attr("startOffset", "50%").text(bri);
            }
            else if (idod === "外径") {
                svg.append("path").attr("d", line([
                    {
                        x: width / 2,
                        y: thickness + height - padding - straightHeight - (crownRadiusInner * Math.sin(ANG) - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))
                    },
                    {
                        x: width / 2,
                        y: height - padding - straightHeight - (crownRadiusOuter - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))
                    }
                ])).attr("id", "AADSketchBRO").classed("sketch", true).attr("transform", "rotate(" + (90 - ANG / Math.PI * 180) / 2 + ", " + width / 2 + " " + (crownRadiusInner + height - padding - straightHeight - (crownRadiusInner - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))) + ")");
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {
                            x: width / 2,
                            y: height - padding - straightHeight - (crownRadiusOuter - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))
                        },
                        {
                            x: width / 2 - 3,
                            y: (height - padding - straightHeight - (crownRadiusOuter - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))) + 15
                        },
                        {
                            x: width / 2 + 3,
                            y: (height - padding - straightHeight - (crownRadiusOuter - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))) + 15
                        },
                        {
                            x: width / 2,
                            y: height - padding - straightHeight - (crownRadiusOuter - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))
                        }
                    ])).attr("transform", "rotate(" + (90 - ANG / Math.PI * 180) / 2 + ", " + width / 2 + " " + (crownRadiusInner + height - padding - straightHeight - (crownRadiusInner - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))) + ")");
                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#AADSketchBRO").attr("startOffset", "50%").text(bro);
            }

            // sro sri
            if (idod === "内径") {
                svg.append("path").attr("d", line([
                    {x: width - padding - thickness - cornerRadiusInner, y: height - padding - straightHeight},
                    {x: width - padding - thickness - 15, y: height - padding - straightHeight}
                ])).attr("id", "AADSketchSRI").classed("sketch", true).attr("transform", "rotate(" + (-ANG / Math.PI * 180) / 2 + ", " + (width - padding - thickness - cornerRadiusInner) + " " + (height - padding - straightHeight) + ")");
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: width - padding - thickness, y: height - padding - straightHeight},
                        {x: width - padding - thickness - 15, y: height - padding - straightHeight - 3},
                        {x: width - padding - thickness - 15, y: height - padding - straightHeight + 3},
                        {x: width - padding - thickness, y: height - padding - straightHeight}
                    ])).attr("transform", "rotate(" + (-ANG / Math.PI * 180) / 2 + ", " + (width - padding - thickness - cornerRadiusInner) + " " + (height - padding - straightHeight) + ")");
                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#AADSketchSRI").attr("startOffset", "50%").text(sri);
            }
            else if (idod === "外径") {
                svg.append("path").attr("d", line([
                    {x: width - padding - thickness - cornerRadiusInner, y: height - padding - straightHeight},
                    {x: width - padding - 15, y: height - padding - straightHeight}
                ])).attr("id", "AADSketchSRO").classed("sketch", true)
                    .attr("transform", "rotate(" + (-ANG / Math.PI * 180) / 2 + ", " + (width - padding - thickness - cornerRadiusInner) + " " + (height - padding - straightHeight) + ")");
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: width - padding, y: height - padding - straightHeight},
                        {x: width - padding - 15, y: height - padding - straightHeight - 3},
                        {x: width - padding - 15, y: height - padding - straightHeight + 3},
                        {x: width - padding, y: height - padding - straightHeight}
                    ])).attr("transform", "rotate(" + (-ANG / Math.PI * 180) / 2 + ", " + (width - padding - thickness - cornerRadiusInner) + " " + (height - padding - straightHeight) + ")");
                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#AADSketchSRO").attr("startOffset", "50%").text(sro);
            }
        }

        // Sketch
        if (currentTabIndex === 0) {
            aad2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#aad").length > 0) {
                    aad2d();
                }
            });
        }
        aadd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aad2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#aad").length > 0) {
                            aad2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 碟形封头内压强度计算",
            data: result,
            showHeader: false,
            showGroup: true,
            scrollbarSize: 0,
            autoRowHeight: true,
            columns: [[
                {
                    field: "name",
                    title: "名称",
                    width: 180,
                    resizable: true,
                    sortable: false,
                    align: "left"
                },
                {
                    field: 'value',
                    title: '值',
                    width: 143,
                    resizable: false,
                    sortable: false,
                    align: "center",
                    styler: function () {
                        return "color:#222222;";
                    }
                }
            ]],
            rowStyler: function (index) {

                if (index === 12 || index === 14 || index === 16) {
                    pg.propertygrid('options').finder.getTr(this, index).hide();
                }
            },
            onClickRow: function (index) {

                if (index !== lastIndex) {
                    pg.datagrid('endEdit', lastIndex);
                }

                pg.propertygrid('beginEdit', index);
                ed = pg.propertygrid("getEditor", {index: index, field: "value"});

                if (index === 6) {
                    $(ed.target).combobox("loadData", AADCategory);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AADType);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", AADSTD);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", AADName);
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

                    // sketch & model
                    aadd2.empty();
                    aadd3.empty();

                    // sketch
                    currentTabIndex = aadd2d3.tabs('getTabIndex', aadd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        aad2d();
                        aadd2.off("resize").on("resize", function () {
                            if ($("#aad").length > 0) {
                                aad2d();
                            }
                        });
                    }
                    aadd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aad2d();
                                aadd2.off("resize").on("resize", function () {
                                    if ($("#aad").length > 0) {
                                        aad2d();
                                    }
                                });
                            }
                        }
                    });

                    // alert
                    south.empty();

                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    /*
                    级联菜单区
                     */
                    // 温度改变，重新加载 category
                    if (index === 1) {

                        AADDT = parseFloat(changes.value);

                        // category、type、std、name
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AADCategory = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AADType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AADSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AADName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AADDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AADCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AADDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        AADCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                    });
                                }
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;筒体材料类别获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // category 改变，重新加载type
                    if (index === 6) {

                        AADCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AADType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AADSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AADName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AADCategoryVal,
                                temp: AADDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AADType = [];
                                $(result).each(function (index, element) {
                                    AADType[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;筒体材料类型获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // type 改变，重新加载 std
                    if (index === 7) {

                        AADTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AADSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AADName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AADCategoryVal,
                                type: AADTypeVal,
                                temp: AADDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AADSTD = [];
                                $(result).each(function (index, element) {
                                    AADSTD[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;筒体材料标准号获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // std 改变，重新加载 Name
                    if (index === 8) {

                        AADSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AADName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AADCategoryVal,
                                type: AADTypeVal,
                                std: AADSTDVal,
                                temp: AADDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AADName = [];
                                $(result).each(function (index, element) {
                                    AADName[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;筒体材料牌号获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // UI - DI DOUT
                    if (index === 10) {
                        if (rows[10][columns[0][1].field] === "内径") {
                            pg.datagrid('options').finder.getTr(this, 11).show();
                            pg.datagrid('options').finder.getTr(this, 13).show();
                            pg.datagrid('options').finder.getTr(this, 15).show();
                            pg.datagrid('options').finder.getTr(this, 12).hide();
                            pg.datagrid('options').finder.getTr(this, 14).hide();
                            pg.datagrid('options').finder.getTr(this, 16).hide();
                        }
                        else if (rows[10][columns[0][1].field] === "外径") {
                            pg.datagrid('options').finder.getTr(this, 12).show();
                            pg.datagrid('options').finder.getTr(this, 14).show();
                            pg.datagrid('options').finder.getTr(this, 16).show();
                            pg.datagrid('options').finder.getTr(this, 11).hide();
                            pg.datagrid('options').finder.getTr(this, 13).hide();
                            pg.datagrid('options').finder.getTr(this, 15).hide();
                        }
                        else {
                            return false;
                        }
                    }

                    /*
                    数据获取和计算区
                     */
                    let AADPD;
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        AADPD = parseFloat(rows[0][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AADPS;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        AADPS = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AADC2;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        AADC2 = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AADFAI;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        AADFAI = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AADTest;
                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                        AADTest = rows[5][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // NameVal
                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                        AADNameVal = rows[9][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    let AADD, AADThkMin, AADThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": AADCategoryVal,
                            "type": AADTypeVal,
                            "std": AADSTDVal,
                            "name": AADNameVal,
                            "temp": AADDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            AADD = parseFloat(result.density);
                            AADThkMin = parseFloat(result.thkMin);
                            AADThkMax = parseFloat(result.thkMax);

                            let AADIDOD;
                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                AADIDOD = rows[10][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                aad2d(AADIDOD);
                                aadd2.off("resize").on("resize", function () {
                                    if ($("#aad").length > 0) {
                                        aad2d(AADIDOD);
                                    }
                                });
                            }
                            aadd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aad2d(AADIDOD);
                                        aadd2.off("resize").on("resize", function () {
                                            if ($("#aad").length > 0) {
                                                aad2d(AADIDOD);
                                            }
                                        });
                                    }
                                }
                            });

                            let AADDI = -1, AADDOUT = -1;
                            if (AADIDOD === "内径") {

                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                    AADDI = parseFloat(rows[11][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }
                            }
                            else if (AADIDOD === "外径") {

                                if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                    AADDOUT = parseFloat(rows[12][columns[0][1].field]);
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
                                aad2d(AADIDOD, "Φ" + AADDI, "Φ" + AADDOUT);
                                aadd2.off("resize").on("resize", function () {
                                    if ($("#aad").length > 0) {
                                        aad2d(AADIDOD, "Φ" + AADDI, "Φ" + AADDOUT);
                                    }
                                });
                            }
                            aadd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aad2d(AADIDOD, "Φ" + AADDI, "Φ" + AADDOUT);
                                        aadd2.off("resize").on("resize", function () {
                                            if ($("#aad").length > 0) {
                                                aad2d(AADIDOD, "Φ" + AADDI, "Φ" + AADDOUT);
                                            }
                                        });
                                    }
                                }
                            });

                            let AADBRI = -1, AADBRO = -1;
                            if (AADIDOD === "内径") {

                                if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                    && parseFloat(rows[13][columns[0][1].field]) > AADDI / 2
                                    && parseFloat(rows[13][columns[0][1].field]) <= AADDI) {
                                    AADBRI = parseFloat(rows[13][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                    && parseFloat(rows[13][columns[0][1].field]) <= AADDI / 2) {
                                    south.html("球冠部分内半径 Ri 不能小于等于 " + AADDI / 2 + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                    && parseFloat(rows[13][columns[0][1].field]) > AADDI) {
                                    south.html("球冠部分内半径 Ri 不能大于 " + AADDI + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }
                            }
                            else if (AADIDOD === "外径") {

                                if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                    && parseFloat(rows[14][columns[0][1].field]) > AADDOUT / 2
                                    && parseFloat(rows[13][columns[0][1].field]) <= AADDOUT) {
                                    AADBRO = parseFloat(rows[14][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                    && parseFloat(rows[14][columns[0][1].field]) <= AADDOUT / 2) {
                                    south.html("球冠部分外半径 Ro 不能小于等于 " + AADDOUT / 2 + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                    && parseFloat(rows[13][columns[0][1].field]) > AADDOUT) {
                                    south.html("球冠部分外半径 Ro 不能大于 " + AADDOUT + " mm").css("color", "red");
                                    return false;
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
                                aad2d(AADIDOD, "Φ" + AADDI, "Φ" + AADDOUT, "R" + AADBRI, "R" + AADBRO);
                                aadd2.off("resize").on("resize", function () {
                                    if ($("#aad").length > 0) {
                                        aad2d(AADIDOD, "Φ" + AADDI, "Φ" + AADDOUT, "R" + AADBRI, "R" + AADBRO);
                                    }
                                });
                            }
                            aadd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aad2d(AADIDOD, "Φ" + AADDI, "Φ" + AADDOUT, "R" + AADBRI, "R" + AADBRO);
                                        aadd2.off("resize").on("resize", function () {
                                            if ($("#aad").length > 0) {
                                                aad2d(AADIDOD, "Φ" + AADDI, "Φ" + AADDOUT, "R" + AADBRI, "R" + AADBRO);
                                            }
                                        });
                                    }
                                }
                            });

                            let AADSRI = -1, AADSRO = -1;
                            if (AADIDOD === "内径") {

                                if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                    && parseFloat(rows[15][columns[0][1].field]) >= AADDI / 10) {
                                    AADSRI = parseFloat(rows[15][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                    && parseFloat(rows[15][columns[0][1].field]) < AADDI / 10) {
                                    south.html("转角部分内半径 ri 不能小于 " + AADDI / 10 + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }
                            }
                            else if (AADIDOD === "外径") {

                                if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                    && parseFloat(rows[16][columns[0][1].field]) >= AADDOUT / 10) {
                                    AADSRO = parseFloat(rows[16][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                    && parseFloat(rows[16][columns[0][1].field]) < AADDOUT / 10) {
                                    south.html("转角部分外半径 ro 不能小于 " + AADDOUT / 10 + " mm").css("color", "red");
                                    return false;
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
                                aad2d(AADIDOD, "Φ" + AADDI, "Φ" + AADDOUT, "R" + AADBRI, "R" + AADBRO, "R" + AADSRI, "R" + AADSRO);
                                aadd2.off("resize").on("resize", function () {
                                    if ($("#aad").length > 0) {
                                        aad2d(AADIDOD, "Φ" + AADDI, "Φ" + AADDOUT, "R" + AADBRI, "R" + AADBRO, "R" + AADSRI, "R" + AADSRO);
                                    }
                                });
                            }
                            aadd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aad2d(AADIDOD, "Φ" + AADDI, "Φ" + AADDOUT, "R" + AADBRI, "R" + AADBRO, "R" + AADSRI, "R" + AADSRO);
                                        aadd2.off("resize").on("resize", function () {
                                            if ($("#aad").length > 0) {
                                                aad2d(AADIDOD, "Φ" + AADDI, "Φ" + AADDOUT, "R" + AADBRI, "R" + AADBRO, "R" + AADSRI, "R" + AADSRO);
                                            }
                                        });
                                    }
                                }
                            });

                            let AADTHKN;
                            if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                && parseFloat(rows[17][columns[0][1].field]) > Math.max(AADC2, AADThkMin)
                                && parseFloat(rows[17][columns[0][1].field]) <= AADThkMax) {
                                AADTHKN = parseFloat(rows[17][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                && parseFloat(rows[17][columns[0][1].field]) <= Math.max(AADC2, AADThkMin)) {
                                south.html("封头材料厚度不能小于等于 " + Math.max(AADC2, AADThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                && parseFloat(rows[17][columns[0][1].field]) > AADThkMax) {
                                south.html("封头材料厚度不能大于 " + AADThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // 转角半径大于3倍板厚校核
                            if (AADIDOD === "内径") {
                                if (AADSRI < 3 * AADTHKN) {
                                    south.html("封头转角内半径 ri 必须大于等于 3 倍厚度！").css("color", "red");
                                    return false;
                                }
                            }
                            else if (AADIDOD === "外径") {
                                if (AADSRO < 3 * AADTHKN) {
                                    south.html("封头转角外半径 ro 必须大于等于 3 倍厚度！").css("color", "red");
                                    return false;
                                }
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                aad2d(AADIDOD, "Φ" + AADDI, "Φ" + AADDOUT, "R" + AADBRI, "R" + AADBRO, "R" + AADSRI, "R" + AADSRO, AADTHKN);
                                aadd2.off("resize").on("resize", function () {
                                    if ($("#aad").length > 0) {
                                        aad2d(AADIDOD, "Φ" + AADDI, "Φ" + AADDOUT, "R" + AADBRI, "R" + AADBRO, "R" + AADSRI, "R" + AADSRO, AADTHKN);
                                    }
                                });
                            }
                            aadd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aad2d(AADIDOD, "Φ" + AADDI, "Φ" + AADDOUT, "R" + AADBRI, "R" + AADBRO, "R" + AADSRI, "R" + AADSRO, AADTHKN);
                                        aadd2.off("resize").on("resize", function () {
                                            if ($("#aad").length > 0) {
                                                aad2d(AADIDOD, "Φ" + AADDI, "Φ" + AADDOUT, "R" + AADBRI, "R" + AADBRO, "R" + AADSRI, "R" + AADSRO, AADTHKN);
                                            }
                                        });
                                    }
                                }
                            });

                            // 补齐内外径
                            if (AADIDOD === "内径") {
                                AADDOUT = AADDI + 2 * AADTHKN;
                                AADBRO = AADBRI + AADTHKN;
                                AADSRO = AADSRI + AADTHKN;
                            }
                            else if (AADIDOD === "外径") {
                                AADDI = AADDOUT - 2 * AADTHKN;
                                AADBRI = AADBRO - AADTHKN;
                                AADSRI = AADSRO - AADTHKN;
                            }
                            else {
                                return false;
                            }

                            let AADOT, AADO, AADOT1, AADRel, AADC1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": AADCategoryVal,
                                    "type": AADTypeVal,
                                    "std": AADSTDVal,
                                    "name": AADNameVal,
                                    "thk": AADTHKN,
                                    "temp": AADDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": AADDOUT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    // 设计应力
                                    AADOT = parseFloat(result.ot);
                                    if (AADOT < 0) {
                                        south.html("查询封头材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    // 常温应力
                                    AADO = parseFloat(result.o);
                                    if (AADO < 0) {
                                        south.html("查询封头材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    // 常温屈服强度
                                    AADRel = parseFloat(result.rel);
                                    if (AADRel < 0) {
                                        south.html("查询封头材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }

                                    // 厚度负偏差
                                    AADC1 = parseFloat(result.c1);
                                    if (AADC1 < 0) {
                                        south.html("查询封头厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // 标记应力
                                    AADOT1 = parseFloat(result.ot1);

                                    // 过程参数
                                    let AADPC = AADPD + AADPS;
                                    let AADC = AADC1 + AADC2;
                                    let AADTHKE = AADTHKN - AADC;

                                    // 厚度校核
                                    let AADM = (3 + Math.sqrt(AADBRI / AADSRI)) / 4;
                                    let AADTHKC;
                                    if (AADIDOD === "内径") {
                                        AADTHKC = (AADM * AADPC * AADBRI) / (2 * AADOT * AADFAI - 0.5 * AADPC);
                                    }
                                    else if (AADIDOD === "外径") {
                                        AADTHKC = (AADM * AADPC * AADBRO) / (2 * AADOT * AADFAI + (AADM - 0.5) * AADPC);
                                    }
                                    else {
                                        return false;
                                    }
                                    let AADTHKMini;
                                    if (AADBRI / AADSRI <= 5.5) {
                                        AADTHKMini = 0.0015 * AADDI;
                                    }
                                    else {
                                        AADTHKMini = 0.003 * AADDI;
                                    }
                                    let AADTHKMinimum;
                                    if (AADCategoryVal === "碳素钢和低合金钢" || AADCategoryVal === "铝及铝合金") {
                                        AADTHKMinimum = 3;
                                    }
                                    else if (AADCategoryVal === "高合金钢" || AADCategoryVal === "钛及钛合金"
                                        || AADCategoryVal === "铜及铜合金" || AADCategoryVal === "镍及镍合金"
                                        || AADCategoryVal === "锆及锆合金") {
                                        AADTHKMinimum = 2;
                                    }
                                    else {
                                        return false;
                                    }

                                    let AADTHKD = Math.max(AADTHKC, AADTHKMinimum, AADTHKMini) + AADC2;
                                    south.html(
                                        "<span style='color:#444444;'>" +
                                        "封头所需厚度：" + (AADTHKD + AADC1).toFixed(2) + " mm" +
                                        "</span>");
                                    let AADTHKCHK;
                                    if (AADTHKN >= (AADTHKD + AADC1).toFixed(2)) {
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "输入厚度：" + AADTHKN + " mm" +
                                            "</span>");
                                        AADTHKCHK = "合格";
                                    }
                                    else {
                                        south.append(
                                            "<span style='color:red;'>" +
                                            "&ensp;|&ensp;" +
                                            "输入厚度：" + AADTHKN + " mm" +
                                            "</span>");
                                        AADTHKCHK = "不合格";
                                    }

                                    // 应力校核
                                    let AADOAct;
                                    if (AADIDOD === "内径") {
                                        AADOAct = AADPC * (AADM * AADBRI + 0.5 * AADTHKE) / (2 * AADTHKE);
                                    }
                                    else if (AADIDOD === "外径") {
                                        AADOAct = AADPC * (AADM * AADBRO - (AADM - 0.5) * AADTHKE) / (2 * AADTHKE);
                                    }
                                    else {
                                        return false;
                                    }
                                    let AADOActAllow = AADFAI * AADOT;
                                    let AADOActChk;
                                    if (AADOAct <= AADOActAllow) {
                                        AADOActChk = "合格";
                                    }
                                    else {
                                        AADOActChk = "不合格";
                                    }

                                    // 压力试验
                                    let AADETA, AADZETA, AADPT, AADOTestAllow;
                                    if (AADTest === "液压试验") {

                                        AADETA = 1.25;
                                        AADPT = AADETA * AADPD * AADO / Math.max(AADOT, AADOT1);
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "试压类型：液压" +
                                            "&ensp;|&ensp;" +
                                            "试验压力：" + AADPT.toFixed(4) + " MPa" +
                                            "</span>");
                                        AADZETA = 0.9;
                                        AADOTestAllow = AADZETA * AADRel * AADFAI;
                                    }
                                    else if (AADTest === "气压试验") {

                                        AADETA = 1.1;
                                        AADPT = AADETA * AADPD * AADO / Math.max(AADOT, AADOT1);
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "试压类型：气压" +
                                            "&ensp;|&ensp;" +
                                            "试验压力：" + AADPT.toFixed(4) + " MPa" +
                                            "</span>");
                                        AADZETA = 0.8;
                                        AADOTestAllow = AADZETA * AADRel * AADFAI;
                                    }
                                    else {
                                        return false;
                                    }
                                    let AADOTest;
                                    if (AADIDOD === "内径") {
                                        AADOTest = AADPT * (AADM * AADBRI + 0.5 * AADTHKE) / (2 * AADTHKE);
                                    }
                                    else if (AADIDOD === "外径") {
                                        AADOTest = AADPT * (AADM * AADBRO - (AADM - 0.5) * AADTHKE) / (2 * AADTHKE);
                                    }
                                    else {
                                        return false;
                                    }

                                    let AADOTestChk;
                                    if (AADOTest <= AADOTestAllow) {
                                        AADOTestChk = "合格";
                                    }
                                    else {
                                        AADOTestChk = "不合格";
                                    }

                                    let AADMAWP;
                                    if (AADIDOD === "内径") {
                                        AADMAWP = (2 * AADTHKE * AADOT * AADFAI) / (AADM * AADBRI + 0.5 * AADTHKE) - AADPS;
                                    }
                                    else if (AADIDOD === "外径") {
                                        AADMAWP = (2 * AADTHKE * AADOT * AADFAI) / (AADM * AADBRO - (AADM - 0.5) * AADTHKE) - AADPS;
                                    }
                                    else {
                                        return false;
                                    }

                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "MAWP：" + AADMAWP.toFixed(4) + " MPa" +
                                        "</span>");

                                    // 弧度角 AADANG
                                    let AADANG = Math.acos((AADDI / 2 - AADSRI) / (AADBRI - AADSRI));

                                    // C1 C2 C3 C4
                                    let AADXC1 = (Math.sin(AADANG)) / 4;
                                    let AADXC2 = ((Math.sin(AADANG) * Math.cos(AADANG)) + AADANG) / 2 - Math.sin(AADANG);
                                    let AADXC3 = (2 * Math.sin(AADANG)) - ((Math.pow(Math.sin(AADANG), 3)) / 3) - (Math.sin(AADANG) * Math.cos(AADANG)) - AADANG;
                                    let AADXC4 = (2 + Math.sin(AADANG)) * Math.pow(1 - Math.sin(AADANG), 2) / 3;

                                    // HI HO
                                    let AADHI, AADHO;
                                    if (AADIDOD === "内径") {
                                        AADHI = (1 - Math.sin(AADANG)) * AADBRI + AADSRI * Math.sin(AADANG);
                                        AADHO = AADHI + AADTHKN;
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "封头内壁曲面深度：" + AADHI.toFixed(2) + " mm" +
                                            "</span>");
                                    }
                                    else if (AADIDOD === "外径") {
                                        AADHO = (1 - Math.sin(AADANG)) * AADBRO + AADSRO * Math.sin(AADANG);
                                        AADHI = AADHO - AADTHKN;
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "封头外壁曲面高度：" + AADHO.toFixed(2) + " mm" +
                                            "</span>");
                                    }
                                    else {
                                        return false;
                                    }

                                    let AADH;
                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                        AADH = parseFloat(rows[18][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        aad2d(AADIDOD, "Φ" + AADDI, "Φ" + AADDOUT, "R" + AADBRI, "R" + AADBRO, "R" + AADSRI, "R" + AADSRO, AADTHKN, AADH);
                                        aadd2.off("resize").on("resize", function () {
                                            if ($("#aad").length > 0) {
                                                aad2d(AADIDOD, "Φ" + AADDI, "Φ" + AADDOUT, "R" + AADBRI, "R" + AADBRO, "R" + AADSRI, "R" + AADSRO, AADTHKN, AADH);
                                            }
                                        });
                                    }
                                    aadd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                aad2d(AADIDOD, "Φ" + AADDI, "Φ" + AADDOUT, "R" + AADBRI, "R" + AADBRO, "R" + AADSRI, "R" + AADSRO, AADTHKN, AADH);
                                                aadd2.off("resize").on("resize", function () {
                                                    if ($("#aad").length > 0) {
                                                        aad2d(AADIDOD, "Φ" + AADDI, "Φ" + AADDOUT, "R" + AADBRI, "R" + AADBRO, "R" + AADSRI, "R" + AADSRO, AADTHKN, AADH);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    let AADAI = 2 * Math.PI * (AADDI * AADSRI * AADANG / 2 + AADSRI * AADSRI * (Math.sin(AADANG) - AADANG) + AADBRI * AADBRI * (1 - Math.sin(AADANG)) + AADDI * AADH / 2) / 1000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "内表面积：" + AADAI.toFixed(4) + " m²" +
                                        "</span>");
                                    let AADAO = 2 * Math.PI * (AADDOUT * AADSRO * AADANG / 2 + AADSRO * AADSRO * (Math.sin(AADANG) - AADANG) + AADBRO * AADBRO * (1 - Math.sin(AADANG)) + AADDOUT * AADH / 2) / 1000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "外表面积：" + AADAO.toFixed(4) + " m²" +
                                        "</span>");
                                    let AADVI = Math.PI * (AADXC1 * AADDI * AADDI * AADSRI + AADXC2 * AADDI * AADSRI * AADSRI + AADXC3 * AADSRI * AADSRI * AADSRI + AADXC4 * AADBRI * AADBRI * AADBRI + AADDI * AADDI * AADH / 4) / 1000000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "内容积：" + AADVI.toFixed(4) + " m³" +
                                        "</span>");
                                    let AADVO = Math.PI * (AADXC1 * AADDOUT * AADDOUT * AADSRO + AADXC2 * AADDOUT * AADSRO * AADSRO + AADXC3 * AADSRO * AADSRO * AADSRO + AADXC4 * AADBRO * AADBRO * AADBRO + AADDOUT * AADDOUT * AADH / 4) / 1000000000;
                                    let AADMASS = AADD * (AADVO - AADVI);
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "重量：" + AADMASS.toFixed(4) + " kg" +
                                        "</span>");

                                    // docx
                                    function getDocx() {
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "aaddocx.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                ribbonName: "AAD",

                                                idod: AADIDOD,

                                                pd: AADPD,
                                                t: AADDT,
                                                ps: AADPS,
                                                di: AADDI,
                                                bri: AADBRI,
                                                sri: AADSRI,
                                                h: AADH,
                                                thkn: AADTHKN,
                                                std: AADSTDVal,
                                                name: AADNameVal,
                                                c2: AADC2,
                                                fai: AADFAI,
                                                test: AADTest,

                                                d: AADD.toFixed(4),
                                                rel: AADRel.toFixed(4),
                                                c1: AADC1.toFixed(4),
                                                ot: AADOT.toFixed(4),
                                                o: AADO.toFixed(4),
                                                ot1: AADOT1.toFixed(4),

                                                c: AADC.toFixed(4),
                                                thke: AADTHKE.toFixed(4),
                                                dout: AADDOUT.toFixed(4),
                                                pc: AADPC.toFixed(4),
                                                bro: AADBRO.toFixed(4),
                                                sro: AADSRO.toFixed(4),

                                                m: AADM.toFixed(4),
                                                thkc: AADTHKC.toFixed(4),
                                                thkm: AADTHKMini.toFixed(4),
                                                thkMinimum: AADTHKMinimum.toFixed(4),
                                                thkd: AADTHKD.toFixed(4),
                                                thkChk: AADTHKCHK,
                                                oAct: AADOAct.toFixed(4),
                                                oActAllow: AADOActAllow.toFixed(4),
                                                oActChk: AADOActChk,

                                                eta: AADETA.toFixed(4),
                                                pt: AADPT.toFixed(4),
                                                oTest: AADOTest.toFixed(4),
                                                zeta: AADZETA.toFixed(4),
                                                oTestAllow: AADOTestAllow.toFixed(4),
                                                oTestChk: AADOTestChk,

                                                mawp: AADMAWP.toFixed(4),

                                                hi: AADHI.toFixed(4),
                                                ai: AADAI.toFixed(4),
                                                ao: AADAO.toFixed(4),
                                                ho: AADHO.toFixed(4),
                                                vi: AADVI.toFixed(4),
                                                mass: AADMASS.toFixed(4)
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
                                                    AADPayJS.dialog({
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
                                                                AADPayJS.dialog("close");
                                                                AADPayJS.dialog("clear");
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
                                                                            AADPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                            // 倒计时计数器
                                                                            let maxTime = 4, timer;

                                                                            function CountDown() {
                                                                                if (maxTime >= 0) {
                                                                                    $("#payjs_timer").html(maxTime);
                                                                                    --maxTime;
                                                                                } else {

                                                                                    clearInterval(timer);
                                                                                    // 关闭并清空收银台
                                                                                    AADPayJS.dialog('close');
                                                                                    AADPayJS.dialog('clear');
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
                                        "<span style='color:red;'>&ensp;封头材料力学特性获取失败，请检查网络后重试</span>");
                                }
                            });
                        },
                        error: function () {
                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                "<span style='color:red;'>&ensp;封头材料物理性质获取失败，请检查网络后重试</span>");
                        }
                    });
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
                pg.propertygrid('options').finder.getTr(this, 12).hide();
                pg.propertygrid('options').finder.getTr(this, 14).hide();
                pg.propertygrid('options').finder.getTr(this, 16).hide();
            }
        });
    });
});