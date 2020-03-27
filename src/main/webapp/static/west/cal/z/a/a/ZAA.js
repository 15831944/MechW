$(document).ready(function () {

    $("#cal").html("<table id='zaa'></table>");

    let pg = $("#zaa");
    let south = $("#south");
    let columns;
    let rows;

    $.getJSON("/static/west/cal/z/a/a/ZAA.json", function (result) {

        let lastIndex;
        pg.propertygrid({
            title: "TSG 21-2016 压力容器划类",
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
                    field: "value",
                    title: "值",
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
                    ZAACal();
                }
            },
            onLoadSuccess: function (data) {
                columns = pg.propertygrid("options").columns;
                rows = pg.propertygrid("getRows");
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });

    $("#center").resize(function () {
        if ($("#zaa").length > 0) {
            ZAACal();
        }
    });

    function ZAACal() {
        south.empty();
        $("#center").empty();

        // 毒性
        let ZAATag = 0;
        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
            let ZAADX = rows[0][columns[0][1].field];
            if (ZAADX === "极度、高度危害") {
                ZAATag = ZAATag + 1;
            }
        }

        // 爆炸特性
        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
            let ZAABZ = rows[1][columns[0][1].field];
            if (ZAABZ === "易爆") {
                ZAATag = ZAATag + 1;
            }
        }

        // 介质形态
        let ZAAXT;
        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
            ZAAXT = rows[2][columns[0][1].field];
            if (ZAAXT === "液化气体") {
                ZAATag = ZAATag + 1;
            }

            let ZAACategory;
            if (ZAATag >= 1) {
                ZAACategory = 1;
                plot1();
                south.html("介质分组：第一组").css("color", "rgb(68, 68, 68)");
            } else {
                ZAACategory = 2;
                plot2();
                south.html("介质分组：第二组").css("color", "rgb(68, 68, 68)");
            }

            // 工作压力
            if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                let ZAAWP = parseFloat(rows[3][columns[0][1].field]);

                // 内直径
                if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                    let ZAAID = parseFloat(rows[4][columns[0][1].field]);

                    // 设计压力
                    if ((!jQuery.isEmptyObject(rows[5][columns[0][1].field])) && (parseFloat(rows[5][columns[0][1].field]) >= ZAAWP)) {
                        let ZAADP = parseFloat(rows[5][columns[0][1].field]);

                        // 内容积
                        if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                            let ZAAV = parseFloat(rows[6][columns[0][1].field]);

                            // PV 值
                            let ZAAPV = ZAADP * ZAAV;
                            south.append(
                                "&ensp;|&ensp;" +
                                "P×V：" + ZAAPV.toFixed(4) + " MPa·m³");

                            // 判断是否归容规管辖
                            if ((ZAAWP >= 0.1)
                                && (ZAAV >= 0.03)
                                && (ZAAID >= 150)
                                && ((ZAAXT === "气体") || (ZAAXT === "液化气体") || (ZAAXT === "液体(工作温度≥标准沸点)"))) {
                                south.append(
                                    "&ensp;|&ensp;" +
                                    "是否归大容规管辖：是").css("color", "rgb(68, 68, 68)");

                                $("#canvas").empty();
                                if (ZAACategory === 1) {
                                    if ((ZAAV < 0.03) || (ZAADP < 0.1)) {
                                    } else if (
                                        ((ZAADP < 10) && (ZAAV < (50 / 10)))
                                        || ((ZAAPV < 50) && (ZAAV >= (50 / 10)) && (ZAAV < (50 / 1.6)))
                                        || ((ZAAV >= (50 / 1.6)) && (ZAAV < (1000 / 1.6)) && (ZAADP < 1.6))
                                        || ((ZAAPV < 1000) && (ZAAV >= (1000 / 1.6)) && (ZAAV < (1000 / 0.1)))
                                    ) {
                                        south.append(
                                            "&ensp;|&ensp;" +
                                            "容器类别：Ⅱ"
                                        ).css("color", "rgb(68, 68, 68)");
                                    } else if (
                                        ((ZAAV >= 0.03) && (ZAADP >= 10) && (ZAAV < 5))
                                        || ((ZAAV >= 5) && (ZAAPV >= 50) && (ZAAV < 50 / 1.6))
                                        || ((ZAAV >= 50 / 1.6) && (ZAADP >= 1.6) && (ZAAV < 1000 / 1.6))
                                        || ((ZAAV >= 1000 / 1.6) && (ZAAPV >= 1000) && (ZAAV < 1000 / 0.1))
                                        || ((ZAAV >= 1000 / 0.1) && (ZAADP >= 0.1))) {
                                        south.append(
                                            "&ensp;|&ensp;" +
                                            "容器类别：Ⅲ"
                                        ).css("color", "rgb(68, 68, 68)");
                                    }
                                    plot1_data(ZAAV, ZAADP);

                                } else if (ZAACategory === 2) {
                                    if ((ZAAV < 0.03) || (ZAADP < 0.1)) {
                                    } else if (
                                        ((ZAADP < 1.6) && (ZAAV < (5000 / 1.6)))
                                        || ((ZAAPV < 5000) && (ZAAV >= (5000 / 1.6)))
                                    ) {
                                        south.append(
                                            "&ensp;|&ensp;" +
                                            "容器类别：Ⅰ"
                                        ).css("color", "rgb(68, 68, 68)");
                                    } else if (
                                        ((ZAADP < 10) && (ZAAV < (500 / 10)))
                                        || ((ZAAPV < 500) && (ZAAV >= (500 / 10)))) {
                                        south.append(
                                            "&ensp;|&ensp;" +
                                            "容器类别：Ⅱ"
                                        ).css("color", "rgb(68, 68, 68)");
                                    } else if (((ZAAV >= 0.03) && (ZAADP >= 10) && (ZAAV < (500 / 10)))
                                        || ((ZAAV >= (500 / 10)) && (ZAAPV >= 500) && (ZAAV < 500 / 1.6))
                                        || ((ZAAV >= 500 / 1.6) && (ZAADP >= 1.6) && (ZAAV < 5000 / 1.6))
                                        || ((ZAAV >= 5000 / 1.6) && (ZAAPV >= 5000) && (ZAAV < 5000 / 0.1))
                                        || ((ZAAV >= 5000 / 0.1) && (ZAADP >= 0.1))) {
                                        south.append(
                                            "&ensp;|&ensp;" +
                                            "容器类别：Ⅲ"
                                        ).css("color", "rgb(68, 68, 68)");
                                    }
                                    plot2_data(ZAAV, ZAADP);
                                }

                            } else {
                                south.append(
                                    "&ensp;|&ensp;" +
                                    "是否归大容规管辖：否").css("color", "rgb(68, 68, 68)");
                            }

                        }

                    } else if ((!jQuery.isEmptyObject(rows[5][columns[0][1].field])) && (parseFloat(rows[5][columns[0][1].field]) < ZAAWP)) {
                        south.html("容器设计压力不能小于工作压力").css("color", "red");
                    }

                }

            }

        }

    }

    function plot1() {

        // svgContainer
        let svgContainer = $("#center");
        let width = svgContainer.width();
        let height = svgContainer.height();

        // 提示栏和作图区清空
        south.empty();
        svgContainer.empty();

        // 新建 svg 元素
        let svg = d3.select("#center")
            .append("svg")
            .attr("width", width)
            .attr("id", "ZAAsvg")
            .attr("height", height);

        // X 轴比例尺
        let xScale = d3.scaleLog()
            .domain([0.01, 1000000])
            .range([0, width - 100]);

        // X 坐标轴
        let xAxis = d3.axisBottom()
            .scale(xScale)
            .tickFormat(function (d) {
                if (Math.log10(d) === -2) {
                    return "10⁻²";
                } else if (Math.log10(d) === -1) {
                    return "10⁻¹";
                } else if (Math.log10(d) === 0) {
                    return "10⁰";
                } else if (Math.log10(d) === 1) {
                    return "10¹";
                } else if (Math.log10(d) === 2) {
                    return "10²";
                } else if (Math.log10(d) === 3) {
                    return "10³";
                } else if (Math.log10(d) === 4) {
                    return "10⁴";
                } else if (Math.log10(d) === 5) {
                    return "10⁵";
                } else if (Math.log10(d) === 6) {
                    return "10⁶";
                } else {
                    return "";
                }
            });
        svg.append("g")
            .attr("transform", function () {
                return "translate(" + 60 + "," + (height - 60) + ")"
            })
            .classed("x-axis", true)
            .call(xAxis);

        // 竖向背景
        svg.selectAll("g.x-axis > g.tick")
            .append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", -(height - 120 + 6));

        // Y 轴比例尺
        let yScale = d3.scaleLog()
            .domain([350, 0.01])
            .range([0, height - 120]);

        // Y 坐标轴
        let yAxis = d3.axisLeft()
            .scale(yScale)
            .tickFormat(function (d) {
                if (Math.log10(d) === -2) {
                    return "0.01";
                } else if (Math.log10(d) === -1) {
                    return "0.1";
                } else if (Math.log10(d) === 0) {
                    return "1";
                } else if (Math.log10(d) === 1) {
                    return "10";
                } else if (Math.log10(d) === 2) {
                    return "100";
                } else if (Math.abs(d - 350) <= 0.00001) {
                    return "350";
                } else {
                    return "";
                }
            });
        svg.append("g")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")"
            })
            .classed("y-axis", true)
            .call(yAxis);

        // 横向背景
        svg.selectAll("g.y-axis > g.tick")
            .append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (width - 100 + 6))
            .attr("y2", 0);

        // 350 横线及标签
        let g350 = svg.selectAll("g.y-axis")
            .append("g")
            .classed("tick", true)
            .attr("opacity", "1")
            .attr("transform", "translate(0,0)");
        g350.append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (width - 100 + 6))
            .attr("y2", 0);
        g350.append("line")
            .attr("stroke", "#000")
            .attr("x2", -6);
        g350.append("text")
            .attr("fill", "#000")
            .attr("x", -9)
            .attr("dy", "0.32em")
            .text("350");

        // 添加划类线
        let line = d3.line()
            .x(function (d) {
                return xScale(d.x);
            })
            .y(function (d) {
                return yScale(d.y);
            });

        // 线 1
        let data1 = [
            {x: 0.03, y: 0.1},
            {x: 0.03, y: 420}
        ];
        svg.append("path")
            .attr("id", "zaac1-1")
            .attr("d", line(data1))
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g1 = svg.append("g");
        let text1 = g1.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", -5)
            .attr("text-anchor", "middle");
        text1.append("textPath")
            .attr("xlink:href", "#zaac1-1")
            .attr("startOffset", "50%")
            .text("V = 0.03 m³");
        let ctm1 = text1.node().getCTM();
        ctm1.scale = true;
        let s1 = ctm1.a + " " + ctm1.b + " " + ctm1.c + " " + ctm1.d + " " + ctm1.e + " " + ctm1.f;
        let bb1 = text1.node().getBBox();
        g1.insert("rect", "text")
            .attr("x", bb1.x)
            .attr("y", bb1.y)
            .attr("width", bb1.width)
            .attr("height", bb1.height)
            .attr("fill", "white")
            .attr("transform", "matrix(" + s1 + ")");

        // 线 2
        let data2 = [
            {x: 0.03, y: 0.1},
            {x: 1120000, y: 0.1}
        ];
        svg.append("path")
            .attr("id", "zaac1-2")
            .attr("d", line(data2))
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g2 = svg.append("g");
        let text2 = g2.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", -5)
            .attr("text-anchor", "middle");
        text2.append("textPath")
            .attr("xlink:href", "#zaac1-2")
            .attr("startOffset", "50%")
            .text("P = 0.1 MPa");
        let ctm2 = text2.node().getCTM();
        ctm2.scale = true;
        let s2 = ctm2.a + " " + ctm2.b + " " + ctm2.c + " " + ctm2.d + " " + ctm2.e + " " + ctm2.f;
        let bb2 = text2.node().getBBox();
        g2.insert("rect", "text")
            .attr("x", bb2.x)
            .attr("y", bb2.y)
            .attr("width", bb2.width)
            .attr("height", bb2.height)
            .attr("fill", "white")
            .attr("transform", "matrix(" + s2 + ")");

        // 线 3
        let data3 = [
            {x: 0.03, y: 10},
            {x: 5, y: 10}
        ];
        svg.append("path")
            .attr("id", "zaac1-3")
            .attr("d", line(data3))
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g3 = svg.append("g");
        let text3 = g3.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", -5)
            .attr("text-anchor", "middle");
        text3.append("textPath")
            .attr("xlink:href", "#zaac1-3")
            .attr("startOffset", "50%")
            .text("P = 10 MPa");
        let ctm3 = text3.node().getCTM();
        ctm3.scale = true;
        let s3 = ctm3.a + " " + ctm3.b + " " + ctm3.c + " " + ctm3.d + " " + ctm3.e + " " + ctm3.f;
        let bb3 = text3.node().getBBox();
        g3.insert("rect", "text")
            .attr("x", bb3.x)
            .attr("y", bb3.y)
            .attr("width", bb3.width)
            .attr("height", bb3.height)
            .attr("fill", "white")
            .attr("transform", "matrix(" + s3 + ")");

        // 线 4
        let data4 = [
            {x: 5, y: 10},
            {x: 50 / 1.6, y: 1.6}
        ];
        svg.append("path")
            .attr("id", "zaac1-4")
            .attr("d", line(data4))
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g4 = svg.append("g");
        let x4 = (xScale(50 / 1.6) + xScale(50 / 10)) / 2 + 4 + 60;
        let y4 = (yScale(1.6) + yScale(10)) / 2 - 4 + 60;
        let rotate4 = Math.atan((yScale(1.6) - yScale(10)) / (xScale(50 / 1.6) - xScale(50 / 10))) / Math.PI * 180;
        let text4 = g4.append("text")
            .attr("x", x4)
            .attr("y", y4)
            .attr("dy", 0)
            .attr("text-anchor", "middle")
            .style("transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-webkit-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-moz-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-o-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-ms-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .text("PV = 50 MPa·m³");
        let bb4 = text4.node().getBBox();
        g4.insert("rect", "text")
            .attr("x", bb4.x)
            .attr("y", bb4.y)
            .attr("width", bb4.width)
            .attr("height", bb4.height)
            .attr("fill", "white")
            .style("transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-webkit-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-moz-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-o-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-ms-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)");

        // 线 5
        let data5 = [
            {x: 50 / 1.6, y: 1.6},
            {x: 1000 / 1.6, y: 1.6}
        ];
        svg.append("path")
            .attr("id", "zaac1-5")
            .attr("d", line(data5))
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g5 = svg.append("g");
        let text5 = g5.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", -5)
            .attr("text-anchor", "middle");
        text5.append("textPath")
            .attr("xlink:href", "#zaac1-5")
            .attr("startOffset", "50%")
            .text("P = 1.6 MPa");
        let ctm5 = text5.node().getCTM();
        ctm5.scale = true;
        let s5 = ctm5.a + " " + ctm5.b + " " + ctm5.c + " " + ctm5.d + " " + ctm5.e + " " + ctm5.f;
        let bb5 = text5.node().getBBox();
        g5.insert("rect", "text")
            .attr("x", bb5.x)
            .attr("y", bb5.y)
            .attr("width", bb5.width)
            .attr("height", bb5.height)
            .attr("fill", "white")
            .attr("transform", "matrix(" + s5 + ")");

        // 线 6
        let data6 = [
            {x: 1000 / 1.6, y: 1.6},
            {x: 10000, y: 0.1}
        ];
        svg.append("path")
            .attr("id", "zaac1-6")
            .attr("d", line(data6))
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g6 = svg.append("g");
        let x6 = (xScale(1000 / 0.1) + xScale(1000 / 1.6)) / 2 + 4 + 60;
        let y6 = (yScale(0.1) + yScale(1.6)) / 2 - 4 + 60;
        let rotate6 = Math.atan((yScale(0.1) - yScale(1.6)) / (xScale(1000 / 0.1) - xScale(1000 / 1.6))) / Math.PI * 180;
        let text6 = g6.append("text")
            .attr("x", x6)
            .attr("y", y6)
            .attr("dy", 0)
            .attr("text-anchor", "middle")
            .style("transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-webkit-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-moz-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-o-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-ms-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .text("PV = 1000 MPa·m³");
        let bb6 = text6.node().getBBox();
        g6.insert("rect", "text")
            .attr("x", bb6.x)
            .attr("y", bb6.y)
            .attr("width", bb6.width)
            .attr("height", bb6.height)
            .attr("fill", "white")
            .style("transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-webkit-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-moz-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-o-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-ms-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)");

        // X 轴标签
        svg.append("text")
            .attr("transform", "translate(" + (60 + (width - 100) / 2) + "," + (height - 10) + ")")
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text("容积，V/m³");

        // Y 轴标签
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 30)
            .attr("x", -height / 2)
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text("设计压力，P/MPa");

        //图表标题
        svg.append("text")
            .attr("transform", "translate(" + (60 + (width - 100) / 2) + "," + 35 + ")")
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text("图 A-1 压力容器分类图——第一组介质");

        // 类别符号
        svg.append("text")
            .attr("transform", "translate(" + (60 + (width - 100) / 8 * 2.5) + "," + (60 + (height - 120) / 4.5 * 2.8) + ")")
            .style("text-anchor", "middle")
            .style("font-size", "36px")
            .text("Ⅱ");
        svg.append("text")
            .attr("transform", "translate(" + (60 + (width - 100) / 8 * 5) + "," + (60 + (height - 120) / 4.5 * 1.3) + ")")
            .style("text-anchor", "middle")
            .style("font-size", "36px")
            .text("Ⅲ");

    }

    function plot1_data(volume, pressure) {

        // svgContainer 定义
        let svgContainer = $("#center");
        let width = svgContainer.width();
        let height = svgContainer.height();

        // 提示栏和作图区清空
        svgContainer.empty();

        // 新建 svg 元素
        let svg = d3.select("#center")
            .append("svg")
            .attr("width", width)
            .attr("id", "ZAAsvg")
            .attr("height", height);

        // X 轴比例尺
        let xScale = d3.scaleLog()
            .domain([0.01, 1000000])
            .range([0, width - 100]);

        // X 坐标轴
        let xAxis = d3.axisBottom()
            .scale(xScale)
            .tickFormat(function (d) {
                if (Math.log10(d) === -2) {
                    return "10⁻²";
                } else if (Math.log10(d) === -1) {
                    return "10⁻¹";
                } else if (Math.log10(d) === 0) {
                    return "10⁰";
                } else if (Math.log10(d) === 1) {
                    return "10¹";
                } else if (Math.log10(d) === 2) {
                    return "10²";
                } else if (Math.log10(d) === 3) {
                    return "10³";
                } else if (Math.log10(d) === 4) {
                    return "10⁴";
                } else if (Math.log10(d) === 5) {
                    return "10⁵";
                } else if (Math.log10(d) === 6) {
                    return "10⁶";
                } else {
                    return "";
                }
            });
        svg.append("g")
            .attr("transform", function () {
                return "translate(" + 60 + "," + (height - 60) + ")"
            })
            .classed("x-axis", true)
            .call(xAxis);

        // 竖向背景
        svg.selectAll("g.x-axis > g.tick")
            .append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", -(height - 120 + 6));

        // Y 轴比例尺
        let yScale = d3.scaleLog()
            .domain([350, 0.01])
            .range([0, height - 120]);

        // Y 坐标轴
        let yAxis = d3.axisLeft()
            .scale(yScale)
            .tickFormat(function (d) {
                if (Math.log10(d) === -2) {
                    return "0.01";
                } else if (Math.log10(d) === -1) {
                    return "0.1";
                } else if (Math.log10(d) === 0) {
                    return "1";
                } else if (Math.log10(d) === 1) {
                    return "10";
                } else if (Math.log10(d) === 2) {
                    return "100";
                } else if (Math.abs(d - 350) <= 0.00001) {
                    return "350";
                } else {
                    return "";
                }
            });
        svg.append("g")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")"
            })
            .classed("y-axis", true)
            .call(yAxis);

        // 横向背景
        svg.selectAll("g.y-axis > g.tick")
            .append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (width - 100 + 6))
            .attr("y2", 0);

        // 350 横线及标签
        let g350 = svg.selectAll("g.y-axis")
            .append("g")
            .classed("tick", true)
            .attr("opacity", "1")
            .attr("transform", "translate(0,0)");
        g350.append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (width - 100 + 6))
            .attr("y2", 0);
        g350.append("line")
            .attr("stroke", "#000")
            .attr("x2", -6);
        g350.append("text")
            .attr("fill", "#000")
            .attr("x", -9)
            .attr("dy", "0.32em")
            .text("350");

        // 添加划类线
        let line = d3.line()
            .x(function (d) {
                return xScale(d.x);
            })
            .y(function (d) {
                return yScale(d.y);
            });

        // 线 1
        let data1 = [
            {x: 0.03, y: 0.1},
            {x: 0.03, y: 420}
        ];
        svg.append("path")
            .attr("id", "zaac1-1")
            .attr("d", line(data1))
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g1 = svg.append("g");
        let text1 = g1.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", -5)
            .attr("text-anchor", "middle");
        text1.append("textPath")
            .attr("xlink:href", "#zaac1-1")
            .attr("startOffset", "50%")
            .text("V = 0.03 m³");
        let ctm1 = text1.node().getCTM();
        ctm1.scale = true;
        let s1 = ctm1.a + " " + ctm1.b + " " + ctm1.c + " " + ctm1.d + " " + ctm1.e + " " + ctm1.f;
        let bb1 = text1.node().getBBox();
        g1.insert("rect", "text")
            .attr("x", bb1.x)
            .attr("y", bb1.y)
            .attr("width", bb1.width)
            .attr("height", bb1.height)
            .attr("fill", "white")
            .attr("transform", "matrix(" + s1 + ")");

        // 线 2
        let data2 = [
            {x: 0.03, y: 0.1},
            {x: 1120000, y: 0.1}
        ];
        svg.append("path")
            .attr("id", "zaac1-2")
            .attr("d", line(data2))
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g2 = svg.append("g");
        let text2 = g2.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", -5)
            .attr("text-anchor", "middle");
        text2.append("textPath")
            .attr("xlink:href", "#zaac1-2")
            .attr("startOffset", "50%")
            .text("P = 0.1 MPa");
        let ctm2 = text2.node().getCTM();
        ctm2.scale = true;
        let s2 = ctm2.a + " " + ctm2.b + " " + ctm2.c + " " + ctm2.d + " " + ctm2.e + " " + ctm2.f;
        let bb2 = text2.node().getBBox();
        g2.insert("rect", "text")
            .attr("x", bb2.x)
            .attr("y", bb2.y)
            .attr("width", bb2.width)
            .attr("height", bb2.height)
            .attr("fill", "white")
            .attr("transform", "matrix(" + s2 + ")");

        // 线 3
        let data3 = [
            {x: 0.03, y: 10},
            {x: 5, y: 10}
        ];
        svg.append("path")
            .attr("id", "zaac1-3")
            .attr("d", line(data3))
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g3 = svg.append("g");
        let text3 = g3.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", -5)
            .attr("text-anchor", "middle");
        text3.append("textPath")
            .attr("xlink:href", "#zaac1-3")
            .attr("startOffset", "50%")
            .text("P = 10 MPa");
        let ctm3 = text3.node().getCTM();
        ctm3.scale = true;
        let s3 = ctm3.a + " " + ctm3.b + " " + ctm3.c + " " + ctm3.d + " " + ctm3.e + " " + ctm3.f;
        let bb3 = text3.node().getBBox();
        g3.insert("rect", "text")
            .attr("x", bb3.x)
            .attr("y", bb3.y)
            .attr("width", bb3.width)
            .attr("height", bb3.height)
            .attr("fill", "white")
            .attr("transform", "matrix(" + s3 + ")");

        // 线 4
        let data4 = [
            {x: 5, y: 10},
            {x: 50 / 1.6, y: 1.6}
        ];
        svg.append("path")
            .attr("id", "zaac1-4")
            .attr("d", line(data4))
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g4 = svg.append("g");
        let x4 = (xScale(50 / 1.6) + xScale(50 / 10)) / 2 + 4 + 60;
        let y4 = (yScale(1.6) + yScale(10)) / 2 - 4 + 60;
        let rotate4 = Math.atan((yScale(1.6) - yScale(10)) / (xScale(50 / 1.6) - xScale(50 / 10))) / Math.PI * 180;
        let text4 = g4.append("text")
            .attr("x", x4)
            .attr("y", y4)
            .attr("dy", 0)
            .attr("text-anchor", "middle")
            .style("transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-webkit-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-moz-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-o-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-ms-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .text("PV = 50 MPa·m³");
        let bb4 = text4.node().getBBox();
        g4.insert("rect", "text")
            .attr("x", bb4.x)
            .attr("y", bb4.y)
            .attr("width", bb4.width)
            .attr("height", bb4.height)
            .attr("fill", "white")
            .style("transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-webkit-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-moz-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-o-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-ms-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)");

        // 线 5
        let data5 = [
            {x: 50 / 1.6, y: 1.6},
            {x: 1000 / 1.6, y: 1.6}
        ];
        svg.append("path")
            .attr("id", "zaac1-5")
            .attr("d", line(data5))
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g5 = svg.append("g");
        let text5 = g5.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", -5)
            .attr("text-anchor", "middle");
        text5.append("textPath")
            .attr("xlink:href", "#zaac1-5")
            .attr("startOffset", "50%")
            .text("P = 1.6 MPa");
        let ctm5 = text5.node().getCTM();
        ctm5.scale = true;
        let s5 = ctm5.a + " " + ctm5.b + " " + ctm5.c + " " + ctm5.d + " " + ctm5.e + " " + ctm5.f;
        let bb5 = text5.node().getBBox();
        g5.insert("rect", "text")
            .attr("x", bb5.x)
            .attr("y", bb5.y)
            .attr("width", bb5.width)
            .attr("height", bb5.height)
            .attr("fill", "white")
            .attr("transform", "matrix(" + s5 + ")");

        // 线 6
        let data6 = [
            {x: 1000 / 1.6, y: 1.6},
            {x: 10000, y: 0.1}
        ];
        svg.append("path")
            .attr("id", "zaac1-6")
            .attr("d", line(data6))
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g6 = svg.append("g");
        let x6 = (xScale(1000 / 0.1) + xScale(1000 / 1.6)) / 2 + 4 + 60;
        let y6 = (yScale(0.1) + yScale(1.6)) / 2 - 4 + 60;
        let rotate6 = Math.atan((yScale(0.1) - yScale(1.6)) / (xScale(1000 / 0.1) - xScale(1000 / 1.6))) / Math.PI * 180;
        let text6 = g6.append("text")
            .attr("x", x6)
            .attr("y", y6)
            .attr("dy", 0)
            .attr("text-anchor", "middle")
            .style("transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-webkit-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-moz-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-o-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-ms-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .text("PV = 1000 MPa·m³");
        let bb6 = text6.node().getBBox();
        g6.insert("rect", "text")
            .attr("x", bb6.x)
            .attr("y", bb6.y)
            .attr("width", bb6.width)
            .attr("height", bb6.height)
            .attr("fill", "white")
            .style("transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-webkit-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-moz-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-o-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-ms-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)");

        // 给 X 轴添加标签
        svg.append("text")
            .attr("transform", "translate(" + (60 + (width - 100) / 2) + "," + (height - 10) + ")")
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text("容积，V/m³");

        // 给 Y 轴添加标签
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 30)
            .attr("x", -height / 2)
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text("设计压力，P/MPa");

        //给图表添加一个标题
        svg.append("text")
            .attr("transform", "translate(" + (60 + (width - 100) / 2) + "," + 35 + ")")
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text("图 A-1 压力容器分类图——第一组介质");

        // 添加类别符号
        svg.append("text")
            .attr("transform", "translate(" + (60 + (width - 100) / 8 * 2.5) + "," + (60 + (height - 120) / 4.5 * 2.8) + ")")
            .style("text-anchor", "middle")
            .style("font-size", "36px")
            .text("Ⅱ");
        svg.append("text")
            .attr("transform", "translate(" + (60 + (width - 100) / 8 * 5) + "," + (60 + (height - 120) / 4.5 * 1.3) + ")")
            .style("text-anchor", "middle")
            .style("font-size", "36px")
            .text("Ⅲ");

        // 分类点位置
        let dataset = [[volume, pressure]];
        svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("fill", "black")
            .attr("cx", function (d, i) {
                return 60 + xScale(d[0])
            })
            .attr("cy", function (d, i) {
                return 60 + yScale(d[1])
            })
            .attr("r", 5);

    }

    function plot2() {

        // svgContainer 定义
        let svgContainer = $("#center");
        let width = svgContainer.width();
        let height = svgContainer.height();

        // 提示栏和作图区清空
        south.empty();
        svgContainer.empty();

        // 新建 svg 元素
        let svg = d3.select("#center")
            .append("svg")
            .attr("width", width)
            .attr("id", "ZAAsvg")
            .attr("height", height);

        // X 轴比例尺
        let xScale = d3.scaleLog()
            .domain([0.01, 1000000])
            .range([0, width - 100]);

        // X 坐标轴
        let xAxis = d3.axisBottom()
            .scale(xScale)
            .tickFormat(function (d) {
                if (Math.log10(d) === -2) {
                    return "10⁻²";
                } else if (Math.log10(d) === -1) {
                    return "10⁻¹";
                } else if (Math.log10(d) === 0) {
                    return "10⁰";
                } else if (Math.log10(d) === 1) {
                    return "10¹";
                } else if (Math.log10(d) === 2) {
                    return "10²";
                } else if (Math.log10(d) === 3) {
                    return "10³";
                } else if (Math.log10(d) === 4) {
                    return "10⁴";
                } else if (Math.log10(d) === 5) {
                    return "10⁵";
                } else if (Math.log10(d) === 6) {
                    return "10⁶";
                } else {
                    return "";
                }
            });
        svg.append("g")
            .attr("transform", function () {
                return "translate(" + 60 + "," + (height - 60) + ")"
            })
            .classed("x-axis", true)
            .call(xAxis);

        // 竖向背景
        svg.selectAll("g.x-axis > g.tick")
            .append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", -(height - 120 + 6));

        // Y 轴比例尺
        let yScale = d3.scaleLog()
            .domain([350, 0.01])
            .range([0, height - 120]);

        // Y 坐标轴
        let yAxis = d3.axisLeft()
            .scale(yScale)
            .tickFormat(function (d) {
                if (Math.log10(d) === -2) {
                    return "0.01";
                } else if (Math.log10(d) === -1) {
                    return "0.1";
                } else if (Math.log10(d) === 0) {
                    return "1";
                } else if (Math.log10(d) === 1) {
                    return "10";
                } else if (Math.log10(d) === 2) {
                    return "100";
                } else if (Math.abs(d - 350) <= 0.00001) {
                    return "350";
                } else {
                    return "";
                }
            });
        svg.append("g")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")"
            })
            .classed("y-axis", true)
            .call(yAxis);

        // 横向背景
        svg.selectAll("g.y-axis > g.tick")
            .append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (width - 100 + 6))
            .attr("y2", 0);

        // 350 横线及标签
        let g350 = svg.selectAll("g.y-axis")
            .append("g")
            .classed("tick", true)
            .attr("opacity", "1")
            .attr("transform", "translate(0,0)");
        g350.append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (width - 100 + 6))
            .attr("y2", 0);
        g350.append("line")
            .attr("stroke", "#000")
            .attr("x2", -6);
        g350.append("text")
            .attr("fill", "#000")
            .attr("x", -9)
            .attr("dy", "0.32em")
            .text("350");

        // 添加划类线
        let line = d3.line()
            .x(function (d) {
                return xScale(d.x);
            })
            .y(function (d) {
                return yScale(d.y);
            });

        // 线 1
        let data1 = [
            {x: 0.03, y: 0.1},
            {x: 0.03, y: 420}
        ];
        svg.append("path")
            .attr("id", "zaac1-1")
            .attr("d", line(data1))
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g1 = svg.append("g");
        let text1 = g1.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", -5)
            .attr("text-anchor", "middle");
        text1.append("textPath")
            .attr("xlink:href", "#zaac1-1")
            .attr("startOffset", "50%")
            .text("V = 0.03 m³");
        let ctm1 = text1.node().getCTM();
        ctm1.scale = true;
        let s1 = ctm1.a + " " + ctm1.b + " " + ctm1.c + " " + ctm1.d + " " + ctm1.e + " " + ctm1.f;
        let bb1 = text1.node().getBBox();
        g1.insert("rect", "text")
            .attr("x", bb1.x)
            .attr("y", bb1.y)
            .attr("width", bb1.width)
            .attr("height", bb1.height)
            .attr("fill", "white")
            .attr("transform", "matrix(" + s1 + ")");

        // 线 2
        let data2 = [
            {x: 0.03, y: 0.1},
            {x: 1120000, y: 0.1}
        ];
        svg.append("path")
            .attr("id", "zaac1-2")
            .attr("d", line(data2))
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g2 = svg.append("g");
        let text2 = g2.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", -5)
            .attr("text-anchor", "middle");
        text2.append("textPath")
            .attr("xlink:href", "#zaac1-2")
            .attr("startOffset", "50%")
            .text("P = 0.1 MPa");
        let ctm2 = text2.node().getCTM();
        ctm2.scale = true;
        let s2 = ctm2.a + " " + ctm2.b + " " + ctm2.c + " " + ctm2.d + " " + ctm2.e + " " + ctm2.f;
        let bb2 = text2.node().getBBox();
        g2.insert("rect", "text")
            .attr("x", bb2.x)
            .attr("y", bb2.y)
            .attr("width", bb2.width)
            .attr("height", bb2.height)
            .attr("fill", "white")
            .attr("transform", "matrix(" + s2 + ")");

        // 线 3
        let data3 = [
            {x: 0.03, y: 10},
            {x: 500 / 10, y: 10}
        ];
        svg.append("path")
            .attr("id", "zaac1-3")
            .attr("d", line(data3))
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g3 = svg.append("g");
        let text3 = g3.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", -5)
            .attr("text-anchor", "middle");
        text3.append("textPath")
            .attr("xlink:href", "#zaac1-3")
            .attr("startOffset", "50%")
            .text("P = 10 MPa");
        let ctm3 = text3.node().getCTM();
        ctm3.scale = true;
        let s3 = ctm3.a + " " + ctm3.b + " " + ctm3.c + " " + ctm3.d + " " + ctm3.e + " " + ctm3.f;
        let bb3 = text3.node().getBBox();
        g3.insert("rect", "text")
            .attr("x", bb3.x)
            .attr("y", bb3.y)
            .attr("width", bb3.width)
            .attr("height", bb3.height)
            .attr("fill", "white")
            .attr("transform", "matrix(" + s3 + ")");

        // 线 4
        let data4 = [
            {x: 500 / 10, y: 10},
            {x: 500 / 1.6, y: 1.6}
        ];
        svg.append("path")
            .attr("id", "zaac1-4")
            .attr("d", line(data4))
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g4 = svg.append("g");
        let x4 = (xScale(500 / 1.6) + xScale(500 / 10)) / 2 + 4 + 60;
        let y4 = (yScale(1.6) + yScale(10)) / 2 - 4 + 60;
        let rotate4 = Math.atan((yScale(1.6) - yScale(10)) / (xScale(500 / 1.6) - xScale(500 / 10))) / Math.PI * 180;
        let text4 = g4.append("text")
            .attr("x", x4)
            .attr("y", y4)
            .attr("dy", 0)
            .attr("text-anchor", "middle")
            .style("transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-webkit-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-moz-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-o-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-ms-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .text("PV = 500 MPa·m³");
        let bb4 = text4.node().getBBox();
        g4.insert("rect", "text")
            .attr("x", bb4.x)
            .attr("y", bb4.y)
            .attr("width", bb4.width)
            .attr("height", bb4.height)
            .attr("fill", "white")
            .style("transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-webkit-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-moz-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-o-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-ms-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)");

        // 线 5
        let data5 = [
            {x: 0.03, y: 1.6},
            {x: 5000 / 1.6, y: 1.6}
        ];
        svg.append("path")
            .attr("id", "zaac1-5")
            .attr("d", line(data5))
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g5 = svg.append("g");
        let text5 = g5.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", -5)
            .attr("text-anchor", "middle");
        text5.append("textPath")
            .attr("xlink:href", "#zaac1-5")
            .attr("startOffset", "50%")
            .text("P = 1.6 MPa");
        let ctm5 = text5.node().getCTM();
        ctm5.scale = true;
        let s5 = ctm5.a + " " + ctm5.b + " " + ctm5.c + " " + ctm5.d + " " + ctm5.e + " " + ctm5.f;
        let bb5 = text5.node().getBBox();
        g5.insert("rect", "text")
            .attr("x", bb5.x)
            .attr("y", bb5.y)
            .attr("width", bb5.width)
            .attr("height", bb5.height)
            .attr("fill", "white")
            .attr("transform", "matrix(" + s5 + ")");

        // 线 6
        let data6 = [
            {x: 5000 / 1.6, y: 1.6},
            {x: 5000 / 0.1, y: 0.1}
        ];
        svg.append("path")
            .attr("id", "zaac1-6")
            .attr("d", line(data6))
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g6 = svg.append("g");
        let x6 = (xScale(5000 / 0.1) + xScale(5000 / 1.6)) / 2 + 4 + 60;
        let y6 = (yScale(0.1) + yScale(1.6)) / 2 - 4 + 60;
        let rotate6 = Math.atan((yScale(0.1) - yScale(1.6)) / (xScale(5000 / 0.1) - xScale(5000 / 1.6))) / Math.PI * 180;
        let text6 = g6.append("text")
            .attr("x", x6)
            .attr("y", y6)
            .attr("dy", 0)
            .attr("text-anchor", "middle")
            .style("transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-webkit-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-moz-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-o-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-ms-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .text("PV = 5000 MPa·m³");
        let bb6 = text6.node().getBBox();
        g6.insert("rect", "text")
            .attr("x", bb6.x)
            .attr("y", bb6.y)
            .attr("width", bb6.width)
            .attr("height", bb6.height)
            .attr("fill", "white")
            .style("transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-webkit-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-moz-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-o-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-ms-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)");

        // 给 X 轴添加标签
        svg.append("text")
            .attr("transform", "translate(" + (60 + (width - 100) / 2) + "," + (height - 10) + ")")
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text("容积，V/m³");

        // 给 Y 轴添加标签
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 30)
            .attr("x", -height / 2)
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text("设计压力，P/MPa");

        //给图表添加一个标题
        svg.append("text")
            .attr("transform", "translate(" + (60 + (width - 100) / 2) + "," + 35 + ")")
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text("图 A-2 压力容器分类图——第二组介质");

        // 添加类别符号
        svg.append("text")
            .attr("transform", "translate(" + (60 + (width - 100) / 8 * 2.2) + "," + (60 + (height - 120) / 4.5 * 3.1) + ")")
            .style("text-anchor", "middle")
            .style("font-size", "36px")
            .text("Ⅰ");
        svg.append("text")
            .attr("transform", "translate(" + (60 + (width - 100) / 8 * 2.15) + "," + (60 + (height - 120) / 4.5 * 2.1) + ")")
            .style("text-anchor", "middle")
            .style("font-size", "36px")
            .text("Ⅱ");
        svg.append("text")
            .attr("transform", "translate(" + (60 + (width - 100) / 8 * 5.15) + "," + (60 + (height - 120) / 4.5 * 1.3) + ")")
            .style("text-anchor", "middle")
            .style("font-size", "36px")
            .text("Ⅲ");

    }

    function plot2_data(volume, pressure) {

        // svgContainer 定义
        let svgContainer = $("#center");
        let width = svgContainer.width();
        let height = svgContainer.height();

        // 提示栏和作图区清空
        svgContainer.empty();

        // 新建 svg 元素
        let svg = d3.select("#center")
            .append("svg")
            .attr("width", width)
            .attr("id", "ZAAsvg")
            .attr("height", height);

        // X 轴比例尺
        let xScale = d3.scaleLog()
            .domain([0.01, 1000000])
            .range([0, width - 100]);

        // X 坐标轴
        let xAxis = d3.axisBottom()
            .scale(xScale)
            .tickFormat(function (d) {
                if (Math.log10(d) === -2) {
                    return "10⁻²";
                } else if (Math.log10(d) === -1) {
                    return "10⁻¹";
                } else if (Math.log10(d) === 0) {
                    return "10⁰";
                } else if (Math.log10(d) === 1) {
                    return "10¹";
                } else if (Math.log10(d) === 2) {
                    return "10²";
                } else if (Math.log10(d) === 3) {
                    return "10³";
                } else if (Math.log10(d) === 4) {
                    return "10⁴";
                } else if (Math.log10(d) === 5) {
                    return "10⁵";
                } else if (Math.log10(d) === 6) {
                    return "10⁶";
                } else {
                    return "";
                }
            });
        svg.append("g")
            .attr("transform", function () {
                return "translate(" + 60 + "," + (height - 60) + ")"
            })
            .classed("x-axis", true)
            .call(xAxis);

        // 竖向背景
        svg.selectAll("g.x-axis > g.tick")
            .append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", -(height - 120 + 6));

        // Y 轴比例尺
        let yScale = d3.scaleLog()
            .domain([350, 0.01])
            .range([0, height - 120]);

        // Y 坐标轴
        let yAxis = d3.axisLeft()
            .scale(yScale)
            .tickFormat(function (d) {
                if (Math.log10(d) === -2) {
                    return "0.01";
                } else if (Math.log10(d) === -1) {
                    return "0.1";
                } else if (Math.log10(d) === 0) {
                    return "1";
                } else if (Math.log10(d) === 1) {
                    return "10";
                } else if (Math.log10(d) === 2) {
                    return "100";
                } else if (Math.abs(d - 350) <= 0.00001) {
                    return "350";
                } else {
                    return "";
                }
            });
        svg.append("g")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")"
            })
            .classed("y-axis", true)
            .call(yAxis);

        // 横向背景
        svg.selectAll("g.y-axis > g.tick")
            .append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (width - 100 + 6))
            .attr("y2", 0);

        // 350 横线及标签
        let g350 = svg.selectAll("g.y-axis")
            .append("g")
            .classed("tick", true)
            .attr("opacity", "1")
            .attr("transform", "translate(0,0)");
        g350.append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (width - 100 + 6))
            .attr("y2", 0);
        g350.append("line")
            .attr("stroke", "#000")
            .attr("x2", -6);
        g350.append("text")
            .attr("fill", "#000")
            .attr("x", -9)
            .attr("dy", "0.32em")
            .text("350");

        // 添加划类线
        let line = d3.line()
            .x(function (d) {
                return xScale(d.x);
            })
            .y(function (d) {
                return yScale(d.y);
            });

        // 线 1
        let data1 = [
            {x: 0.03, y: 0.1},
            {x: 0.03, y: 420}
        ];
        svg.append("path")
            .attr("id", "zaac1-1")
            .attr("d", line(data1))
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g1 = svg.append("g");
        let text1 = g1.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", -5)
            .attr("text-anchor", "middle");
        text1.append("textPath")
            .attr("xlink:href", "#zaac1-1")
            .attr("startOffset", "50%")
            .text("V = 0.03 m³");
        let ctm1 = text1.node().getCTM();
        ctm1.scale = true;
        let s1 = ctm1.a + " " + ctm1.b + " " + ctm1.c + " " + ctm1.d + " " + ctm1.e + " " + ctm1.f;
        let bb1 = text1.node().getBBox();
        g1.insert("rect", "text")
            .attr("x", bb1.x)
            .attr("y", bb1.y)
            .attr("width", bb1.width)
            .attr("height", bb1.height)
            .attr("fill", "white")
            .attr("transform", "matrix(" + s1 + ")");

        // 线 2
        let data2 = [
            {x: 0.03, y: 0.1},
            {x: 1120000, y: 0.1}
        ];
        svg.append("path")
            .attr("id", "zaac1-2")
            .attr("d", line(data2))
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g2 = svg.append("g");
        let text2 = g2.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", -5)
            .attr("text-anchor", "middle");
        text2.append("textPath")
            .attr("xlink:href", "#zaac1-2")
            .attr("startOffset", "50%")
            .text("P = 0.1 MPa");
        let ctm2 = text2.node().getCTM();
        ctm2.scale = true;
        let s2 = ctm2.a + " " + ctm2.b + " " + ctm2.c + " " + ctm2.d + " " + ctm2.e + " " + ctm2.f;
        let bb2 = text2.node().getBBox();
        g2.insert("rect", "text")
            .attr("x", bb2.x)
            .attr("y", bb2.y)
            .attr("width", bb2.width)
            .attr("height", bb2.height)
            .attr("fill", "white")
            .attr("transform", "matrix(" + s2 + ")");

        // 线 3
        let data3 = [
            {x: 0.03, y: 10},
            {x: 500 / 10, y: 10}
        ];
        svg.append("path")
            .attr("id", "zaac1-3")
            .attr("d", line(data3))
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g3 = svg.append("g");
        let text3 = g3.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", -5)
            .attr("text-anchor", "middle");
        text3.append("textPath")
            .attr("xlink:href", "#zaac1-3")
            .attr("startOffset", "50%")
            .text("P = 10 MPa");
        let ctm3 = text3.node().getCTM();
        ctm3.scale = true;
        let s3 = ctm3.a + " " + ctm3.b + " " + ctm3.c + " " + ctm3.d + " " + ctm3.e + " " + ctm3.f;
        let bb3 = text3.node().getBBox();
        g3.insert("rect", "text")
            .attr("x", bb3.x)
            .attr("y", bb3.y)
            .attr("width", bb3.width)
            .attr("height", bb3.height)
            .attr("fill", "white")
            .attr("transform", "matrix(" + s3 + ")");

        // 线 4
        let data4 = [
            {x: 500 / 10, y: 10},
            {x: 500 / 1.6, y: 1.6}
        ];
        svg.append("path")
            .attr("id", "zaac1-4")
            .attr("d", line(data4))
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g4 = svg.append("g");
        let x4 = (xScale(500 / 1.6) + xScale(500 / 10)) / 2 + 4 + 60;
        let y4 = (yScale(1.6) + yScale(10)) / 2 - 4 + 60;
        let rotate4 = Math.atan((yScale(1.6) - yScale(10)) / (xScale(500 / 1.6) - xScale(500 / 10))) / Math.PI * 180;
        let text4 = g4.append("text")
            .attr("x", x4)
            .attr("y", y4)
            .attr("dy", 0)
            .attr("text-anchor", "middle")
            .style("transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-webkit-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-moz-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-o-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-ms-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .text("PV = 500 MPa·m³");
        let bb4 = text4.node().getBBox();
        g4.insert("rect", "text")
            .attr("x", bb4.x)
            .attr("y", bb4.y)
            .attr("width", bb4.width)
            .attr("height", bb4.height)
            .attr("fill", "white")
            .style("transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-webkit-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-moz-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-o-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)")
            .style("-ms-transform", "translate(" + x4 + "px, " + y4 + "px) rotate(" + rotate4 + "deg) translate(" + (-x4) + "px, " + (-y4) + "px)");

        // 线 5
        let data5 = [
            {x: 0.03, y: 1.6},
            {x: 5000 / 1.6, y: 1.6}
        ];
        svg.append("path")
            .attr("id", "zaac1-5")
            .attr("d", line(data5))
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g5 = svg.append("g");
        let text5 = g5.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", -5)
            .attr("text-anchor", "middle");
        text5.append("textPath")
            .attr("xlink:href", "#zaac1-5")
            .attr("startOffset", "50%")
            .text("P = 1.6 MPa");
        let ctm5 = text5.node().getCTM();
        ctm5.scale = true;
        let s5 = ctm5.a + " " + ctm5.b + " " + ctm5.c + " " + ctm5.d + " " + ctm5.e + " " + ctm5.f;
        let bb5 = text5.node().getBBox();
        g5.insert("rect", "text")
            .attr("x", bb5.x)
            .attr("y", bb5.y)
            .attr("width", bb5.width)
            .attr("height", bb5.height)
            .attr("fill", "white")
            .attr("transform", "matrix(" + s5 + ")");

        // 线 6
        let data6 = [
            {x: 5000 / 1.6, y: 1.6},
            {x: 5000 / 0.1, y: 0.1}
        ];
        svg.append("path")
            .attr("id", "zaac1-6")
            .attr("d", line(data6))
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", "3px")
            .attr("transform", function () {
                return "translate(" + 60 + "," + 60 + ")";
            });
        let g6 = svg.append("g");
        let x6 = (xScale(5000 / 0.1) + xScale(5000 / 1.6)) / 2 + 4 + 60;
        let y6 = (yScale(0.1) + yScale(1.6)) / 2 - 4 + 60;
        let rotate6 = Math.atan((yScale(0.1) - yScale(1.6)) / (xScale(5000 / 0.1) - xScale(5000 / 1.6))) / Math.PI * 180;
        let text6 = g6.append("text")
            .attr("x", x6)
            .attr("y", y6)
            .attr("dy", 0)
            .attr("text-anchor", "middle")
            .style("transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-webkit-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-moz-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-o-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-ms-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .text("PV = 5000 MPa·m³");
        let bb6 = text6.node().getBBox();
        g6.insert("rect", "text")
            .attr("x", bb6.x)
            .attr("y", bb6.y)
            .attr("width", bb6.width)
            .attr("height", bb6.height)
            .attr("fill", "white")
            .style("transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-webkit-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-moz-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-o-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)")
            .style("-ms-transform", "translate(" + x6 + "px, " + y6 + "px) rotate(" + rotate6 + "deg) translate(" + (-x6) + "px, " + (-y6) + "px)");

        // 给 X 轴添加标签
        svg.append("text")
            .attr("transform", "translate(" + (60 + (width - 100) / 2) + "," + (height - 10) + ")")
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text("容积，V/m³");

        // 给 Y 轴添加标签
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 30)
            .attr("x", -height / 2)
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text("设计压力，P/MPa");

        //给图表添加一个标题
        svg.append("text")
            .attr("transform", "translate(" + (60 + (width - 100) / 2) + "," + 35 + ")")
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text("图 A-2 压力容器分类图——第二组介质");

        // 添加类别符号
        svg.append("text")
            .attr("transform", "translate(" + (60 + (width - 100) / 8 * 2.2) + "," + (60 + (height - 120) / 4.5 * 3.1) + ")")
            .style("text-anchor", "middle")
            .style("font-size", "36px")
            .text("Ⅰ");
        svg.append("text")
            .attr("transform", "translate(" + (60 + (width - 100) / 8 * 2.15) + "," + (60 + (height - 120) / 4.5 * 2.1) + ")")
            .style("text-anchor", "middle")
            .style("font-size", "36px")
            .text("Ⅱ");
        svg.append("text")
            .attr("transform", "translate(" + (60 + (width - 100) / 8 * 5.15) + "," + (60 + (height - 120) / 4.5 * 1.3) + ")")
            .style("text-anchor", "middle")
            .style("font-size", "36px")
            .text("Ⅲ");

        // 分类点位置
        let dataset = [[volume, pressure]];
        svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("fill", "black")
            .attr("cx", function (d, i) {
                return 60 + xScale(d[0])
            })
            .attr("cy", function (d, i) {
                return 60 + yScale(d[1])
            })
            .attr("r", 5);

    }
});