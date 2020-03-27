$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let asmprt = $("#ASMPRT");
    let asmprttext = $("#ASMPRTTEXT");

    let bcaSketch = $("#d2");
    let bcaModel = $("#d3");
    let bcad2d3 = $('#d2d3');

    $("#cal").html("<table id='bca'></table>");
    let pg = $("#bca");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/a/BCA.json", function (result) {

        let BCADT, BCACategory, BCACategoryVal, BCAType, BCATypeVal, BCASTD, BCASTDVal, BCAName, columns, rows, ed;

        function bca2d(di, thkn, l) {

            if (!di) di = "ϕDi";
            if (!thkn) thkn = "δn";
            if (!l) l = "L";

            bcaSketch.empty();

            let width = bcaSketch.width();
            let height = bcaSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCASVG").attr("height", height);

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
            let padding = 100;

            /*
            ** 轮廓线
             */
            // 外边框
            svg.append("path").attr("d", line([
                {x: padding, y: padding},
                {x: width - padding, y: padding},
                {x: width - padding, y: height - padding},
                {x: padding, y: height - padding},
                {x: padding, y: padding}
            ])).classed("sketch", true);

            // 上内壁
            svg.append("path").attr("d", line([
                {x: padding, y: padding + 10},
                {x: width - padding, y: padding + 10}
            ])).classed("sketch", true);

            // 下内壁
            svg.append("path").attr("d", line([
                {x: padding, y: height - padding - 10},
                {x: width - padding, y: height - padding - 10}
            ])).classed("sketch", true);

            // 中心线
            svg.append("path").attr("d", line([
                {x: padding - 10, y: height / 2},
                {x: width - padding + 10, y: height / 2}
            ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true);

            /*
            ** 长度标注线
             */
            // 尺寸界线1
            svg.append("path").attr("d", line([
                {x: padding, y: padding - 3},
                {x: padding, y: padding - 40}
            ])).classed("sketch", true);

            // 尺寸界线2
            svg.append("path").attr("d", line([
                {x: width - padding, y: padding - 3},
                {x: width - padding, y: padding - 40}
            ])).classed("sketch", true);

            // 尺寸线1
            svg.append("path").attr("d", line([
                {x: padding, y: padding - 40 + 8},
                {x: width - padding, y: padding - 40 + 8}
            ])).attr("id", "BCASketchL").classed("sketch", true);

            let g1 = svg.append("g");
            let text1 = g1.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
            text1.append("textPath").attr("xlink:href", "#BCASketchL").attr("startOffset", "50%").text(l);

            // 左箭头
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding, y: padding - 40 + 8},
                    {x: padding + 15, y: padding - 40 + 8 - 3},
                    {x: padding + 15, y: padding - 40 + 8 + 3},
                    {x: padding, y: padding - 40 + 8}
                ]));

            // 右箭头
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding, y: padding - 40 + 8},
                    {x: width - padding - 15, y: padding - 40 + 8 - 3},
                    {x: width - padding - 15, y: padding - 40 + 8 + 3},
                    {x: width - padding, y: padding - 40 + 8}
                ]));

            /*
            ** 内直径标注
             */
            // 尺寸界线1
            svg.append("path").attr("d", line([
                {x: padding - 3, y: padding + 10},
                {x: padding - 40, y: padding + 10}
            ])).classed("sketch", true);

            // 尺寸界线2
            svg.append("path").attr("d", line([
                {x: padding - 3, y: height - padding - 10},
                {x: padding - 40, y: height - padding - 10}
            ])).classed("sketch", true);

            // 尺寸线1
            svg.append("path").attr("d", line([
                {x: padding - 40 + 8, y: height - padding - 10},
                {x: padding - 40 + 8, y: padding + 10}
            ])).attr("id", "BCASketchDI").classed("sketch", true);

            let g2 = svg.append("g");
            let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
            text2.append("textPath").attr("xlink:href", "#BCASketchDI").attr("startOffset", "50%").text(di);

            // 上箭头
            svg.append("path").classed("arrow sketch", true).attr("d", line([
                {x: padding - 40 + 8, y: padding + 10},
                {x: padding - 40 + 8 - 3, y: padding + 10 + 15},
                {x: padding - 40 + 8 + 3, y: padding + 10 + 15},
                {x: padding - 40 + 8, y: padding + 10}
            ]));

            // 下箭头
            svg.append("path").classed("arrow sketch", true).attr("d", line([
                {x: padding - 40 + 8, y: height - padding - 10},
                {x: padding - 40 + 8 - 3, y: height - padding - 10 - 15},
                {x: padding - 40 + 8 + 3, y: height - padding - 10 - 15},
                {x: padding - 40 + 8, y: height - padding - 10}
            ]));

            /*
            ** 厚度标注
             */
            // 尺寸界线1
            svg.append("path").attr("d", line([
                {x: padding - 3, y: height - padding},
                {x: padding - 40, y: height - padding}
            ])).classed("sketch", true);

            // 尺寸线1
            svg.append("path").attr("d", line([
                {x: padding - 40 + 8, y: height - padding - 10},
                {x: padding - 40 + 8, y: height - padding}
            ])).classed("sketch", true);

            // 尺寸线2
            svg.append("path").attr("d", line([
                {x: padding - 40 + 8, y: height - padding + 40},
                {x: padding - 40 + 8, y: height - padding + 15}
            ])).attr("id", "BCASketchTHKN").classed("sketch", true);

            let g3 = svg.append("g");
            let text3 = g3.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
            text3.append("textPath").attr("xlink:href", "#BCASketchTHKN").attr("startOffset", "50%").text(thkn);

            // 上箭头
            svg.append("path").classed("arrow", true).attr("d", line([
                {x: padding - 40 + 8, y: height - padding},
                {x: padding - 40 + 8 - 3, y: height - padding + 15},
                {x: padding - 40 + 8 + 3, y: height - padding + 15},
                {x: padding - 40 + 8, y: height - padding}
            ])).classed("sketch", true);

        }

        currentTabIndex = bcad2d3.tabs('getTabIndex', bcad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bca2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bca").length > 0) {
                    bca2d();
                }
            });
        }
        bcad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bca2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bca").length > 0) {
                            bca2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 内压圆筒强度校核",
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

                if (index === 6) {
                    $(ed.target).combobox("loadData", BCACategory);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCAType);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", BCASTD);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", BCAName);
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

                    asmprt.addClass("l-btn-disabled").off("click").attr("href", null);
                    asmprttext.html("下载模型");

                    // sketch
                    bcaSketch.empty();
                    // model
                    bcaModel.empty();

                    // sketch
                    currentTabIndex = bcad2d3.tabs('getTabIndex', bcad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bca2d();
                        bcaSketch.off("resize").on("resize", function () {
                            if ($("#bca").length > 0) {
                                bca2d();
                            }
                        });
                    }
                    bcad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bca2d();
                                bcaSketch.off("resize").on("resize", function () {
                                    if ($("#bca").length > 0) {
                                        bca2d();
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
                    if (index === 1) {

                        BCADT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCACategory = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCAType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCASTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BCAName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCACategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCACategory[index] = {
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
                    if (index === 6) {

                        BCACategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCAType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCASTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BCAName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCACategoryVal,
                                temp: BCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCAType = [];
                                $(result).each(function (index, element) {
                                    BCAType[index] = {
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
                    if (index === 7) {

                        BCATypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCASTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BCAName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCACategoryVal,
                                type: BCATypeVal,
                                temp: BCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCASTD = [];
                                $(result).each(function (index, element) {
                                    BCASTD[index] = {
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
                    if (index === 8) {

                        BCASTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BCAName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCACategoryVal,
                                type: BCATypeVal,
                                std: BCASTDVal,
                                temp: BCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCAName = [];
                                $(result).each(function (index, element) {
                                    BCAName[index] = {
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

                    // 设计压力
                    let BCAPD;
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        BCAPD = parseFloat(rows[0][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // 静压力
                    let BCAPS;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        BCAPS = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // 计算压力
                    let BCAPC = BCAPD + BCAPS;

                    // 腐蚀裕量
                    let BCAC2;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        BCAC2 = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // 焊接接头系数
                    let BCAE;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        BCAE = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // 试验类型
                    let BCATestVal;
                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                        BCATestVal = rows[5][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // 材料名称
                    let BCANameVal;
                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                        BCANameVal = rows[9][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取材料密度、最大最小厚度
                    let BCADensity, BCAThkMin, BCAThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BCACategoryVal,
                            "type": BCATypeVal,
                            "std": BCASTDVal,
                            "name": BCANameVal,
                            "temp": BCADT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BCADensity = parseFloat(result.density);
                            BCAThkMin = parseFloat(result.thkMin);
                            BCAThkMax = parseFloat(result.thkMax);

                            // 筒体内直径
                            let BCADI;
                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                BCADI = parseFloat(rows[10][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                bca2d("ϕ" + BCADI);
                                bcaSketch.off("resize").on("resize", function () {
                                    if ($("#bca").length > 0) {
                                        bca2d("ϕ" + BCADI);
                                    }
                                });
                            }
                            bcad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        bca2d("ϕ" + BCADI);
                                        bcaSketch.off("resize").on("resize", function () {
                                            if ($("#bca").length > 0) {
                                                bca2d("ϕ" + BCADI);
                                            }
                                        });
                                    }
                                }
                            });

                            // 筒体名义厚度
                            let BCATHKN;
                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                && parseFloat(rows[11][columns[0][1].field]) > BCAC2
                                && parseFloat(rows[11][columns[0][1].field]) > Math.max(BCAC2, BCAThkMin)
                                && parseFloat(rows[11][columns[0][1].field]) <= BCAThkMax) {
                                BCATHKN = parseFloat(rows[11][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                && parseFloat(rows[11][columns[0][1].field]) <= Math.max(BCAC2, BCAThkMin)) {
                                south.html("材料厚度不能小于等于 " + Math.max(BCAC2, BCAThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                && parseFloat(rows[11][columns[0][1].field]) > BCAThkMax) {
                                south.html("材料厚度不能大于 " + BCAThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                bca2d("ϕ" + BCADI, BCATHKN);
                                bcaSketch.off("resize").on("resize", function () {
                                    if ($("#bca").length > 0) {
                                        bca2d("ϕ" + BCADI, BCATHKN);
                                    }
                                });
                            }
                            bcad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        bca2d("ϕ" + BCADI, BCATHKN);
                                        bcaSketch.off("resize").on("resize", function () {
                                            if ($("#bca").length > 0) {
                                                bca2d("ϕ" + BCADI, BCATHKN);
                                            }
                                        });
                                    }
                                }
                            });

                            // 外直径
                            let BCADO = BCADI + 2 * BCATHKN;

                            // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                            let BCADesignStress, BCATestStress, BCATestRel, BCAC1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BCACategoryVal,
                                    "type": BCATypeVal,
                                    "std": BCASTDVal,
                                    "name": BCANameVal,
                                    "thk": BCATHKN,
                                    "temp": BCADT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": BCADO
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BCADesignStress = parseFloat(result.ot);
                                    if (BCADesignStress < 0) {
                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    BCATestStress = parseFloat(result.o);
                                    if (BCATestStress < 0) {
                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    BCATestRel = parseFloat(result.rel);
                                    if (BCATestRel < 0) {
                                        south.html("查询材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }
                                    BCAC1 = parseFloat(result.c1);
                                    if (BCAC1 < 0) {
                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // 厚度附加量C
                                    let BCAC = BCAC1 + BCAC2;

                                    // 有效厚度
                                    let BCATHKE = BCATHKN - BCAC;

                                    // 计算厚度
                                    let BCATHKC = (BCAPC * BCADI) / (2 * BCADesignStress * BCAE);

                                    // 最小厚度
                                    let BCATHKMinimum;
                                    if (BCACategoryVal === "高合金钢") {
                                        BCATHKMinimum = 2;
                                    }
                                    else {
                                        BCATHKMinimum = 3;
                                    }

                                    // 设计厚度
                                    let BCATHKD = Math.max(BCATHKC, BCATHKMinimum) + BCAC2;

                                    // 所需厚度提示信息
                                    south.html(
                                        "<span style='color:#444444;'>" +
                                        "所需厚度：" + (BCATHKD + BCAC1).toFixed(2) + " mm" +
                                        "</span>");

                                    // 厚度校核
                                    let BCATHKCHK;
                                    if (BCATHKN >= (BCATHKD + BCAC1).toFixed(2)) {
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "输入厚度：" + BCATHKN + " mm" +
                                            "</span>");
                                        BCATHKCHK = "合格";
                                    } else {
                                        south.append(
                                            "<span style='color:red;'>" +
                                            "&ensp;|&ensp;" +
                                            "输入厚度：" + BCATHKN + " mm" +
                                            "</span>");
                                        BCATHKCHK = "不合格";
                                    }

                                    // 应力校核
                                    let BCADesignActStress = BCAPC * (BCADI) / (2 * BCATHKE);
                                    let BCADesignAllowStress = BCAE * BCADesignStress;
                                    let BCADesignStressChk;
                                    if (BCADesignActStress <= BCADesignAllowStress) {
                                        BCADesignStressChk = "合格";
                                    } else {
                                        BCADesignStressChk = "不合格";
                                    }

                                    // 压力试验
                                    let BCATestAllowStress, BCATestPT;
                                    if (BCATestVal === "液压试验") {
                                        BCATestPT = Math.max(1.25 * BCAPD * BCATestStress / BCADesignStress, 0.05);
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "试压类型：液压" +
                                            "&ensp;|&ensp;" +
                                            "试验压力：" + BCATestPT.toFixed(4) + " MPa" +
                                            "</span>");
                                        BCATestAllowStress = 0.9 * BCATestRel * BCAE;

                                    }
                                    else if (BCATestVal === "气压试验") {

                                        BCATestPT = Math.max(1.10 * BCAPD * BCATestStress / BCADesignStress, 0.05);
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "试压类型：气压" +
                                            "&ensp;|&ensp;" +
                                            "试验压力：" + BCATestPT.toFixed(4) + " MPa" +
                                            "</span>");

                                        BCATestAllowStress = 0.8 * BCATestRel * BCAE;
                                    }

                                    // 压力试验时的实际应力
                                    let BCATestActStress = BCATestPT * (BCADI) / (2 * BCATHKE);

                                    // 压力试验时的应力校核
                                    let BCATestStressChk;
                                    if (BCATestActStress <= BCATestAllowStress) {
                                        BCATestStressChk = "合格";
                                    } else {
                                        BCATestStressChk = "不合格";
                                    }

                                    // MAWP
                                    let BCAMAWP = 2 * BCATHKE * BCADesignStress * BCAE / BCADI - BCAPS;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "MAWP：" + BCAMAWP.toFixed(4) + " MPa" +
                                        "</span>");

                                    // 获取筒体长度
                                    let BCAL;
                                    if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                        BCAL = parseFloat(rows[12][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // 内表面积
                                    let BCAAI = Math.PI * BCADI * BCAL / 1000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "内表面积：" + BCAAI.toFixed(4) + " ㎡" +
                                        "</span>");

                                    // 外表面积
                                    let BCAAO = Math.PI * BCADO * BCAL / 1000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "外表面积：" + BCAAO.toFixed(4) + " ㎡" +
                                        "</span>");

                                    // 内容积
                                    let BCAVI = 0.25 * Math.PI * BCADI * BCADI * BCAL / 1000000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "内容积：" + BCAVI.toFixed(4) + " m³" +
                                        "</span>");

                                    // 外容积
                                    let BCAVO = 0.25 * Math.PI * BCADO * BCADO * BCAL / 1000000000;

                                    // 质量
                                    let BCAM = BCADensity * (BCAVO - BCAVI);
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "重量：" + BCAM.toFixed(4) + " kg" +
                                        "</span>");

                                    // docx
                                    let BCAPayJS = $('#payjs');

                                    function getDocx() {
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "bcadocx.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                ribbonName: "BCA",

                                                designPressure: BCAPD,
                                                designTemp: BCADT,
                                                staticPressure: BCAPS,
                                                innerDiameter: BCADI,
                                                length: BCAL,
                                                thkn: BCATHKN,
                                                std: BCASTDVal,
                                                name: BCANameVal,
                                                c2: BCAC2.toFixed(4),
                                                e: BCAE.toFixed(4),
                                                test: BCATestVal,
                                                density: BCADensity.toFixed(4),
                                                designStress: BCADesignStress.toFixed(4),
                                                testRel: BCATestRel.toFixed(4),
                                                testStress: BCATestStress.toFixed(4),
                                                c1: BCAC1.toFixed(4),
                                                c: BCAC.toFixed(4),
                                                thke: BCATHKE.toFixed(4),
                                                calPressure: BCAPC.toFixed(4),
                                                thkc: BCATHKC.toFixed(4),
                                                thkMin: BCATHKMinimum.toFixed(4),
                                                thkd: BCATHKD.toFixed(4),
                                                thkChk: BCATHKCHK,
                                                designActStress: BCADesignActStress.toFixed(4),
                                                designAllowStress: BCADesignAllowStress.toFixed(4),
                                                designStressChk: BCADesignStressChk,
                                                testPressure: BCATestPT.toFixed(4),
                                                testActStress: BCATestActStress.toFixed(4),
                                                testAllowStress: BCATestAllowStress.toFixed(4),
                                                testStressChk: BCATestStressChk,
                                                mawp: BCAMAWP.toFixed(4),
                                                ai: BCAAI.toFixed(4),
                                                ao: BCAAO.toFixed(4),
                                                vi: BCAVI.toFixed(4),
                                                m: BCAM.toFixed(4)
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
                                                    BCAPayJS.dialog({
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
                                                                BCAPayJS.dialog("close");
                                                                BCAPayJS.dialog("clear");
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
                                                                            BCAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                            // 倒计时计数器
                                                                            let maxTime = 4, timer;

                                                                            function CountDown() {
                                                                                if (maxTime >= 0) {
                                                                                    $("#payjs_timer").html(maxTime);
                                                                                    --maxTime;
                                                                                } else {

                                                                                    clearInterval(timer);
                                                                                    // 关闭并清空收银台
                                                                                    BCAPayJS.dialog('close');
                                                                                    BCAPayJS.dialog('clear');
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

                                    // asmprt
                                    function getASMPRT() {
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "bcaasmprt.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                ribbonName: "BCAASMPRT",

                                                di: BCADI,
                                                dout: BCADI + 2 * BCATHKN,
                                                h: BCAL
                                            }),
                                            beforeSend: function () {
                                                asmprttext.html("生成中" + "<i class='fa fa-spinner fa-pulse fa-fw' style='color:#18bc9c;'></i>");
                                                asmprt.off("click");
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
                                                    asmprttext.html("下载模型");
                                                    asmprt.off("click").on("click", getASMPRT);
                                                }
                                                else {

                                                    asmprttext.html("生成成功");

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
                                                    BCAPayJS.dialog({
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
                                                                BCAPayJS.dialog("close");
                                                                BCAPayJS.dialog("clear");
                                                                // 按钮重置
                                                                asmprt.removeClass("l-btn-disabled").attr("href", null).off("click").on("click", getASMPRT);
                                                                asmprttext.html("下载模型");
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
                                                                        url: "payjs/order/get_order_asmprtlink.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            outTradeNo: outTradeNo,
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            // 写入下载地址
                                                                            asmprt.attr("href", result);
                                                                            asmprttext.html("下载地址");

                                                                            // 支付成功跳转页
                                                                            BCAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                            // 倒计时计数器
                                                                            let maxTime = 4, timer;

                                                                            function CountDown() {
                                                                                if (maxTime >= 0) {
                                                                                    $("#payjs_timer").html(maxTime);
                                                                                    --maxTime;
                                                                                } else {

                                                                                    clearInterval(timer);
                                                                                    // 关闭并清空收银台
                                                                                    BCAPayJS.dialog('close');
                                                                                    BCAPayJS.dialog('clear');
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
                                                    msg: "由于网络原因，模型生成失败，请检查网络后重试",
                                                    icon: "error",
                                                    ok: "确定"
                                                });
                                                asmprttext.html("下载模型");
                                                asmprt.off("click").on("click", getASMPRT);
                                            }
                                        });
                                    }

                                    asmprt.removeClass("l-btn-disabled").off("click").on("click", getASMPRT);

                                    function bca3d() {

                                        bcaModel.empty();

                                        // support webgl
                                        if (!Detector.webgl) {
                                            Detector.addGetWebGLMessage();
                                        }

                                        // scene
                                        let scene = new THREE.Scene();

                                        // light
                                        let ambientLight = new THREE.AmbientLight(0xffffff);
                                        scene.add(ambientLight);
                                        let directionLight_1 = new THREE.DirectionalLight(0xffffff);
                                        directionLight_1.position.set(1.5 * Math.max(BCADO, BCAL), 1.5 * Math.max(BCADO, BCAL), 1.5 * Math.max(BCADO, BCAL));
                                        scene.add(directionLight_1);
                                        let directionLight_2 = new THREE.DirectionalLight(0x4f4f4f);
                                        directionLight_2.position.set(-1.5 * Math.max(BCADO, BCAL), -1.5 * Math.max(BCADO, BCAL), -1.5 * Math.max(BCADO, BCAL));
                                        scene.add(directionLight_2);


                                        // model
                                        let material = new THREE.MeshLambertMaterial({
                                            color: 0x4f4f4f,
                                            side: THREE.DoubleSide
                                        });

                                        // 旋转建模筒体
                                        let points = [];
                                        points.push(new THREE.Vector3(BCADO / 2, BCAL / 2, 0));
                                        points.push(new THREE.Vector3(BCADO / 2, -BCAL / 2, 0));
                                        points.push(new THREE.Vector3(BCADI / 2, -BCAL / 2, 0));
                                        points.push(new THREE.Vector3(BCADI / 2, BCAL / 2, 0));
                                        points.push(new THREE.Vector3(BCADO / 2, BCAL / 2, 0));
                                        let cylinderShellGeometry = new THREE.LatheGeometry(points, 100, 0, 2 * Math.PI);
                                        let cylinderShellMesh = new THREE.Mesh(cylinderShellGeometry, material);
                                        scene.add(cylinderShellMesh);

                                        // BSP 建模筒体
                                        /*
                                        let outerGeometry = new THREE.CylinderGeometry(BCADO/2, BCADO/2, BCAL, 150, 1);
                                        let outerMesh = new THREE.Mesh(outerGeometry, material);
                                        let outerBSP = new ThreeBSP(outerMesh);
                                        let innerGeometry = new THREE.CylinderGeometry(BCADI/2, BCADI/2, BCAL, 150, 1);
                                        let innerMesh = new THREE.Mesh(innerGeometry, material);
                                        let innerBSP = new ThreeBSP(innerMesh);
                                        let resultBSP = outerBSP.subtract(innerBSP);
                                        let cylinderShell = resultBSP.toMesh(material);
                                        scene.add(cylinderShell);
                                        */

                                        // camera
                                        let camera = new THREE.PerspectiveCamera(60, bcaModel.width() / bcaModel.height(), 1, 100000);
                                        camera.position.z = 1.5 * Math.max(BCADO, BCAL);

                                        // render
                                        let renderer = new THREE.WebGLRenderer({
                                            antialias: true,                                 //是否开启反锯齿
                                            precision: "lowp",                              //highp/mediump/lowp着色精度选择
                                            alpha: true,                                     //是否可以设置背景色透明
                                            premultipliedAlpha: false,
                                            stencil: false,
                                            preserveDrawingBuffer: true,                     //是否保存绘图缓冲
                                            maxLights: 3                                     //最大灯光数
                                        });
                                        renderer.setPixelRatio(window.devicePixelRatio);
                                        renderer.setClearColor(0x00bfff, 0);
                                        renderer.setSize(bcaModel.width(), bcaModel.height());
                                        bcaModel.append(renderer.domElement);

                                        // 渲染函数
                                        function render() {
                                            renderer.render(scene, camera);
                                        }

                                        // controls
                                        let controls = new THREE.TrackballControls(camera, renderer.domElement);
                                        controls.rotateSpeed = 1.0;
                                        controls.zoomSpeed = 1.2;
                                        controls.panSpeed = 0.8;
                                        controls.noZoom = false;
                                        controls.noPan = false;
                                        controls.staticMoving = true;
                                        controls.dynamicDampingFactor = 0.3;
                                        controls.keys = [65, 83, 68];
                                        controls.addEventListener("change", render);

                                        // animate
                                        function animate() {
                                            requestAnimationFrame(animate);
                                            controls.update();
                                        }

                                        // resize
                                        bcaModel.resize(function () {
                                            camera.aspect = bcaModel.width() / bcaModel.height();
                                            camera.updateProjectionMatrix();
                                            renderer.setSize(bcaModel.width(), bcaModel.height());
                                            controls.handleResize();
                                            render();
                                        });

                                        render();
                                        animate();

                                    }

                                    // sketch
                                    if (currentTabIndex === 0) {

                                        bca2d("ϕ" + BCADI, BCATHKN, BCAL);
                                        bcaSketch.off("resize").on("resize", function () {
                                            if ($("#bca").length > 0) {
                                                bca2d("ϕ" + BCADI, BCATHKN, BCAL);
                                            }
                                        });
                                    }
                                    else if (currentTabIndex === 1) {

                                        bca3d();
                                    }
                                    bcad2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bca2d("ϕ" + BCADI, BCATHKN, BCAL);
                                                bcaSketch.off("resize").on("resize", function () {
                                                    if ($("#bca").length > 0) {
                                                        bca2d("ϕ" + BCADI, BCATHKN, BCAL);
                                                    }
                                                });
                                            } else if (index === 1) {
                                                bca3d();
                                            }
                                        }
                                    });
                                },
                                error: function () {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                }
                            });
                        },
                        error: function () {
                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                        }
                    });
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        })
    });
});