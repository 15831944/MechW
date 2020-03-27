$(document).ready(function () {

    let ajaxAlert = $("#AjaxAlert");

    // 初始化 DN 列表
    $("option.YBADNResult").remove();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "list_nbt_47065_1_2018_dn.action",
        async: true,
        dataType: "json",
        data: JSON.stringify({"mtl": ""}),
        beforeSend: function () {
            ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                '<span style="color:#18bc9c;">&ensp;正在获取DN(公称直径)列表</span>');
        },
        success: function (result) {
            ajaxAlert.html('<i class="fa fa-check" style="color:#18bc9c;font-size:16px;"></i>' +
                '<span style="color:#18bc9c;">&ensp;DN(公称直径)列表获取成功</span>');
            $.each(result, function (i, item) {
                $("#YBADN").append('<option class="YBADNResult" value=\"' + item + '\">DN' + item + '</option>');
            });

            // 业务逻辑
            $("#YBAMtl, #YBADN, #YBAWeight").off("change").on("change", function () {

                $("td.YBAResult").empty();
                $(".YBASketch").empty();
                $("#YBASketch").find("> svg").css("display", "none");

                // 下级级联菜单
                $("option.YBAFabResult").remove();
                $("option.YBAPadResult").remove();
                $("option.YBAAngResult").remove();
                $("option.YBASymbolResult").remove();

                let YBAMtlVal = $("#YBAMtl").val();
                if (YBAMtlVal.length > 0) {
                    let YBAMtl = YBAMtlVal;

                    // 如果DN有数值
                    let YBADNVal = $("#YBADN").val();
                    if (YBADNVal.length > 0) {
                        let YBADN = YBADNVal;

                        // 获取载重
                        let YBAWeightVal = $("#YBAWeight").val();
                        if (YBAWeightVal.length > 0 && !isNaN(YBAWeightVal) && parseFloat(YBAWeightVal) > 0) {
                            let YBAWeight = 9.80665 * parseFloat(YBAWeightVal);

                            // 获取Fab
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "list_nbt_47065_1_2018_fab_method.action",
                                async: false,
                                dataType: "json",
                                data: JSON.stringify({
                                    "mtl": YBAMtl,
                                    "dn": YBADN,
                                    "q": YBAWeight
                                }),
                                beforeSend: function () {
                                    ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                                        '<span style="color:#18bc9c;">&ensp;正在获取可用鞍座列表</span>');
                                },
                                success: function (result) {
                                    ajaxAlert.html('<i class="fa fa-check" style="color:#18bc9c;font-size:16px;"></i>' +
                                        '<span style="color:#18bc9c;">&ensp;可用鞍座列表获取成功</span>');
                                    if (result.length <= 0) {
                                        ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                                            '<span style="color:red;">&ensp;没有找到合适的标准鞍座！</span>');
                                    }
                                    else {
                                        $.each(result, function (i, item) {
                                            $("#YBAFab").append('<option class="YBAFabResult">' + item + '</option>');
                                        });

                                        // Fab改变事件
                                        $("#YBAFab").off("change").on("change", function () {

                                            // 将受影响的下拉列表项清空
                                            $("td.YBAResult").empty();
                                            $(".YBASketch").empty();
                                            $("#YBASketch").find("> svg").css("display", "none");

                                            // 下级级联菜单
                                            $("option.YBAPadResult").remove();
                                            $("option.YBAAngResult").remove();
                                            $("option.YBASymbolResult").remove();

                                            // 如果Fab有数值
                                            let YBAFabVal = $("#YBAFab").val();
                                            if (YBAFabVal.length > 0) {
                                                let YBAFab = YBAFabVal;

                                                // 获取Pad
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "list_nbt_47065_1_2018_pad.action",
                                                    async: false,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "mtl": YBAMtl,
                                                        "dn": YBADN,
                                                        "q": YBAWeight,
                                                        "fabMethod": YBAFab
                                                    }),
                                                    beforeSend: function () {
                                                        ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                                                            '<span style="color:#18bc9c;">&ensp;正在获取可用鞍座列表</span>');
                                                    },
                                                    success: function (result) {
                                                        ajaxAlert.html('<i class="fa fa-check" style="color:#18bc9c;font-size:16px;"></i>' +
                                                            '<span style="color:#18bc9c;">&ensp;可用鞍座列表获取成功</span>');
                                                        if (result.length <= 0) {
                                                            ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                                                                '<span style="color:red;">&ensp;没有找到合适的标准鞍座！</span>');
                                                        } else {
                                                            $.each(result, function (i, item) {
                                                                $("#YBAPad").append('<option class="YBAPadResult">' + item + '</option>');
                                                            });

                                                            // pad 改变事件
                                                            $("#YBAPad").off("change").on("change", function () {

                                                                // 将受影响的下拉列表项清空
                                                                $("td.YBAResult").empty();
                                                                $(".YBASketch").empty();
                                                                $("#YBASketch").find("> svg").css("display", "none");

                                                                // 下级级联菜单
                                                                $("option.YBAAngResult").remove();
                                                                $("option.YBASymbolResult").remove();

                                                                // 如果Pab有数值
                                                                let YBAPadVal = $("#YBAPad").val();
                                                                if (YBAPadVal.length > 0) {
                                                                    let YBAPad = YBAPadVal;

                                                                    // 获取Angle
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "list_nbt_47065_1_2018_angle.action",
                                                                        async: false,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            "mtl": YBAMtl,
                                                                            "dn": YBADN,
                                                                            "q": YBAWeight,
                                                                            "fabMethod": YBAFab,
                                                                            "pad": YBAPad
                                                                        }),
                                                                        beforeSend: function () {
                                                                            ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                                                                                '<span style="color:#18bc9c;">&ensp;正在获取可用鞍座列表</span>');
                                                                        },
                                                                        success: function (result) {
                                                                            ajaxAlert.html('<i class="fa fa-check" style="color:#18bc9c;font-size:16px;"></i>' +
                                                                                '<span style="color:#18bc9c;">&ensp;可用鞍座列表获取成功</span>');
                                                                            if (result.length <= 0) {
                                                                                ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                                                                                    '<span style="color:red;">&ensp;没有找到合适的标准鞍座！</span>');
                                                                            } else {
                                                                                $.each(result, function (i, item) {
                                                                                    $("#YBAAng").append('<option class="YBAAngResult">' + item + '</option>');
                                                                                });

                                                                                // ang 改变事件
                                                                                $("#YBAAng").off("change").on("change", function () {

                                                                                    // 将受影响的下拉列表项清空
                                                                                    $("td.YBAResult").empty();
                                                                                    $(".YBASketch").empty();
                                                                                    $("#YBASketch").find("> svg").css("display", "none");

                                                                                    // 下级级联菜单
                                                                                    $("option.YBASymbolResult").remove();

                                                                                    // 如果Ang有数值
                                                                                    let YBAAngVal = $("#YBAAng").val();
                                                                                    if (YBAAngVal.length > 0) {
                                                                                        let YBAAng = YBAAngVal;

                                                                                        // 获取Symbol
                                                                                        $.ajax({
                                                                                            type: "POST",
                                                                                            contentType: "application/json; charset=utf-8",
                                                                                            url: "list_nbt_47065_1_2018_symbol.action",
                                                                                            async: false,
                                                                                            dataType: "json",
                                                                                            data: JSON.stringify({
                                                                                                "mtl": YBAMtl,
                                                                                                "dn": YBADN,
                                                                                                "q": YBAWeight,
                                                                                                "fabMethod": YBAFab,
                                                                                                "pad": YBAPad,
                                                                                                "angle": YBAAng
                                                                                            }),
                                                                                            beforeSend: function () {
                                                                                                ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                                                                                                    '<span style="color:#18bc9c;">&ensp;正在获取可用鞍座列表</span>');
                                                                                            },
                                                                                            success: function (result) {
                                                                                                ajaxAlert.html('<i class="fa fa-check" style="color:#18bc9c;font-size:16px;"></i>' +
                                                                                                    '<span style="color:#18bc9c;">&ensp;可用鞍座列表获取成功</span>');
                                                                                                if (result.length <= 0) {
                                                                                                    ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                                                                                                        '<span style="color:red;">&ensp;没有找到合适的标准鞍座！</span>');
                                                                                                } else {
                                                                                                    $.each(result, function (i, item) {
                                                                                                        $("#YBASymbol").append('<option class="YBASymbolResult">' + item + '</option>');
                                                                                                    });

                                                                                                    // Symbol 改变事件
                                                                                                    $("#YBASymbol").off("change").on("change", function () {

                                                                                                        // 将受影响的下拉列表项清空
                                                                                                        $("td.YBAResult").empty();
                                                                                                        $(".YBASketch").empty();
                                                                                                        $("#YBASketch").find("> svg").css("display", "none");

                                                                                                        // 如果Symbol有数值
                                                                                                        let YBASymbolVal = $("#YBASymbol").val();
                                                                                                        if (YBASymbolVal.length > 0) {
                                                                                                            let YBASymbol = YBASymbolVal;

                                                                                                            // 获取data
                                                                                                            $.ajax({
                                                                                                                type: "POST",
                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                url: "list_nbt_47065_1_2018_details.action",
                                                                                                                async: true,
                                                                                                                dataType: "json",
                                                                                                                data: JSON.stringify({
                                                                                                                    "mtl": YBAMtl,
                                                                                                                    "dn": YBADN,
                                                                                                                    "q": YBAWeight,
                                                                                                                    "fabMethod": YBAFab,
                                                                                                                    "pad": YBAPad,
                                                                                                                    "angle": YBAAng,
                                                                                                                    "symbol": YBASymbol
                                                                                                                }),
                                                                                                                beforeSend: function () {
                                                                                                                    ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                                                                                                                        '<span style="color:#18bc9c;">&ensp;正在获取鞍座尺寸</span>');
                                                                                                                },
                                                                                                                success: function (result) {

                                                                                                                    ajaxAlert.html('<i class="fa fa-check" style="color:#18bc9c;font-size:16px;"></i>' +
                                                                                                                        '<span style="color:#18bc9c;">&ensp;鞍座尺寸获取成功</span>');

                                                                                                                    // 表格内容处理
                                                                                                                    $("#YBATag").html("鞍座 " + result.symbol + result.dn + "-" + "F/S");
                                                                                                                    if (YBAMtl === "Q235B") {
                                                                                                                        $("#YBAQSTD").html(result.q235q);
                                                                                                                        $("#YBAQHEIGHT").html(result.q235qMaxHeight.toFixed(2));
                                                                                                                    } else {
                                                                                                                        $("#YBAQSTD").html(result.q345q);
                                                                                                                        $("#YBAQHEIGHT").html(result.q345qMaxHeight.toFixed(2));
                                                                                                                    }

                                                                                                                    if (YBAPad === "有") {
                                                                                                                        $("#YBAMass").html(result.massPad);
                                                                                                                    }
                                                                                                                    else if (YBAPad === "无") {
                                                                                                                        $("#YBAMass").html(result.massNoPad);
                                                                                                                    }

                                                                                                                    /*
                                                                                                                    鞍座 Sketch 处理
                                                                                                                     */
                                                                                                                    // 图 1 和 图 6 是一样的
                                                                                                                    if ((YBASymbol === "A" && YBADN >= 1000 && YBADN <= 2000)
                                                                                                                        || (YBASymbol === "BⅠ" && YBADN >= 1000 && YBADN <= 2000)) {
                                                                                                                        $("#YBAASketchTHK4").text(result.thk4);
                                                                                                                        $("#YBAASketchB121").text(result.b1 / 2);
                                                                                                                        $("#YBAASketchB122").text(result.b1 / 2);
                                                                                                                        $("#YBAASketchTHK2").text(result.thk2);
                                                                                                                        $("#YBAASketchL21").text(result.l2);
                                                                                                                        $("#YBAASketchL22").text(result.l2);
                                                                                                                        $("#YBAASketchTHK31").text(result.thk3);
                                                                                                                        $("#YBAASketchTHK32").text(result.thk3);
                                                                                                                        $("#YBAASketchTHK33").text(result.thk3);
                                                                                                                        $("#YBAASketchTHK34").text(result.thk3);
                                                                                                                        $("#YBAASketchL31").text(result.l3);
                                                                                                                        $("#YBAASketchL32").text(result.l3);
                                                                                                                        $("#YBAASketchL").text(result.l);
                                                                                                                        $("#YBAASketchE").text(result.e);
                                                                                                                        $("#YBAASketchB1").text(result.b1);
                                                                                                                        $("#YBAASketchB2").text(result.b2);
                                                                                                                        $("#YBAASketchB3").text(result.b3);
                                                                                                                        $("#YBAASketchB4").text(result.b4);
                                                                                                                        $("#YBAASketchR").text("R" + 3 * result.thk4);
                                                                                                                        $("#YBAASketchARC").text(result.arc);
                                                                                                                        $("#YBAASketchH").text(result.h);
                                                                                                                        $("#YBAASketchTHK1").text(result.thk1);
                                                                                                                        $("#YBAASketchL1").text(result.l1);
                                                                                                                        $("#YBAASketch2D").text("2-Φ" + result.d);
                                                                                                                        $("#YBAASketchM").text(result.screw);
                                                                                                                        $("#YBAASketchD").text(result.d);
                                                                                                                        $("#YBAASketch").css("display", "block");
                                                                                                                    }

                                                                                                                    // 图 2 和 图 7 是一样的
                                                                                                                    else if ((YBASymbol === "A" && YBADN >= 2100 && YBADN <= 4000)
                                                                                                                        || (YBASymbol === "BⅠ" && YBADN >= 2100 && YBADN <= 4000)) {
                                                                                                                        $("#YBABSketch5080").text("50");
                                                                                                                        $("#YBABSketch120150").text("120°");
                                                                                                                        $("#YBABSketchthk4").text(result.thk4);
                                                                                                                        $("#YBABSketchb121").text(result.b1 / 2);
                                                                                                                        $("#YBABSketchb122").text(result.b1 / 2);
                                                                                                                        $("#YBABSketchthk2").text(result.thk2);
                                                                                                                        $("#YBABSketchl21").text(result.l2);
                                                                                                                        $("#YBABSketchl22").text(result.l2);
                                                                                                                        $("#YBABSketchthk31").text(result.thk3);
                                                                                                                        $("#YBABSketchthk32").text(result.thk3);
                                                                                                                        $("#YBABSketchthk33").text(result.thk3);
                                                                                                                        $("#YBABSketchthk34").text(result.thk3);
                                                                                                                        $("#YBABSketchthk35").text(result.thk3);
                                                                                                                        $("#YBABSketchthk36").text(result.thk3);
                                                                                                                        $("#YBABSketchl31").text(result.l3);
                                                                                                                        $("#YBABSketchl32").text(result.l3);
                                                                                                                        $("#YBABSketchl33").text(result.l3);
                                                                                                                        $("#YBABSketchl34").text(result.l3);
                                                                                                                        $("#YBABSketche").text(result.e);
                                                                                                                        $("#YBABSketchb1").text(result.b1);
                                                                                                                        $("#YBABSketchb2").text(result.b2);
                                                                                                                        $("#YBABSketchb3").text(result.b3);
                                                                                                                        $("#YBABSketchb4").text(result.b4);
                                                                                                                        $("#YBABSketchR").text("R" + 3 * result.thk4);
                                                                                                                        $("#YBABSketcharc").text(result.arc);
                                                                                                                        $("#YBABSketchh").text(result.h);
                                                                                                                        $("#YBABSketchthk1").text(result.thk1);
                                                                                                                        $("#YBABSketchl1").text(result.l1);
                                                                                                                        $("#YBABSketchBolt").text("配" + result.screw + "螺栓");
                                                                                                                        $("#YBABSketchd").text(result.d);
                                                                                                                        $("#YBABSketchl").text(result.l);
                                                                                                                        $("#YBABSketch2d").text("2-Φ" + result.d);
                                                                                                                        $("#YBABSketch").css("display", "block");
                                                                                                                    }

                                                                                                                    // 图 4
                                                                                                                    else if (YBASymbol === "BⅠ" && YBADN >= 168 && YBADN <= 450) {
                                                                                                                        $("#YBACSketchthk4").text(result.thk4);
                                                                                                                        $("#YBACSketchb121").text(result.b1 / 2);
                                                                                                                        $("#YBACSketchb122").text(result.b1 / 2);
                                                                                                                        $("#YBACSketchthk2").text(result.thk2);
                                                                                                                        $("#YBACSketchl21").text(result.l2);
                                                                                                                        $("#YBACSketchl22").text(result.l2);
                                                                                                                        $("#YBACSketchthk3").text(result.thk3);
                                                                                                                        $("#YBACSketche").text(result.e);
                                                                                                                        $("#YBACSketchb1").text(result.b1);
                                                                                                                        $("#YBACSketchb3").text(result.b3);
                                                                                                                        $("#YBACSketchb4").text(result.b4);
                                                                                                                        $("#YBACSketcharc").text(result.arc);
                                                                                                                        $("#YBACSketchh").text(result.h);
                                                                                                                        $("#YBACSketchthk1").text(result.thk1);
                                                                                                                        $("#YBACSketchl1").text(result.l1);
                                                                                                                        $("#YBACSketch").css("display", "block");
                                                                                                                    }

                                                                                                                    // 图 5
                                                                                                                    else if (YBASymbol === "BⅠ" && YBADN >= 500 && YBADN <= 900) {
                                                                                                                        $("#YBADSketchb1").text(result.b1);
                                                                                                                        $("#YBADSketchb3").text(result.b3);
                                                                                                                        $("#YBADSketchb4").text(result.b4);
                                                                                                                        $("#YBADSketchb121").text(result.b1 / 2);
                                                                                                                        $("#YBADSketchb122").text(result.b1 / 2);
                                                                                                                        $("#YBADSketchl1").text(result.l1);
                                                                                                                        $("#YBADSketchl21").text(result.l2);
                                                                                                                        $("#YBADSketchl22").text(result.l2);
                                                                                                                        $("#YBADSketchl3").text(result.l3);
                                                                                                                        $("#YBADSketchthk1").text(result.thk1);
                                                                                                                        $("#YBADSketchthk2").text(result.thk2);
                                                                                                                        $("#YBADSketchthk31").text(result.thk3);
                                                                                                                        $("#YBADSketchthk32").text(result.thk3);
                                                                                                                        $("#YBADSketchthk4").text(result.thk4);
                                                                                                                        $("#YBADSketcharc").text(result.arc);
                                                                                                                        $("#YBADSketchh").text(result.h);
                                                                                                                        $("#YBADSketche").text(result.e);
                                                                                                                        $("#YBADSketch").css("display", "block");
                                                                                                                    }

                                                                                                                    // 图 9
                                                                                                                    else if (YBASymbol === "BⅡ" && YBADN >= 1000 && YBADN <= 2000) {
                                                                                                                        $("#YBAASketch5080").text("80");
                                                                                                                        $("#YBAASketch120150").text("150°");
                                                                                                                        $("#YBAASketchthk4").text(result.thk4);
                                                                                                                        $("#YBAASketchb121").text(result.b1 / 2);
                                                                                                                        $("#YBAASketchb122").text(result.b1 / 2);
                                                                                                                        $("#YBAASketchthk2").text(result.thk2);
                                                                                                                        $("#YBAASketchl21").text(result.l2);
                                                                                                                        $("#YBAASketchl22").text(result.l2);
                                                                                                                        $("#YBAASketchthk31").text(result.thk3);
                                                                                                                        $("#YBAASketchthk32").text(result.thk3);
                                                                                                                        $("#YBAASketchthk33").text(result.thk3);
                                                                                                                        $("#YBAASketchthk34").text(result.thk3);
                                                                                                                        $("#YBAASketchl31").text(result.l3);
                                                                                                                        $("#YBAASketchl32").text(result.l3);
                                                                                                                        $("#YBAASketche").text(result.e);
                                                                                                                        $("#YBAASketchb1").text(result.b1);
                                                                                                                        $("#YBAASketchb2").text(result.b2);
                                                                                                                        $("#YBAASketchb3").text(result.b3);
                                                                                                                        $("#YBAASketchb4").text(result.b4);
                                                                                                                        $("#YBAASketchR").text("R" + 3 * result.thk4);
                                                                                                                        $("#YBAASketcharc").text(result.arc);
                                                                                                                        $("#YBAASketchh").text(result.h);
                                                                                                                        $("#YBAASketchthk1").text(result.thk1);
                                                                                                                        $("#YBAASketchl1").text(result.l1);
                                                                                                                        $("#YBAASketch").css("display", "block");
                                                                                                                    }

                                                                                                                    // 图 10
                                                                                                                    else if (YBASymbol === "BⅡ" && YBADN >= 2100 && YBADN <= 4000) {
                                                                                                                        $("#YBABSketch5080").text("80");
                                                                                                                        $("#YBABSketch120150").text("150°");
                                                                                                                        $("#YBABSketchthk4").text(result.thk4);
                                                                                                                        $("#YBABSketchb121").text(result.b1 / 2);
                                                                                                                        $("#YBABSketchb122").text(result.b1 / 2);
                                                                                                                        $("#YBABSketchthk2").text(result.thk2);
                                                                                                                        $("#YBABSketchl21").text(result.l2);
                                                                                                                        $("#YBABSketchl22").text(result.l2);
                                                                                                                        $("#YBABSketchthk31").text(result.thk3);
                                                                                                                        $("#YBABSketchthk32").text(result.thk3);
                                                                                                                        $("#YBABSketchthk33").text(result.thk3);
                                                                                                                        $("#YBABSketchthk34").text(result.thk3);
                                                                                                                        $("#YBABSketchthk35").text(result.thk3);
                                                                                                                        $("#YBABSketchthk36").text(result.thk3);
                                                                                                                        $("#YBABSketchl31").text(result.l3);
                                                                                                                        $("#YBABSketchl32").text(result.l3);
                                                                                                                        $("#YBABSketchl33").text(result.l3);
                                                                                                                        $("#YBABSketchl34").text(result.l3);
                                                                                                                        $("#YBABSketche").text(result.e);
                                                                                                                        $("#YBABSketchb1").text(result.b1);
                                                                                                                        $("#YBABSketchb2").text(result.b2);
                                                                                                                        $("#YBABSketchb3").text(result.b3);
                                                                                                                        $("#YBABSketchb4").text(result.b4);
                                                                                                                        $("#YBABSketchR").text("R" + 3 * result.thk4);
                                                                                                                        $("#YBABSketcharc").text(result.arc);
                                                                                                                        $("#YBABSketchh").text(result.h);
                                                                                                                        $("#YBABSketchthk1").text(result.thk1);
                                                                                                                        $("#YBABSketchl1").text(result.l1);
                                                                                                                        $("#YBABSketchBolt").text("配" + result.screw + "螺栓");
                                                                                                                        $("#YBABSketchd").text(result.d);
                                                                                                                        $("#YBABSketchl").text(result.l);
                                                                                                                        $("#YBABSketch2d").text("2-Φ" + result.d);
                                                                                                                        $("#YBABSketch").css("display", "block");
                                                                                                                    }

                                                                                                                    // 图 4
                                                                                                                    else if (YBASymbol === "BⅢ" && YBADN >= 168 && YBADN <= 450) {
                                                                                                                        $("#YBAESketchl1").text(result.l1);
                                                                                                                        $("#YBAESketchl21").text(result.l2);
                                                                                                                        $("#YBAESketchl22").text(result.l2);
                                                                                                                        $("#YBAESketchb1").text(result.b1);
                                                                                                                        $("#YBAESketchb121").text(result.b1 / 2);
                                                                                                                        $("#YBAESketchb122").text(result.b1 / 2);
                                                                                                                        $("#YBAESketchb3").text(result.b3);
                                                                                                                        $("#YBAESketchthk1").text(result.thk1);
                                                                                                                        $("#YBAESketchthk2").text(result.thk2);
                                                                                                                        $("#YBAESketchthk3").text(result.thk3);
                                                                                                                        $("#YBAESketchh").text(result.h);
                                                                                                                        $("#YBAESketch").css("display", "block");
                                                                                                                    }

                                                                                                                    // 图 5
                                                                                                                    else if (YBASymbol === "BⅢ" && YBADN >= 500 && YBADN <= 900) {
                                                                                                                        $("#YBAFSketchb1").text(result.b1);
                                                                                                                        $("#YBAFSketchb3").text(result.b3);
                                                                                                                        $("#YBAFSketchb121").text(result.b1 / 2);
                                                                                                                        $("#YBAFSketchb122").text(result.b1 / 2);
                                                                                                                        $("#YBAFSketchl1").text(result.l1);
                                                                                                                        $("#YBAFSketchl21").text(result.l2);
                                                                                                                        $("#YBAFSketchl22").text(result.l2);
                                                                                                                        $("#YBAFSketchl3").text(result.l3);
                                                                                                                        $("#YBAFSketchthk1").text(result.thk1);
                                                                                                                        $("#YBAFSketchthk2").text(result.thk2);
                                                                                                                        $("#YBAFSketchthk31").text(result.thk3);
                                                                                                                        $("#YBAFSketchthk32").text(result.thk3);
                                                                                                                        $("#YBAFSketchh").text(result.h);
                                                                                                                        $("#YBAFSketch").css("display", "block");
                                                                                                                    }

                                                                                                                    // 图 4
                                                                                                                    else if (YBASymbol === "BⅣ" && YBADN >= 168 && YBADN <= 450) {
                                                                                                                        $("#YBAGSketchthk11").text(result.thk1);
                                                                                                                        $("#YBAGSketchthk12").text(result.thk1);
                                                                                                                        $("#YBAGSketchthk3").text(result.thk3);
                                                                                                                        $("#YBAGSketchthk4").text(result.thk4);
                                                                                                                        $("#YBAGSketchl1").text(result.l1);
                                                                                                                        $("#YBAGSketchl21").text(result.l2);
                                                                                                                        $("#YBAGSketchl22").text(result.l2);
                                                                                                                        $("#YBAGSketchb1").text(result.b1);
                                                                                                                        $("#YBAGSketchb121").text(result.b1 / 2);
                                                                                                                        $("#YBAGSketchb122").text(result.b1 / 2);
                                                                                                                        $("#YBAGSketchb3").text(result.b3);
                                                                                                                        $("#YBAGSketchb4").text(result.b4);
                                                                                                                        $("#YBAGSketche").text(result.e);
                                                                                                                        $("#YBAGSketcharc").text(result.arc);
                                                                                                                        $("#YBAGSketchh").text(result.h);
                                                                                                                        $("#YBAGSketch").css("display", "block");
                                                                                                                    }

                                                                                                                    // 图 5
                                                                                                                    else if (YBASymbol === "BⅣ" && YBADN >= 500 && YBADN <= 900) {
                                                                                                                        $("#YBAHSketchb1").text(result.b1);
                                                                                                                        $("#YBAHSketchb3").text(result.b3);
                                                                                                                        $("#YBAHSketchb4").text(result.b4);
                                                                                                                        $("#YBAHSketchb121").text(result.b1 / 2);
                                                                                                                        $("#YBAHSketchb122").text(result.b1 / 2);
                                                                                                                        $("#YBAHSketchl1").text(result.l1);
                                                                                                                        $("#YBAHSketchl21").text(result.l2);
                                                                                                                        $("#YBAHSketchl22").text(result.l2);
                                                                                                                        $("#YBAHSketchl3").text(result.l3);
                                                                                                                        $("#YBAHSketchthk11").text(result.thk1);
                                                                                                                        $("#YBAHSketchthk12").text(result.thk1);
                                                                                                                        $("#YBAHSketchthk31").text(result.thk3);
                                                                                                                        $("#YBAHSketchthk32").text(result.thk3);
                                                                                                                        $("#YBAHSketchthk4").text(result.thk4);
                                                                                                                        $("#YBAHSketcharc").text(result.arc);
                                                                                                                        $("#YBAHSketchh").text(result.h);
                                                                                                                        $("#YBAHSketche").text(result.e);
                                                                                                                        $("#YBAHSketch").css("display", "block");
                                                                                                                    }

                                                                                                                    // 图 4
                                                                                                                    else if (YBASymbol === "BⅤ" && YBADN >= 168 && YBADN <= 450) {
                                                                                                                        $("#YBAISketchthk11").text(result.thk1);
                                                                                                                        $("#YBAISketchthk12").text(result.thk1);
                                                                                                                        $("#YBAISketchthk3").text(result.thk3);
                                                                                                                        $("#YBAISketchl1").text(result.l1);
                                                                                                                        $("#YBAISketchl21").text(result.l2);
                                                                                                                        $("#YBAISketchl22").text(result.l2);
                                                                                                                        $("#YBAISketchb1").text(result.b1);
                                                                                                                        $("#YBAISketchb121").text(result.b1 / 2);
                                                                                                                        $("#YBAISketchb122").text(result.b1 / 2);
                                                                                                                        $("#YBAISketchb3").text(result.b3);
                                                                                                                        $("#YBAISketchh").text(result.h);
                                                                                                                        $("#YBAISketch").css("display", "block");
                                                                                                                    }

                                                                                                                    // 图 5
                                                                                                                    else if (YBASymbol === "BⅤ" && YBADN >= 500 && YBADN <= 900) {
                                                                                                                        $("#YBAJSketchb1").text(result.b1);
                                                                                                                        $("#YBAJSketchb121").text(result.b1 / 2);
                                                                                                                        $("#YBAJSketchb122").text(result.b1 / 2);
                                                                                                                        $("#YBAJSketchb3").text(result.b3);
                                                                                                                        $("#YBAJSketchl1").text(result.l1);
                                                                                                                        $("#YBAJSketchl21").text(result.l2);
                                                                                                                        $("#YBAJSketchl22").text(result.l2);
                                                                                                                        $("#YBAJSketchl3").text(result.l3);
                                                                                                                        $("#YBAJSketchthk11").text(result.thk1);
                                                                                                                        $("#YBAJSketchthk12").text(result.thk1);
                                                                                                                        $("#YBAJSketchthk31").text(result.thk3);
                                                                                                                        $("#YBAJSketchthk32").text(result.thk3);
                                                                                                                        $("#YBAJSketchh").text(result.h);
                                                                                                                        $("#YBAJSketch").css("display", "block");
                                                                                                                    }
                                                                                                                },
                                                                                                                error: function () {
                                                                                                                    ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                                                                                                                        '<span style="color:red;">&ensp;鞍座尺寸获取失败，请检查网络后重试</span>');
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                            },
                                                                                            error: function () {
                                                                                                ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                                                                                                    '<span style="color:red;">&ensp;数据获取失败，请检查网络后重试</span>');
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                });
                                                                            }
                                                                        },
                                                                        error: function () {
                                                                            ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                                                                                '<span style="color:red;">&ensp;数据获取失败，请检查网络后重试</span>');
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    },
                                                    error: function () {
                                                        ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                                                            '<span style="color:red;">&ensp;数据获取失败，请检查网络后重试</span>');
                                                    }
                                                });
                                            }
                                        });
                                    }
                                },
                                error: function () {
                                    ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                                        '<span style="color:red;">&ensp;数据获取失败，请检查网络后重试</span>');
                                }
                            });
                        }
                    }
                }


            });
        },
        error: function () {
            ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                '<span style="color:red;">&ensp;DN(公称直径)列表获取失败，请检查网络后重试</span>');
        }
    });
});