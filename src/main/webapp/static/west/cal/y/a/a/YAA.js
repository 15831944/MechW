$(document).ready(function () {

    let ajaxAlert = $("#AjaxAlert");

    // 获取可用的DN
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "hgt_21574_2008_tp_list_dn.action",
        async: true,
        dataType: "json",
        data: JSON.stringify({"request": "DN"}),
        beforeSend: function () {
            ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                '<span style="color:#18bc9c;">&ensp;正在获取DN(公称直径)列表</span>');
        },
        success: function (result) {
            ajaxAlert.html('<i class="fa fa-check" style="color:#18bc9c;font-size:16px;"></i>' +
                '<span style="color:#18bc9c;">&ensp;DN(公称直径)列表获取成功</span>');
            $.each(result, function (i, item) {
                $("#YAADN").append('<option value=\"' + item + '\">DN' + item + '</option>');
            });
        },
        error: function () {
            ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                '<span style="color:red;">&ensp;DN(公称直径)列表获取失败，请检查网络后重试</span>');
        }
    });

    let YAADN, YAALiftWeight, YAAType;

    // DN 事件 LiftWeight 事件
    $("#YAADN, #YAALiftWeight").off("change").on("change", function () {

        // 处理受本菜单影响的后续项
        $(".YAATypeResult").remove();
        $(".YAAResult").remove();

        $("#YAASketchTHKMIN").empty().text("δmin");
        $("#YAASketchS").empty().text("S");
        $("#YAASketchD").empty().text("ΦD");
        $("#YAASketchR").empty().text("R");
        $("#YAASketchL").empty().text("L");
        $("#YAASketchB").empty().text("到设备中心线距离 B");

        YAADN = $("#YAADN").val();
        if (YAADN !== "YAANull") {

            let YAALiftWeightVal = $("#YAALiftWeight").val();
            if (YAALiftWeightVal.length > 0 && !isNaN(parseFloat(YAALiftWeightVal)) && parseFloat(YAALiftWeightVal) > 0) {
                YAALiftWeight = parseFloat(YAALiftWeightVal);

                // 获取可用型号
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "hgt_21574_2008_tp_list_norms.action",
                    async: false,
                    dataType: "json",
                    data: JSON.stringify({
                        "dn": YAADN,
                        "liftWeight": YAALiftWeight,
                    }),
                    beforeSend: function () {
                        ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                            '<span style="color:#18bc9c;">&ensp;正在获取可用型号列表</span>');
                    },
                    success: function (result) {
                        ajaxAlert.html('<small><i class="fa fa-check" style="color:#18bc9c;"></i></small>' +
                            '<span style="color:#18bc9c;">&ensp;可用型号列表获取成功</span>');
                        if (result.isNull === "yes") {
                            ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                                '<span style="color:red;">&ensp;没有可用型号！</span>');
                        } else {
                            $.each(result, function (i, item) {
                                $("#YAAType").append("<option class='YAATypeResult'>" + item + "</option>");
                            });
                        }
                    },
                    error: function () {
                        ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                            '<span style="color:red;">&ensp;可用型号列表获取失败，请检查网络后重试</span>');
                    }
                });

            } else {
                ajaxAlert.empty();
            }

        } else {
            ajaxAlert.empty();
        }

    });

    // Type 改变事件
    $("#YAAType").off("change").on("change", function () {

        // 处理受本菜单影响的后续项
        $(".YAAResult").remove();

        $("#YAASketchTHKMIN").empty().text("δmin");
        $("#YAASketchS").empty().text("S");
        $("#YAASketchD").empty().text("ΦD");
        $("#YAASketchR").empty().text("R");
        $("#YAASketchL").empty().text("L");
        $("#YAASketchB").empty().text("到设备中心线距离 B");

        YAAType = $("#YAAType").val();
        if (YAAType !== "YAANull") {

            // 获取详细信息
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "hgt_21574_2008_tp_get_details.action",
                async: true,
                dataType: "json",
                data: JSON.stringify({
                    "dn": YAADN,
                    "liftWeight": YAALiftWeight,
                    "type": YAAType
                }),
                beforeSend: function () {
                    ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;正在获取吊耳尺寸</span>');
                },
                success: function (result) {

                    ajaxAlert.html('<small><i class="fa fa-check" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;吊耳尺寸获取成功</span>');

                    let YAABVAL = result.distance;
                    let YAAT = result.liftWeight;
                    let YAANorm = result.type;
                    let YAAMIN = result.shellMin;
                    let YAAS = result.s;
                    let YAAD = result.d;
                    let YAAL = result.l;
                    let YAAR = result.r;
                    let YAAKG = result.lugWeight;

                    // 处理 B 值
                    let YAAB;
                    if (parseFloat(YAABVAL) <= 0) {
                        YAAB = "/";
                    } else {
                        YAAB = YAABVAL;
                    }

                    $("#YAAInsert").after(
                        "<tr class='YAAResult'>" +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YAANorm +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YAANorm +
                        '</td>' +
                        '<td colspan="2" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YAAT +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YAAB +
                        '</td>' +
                        '<td colspan="2" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YAAMIN +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YAAS +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YAAD +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YAAL +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YAAR +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YAAKG +
                        '</td>' +
                        '</tr>');

                    $("#YAASketchTHKMIN").empty().text("δmin=" + YAAMIN);
                    $("#YAASketchS").empty().text(YAAS);
                    $("#YAASketchD").empty().text("Φ" + YAAD);
                    $("#YAASketchR").empty().text("R" + YAAR);
                    $("#YAASketchL").empty().text(YAAL);
                    $("#YAASketchB").empty().text("到设备中心线距离 B=" + YAAB);

                },
                error: function () {
                    ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                        '<span style="color:red;">&ensp;吊耳尺寸获取失败，请检查网络后重试</span>');
                }
            });
        }
        else {
            ajaxAlert.empty();
        }
    });
});