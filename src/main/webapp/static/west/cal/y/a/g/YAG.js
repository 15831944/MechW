$(document).ready(function () {

    let ajaxAlert = $("#AjaxAlert");

    // 获取 DN 列表
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "hgt_21574_2008_axc_list_dn.action",
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
                $("#YAGDN").append('<option class="YAGDNResult" value="' + item + '">DN' + item + '</option>');
            });
        },
        error: function () {
            ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                '<span style="color:red;">&ensp;DN(公称直径)列表获取失败，请检查网络后重试</span>');
        }
    });

    let YAGDN, YAGLiftWeight, YAGType;

    // DN、吊重改变事件
    $("#YAGDN, #YAGLiftWeight").off("change").on("change", function () {

        // 处理受本菜单影响的后续项
        $(".YAGTypeResult").remove();
        $(".YAGResult").remove();

        $("#YAGSketchS21").empty().text("S2");
        $("#YAGSketchS22").empty().text("S2");
        $("#YAGSketchL").empty().text("L");
        $("#YAGSketchS1").empty().text("S1");
        $("#YAGSketchMIN").empty().text("δmin");
        $("#YAGSketchD1").empty().text("∅D1");
        $("#YAGSketchS-1").empty().text("S");
        $("#YAGSketchS-2").empty().text("S");
        $("#YAGSketchD2").empty().text("∅D2");
        $("#YAGSketchD0").empty().text("∅Do");
        $("#YAGSketchT-1").empty().text("T");
        $("#YAGSketchT-2").empty().text("T");

        YAGDN = $("#YAGDN").val();
        if (YAGDN !== "YAGNull") {

            let YAGLiftWeightVal = $("#YAGLiftWeight").val();
            if (YAGLiftWeightVal.length > 0 && !isNaN(parseFloat(YAGLiftWeightVal)) && parseFloat(YAGLiftWeightVal) > 0) {
                YAGLiftWeight = parseFloat(YAGLiftWeightVal);

                // 获取可用型号
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "hgt_21574_2008_axc_list_norms.action",
                    async: false,
                    dataType: "json",
                    data: JSON.stringify({
                        "dn": YAGDN,
                        "liftWeight": YAGLiftWeight,
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
                                $("#YAGType").append("<option class='YAGTypeResult' value='" + item + "'>" + "AXC-" + item + "</option>");
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
    $("#YAGType").off("change").on("change", function () {

        // 处理受本菜单影响的后续项
        $(".YAGResult").remove();

        $("#YAGSketchS21").empty().text("S2");
        $("#YAGSketchS22").empty().text("S2");
        $("#YAGSketchL").empty().text("L");
        $("#YAGSketchS1").empty().text("S1");
        $("#YAGSketchMIN").empty().text("δmin");
        $("#YAGSketchD1").empty().text("∅D1");
        $("#YAGSketchS-1").empty().text("S");
        $("#YAGSketchS-2").empty().text("S");
        $("#YAGSketchD2").empty().text("∅D2");
        $("#YAGSketchD0").empty().text("∅Do");
        $("#YAGSketchT-1").empty().text("T");
        $("#YAGSketchT-2").empty().text("T");

        YAGType = $("#YAGType").val();
        if (YAGType !== "YAGNull") {

            // 获取详细信息
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "hgt_21574_2008_axc_get_details.action",
                async: true,
                dataType: "json",
                data: JSON.stringify({
                    "dn": YAGDN,
                    "liftWeight": YAGLiftWeight,
                    "type": YAGType
                }),
                beforeSend: function () {
                    ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;正在获取吊耳尺寸</span>');
                },
                success: function (result) {

                    ajaxAlert.html('<small><i class="fa fa-check" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;吊耳尺寸获取成功</span>');

                    $("#YAGInsert").after(
                        "<tr class='YAGResult'>" +
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

                    $("#YAGSketchS21").empty().text(result.s2);
                    $("#YAGSketchS22").empty().text(result.s2);
                    $("#YAGSketchL").empty().text(result.l);
                    $("#YAGSketchS1").empty().text(result.padTHK);
                    $("#YAGSketchMIN").empty().text("δmin=" + result.shellMinTHK);
                    $("#YAGSketchD1").empty().text("∅" + result.d1);
                    $("#YAGSketchS-1").empty().text(result.s);
                    $("#YAGSketchS-2").empty().text(result.s);
                    $("#YAGSketchD2").empty().text("∅" + result.d2);
                    $("#YAGSketchD0").empty().text("∅" + result.d0);
                    $("#YAGSketchT-1").empty().text(result.t);
                    $("#YAGSketchT-2").empty().text(result.t);

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