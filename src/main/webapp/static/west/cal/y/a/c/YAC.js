$(document).ready(function () {

    let ajaxAlert = $("#AjaxAlert");

    // 获取 DN 列表
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "hgt_21574_2008_hp_list_dn.action",
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
                $("#YACDN").append('<option class="YACDNResult" value=\"' + item + '\">DN' + item + '</option>');
            });
        },
        error: function () {
            ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                '<span style="color:red;">&ensp;DN(公称直径)列表获取失败，请检查网络后重试</span>');
        }
    });

    let YACDN, YACLiftWeight, YACType;

    // DN、吊重改变事件
    $("#YACDN, #YACLiftWeight").off("change").on("change", function () {

        // 处理受本菜单影响的后续项
        $(".YACTypeResult").remove();
        $(".YACResult").remove();

        $("#YACSketchLHP").empty().text("LHP");
        $("#YACSketchS1").empty().text("S1");
        $("#YACSketchMIN").empty().text("δmin");
        $("#YACSketchL").empty().text("L");
        $("#YACSketchD").empty().text("∅D");
        $("#YACSketchR").empty().text("R");
        $("#YACSketchHHP").empty().text("HHP");
        $("#YACSketchS").empty().text("S");

        YACDN = $("#YACDN").val();
        if (YACDN !== "YACNull") {

            let YACLiftWeightVal = $("#YACLiftWeight").val();
            if (YACLiftWeightVal.length > 0 && !isNaN(parseFloat(YACLiftWeightVal)) && parseFloat(YACLiftWeightVal) > 0) {
                YACLiftWeight = parseFloat(YACLiftWeightVal);

                // 获取可用型号
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "hgt_21574_2008_hp_list_norms.action",
                    async: false,
                    dataType: "json",
                    data: JSON.stringify({
                        "dn": YACDN,
                        "liftWeight": YACLiftWeight,
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
                                $("#YACType").append("<option class='YACTypeResult'>" + item + "</option>");
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
    $("#YACType").off("change").on("change", function () {

        // 处理受本菜单影响的后续项
        $(".YACResult").remove();

        $("#YACSketchLHP").empty().text("LHP");
        $("#YACSketchS1").empty().text("S1");
        $("#YACSketchMIN").empty().text("δmin");
        $("#YACSketchL").empty().text("L");
        $("#YACSketchD").empty().text("∅D");
        $("#YACSketchR").empty().text("R");
        $("#YACSketchHHP").empty().text("HHP");
        $("#YACSketchS").empty().text("S");

        YACType = $("#YACType").val();
        if (YACType !== "YACNull") {

            // 获取详细信息
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "hgt_21574_2008_hp_get_details.action",
                async: true,
                dataType: "json",
                data: JSON.stringify({
                    "dn": YACDN,
                    "liftWeight": YACLiftWeight,
                    "type": YACType
                }),
                beforeSend: function () {
                    ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;正在获取吊耳尺寸</span>');
                },
                success: function (result) {

                    ajaxAlert.html('<small><i class="fa fa-check" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;吊耳尺寸获取成功</span>');

                    let YACNorm = result.type;
                    let YACT = result.liftWeight;
                    let YACR = result.r;
                    let YACD = result.d;
                    let YACL = result.l;
                    let YACS = result.s;
                    let YACPADMIN = result.padMin;
                    let YACLHP = result.ltp;
                    let YACHHP = result.htp;
                    let YACSHELLMIN = result.shellMin;
                    let YACKG = result.lugWeight;
                    let YACPADWEIGHTFACTOR = result.padWeightFactor;

                    $("#YACInsert").after(
                        "<tr class='YACResult'>" +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YACNorm + "-" + YACPADMIN +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YACNorm +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YACT +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YACR +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YACD +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YACL +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YACS +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YACPADMIN +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YACLHP +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YACHHP +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YACSHELLMIN +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        YACKG + "/" + (YACPADWEIGHTFACTOR * YACPADMIN).toFixed(2) +
                        '</td>' +
                        '</tr>');

                    $("#YACSketchLHP").empty().text(YACLHP);
                    $("#YACSketchS1").empty().text(YACPADMIN);
                    $("#YACSketchMIN").empty().text("δmin=" + YACSHELLMIN);
                    $("#YACSketchL").empty().text(YACL);
                    $("#YACSketchD").empty().text("∅" + YACD);
                    $("#YACSketchR").empty().text("R" + YACR);
                    $("#YACSketchHHP").empty().text(YACHHP);
                    $("#YACSketchS").empty().text(YACS);
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