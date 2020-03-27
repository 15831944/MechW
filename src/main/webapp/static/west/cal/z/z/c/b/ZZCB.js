$(document).ready(function () {

    $(document).on("input propertychange", "input.ZZCBRequired", function () {

        let ZZCBSketchD = $("#ZZCBSketchD");
        let ZZCBSketchH = $("#ZZCBSketchH");
        let ZZCBSketchHT = $("#ZZCBSketchHT");

        // 将受影响的项清空重置
        $(".ZZCBResult").empty();
        $(".ZZCBResultTR").remove();
        ZZCBSketchD.text("∅D");
        ZZCBSketchH.text("H");
        ZZCBSketchHT.text("HT");

        // 获取圆筒直径D
        let ZZCBDVal = $("#ZZCBD").val();
        if (ZZCBDVal.length > 0 && !isNaN(ZZCBDVal) && parseFloat(ZZCBDVal) > 0) {
            let ZZCBD = parseFloat(ZZCBDVal);
            ZZCBSketchD.text("∅" + ZZCBD);

            // 获取切线高度H
            let ZZCBHVal = $("#ZZCBH").val();
            if (ZZCBHVal.length > 0 && !isNaN(ZZCBHVal) && parseFloat(ZZCBHVal) > 0) {
                let ZZCBH = parseFloat(ZZCBHVal);
                ZZCBSketchH.text(ZZCBH);

                // 计算容器总高
                let ZZCBHT = ZZCBH + ZZCBD / 2;
                $("#ZZCBHT").html(ZZCBHT.toFixed(2));
                ZZCBSketchHT.text(ZZCBHT);

                // 计算总容积
                let ZZCBV = (0.25 * Math.PI * ZZCBD * ZZCBD * ZZCBH + Math.PI * ZZCBD * ZZCBD * ZZCBD / 12) / 1000000000;
                $("#ZZCBV").html(ZZCBV.toFixed(6));

                // 获取标尺间距HC
                let ZZCBHCVal = $("#ZZCBHC").val();
                if (ZZCBHCVal.length > 0 && !isNaN(ZZCBHCVal) && parseFloat(ZZCBHCVal) > 0 && parseFloat(ZZCBHCVal) <= ZZCBHT) {
                    let ZZCBHC = parseFloat(ZZCBHCVal);

                    let ZZCBVH;
                    let i = 0, j = 1;
                    for (; i <= ZZCBHT; i = i + ZZCBHC, j = j + 1) {

                        if (i >= 0 && i <= ZZCBD / 4) {
                            ZZCBVH = (Math.PI * ZZCBD * i * i - 4 / 3 * Math.PI * i * i * i) / 1000000000;
                        } else if (i > ZZCBD / 4 && i <= (ZZCBD / 4 + ZZCBH)) {
                            ZZCBVH = ((Math.PI * ZZCBD * ZZCBD * ZZCBD / 24) + (0.25 * Math.PI * ZZCBD * ZZCBD * (i - ZZCBD / 4))) / 1000000000;
                        } else if (i > (ZZCBD / 4 + ZZCBH) && i <= ZZCBHT) {
                            ZZCBVH = ((Math.PI * ZZCBD * ZZCBD * ZZCBD / 24) + (0.25 * Math.PI * ZZCBD * ZZCBD * ZZCBH) + Math.PI * ZZCBD * ZZCBD * (i - ZZCBH - ZZCBD / 4) / 12 * (3 - 16 * ((i - ZZCBH - ZZCBD / 4) * (i - ZZCBH - ZZCBD / 4)) / (ZZCBD * ZZCBD))) / 1000000000;
                        }

                        $("#ZZCBTBODY").append(
                            '<tr class="ZZCBResultTR">' +
                            '<td colspan="3" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            j +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            i +
                            '</td>' +
                            '<td colspan="7" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            (ZZCBVH).toFixed(6) +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            (ZZCBVH / ZZCBV * 100).toFixed(4) +
                            '</td>' +
                            '</tr>'
                        );
                    }

                    if (ZZCBHT % ZZCBHC !== 0) {
                        $("#ZZCBTBODY").append(
                            '<tr class="ZZCBResultTR">' +
                            '<td colspan="3" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            j +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            ZZCBHT +
                            '</td>' +
                            '<td colspan="7" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            ZZCBV.toFixed(6) +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            (100).toFixed(4) +
                            '</td>' +
                            '</tr>'
                        );
                    }
                }
            } else {
                ZZCBSketchH.text("H");
            }
        }
        else {
            ZZCBSketchD.text("∅D");
        }
    });
});