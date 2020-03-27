$(document).ready(function () {

    $(document).on("input propertychange", "input.ZZCFRequired", function () {

        // 将受影响的项清空重置
        $(".ZZCFResult").empty();
        $(".ZZCFResultTR").remove();
        $("#ZZCFSketchD").text("∅D");
        $("#ZZCFSketchL").text("L");
        $("#ZZCFSketchLT").text("LT");

        // 获取圆筒直径D
        let ZZCFDVal = $("#ZZCFD").val();
        if (ZZCFDVal.length > 0 && !isNaN(ZZCFDVal) && parseFloat(ZZCFDVal) > 0) {
            let ZZCFD = parseFloat(ZZCFDVal);
            $("#ZZCFSketchD").text("∅" + ZZCFD);

            let ZZCFR = ZZCFD / 2;
            let ZZCFHI = ZZCFR / 2;

            // 计算容器总高
            let ZZCFHT = ZZCFD;

            // 获取长度L
            let ZZCFLVal = $("#ZZCFL").val();
            if (ZZCFLVal.length > 0 && !isNaN(ZZCFLVal) && parseFloat(ZZCFLVal) > 0) {
                let ZZCFL = parseFloat(ZZCFLVal);
                $("#ZZCFSketchL").text(ZZCFL);

                // 计算容器总长
                let ZZCFLT = ZZCFL + ZZCFHI * 2;
                $("#ZZCFSketchLT").text(ZZCFLT);

                // 计算总容积
                let ZZCFV = (0.25 * Math.PI * ZZCFD * ZZCFD * ZZCFL + Math.PI * ZZCFD * ZZCFD * ZZCFD / 12) / 1000000000;
                $("#ZZCFV").html(ZZCFV.toFixed(6));

                // 获取标尺间距HC
                let ZZCFHCVal = $("#ZZCFHC").val();
                if (ZZCFHCVal.length > 0 && !isNaN(ZZCFHCVal) && parseFloat(ZZCFHCVal) > 0 && parseFloat(ZZCFHCVal) <= ZZCFHT) {
                    let ZZCFHC = parseFloat(ZZCFHCVal);

                    let ZZCFVHL, ZZCFVHC, ZZCFVH;
                    let i = 0, j = 1;
                    for (; i <= ZZCFHT; i = i + ZZCFHC, j = j + 1) {

                        ZZCFVHL = (ZZCFL * ZZCFR * ZZCFR * ((((i - ZZCFR)) / ZZCFR * (Math.sqrt(1 - ((i - ZZCFR) / ZZCFR) * ((i - ZZCFR) / ZZCFR)))) + Math.asin((i - ZZCFR) / ZZCFR) + (Math.PI / 2))) / 1000000000;
                        ZZCFVHC = 2 * (Math.PI * ZZCFHI / (2 * ZZCFR)) * ((ZZCFR * ZZCFR * (i - ZZCFR)) - ((i - ZZCFR) * (i - ZZCFR) * (i - ZZCFR) / 3) + (2 * ZZCFR * ZZCFR * ZZCFR / 3)) / 1000000000;
                        ZZCFVH = ZZCFVHL + ZZCFVHC;
                        $("#ZZCFTBODY").append(
                            '<tr class="ZZCFResultTR">' +
                            '<td colspan="3" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            j +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            i +
                            '</td>' +
                            '<td colspan="7" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            Math.abs(ZZCFVH).toFixed(6) +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            Math.abs(ZZCFVH / ZZCFV * 100).toFixed(4) +
                            '</td>' +
                            '</tr>'
                        );
                    }

                    if (ZZCFD % ZZCFHC !== 0) {
                        $("#ZZCFTBODY").append(
                            '<tr class="ZZCFResultTR">' +
                            '<td colspan="3" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            j +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            ZZCFHT +
                            '</td>' +
                            '<td colspan="7" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            Math.abs(ZZCFV).toFixed(6) +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            (100).toFixed(4) +
                            '</td>' +
                            '</tr>'
                        );
                    }

                }
            } else {
                $("#ZZCFSketchL").text("L");
                $("#ZZCFSketchLT").text("LT");
            }
        }
        else {
            $("#ZZCFSketchD").text("∅D");
        }
    });
});