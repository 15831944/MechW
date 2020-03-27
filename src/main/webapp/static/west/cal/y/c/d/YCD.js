$(document).ready(function () {

    let ajaxAlert = $("#AjaxAlert");

    // 获取 Norms 列表
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "gbt_706_2016_list_table_a4_norms.action",
        async: true,
        dataType: "json",
        data: JSON.stringify({
            "thkMax": 100000
        }),
        beforeSend: function () {
            ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                '<span style="color:#18bc9c;">&ensp;正在获取不等边角钢规格列表</span>');
        },
        success: function (result) {
            ajaxAlert.html('<i class="fa fa-check" style="color:#18bc9c;font-size:16px;"></i>' +
                '<span style="color:#18bc9c;">&ensp;不等边角钢规格列表获取成功</span>');
            $.each(result, function (i, item) {
                $("#YCDNorms").append('<option class="YCDNormsResult" value=\"' + item + '\">' + item + '</option>');
            });
        },
        error: function () {
            ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                '<span style="color:red;">&ensp;不等边角钢规格列表获取失败，请检查网络后重试</span>');
        }
    });

    // Norms 改变事件
    $("#YCDNorms").off("change").on("change", function () {

        // 处理受本菜单影响的后续项
        $(".YCDResult").remove();

        $("#YCDSketchBB").empty().text("B");
        $("#YCDSketchSB").empty().text("b");
        $("#YCDSketchD1").empty().text("d");
        $("#YCDSketchD2").empty().text("d");
        $("#YCDSketchR").empty().text("r");
        $("#YCDSketchX0").empty().text("X0");
        $("#YCDSketchY0").empty().text("Y0");
        $("#YCDSketchAlpha").empty().text("α");

        let YCDNorms = $("#YCDNorms").val();
        if (YCDNorms !== "YCDNull") {

            // 获取详细信息
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "gbt_706_2016_get_table_a4_details.action",
                async: true,
                dataType: "json",
                data: JSON.stringify({
                    "norms": YCDNorms
                }),
                beforeSend: function () {
                    ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;正在获取不等边角钢特性数据</span>');
                },
                success: function (result) {

                    ajaxAlert.html('<small><i class="fa fa-check" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;不等边角钢特性数据获取成功</span>');

                    $("#YCDInsert").after(
                        "<tr class='YCDResult'>" +
                        '<td colspan="2" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.norms +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.type +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.bb +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.sb +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.d +
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
                        result.bix1 +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.biy +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.biy1 +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.biu +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.six +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.siy +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.siu +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.wx +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.wy +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.wu +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.tanAlpha +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.x0 +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.y0 +
                        '</td>' +
                        '</tr>');

                    $("#YCDSketchBB").empty().text(result.bb);
                    $("#YCDSketchSB").empty().text(result.sb);
                    $("#YCDSketchD1").empty().text(result.d);
                    $("#YCDSketchD2").empty().text(result.d);
                    $("#YCDSketchX0").empty().text((10 * result.x0).toFixed(2));
                    $("#YCDSketchY0").empty().text((10 * result.y0).toFixed(2));
                    $("#YCDSketchR").empty().text("R" + result.r);
                    $("#YCDSketchAlpha").empty().text((Math.atan(result.tanAlpha) / Math.PI * 180).toFixed(2) + "°");

                },
                error: function () {
                    ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                        '<span style="color:red;">&ensp;不等边角钢特性数据获取失败，请检查网络后重试</span>');
                }
            });
        }
        else {
            ajaxAlert.empty();
        }
    });
});