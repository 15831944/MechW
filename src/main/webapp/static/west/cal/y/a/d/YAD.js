$(document).ready(function () {

    let ajaxAlert = $("#AjaxAlert");

    let YADLiftWeight, YADType;

    // 吊重改变事件
    $("#YADLiftWeight").off("change").on("change", function () {

        // 处理受本菜单影响的后续项
        $(".YADTypeResult").remove();
        $(".YADResult").remove();

        $("#YADSketchS11").empty().text("S");
        $("#YADSketchS21").empty().text("S2");
        $("#YADSketchS22").empty().text("S2");
        $("#YADSketchS28").empty().text("0.8S2");
        $("#YADSketchL3").empty().text("L3");
        $("#YADSketchA1").empty().text("a");
        $("#YADSketchA2").empty().text("a");
        $("#YADSketchS12").empty().text("S");
        $("#YADSketchS18").empty().text("0.8S1");
        $("#YADSketchS1").empty().text("S1");
        $("#YADSketchD").empty().text("∅D");
        $("#YADSketchD1").empty().text("∅D1");
        $("#YADSketchL1").empty().text("L1");
        $("#YADSketchG").empty().text("G");
        $("#YADSketchF").empty().text("F");
        $("#YADSketchH").empty().text("H");
        $("#YADSketchHSP").empty().text("HSP");
        $("#YADSketchLSP").empty().text("LSP");
        $("#YADSketchR").empty().text("r");

        let YADLiftWeightVal = $("#YADLiftWeight").val();
        if (YADLiftWeightVal.length > 0 && !isNaN(parseFloat(YADLiftWeightVal)) && parseFloat(YADLiftWeightVal) > 0) {
            YADLiftWeight = parseFloat(YADLiftWeightVal);

            // 获取可用型号
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "hgt_21574_2008_sp_list_norms.action",
                async: false,
                dataType: "json",
                data: JSON.stringify({
                    "liftWeight": YADLiftWeight,
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
                            $("#YADType").append("<option class='YADTypeResult'" + " value='" + item + "'>" + "SP-" + item + "</option>");
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

    });

    // type 改变事件
    $("#YADType").off("change").on("change", function () {

        // 处理受本菜单影响的后续项
        $(".YADResult").remove();

        $("#YADSketchS11").empty().text("S");
        $("#YADSketchS21").empty().text("S2");
        $("#YADSketchS22").empty().text("S2");
        $("#YADSketchS28").empty().text("0.8S2");
        $("#YADSketchL3").empty().text("L3");
        $("#YADSketchA1").empty().text("a");
        $("#YADSketchA2").empty().text("a");
        $("#YADSketchS12").empty().text("S");
        $("#YADSketchS18").empty().text("0.8S1");
        $("#YADSketchS1").empty().text("S1");
        $("#YADSketchD").empty().text("∅D");
        $("#YADSketchD1").empty().text("∅D1");
        $("#YADSketchL1").empty().text("L1");
        $("#YADSketchG").empty().text("G");
        $("#YADSketchF").empty().text("F");
        $("#YADSketchH").empty().text("H");
        $("#YADSketchHSP").empty().text("HSP");
        $("#YADSketchLSP").empty().text("LSP");
        $("#YADSketchR").empty().text("r");

        YADType = $("#YADType").val();
        if (YADType !== "YADNull") {

            // 获取详细信息
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "hgt_21574_2008_sp_get_details.action",
                async: true,
                dataType: "json",
                data: JSON.stringify({
                    "type": YADType
                }),
                beforeSend: function () {
                    ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;正在获取吊耳尺寸</span>');
                },
                success: function (result) {

                    ajaxAlert.html('<small><i class="fa fa-check" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;吊耳尺寸获取成功</span>');

                    $("#YADInsert").after(
                        "<tr class='YADResult'>" +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        "SP-" + result.liftWeight +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        "SP-" + result.liftWeight +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.liftWeight +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.s +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.s2 +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.s1 +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.d +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.d1 +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.h +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.hsp +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.lsp +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        "/" +
                        '</td>' +
                        '</tr>');

                    $("#YADSketchS11").empty().text(result.s);
                    $("#YADSketchS21").empty().text(result.s2);
                    $("#YADSketchS22").empty().text(result.s2);
                    $("#YADSketchS28").empty().text((0.8 * result.s2).toFixed(1));
                    $("#YADSketchL3").empty().text(result.l3);
                    $("#YADSketchA1").empty().text(result.a);
                    $("#YADSketchA2").empty().text(result.a);
                    $("#YADSketchS12").empty().text(result.s);
                    $("#YADSketchS18").empty().text((0.8 * result.s1).toFixed(1));
                    $("#YADSketchS1").empty().text(result.s1);
                    $("#YADSketchD").empty().text("∅" + result.d);
                    $("#YADSketchD1").empty().text("∅" + result.d1);
                    $("#YADSketchL1").empty().text(result.l1);
                    $("#YADSketchG").empty().text(result.g);
                    $("#YADSketchF").empty().text(result.f);
                    $("#YADSketchH").empty().text(result.h);
                    $("#YADSketchHSP").empty().text(result.hsp);
                    $("#YADSketchLSP").empty().text(result.lsp);
                    $("#YADSketchR").empty().text("r=" + result.r);

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