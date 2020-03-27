$(document).ready(function () {

    $(document).on("input propertychange", "input.ZZCERequired", function () {

        // 将受影响的项清空重置
        $(".ZZCEResult").empty();
        $(".ZZCEResultTR").remove();
        $("#ZZCESketchD").text("∅D");
        $("#ZZCESketchL").text("L");

        // 获取圆筒直径D
        let ZZCEDVal = $("#ZZCED").val();
        if (ZZCEDVal.length > 0 && !isNaN(ZZCEDVal) && parseFloat(ZZCEDVal) > 0) {
            let ZZCED = parseFloat(ZZCEDVal);
            $("#ZZCESketchD").text("∅" + ZZCED);
            let ZZCER = ZZCED / 2;

            // 获取长度L
            let ZZCELVal = $("#ZZCEL").val();
            if (ZZCELVal.length > 0 && !isNaN(ZZCELVal) && parseFloat(ZZCELVal) > 0) {
                let ZZCEL = parseFloat(ZZCELVal);
                $("#ZZCESketchL").text(ZZCEL);

                // 计算容器总高
                let ZZCEHT = ZZCED;

                // 计算总容积
                let ZZCEV = (0.25 * Math.PI * ZZCED * ZZCED * ZZCEL) / 1000000000;
                $("#ZZCEV").html(ZZCEV.toFixed(6));

                // 获取标尺间距HC
                let ZZCEHCVal = $("#ZZCEHC").val();
                if (ZZCEHCVal.length > 0 && !isNaN(ZZCEHCVal) && parseFloat(ZZCEHCVal) > 0 && parseFloat(ZZCEHCVal) <= ZZCEHT) {
                    let ZZCEHC = parseFloat(ZZCEHCVal);

                    let ZZCEVH;
                    let i = 0, j = 1;
                    for (; i <= ZZCEHT; i = i + ZZCEHC, j = j + 1) {

                        ZZCEVH = (ZZCEL * ZZCER * ZZCER * ((((i - ZZCER)) / ZZCER * (Math.sqrt(1 - ((i - ZZCER) / ZZCER) * ((i - ZZCER) / ZZCER)))) + Math.asin((i - ZZCER) / ZZCER) + (Math.PI / 2))) / 1000000000;

                        $("#ZZCETBODY").append(
                            '<tr class="ZZCEResultTR">' +
                            '<td colspan="3" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            j +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            i +
                            '</td>' +
                            '<td colspan="7" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            (ZZCEVH).toFixed(6) +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            (ZZCEVH / ZZCEV * 100).toFixed(4) +
                            '</td>' +
                            '</tr>'
                        );
                    }

                    if (ZZCEHT % ZZCEHC !== 0) {
                        $("#ZZCETBODY").append(
                            '<tr class="ZZCEResultTR">' +
                            '<td colspan="3" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            j +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            ZZCEHT +
                            '</td>' +
                            '<td colspan="7" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            ZZCEV.toFixed(6) +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            (100).toFixed(4) +
                            '</td>' +
                            '</tr>'
                        );
                    }
                }
            } else {
                $("#ZZCESketchL").text("L");
            }
        }
        else {
            $("#ZZCESketchD").text("∅D");
        }
    });
});