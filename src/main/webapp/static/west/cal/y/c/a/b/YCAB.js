$(document).ready(function () {

    let ajaxAlert = $("#AjaxAlert");

    // 获取 Norms 列表
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "ybt_5309_2006_list_table_2_norms.action",
        async: true,
        dataType: "json",
        data: JSON.stringify({
            "thkMax": 100000
        }),
        beforeSend: function () {
            ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                '<span style="color:#18bc9c;">&ensp;正在获取不锈钢等边角钢规格列表</span>');
        },
        success: function (result) {
            ajaxAlert.html('<i class="fa fa-check" style="color:#18bc9c;font-size:16px;"></i>' +
                '<span style="color:#18bc9c;">&ensp;不锈钢等边角钢规格列表获取成功</span>');
            $.each(result, function (i, item) {
                $("#YCABNorms").append('<option class="YCABNormsResult" value=\"' + item + '\">' + item + '</option>');
            });
        },
        error: function () {
            ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                '<span style="color:red;">&ensp;不锈钢等边角钢规格列表获取失败，请检查网络后重试</span>');
        }
    });

    // Norms 改变事件
    $("#YCABNorms").off("change").on("change", function () {

        // 处理受本菜单影响的后续项
        $(".YCABResult").remove();

        $("#YCABSketchA").empty().text("A");
        $("#YCABSketchA2").empty().text("A/2");
        $("#YCABSketchB").empty().text("B");
        $("#YCABSketchB2").empty().text("B/2");
        $("#YCABSketchT1").empty().text("t");
        $("#YCABSketchT2").empty().text("t");
        $("#YCABSketchR1").empty().text("r1");
        $("#YCABSketchR21").empty().text("r2");
        $("#YCABSketchR22").empty().text("r2");
        $("#YCABSketchCX").empty().text("Cx");
        $("#YCABSketchCY").empty().text("Cy");

        let YCABNorms = $("#YCABNorms").val();
        if (YCABNorms !== "YCABNull") {

            // 获取详细信息
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "ybt_5309_2006_get_table_2_details.action",
                async: true,
                dataType: "json",
                data: JSON.stringify({
                    "norms": YCABNorms
                }),
                beforeSend: function () {
                    ajaxAlert.html('<small><i class="fa fa-spinner fa-pulse fa-2x fa-fw" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;正在获取不锈钢等边角钢特性数据</span>');
                },
                success: function (result) {

                    ajaxAlert.html('<small><i class="fa fa-check" style="color:#18bc9c;"></i></small>' +
                        '<span style="color:#18bc9c;">&ensp;不锈钢等边角钢特性数据获取成功</span>');

                    $("#YCABInsert").after(
                        "<tr class='YCABResult'>" +
                        '<td colspan="2" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.norms +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.a +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.b +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.t +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.r1 +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.r2 +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.sectionArea +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.mass1 +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.mass2 +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.mass3 +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        parseFloat(result.cx).toFixed(2) +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        parseFloat(result.cy).toFixed(2) +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.bix +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.biy +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.maxBiu +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.minBiv +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.six +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.siy +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.maxSiu +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.minSiv +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.zx +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        result.zy +
                        '</td>' +
                        '</tr>');

                    $("#YCABSketchA").empty().text(result.a);
                    $("#YCABSketchA2").empty().text(result.a / 2);
                    $("#YCABSketchB").empty().text(result.b);
                    $("#YCABSketchB2").empty().text(result.b / 2);
                    $("#YCABSketchT1").empty().text(result.t);
                    $("#YCABSketchT2").empty().text(result.t);
                    $("#YCABSketchR1").empty().text("R" + result.r1);
                    $("#YCABSketchR21").empty().text("R" + result.r2);
                    $("#YCABSketchR22").empty().text("R" + result.r2);
                    $("#YCABSketchCX").empty().text(10 * result.cx);
                    $("#YCABSketchCY").empty().text(10 * result.cy);
                },
                error: function () {
                    ajaxAlert.html('<i class="fa fa-exclamation-triangle" style="color:red;font-size:16px;"></i>' +
                        '<span style="color:red;">&ensp;不锈钢等边角钢特性数据获取失败，请检查网络后重试</span>');
                }
            });
        }
        else {
            ajaxAlert.empty();
        }
    });
});