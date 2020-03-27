$(document).ready(function () {

    $(document).on("input propertychange", "input.ZZCARequired", function () {

        let ZZCASketchD = $("#ZZCASketchD");
        let ZZCASketchH = $("#ZZCASketchH");

        // 将受影响的项清空重置
        $(".ZZCAResult").empty();
        $(".ZZCAResultTR").remove();
        ZZCASketchD.text("∅D");
        ZZCASketchH.text("H");

        // 获取圆筒直径D
        let ZZCADVal = $("#ZZCAD").val();
        if (ZZCADVal.length > 0 && !isNaN(ZZCADVal) && parseFloat(ZZCADVal) > 0) {
            let ZZCAD = parseFloat(ZZCADVal);
            ZZCASketchD.text("∅" + ZZCAD);

            // 获取容器总高H
            let ZZCAHVal = $("#ZZCAH").val();
            if (ZZCAHVal.length > 0 && !isNaN(ZZCAHVal) && parseFloat(ZZCAHVal) > 0) {
                let ZZCAH = parseFloat(ZZCAHVal);
                ZZCASketchH.text(ZZCAH);

                // 计算总容积
                let ZZCAV = 0.25 * Math.PI * ZZCAD * ZZCAD * ZZCAH / 1000000000;
                $("#ZZCAV").html(ZZCAV.toFixed(6));

                // 获取标尺间距HC
                let ZZCAHCVal = $("#ZZCAHC").val();
                if (ZZCAHCVal.length > 0 && !isNaN(ZZCAHCVal) && parseFloat(ZZCAHCVal) > 0 && parseFloat(ZZCAHCVal) <= ZZCAH) {
                    let ZZCAHC = parseFloat(ZZCAHCVal);

                    let ZZCAVH;
                    let i = 0, j = 1;
                    for (; i <= ZZCAH; i = i + ZZCAHC, j = j + 1) {
                        ZZCAVH = 0.25 * Math.PI * ZZCAD * ZZCAD * i / 1000000000;
                        $("#ZZCATBODY").append(
                            '<tr class="ZZCAResultTR">' +
                            '<td colspan="3" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            j +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            i +
                            '</td>' +
                            '<td colspan="7" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            ZZCAVH.toFixed(6) +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            (ZZCAVH / ZZCAV * 100).toFixed(4) +
                            '</td>' +
                            '</tr>'
                        );
                    }
                    if (ZZCAH % ZZCAHC !== 0) {
                        $("#ZZCATBODY").append(
                            '<tr class="ZZCAResultTR">' +
                            '<td colspan="3" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            j +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            ZZCAH +
                            '</td>' +
                            '<td colspan="7" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            ZZCAV.toFixed(6) +
                            '</td>' +
                            '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            (100).toFixed(4) +
                            '</td>' +
                            '</tr>'
                        );
                    }
                }
            } else {
                ZZCASketchH.text("hmm");
            }
        }
        else {
            ZZCASketchD.text("∅D");
        }
    });
});