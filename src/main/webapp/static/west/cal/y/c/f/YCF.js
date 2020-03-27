$(document).ready(function () {

    let ajaxAlert = $("#AjaxAlert");

    // 获取 Norms 列表
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "gbt_11263_2017_list_table_2_norms.action",
        async: true,
        dataType: "json",
        data: JSON.stringify({
            "thkMax": 100000
        }),
        beforeSend: function () {
            ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                '<span style="color:#18bc9c;">&ensp;正在获取T型钢规格列表</span>');
        },
        success: function (result) {
            ajaxAlert.html('<i class="fa fa-check" style="color:#18bc9c;font-size:16px;"></i>' +
                '<span style="color:#18bc9c;">&ensp;T型钢规格列表获取成功</span>');
            $.each(result, function (i, item) {
                $("#YCFNorms").append('<option class="YCFNormsResult" value=\"' + item + '\">' + item + '</option>');
            });
        },
        error: function () {
            ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                '<span style="color:red;">&ensp;T型钢规格列表获取失败，请检查网络后重试</span>');
        }
    });

    // Norms 改变事件
    $("#YCFNorms").off("change").on("change", function () {

        // 处理受本菜单影响的后续项
        $(".YCFResult").remove();

        $("#YCFSketchH").empty().text("h");
        $("#YCFSketchB").empty().text("B");
        $("#YCFSketchT1").empty().text("t1");
        $("#YCFSketchT2").empty().text("t2");
        $("#YCFSketchR").empty().text("r");
        $("#YCFSketchCX").empty().text("Cx");

        let YCFNorms = $("#YCFNorms").val();
        if (YCFNorms !== "YCFNull") {

            // 获取详细信息
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "gbt_11263_2017_get_table_2_details.action",
                async: true,
                dataType: "json",
                data: JSON.stringify({
                    "norms": YCFNorms
                }),
                beforeSend: function () {
                    ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;正在获取T型钢特性数据</span>');
                },
                success: function (result) {

                    ajaxAlert.html('<small><i class="fa fa-check" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;T型钢特性数据获取成功</span>');

                    $("#YCFInsert").after(
                        "<tr class='YCFResult'>" +
                        '<td colspan="3" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.norms +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.type +
                        '</td>' +
                        '<td colspan="2" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.size +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.h +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.b +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.t1 +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.t2 +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.r +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.sectionArea +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.mass +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.outerArea +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.bix +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.biy +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.six +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.siy +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.wx +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.wy +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.cx +
                        '</td>' +
                        '<td colspan="2" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.hNorms +
                        '</td>' +
                        '</tr>');

                    $("#YCFSketchH").empty().text(result.h);
                    $("#YCFSketchB").empty().text(result.b);
                    $("#YCFSketchT1").empty().text(result.t1);
                    $("#YCFSketchT2").empty().text(result.t2);
                    $("#YCFSketchR").empty().text("R" + result.r);
                    $("#YCFSketchCX").empty().text((10 * result.cx).toFixed(2));
                },
                error: function () {
                    ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                        '<span style="color:red;">&ensp;T型钢特性数据获取失败，请检查网络后重试</span>');
                }
            });
        }
        else {
            ajaxAlert.empty();
        }
    });
});