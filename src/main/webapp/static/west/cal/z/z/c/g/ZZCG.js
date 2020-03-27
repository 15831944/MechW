$(document).ready(function () {

    $(document).on("input propertychange", "input.ZZCGRequired", function () {

        // 将受影响的项清空重置
        $(".ZZCGResult").empty();
        $(".ZZCGResultTR").remove();
        $("#ZZCGSketchD").text("∅D");
        $("#ZZCGSketchL").text("L");
        $("#ZZCGSketchLT").text("LT");

        // 获取圆筒直径D
        let ZZCGDVal = $("#ZZCGD").val();
        if (ZZCGDVal.length > 0 && !isNaN(ZZCGDVal) && parseFloat(ZZCGDVal) > 0) {
            let ZZCGD = parseFloat(ZZCGDVal);
            $("#ZZCGSketchD").text("∅" + ZZCGD);

            let ZZCGR = ZZCGD / 2;

            // 计算容器总高
            let ZZCGHT = ZZCGD;

            // 获取长度L
            let ZZCGLVal = $("#ZZCGL").val();
            if (ZZCGLVal.length > 0 && !isNaN(ZZCGLVal) && parseFloat(ZZCGLVal) > 0) {
                let ZZCGL = parseFloat(ZZCGLVal);
                $("#ZZCGSketchL").text(ZZCGL);

                // 计算容器总长
                let ZZCGLT = ZZCGL + ZZCGD;
                $("#ZZCGSketchLT").text(ZZCGLT);

                // 计算总容积
                let ZZCGV = (0.25 * Math.PI * ZZCGD * ZZCGD * ZZCGL + Math.PI * ZZCGD * ZZCGD * ZZCGD / 6) / 1000000000;
                $("#ZZCGV").html(ZZCGV.toFixed(6));

                // 获取标尺间距HC
                let ZZCGHCVal = $("#ZZCGHC").val();
                if (ZZCGHCVal.length > 0 && !isNaN(ZZCGHCVal) && parseFloat(ZZCGHCVal) > 0 && parseFloat(ZZCGHCVal) <= ZZCGHT) {
                    let ZZCGHC = parseFloat(ZZCGHCVal);

                    let ZZCGVHL, ZZCGVHC, ZZCGVH;
                    let i = 0, j = 1;
                    for (; i <= ZZCGHT; i = i + ZZCGHC, j = j + 1) {

                        ZZCGVHL = (ZZCGL * ZZCGR * ZZCGR * ((((i - ZZCGR)) / ZZCGR * (Math.sqrt(1 - ((i - ZZCGR) / ZZCGR) * ((i - ZZCGR) / ZZCGR)))) + Math.asin((i - ZZCGR) / ZZCGR) + (Math.PI / 2))) / 1000000000;

                        if (i >= 0 && i <= ZZCGD / 2) {
                            ZZCGVHC = (0.5 * Math.PI * ZZCGD * i * i - Math.PI * i * i * i / 3) / 1000000000;
                        } else if (i > ZZCGD / 2 && i <= ZZCGHT) {
                            ZZCGVHC = (Math.PI * ZZCGD * ZZCGD * ZZCGD / 12 + Math.PI * ZZCGD * ZZCGD * (i - ZZCGD / 2) / 12 * (3 - 4 * (i - ZZCGD / 2) * (i - ZZCGD / 2) / (ZZCGD * ZZCGD))) / 1000000000;
                        }

                        ZZCGVH = ZZCGVHL + ZZCGVHC;

                        $("#ZZCGTBODY").append(
                            '<tr class="ZZCGResultTR">' +
                            '<td colspan="3" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            j +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            i +
                            '</td>' +
                            '<td colspan="7" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            Math.abs(ZZCGVH).toFixed(6) +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            Math.abs(ZZCGVH / ZZCGV * 100).toFixed(4) +
                            '</td>' +
                            '</tr>'
                        );
                    }

                    if (ZZCGD % ZZCGHC !== 0) {
                        $("#ZZCGTBODY").append(
                            '<tr class="ZZCGResultTR">' +
                            '<td colspan="3" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            j +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            ZZCGHT +
                            '</td>' +
                            '<td colspan="7" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            Math.abs(ZZCGV).toFixed(6) +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            (100).toFixed(4) +
                            '</td>' +
                            '</tr>'
                        );
                    }

                }
            } else {
                $("#ZZCGSketchL").text("L");
                $("#ZZCGSketchLT").text("LT");
            }
        }
        else {
            $("#ZZCGSketchD").text("∅D");
        }
    });
});