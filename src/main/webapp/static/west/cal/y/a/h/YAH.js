$(document).ready(function () {

    let ajaxAlert = $("#AjaxAlert");

    let YAHLiftWeight, YAHType;

    // 吊重改变事件
    $("#YAHLiftWeight").off("change").on("change", function () {

        // 型号列表
        $(".YAHTypeResult").remove();

        // 具体尺寸
        $(".YAHResult").remove();

        // SINGLE Sketch 尺寸
        $("#YAHSketchA").css("display", "none");
        $("#YAHSketchAS").empty().text("S");
        $("#YAHSketchA05S").empty().text("0.5S");
        $("#YAHSketchA6S3").empty().text("max(6, S/3)");
        $("#YAHSketchAS11").empty().text("S1");
        $("#YAHSketchAS12").empty().text("S1");
        $("#YAHSketchA08S1").empty().text("0.8S1");
        $("#YAHSketchAD").empty().text("∅D");
        $("#YAHSketchAD1").empty().text("∅D1");
        $("#YAHSketchAR").empty().text("R");
        $("#YAHSketchAH").empty().text("H");
        $("#YAHSketchAL").empty().text("L");

        // DOUBLE Sketch 尺寸
        $("#YAHSketchB").css("display", "none");
        $("#YAHSketchBS").empty().text("S");
        $("#YAHSketchB05S").empty().text("0.5S");
        $("#YAHSketchB6S3").empty().text("max(6, S/3)");
        $("#YAHSketchBS11").empty().text("S1");
        $("#YAHSketchBS12").empty().text("S1");
        $("#YAHSketchB08S1").empty().text("0.8S1");
        $("#YAHSketchBD").empty().text("∅D");
        $("#YAHSketchBD1").empty().text("∅D1");
        $("#YAHSketchBR").empty().text("R");
        $("#YAHSketchBH").empty().text("H");
        $("#YAHSketchBL").empty().text("L");

        let YAHLiftWeightVal = $("#YAHLiftWeight").val();
        if (YAHLiftWeightVal.length > 0 && !isNaN(parseFloat(YAHLiftWeightVal)) && parseFloat(YAHLiftWeightVal) > 0) {
            YAHLiftWeight = parseFloat(YAHLiftWeightVal);
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "hgt_21574_2008_ap_list_norms.action",
                async: false,
                dataType: "json",
                data: JSON.stringify({
                    "liftWeight": YAHLiftWeight,
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
                            $("#YAHType").append("<option class='YAHTypeResult'" + " value='" + item + "'>" + "AP-" + item + "</option>");
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

    });

    // type 改变事件
    $("#YAHType").off("change").on("change", function () {

        // 具体尺寸
        $(".YAHResult").remove();

        // SINGLE Sketch 尺寸
        $("#YAHSketchA").css("display", "none");
        $("#YAHSketchAS").empty().text("S");
        $("#YAHSketchA05S").empty().text("0.5S");
        $("#YAHSketchA6S3").empty().text("max(6, S/3)");
        $("#YAHSketchAS11").empty().text("S1");
        $("#YAHSketchAS12").empty().text("S1");
        $("#YAHSketchA08S1").empty().text("0.8S1");
        $("#YAHSketchAD").empty().text("∅D");
        $("#YAHSketchAD1").empty().text("∅D1");
        $("#YAHSketchAR").empty().text("R");
        $("#YAHSketchAH").empty().text("H");
        $("#YAHSketchAL").empty().text("L");

        // DOUBLE Sketch 尺寸
        $("#YAHSketchB").css("display", "none");
        $("#YAHSketchBS").empty().text("S");
        $("#YAHSketchB05S").empty().text("0.5S");
        $("#YAHSketchB6S3").empty().text("max(6, S/3)");
        $("#YAHSketchBS11").empty().text("S1");
        $("#YAHSketchBS12").empty().text("S1");
        $("#YAHSketchB08S1").empty().text("0.8S1");
        $("#YAHSketchBD").empty().text("∅D");
        $("#YAHSketchBD1").empty().text("∅D1");
        $("#YAHSketchBR").empty().text("R");
        $("#YAHSketchBH").empty().text("H");
        $("#YAHSketchBL").empty().text("L");

        YAHType = $("#YAHType").val();
        if (YAHType !== "YAHNull") {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "hgt_21574_2008_ap_get_details.action",
                async: true,
                dataType: "json",
                data: JSON.stringify({
                    "type": YAHType
                }),
                beforeSend: function () {
                    ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;正在获取吊耳尺寸</span>');
                },
                success: function (result) {

                    ajaxAlert.html('<small><i class="fa fa-check" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;吊耳尺寸获取成功</span>');

                    $("#YAHInsert").after(
                        "<tr class='YAHResult'>" +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        "AP-" + result.liftWeight +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        "AP-" + result.liftWeight +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.liftWeight +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.s +
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
                        result.r +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        2 * result.r +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.l +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        Math.max(6, result.s / 3).toFixed(2) +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.mass +
                        '</td>' +
                        '</tr>');

                    // SINGLE Sketch 尺寸
                    $("#YAHSketchAS").empty().text(result.s);
                    $("#YAHSketchA05S").empty().text(0.5 * result.s);
                    $("#YAHSketchA6S3").empty().text(Math.max(6, result.s / 3).toFixed(2));
                    $("#YAHSketchAS11").empty().text(result.s1);
                    $("#YAHSketchAS12").empty().text(result.s1);
                    $("#YAHSketchA08S1").empty().text((0.8 * result.s1).toFixed(2));
                    $("#YAHSketchAD").empty().text("∅" + result.d);
                    $("#YAHSketchAD1").empty().text("∅" + result.d1);
                    $("#YAHSketchAR").empty().text("R" + result.r);
                    $("#YAHSketchAH").empty().text(2 * result.r);
                    $("#YAHSketchAL").empty().text(result.l);

                    // DOUBLE Sketch 尺寸
                    $("#YAHSketchBS").empty().text(result.s);
                    $("#YAHSketchB05S").empty().text(0.5 * result.s);
                    $("#YAHSketchB6S3").empty().text(Math.max(6, result.s / 3).toFixed(2));
                    $("#YAHSketchBS11").empty().text(result.s1);
                    $("#YAHSketchBS12").empty().text(result.s1);
                    $("#YAHSketchB08S1").empty().text((0.8 * result.s1).toFixed(2));
                    $("#YAHSketchBD").empty().text("∅" + result.d);
                    $("#YAHSketchBD1").empty().text("∅" + result.d1);
                    $("#YAHSketchBR").empty().text("R" + result.r);
                    $("#YAHSketchBH").empty().text(2 * result.r);
                    $("#YAHSketchBL").empty().text(result.l);

                    if (parseFloat(YAHType) < 100) {
                        $("#YAHSketchA").css("display", "");
                    } else {
                        $("#YAHSketchB").css("display", "");
                    }

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