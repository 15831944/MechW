$(document).ready(function () {

    let ajaxAlert = $("#AjaxAlert");

    // 获取 DN 列表
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "hgt_21574_2008_tpp_list_dn.action",
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
                $("#YABDN").append('<option class="YABDNResult" value=\"' + item + '\">DN' + item + '</option>');
            });
        },
        error: function () {
            ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                '<span style="color:red;">&ensp;DN(公称直径)列表获取失败，请检查网络后重试</span>');
        }
    });

    let YABDN, YABLiftWeight, YABType;

    // DN、吊重改变事件
    $("#YABDN, #YABLiftWeight").off("change").on("change", function () {

        // 处理受本菜单影响的后续项
        $(".YABTypeResult").remove();
        $(".YABResult").remove();

        $("#YABSketchLTP").empty().text("LTP");
        $("#YABSketchB").empty().text("到设备中心线距离 B");
        $("#YABSketchS1").empty().text("S1");
        $("#YABSketchMIN").empty().text("δmin");
        $("#YABSketchL").empty().text("L");
        $("#YABSketchD").empty().text("∅D");
        $("#YABSketchR").empty().text("R");
        $("#YABSketchHTP").empty().text("HTP");
        $("#YABSketchS").empty().text("S");

        YABDN = $("#YABDN").val();
        if (YABDN !== "YABNull") {

            let YABLiftWeightVal = $("#YABLiftWeight").val();
            if (YABLiftWeightVal.length > 0 && !isNaN(parseFloat(YABLiftWeightVal)) && parseFloat(YABLiftWeightVal) > 0) {
                YABLiftWeight = parseFloat(YABLiftWeightVal);

                // 获取可用型号
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "hgt_21574_2008_tpp_list_norms.action",
                    async: false,
                    dataType: "json",
                    data: JSON.stringify({
                        "dn": YABDN,
                        "liftWeight": YABLiftWeight,
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
                                $("#YABType").append("<option class='YABTypeResult'>" + item + "</option>");
                            });
                        }

                    },
                    error: function () {
                        ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                            '<span style="color:red;">&ensp;可用型号列表获取失败，请检查网络后重试</span>');
                    }
                });
            }
            else {
                ajaxAlert.empty();
            }
        }
        else {
            ajaxAlert.empty();
        }
    });

    // type 改变事件
    $("#YABType").off("change").on("change", function () {

        // 处理受本菜单影响的后续项
        $(".YABResult").remove();

        $("#YABSketchLTP").empty().text("LTP");
        $("#YABSketchB").empty().text("到设备中心线距离 B");
        $("#YABSketchS1").empty().text("S1");
        $("#YABSketchMIN").empty().text("δmin");
        $("#YABSketchL").empty().text("L");
        $("#YABSketchD").empty().text("∅D");
        $("#YABSketchR").empty().text("R");
        $("#YABSketchHTP").empty().text("HTP");
        $("#YABSketchS").empty().text("S");

        YABType = $("#YABType").val();
        if (YABType !== "YABNull") {

            // 获取详细信息
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "hgt_21574_2008_tpp_get_details.action",
                async: true,
                dataType: "json",
                data: JSON.stringify({
                    "dn": YABDN,
                    "liftWeight": YABLiftWeight,
                    "type": YABType
                }),
                beforeSend: function () {
                    ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;正在获取吊耳尺寸</span>');
                },
                success: function (result) {

                    ajaxAlert.html('<small><i class="fa fa-check" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;吊耳尺寸获取成功</span>');

                    let YABNorm = result.type;
                    let YABT = result.liftWeight;
                    let YABR = result.r;
                    let YABD = result.d;
                    let YABL = result.l;
                    let YABS = result.s;
                    let YABPADMIN = result.padMin;
                    let YABLTP = result.ltp;
                    let YABHTP = result.htp;
                    let YABSHELLMIN = result.shellMin;
                    let YABBVAL = result.distance;
                    let YABKG = result.lugWeight;
                    let YABPADWEIGHTFACTOR = result.padWeightFactor;

                    let YABB;
                    if (parseFloat(YABBVAL) <= 0) {
                        YABB = "/";
                    } else {
                        YABB = YABBVAL;
                    }

                    $("#YABInsert").after(
                        "<tr class='YABResult'>" +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YABNorm + "-" + YABPADMIN +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YABNorm +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YABT +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YABR +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YABD +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YABL +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YABS +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YABPADMIN +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YABLTP + "/" + YABHTP +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YABSHELLMIN +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YABB +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YABKG + "/" + (YABPADWEIGHTFACTOR * YABPADMIN).toFixed(2) +
                        '</td>' +
                        '</tr>');

                    $("#YABSketchLTP").empty().text(YABLTP);
                    $("#YABSketchB").empty().text("到设备中心线距离 B=" + YABB);
                    $("#YABSketchS1").empty().text(YABPADMIN);
                    $("#YABSketchMIN").empty().text("δmin=" + YABSHELLMIN);
                    $("#YABSketchL").empty().text(YABL);
                    $("#YABSketchD").empty().text("∅" + YABD);
                    $("#YABSketchR").empty().text("R" + YABR);
                    $("#YABSketchHTP").empty().text(YABHTP);
                    $("#YABSketchS").empty().text(YABS);
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