$(document).ready(function () {

    $(document).on("input propertychange", "input.ZZCIRequired", function () {

        // 将受影响的项清空重置
        $(".ZZCIResult").empty();
        $(".ZZCIResultTR").remove();
        $("#ZZCISketchD").text("∅D");
        $("#ZZCISketchHT").text("HT");

        // 获取球壳直径D
        let ZZCIDVal = $("#ZZCID").val();
        if (ZZCIDVal.length > 0 && !isNaN(ZZCIDVal) && parseFloat(ZZCIDVal) > 0) {
            let ZZCID = parseFloat(ZZCIDVal);
            $("#ZZCISketchD").text("∅" + ZZCID);

            // 计算容器总高
            let ZZCIHT = ZZCID;
            $("#ZZCIHT").html(ZZCIHT.toFixed(2));
            $("#ZZCISketchHT").text(ZZCIHT);

            // 计算总容积
            let ZZCIV = (Math.PI * ZZCID * ZZCID * ZZCID / 6) / 1000000000;
            $("#ZZCIV").html(ZZCIV.toFixed(6));

            // 获取标尺间距HC
            let ZZCIHCVal = $("#ZZCIHC").val();
            if (ZZCIHCVal.length > 0 && !isNaN(ZZCIHCVal) && parseFloat(ZZCIHCVal) > 0 && parseFloat(ZZCIHCVal) <= ZZCIHT) {
                let ZZCIHC = parseFloat(ZZCIHCVal);

                let ZZCIVH;
                let i = 0, j = 1;
                for (; i <= ZZCIHT; i = i + ZZCIHC, j = j + 1) {

                    if (i >= 0 && i <= ZZCID / 2) {
                        ZZCIVH = (0.5 * Math.PI * ZZCID * i * i - Math.PI * i * i * i / 3) / 1000000000;
                    } else if (i > ZZCID / 2 && i <= ZZCIHT) {
                        ZZCIVH = (Math.PI * ZZCID * ZZCID * ZZCID / 12 + Math.PI * ZZCID * ZZCID * (i - ZZCID / 2) / 12 * (3 - 4 * (i - ZZCID / 2) * (i - ZZCID / 2) / (ZZCID * ZZCID))) / 1000000000;
                    }

                    $("#ZZCITBODY").append(
                        '<tr class="ZZCIResultTR">' +
                        '<td colspan="3" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        j +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        i +
                        '</td>' +
                        '<td colspan="7" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        (ZZCIVH).toFixed(6) +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        (ZZCIVH / ZZCIV * 100).toFixed(4) +
                        '</td>' +
                        '</tr>'
                    );
                }

                if (ZZCIHT % ZZCIHC !== 0) {
                    $("#ZZCITBODY").append(
                        '<tr class="ZZCIResultTR">' +
                        '<td colspan="3" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        j +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        ZZCIHT +
                        '</td>' +
                        '<td colspan="7" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        ZZCIV.toFixed(6) +
                        '</td>' +
                        '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                        (100).toFixed(4) +
                        '</td>' +
                        '</tr>'
                    );
                }

            }
        }
        else {
            $("#ZZCISketchD").text("∅D");
        }
    });
});