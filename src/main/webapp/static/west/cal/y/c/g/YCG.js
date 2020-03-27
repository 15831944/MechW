$(document).ready(function () {

    let ajaxAlert = $("#AjaxAlert");

    // 获取 Norms 列表
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "gbt_6728_2017_list_table_1_norms.action",
        async: true,
        dataType: "json",
        data: JSON.stringify({
            "thkMax": 100000
        }),
        beforeSend: function () {
            ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                '<span style="color:#18bc9c;">&ensp;正在获取方形型钢规格列表</span>');
        },
        success: function (result) {
            ajaxAlert.html('<i class="fa fa-check" style="color:#18bc9c;font-size:16px;"></i>' +
                '<span style="color:#18bc9c;">&ensp;方形型钢规格列表获取成功</span>');
            $.each(result, function (i, item) {
                $("#YCGNorms").append('<option class="YCGNormsResult" value=\"' + item + '\">' + item + '</option>');
            });
        },
        error: function () {
            ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                '<span style="color:red;">&ensp;方形型钢规格列表获取失败，请检查网络后重试</span>');
        }
    });

    // Norms 改变事件
    $("#YCGNorms").off("change").on("change", function () {

        // 处理受本菜单影响的后续项
        $(".YCGResult").remove();

        $("#YCGSketchB1").empty().text("B");
        $("#YCGSketchB2").empty().text("B");
        $("#YCGSketchT").empty().text("t");

        let YCGNorms = $("#YCGNorms").val();
        if (YCGNorms !== "YCGNull") {

            // 获取详细信息
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "gbt_6728_2017_get_table_1_details.action",
                async: true,
                dataType: "json",
                data: JSON.stringify({
                    "norms": YCGNorms
                }),
                beforeSend: function () {
                    ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;正在获取方形型钢特性数据</span>');
                },
                success: function (result) {

                    ajaxAlert.html('<small><i class="fa fa-check" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;方形型钢特性数据获取成功</span>');

                    $("#YCGInsert").after(
                        "<tr class='YCGResult'>" +
                        '<td colspan="2" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.norms +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.b +
                        '</td>' +
                        '<td colspan="2" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.delta +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.t +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.mass +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.a +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.i +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.r +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.w +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.it +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.ct +
                        '</td>' +
                        '<td colspan="2" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.csRoMin + "～" + result.csRoMax +
                        '</td>' +
                        '<td colspan="2" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.lowAlloyRoMin + "～" + result.lowAlloyRoMax +
                        '</td>' +
                        '</tr>');

                    $("#YCGSketchB1").empty().text(result.b);
                    $("#YCGSketchB2").empty().text(result.b);
                    $("#YCGSketchT").empty().text(result.t);
                },
                error: function () {
                    ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                        '<span style="color:red;">&ensp;方形型钢特性数据获取失败，请检查网络后重试</span>');
                }
            });
        }
        else {
            ajaxAlert.empty();
        }
    });
});