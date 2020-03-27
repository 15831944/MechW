$(document).ready(function () {

    $(document).on("input propertychange", "input.ZZCCRequired", function () {

        // 将受影响的项清空重置
        $(".ZZCCResult").empty();
        $(".ZZCCResultTR").remove();
        $("#ZZCCSketchD").text("∅D");
        $("#ZZCCSketchH").text("H");
        $("#ZZCCSketchHT").text("HT");

        // 获取圆筒直径D
        let ZZCCDVal = $("#ZZCCD").val();
        if (ZZCCDVal.length > 0 && !isNaN(ZZCCDVal) && parseFloat(ZZCCDVal) > 0) {
            let ZZCCD = parseFloat(ZZCCDVal);
            $("#ZZCCSketchD").text("∅" + ZZCCD);

            // 获取切线高度H
            let ZZCCHVal = $("#ZZCCH").val();
            if (ZZCCHVal.length > 0 && !isNaN(ZZCCHVal) && parseFloat(ZZCCHVal) > 0) {
                let ZZCCH = parseFloat(ZZCCHVal);
                $("#ZZCCSketchH").text(ZZCCH);

                // 计算容器总高
                let ZZCCHT = ZZCCH + ZZCCD;
                $("#ZZCCHT").html(ZZCCHT.toFixed(2));
                $("#ZZCCSketchHT").text(ZZCCHT);

                // 计算总容积
                let ZZCCV = (0.25 * Math.PI * ZZCCD * ZZCCD * ZZCCH + Math.PI * ZZCCD * ZZCCD * ZZCCD / 6) / 1000000000;
                $("#ZZCCV").html(ZZCCV.toFixed(6));

                // 获取标尺间距HC
                let ZZCCHCVal = $("#ZZCCHC").val();
                if (ZZCCHCVal.length > 0 && !isNaN(ZZCCHCVal) && parseFloat(ZZCCHCVal) > 0 && parseFloat(ZZCCHCVal) <= ZZCCHT) {
                    let ZZCCHC = parseFloat(ZZCCHCVal);

                    let ZZCCVH;
                    let i = 0, j = 1;
                    for (; i <= ZZCCHT; i = i + ZZCCHC, j = j + 1) {

                        if (i >= 0 && i <= ZZCCD / 2) {
                            ZZCCVH = (0.5 * Math.PI * ZZCCD * i * i - Math.PI * i * i * i / 3) / 1000000000;
                        } else if (i > ZZCCD / 2 && i <= (ZZCCD / 2 + ZZCCH)) {
                            ZZCCVH = ((Math.PI * ZZCCD * ZZCCD * ZZCCD / 12) + 0.25 * Math.PI * ZZCCD * ZZCCD * (i - ZZCCD / 2)) / 1000000000;
                        } else if (i > (ZZCCD / 2 + ZZCCH) && i <= ZZCCHT) {
                            ZZCCVH = (Math.PI * ZZCCD * ZZCCD * ZZCCD / 12 + 0.25 * Math.PI * ZZCCD * ZZCCD * ZZCCH + Math.PI * ZZCCD * ZZCCD * (i - ZZCCD / 2 - ZZCCH) / 12 * (3 - 4 * (i - ZZCCD / 2 - ZZCCH) * (i - ZZCCD / 2 - ZZCCH) / (ZZCCD * ZZCCD))) / 1000000000;
                        }

                        $("#ZZCCTBODY").append(
                            '<tr class="ZZCCResultTR">' +
                            '<td colspan="3" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            j +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            i +
                            '</td>' +
                            '<td colspan="7" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            (ZZCCVH).toFixed(6) +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            (ZZCCVH / ZZCCV * 100).toFixed(4) +
                            '</td>' +
                            '</tr>'
                        );
                    }

                    if (ZZCCHT % ZZCCHC !== 0) {
                        $("#ZZCCTBODY").append(
                            '<tr class="ZZCCResultTR">' +
                            '<td colspan="3" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            j +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            ZZCCHT +
                            '</td>' +
                            '<td colspan="7" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            ZZCCV.toFixed(6) +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            (100).toFixed(4) +
                            '</td>' +
                            '</tr>'
                        );
                    }
                }
            } else {
                $("#ZZCCSketchH").text("H");
            }
        }
        else {
            $("#ZZCCSketchD").text("∅D");
        }
    });
});