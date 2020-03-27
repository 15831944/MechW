$(document).ready(function () {

    let ajaxAlert = $("#AjaxAlert");

    // 获取 DN 列表
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "hgt_21574_2008_axa_list_dn.action",
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
                $("#YAEDN").append('<option class="YAEDNResult" value=\"' + item + '\">DN' + item + '</option>');
            });
        },
        error: function () {
            ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                '<span style="color:red;">&ensp;DN(公称直径)列表获取失败，请检查网络后重试</span>');
        }
    });

    let YAEDN, YAELiftWeight, YAEType;

    // DN、吊重改变事件
    $("#YAEDN, #YAELiftWeight").off("change").on("change", function () {

        // 处理受本菜单影响的后续项
        $(".YAETypeResult").remove();
        $(".YAEResult").remove();

        $("#YAESketchS2").empty().text("S2");
        $("#YAESketchD2").empty().text("∅D2");
        $("#YAESketchL").empty().text("L");
        $("#YAESketchS1").empty().text("S1");
        $("#YAESketchD1").empty().text("∅D1");
        $("#YAESketchMIN").empty().text("δmin");
        $("#YAESketchS").empty().text("S");
        $("#YAESketchDO").empty().text("∅Do");

        YAEDN = $("#YAEDN").val();
        if (YAEDN !== "YAENull") {

            let YAELiftWeightVal = $("#YAELiftWeight").val();
            if (YAELiftWeightVal.length > 0 && !isNaN(parseFloat(YAELiftWeightVal)) && parseFloat(YAELiftWeightVal) > 0) {
                YAELiftWeight = parseFloat(YAELiftWeightVal);

                // 获取可用型号
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "hgt_21574_2008_axa_list_norms.action",
                    async: false,
                    dataType: "json",
                    data: JSON.stringify({
                        "dn": YAEDN,
                        "liftWeight": YAELiftWeight,
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
                                $("#YAEType").append("<option class='YAETypeResult' value='" + item + "'>" + "AXA-" + item + "</option>");
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

    // type 改变事件
    $("#YAEType").off("change").on("change", function () {

        // 处理受本菜单影响的后续项
        $(".YAEResult").remove();

        $("#YAESketchS2").empty().text("S2");
        $("#YAESketchD2").empty().text("∅D2");
        $("#YAESketchL").empty().text("L");
        $("#YAESketchS1").empty().text("S1");
        $("#YAESketchD1").empty().text("∅D1");
        $("#YAESketchMIN").empty().text("δmin");
        $("#YAESketchS").empty().text("S");
        $("#YAESketchDO").empty().text("∅Do");

        YAEType = $("#YAEType").val();
        if (YAEType !== "YAENull") {

            // 获取详细信息
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "hgt_21574_2008_axa_get_details.action",
                async: true,
                dataType: "json",
                data: JSON.stringify({
                    "dn": YAEDN,
                    "liftWeight": YAELiftWeight,
                    "type": YAEType
                }),
                beforeSend: function () {
                    ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;正在获取吊耳尺寸</span>');
                },
                success: function (result) {

                    ajaxAlert.html('<small><i class="fa fa-check" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;吊耳尺寸获取成功</span>');

                    $("#YAEInsert").after(
                        "<tr class='YAEResult'>" +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        "AXA-" + result.lugDN + "-" + result.padTHK +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        "AXA-" + result.lugDN +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.liftWeight +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.d2 +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.s2 +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.d0 +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.s +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        (result.l + result.padTHK) +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.d1 +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.padTHK +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.shellMinTHK +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        (result.w1 + result.u * result.padTHK).toFixed(2) +
                        '</td>' +
                        '</tr>');

                    $("#YAESketchS2").empty().text(result.s2);
                    $("#YAESketchD2").empty().text("∅" + result.d2);
                    $("#YAESketchL").empty().text(result.l);
                    $("#YAESketchS1").empty().text(result.padTHK);
                    $("#YAESketchD1").empty().text("∅" + result.d1);
                    $("#YAESketchMIN").empty().text("δmin=" + result.shellMinTHK);
                    $("#YAESketchS").empty().text(result.s);
                    $("#YAESketchDO").empty().text("∅" + result.d0);

                },
                error: function () {
                    ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                        '<span style="color:red;">&ensp;吊耳尺寸获取失败，请检查网络后重试</span>');
                }
            });

        } else {
            ajaxAlert.empty();
        }
    });
});