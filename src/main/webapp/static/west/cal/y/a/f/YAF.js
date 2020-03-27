$(document).ready(function () {

    let ajaxAlert = $("#AjaxAlert");

    // 获取 DN 列表
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "hgt_21574_2008_axb_list_dn.action",
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
                $("#YAFDN").append('<option class="YAFDNResult" value=\"' + item + '\">DN' + item + '</option>');
            });
        },
        error: function () {
            ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                '<span style="color:red;">&ensp;DN(公称直径)列表获取失败，请检查网络后重试</span>');
        }
    });

    let YAFDN, YAFLiftWeight, YAFType;

    // DN、吊重改变事件
    $("#YAFDN, #YAFLiftWeight").off("change").on("change", function () {

        // 处理受本菜单影响的后续项
        $(".YAFTypeResult").remove();
        $(".YAFResult").remove();

        $("#YAFSketchS21").empty().text("S2");
        $("#YAFSketchS22").empty().text("S2");
        $("#YAFSketchL").empty().text("L");
        $("#YAFSketchS1").empty().text("S1");
        $("#YAFSketchMIN").empty().text("δmin");
        $("#YAFSketchD1").empty().text("∅D1");
        $("#YAFSketchS-1").empty().text("S");
        $("#YAFSketchS-2").empty().text("S");
        $("#YAFSketchD2").empty().text("∅D2");
        $("#YAFSketchD0").empty().text("∅Do");

        YAFDN = $("#YAFDN").val();
        if (YAFDN !== "YAFNull") {

            let YAFLiftWeightVal = $("#YAFLiftWeight").val();
            if (YAFLiftWeightVal.length > 0 && !isNaN(parseFloat(YAFLiftWeightVal)) && parseFloat(YAFLiftWeightVal) > 0) {
                YAFLiftWeight = parseFloat(YAFLiftWeightVal);

                // 获取可用型号
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "hgt_21574_2008_axb_list_norms.action",
                    async: false,
                    dataType: "json",
                    data: JSON.stringify({
                        "dn": YAFDN,
                        "liftWeight": YAFLiftWeight,
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
                                $("#YAFType").append("<option class='YAFTypeResult' value='" + item + "'>" + "AXB-" + item + "</option>");
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
    $("#YAFType").off("change").on("change", function () {

        // 处理受本菜单影响的后续项
        $(".YAFResult").remove();

        $("#YAFSketchS21").empty().text("S2");
        $("#YAFSketchS22").empty().text("S2");
        $("#YAFSketchL").empty().text("L");
        $("#YAFSketchS1").empty().text("S1");
        $("#YAFSketchMIN").empty().text("δmin");
        $("#YAFSketchD1").empty().text("∅D1");
        $("#YAFSketchS-1").empty().text("S");
        $("#YAFSketchS-2").empty().text("S");
        $("#YAFSketchD2").empty().text("∅D2");
        $("#YAFSketchD0").empty().text("∅Do");

        YAFType = $("#YAFType").val();
        if (YAFType !== "YAFNull") {

            // 获取详细信息
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "hgt_21574_2008_axb_get_details.action",
                async: true,
                dataType: "json",
                data: JSON.stringify({
                    "dn": YAFDN,
                    "liftWeight": YAFLiftWeight,
                    "type": YAFType
                }),
                beforeSend: function () {
                    ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;正在获取吊耳尺寸</span>');
                },
                success: function (result) {

                    ajaxAlert.html('<small><i class="fa fa-check" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;吊耳尺寸获取成功</span>');

                    $("#YAFInsert").after(
                        "<tr class='YAFResult'>" +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        "AXB-" + result.lugDN + "-" + result.padTHK +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        "AXB-" + result.lugDN +
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

                    $("#YAFSketchS21").empty().text(result.s2);
                    $("#YAFSketchS22").empty().text(result.s2);
                    $("#YAFSketchL").empty().text(result.l);
                    $("#YAFSketchS1").empty().text(result.padTHK);
                    $("#YAFSketchMIN").empty().text("δmin=" + result.shellMinTHK);
                    $("#YAFSketchD1").empty().text("∅" + result.d1);
                    $("#YAFSketchS-1").empty().text(result.s);
                    $("#YAFSketchS-2").empty().text(result.s);
                    $("#YAFSketchD2").empty().text("∅" + result.d2);
                    $("#YAFSketchD0").empty().text("∅" + result.d0);

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