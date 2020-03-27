$(document).ready(function () {
    $(document).on("input propertychange", "input.ZZDBRequired", function () {

        $("td.ZZDBResult").empty();

        // X1
        let ZZDBX1VAL = $("#ZZDBX1").val();
        if (ZZDBX1VAL.length > 0 && !isNaN(parseFloat(ZZDBX1VAL))) {
            let ZZDBX1 = parseFloat(ZZDBX1VAL);

            // X2
            let ZZDBX2VAL = $("#ZZDBX2").val();
            if (ZZDBX2VAL.length > 0 && !isNaN(parseFloat(ZZDBX2VAL))) {
                let ZZDBX2 = parseFloat(ZZDBX2VAL);

                // X1Y1
                let ZZDBX1Y1VAL = $("#ZZDBX1Y1").val();
                if (ZZDBX1Y1VAL.length > 0 && !isNaN(parseFloat(ZZDBX1Y1VAL))) {
                    let ZZDBX1Y1 = parseFloat(ZZDBX1Y1VAL);

                    // X2Y1
                    let ZZDBX2Y1VAL = $("#ZZDBX2Y1").val();
                    if (ZZDBX2Y1VAL.length > 0 && !isNaN(parseFloat(ZZDBX2Y1VAL))) {
                        let ZZDBX2Y1 = parseFloat(ZZDBX2Y1VAL);

                        // X1Y2
                        let ZZDBX1Y2VAL = $("#ZZDBX1Y2").val();
                        if (ZZDBX1Y2VAL.length > 0 && !isNaN(parseFloat(ZZDBX1Y2VAL))) {
                            let ZZDBX1Y2 = parseFloat(ZZDBX1Y2VAL);

                            // X2Y2
                            let ZZDBX2Y2VAL = $("#ZZDBX2Y2").val();
                            if (ZZDBX2Y2VAL.length > 0 && !isNaN(parseFloat(ZZDBX2Y2VAL))) {
                                let ZZDBX2Y2 = parseFloat(ZZDBX2Y2VAL);

                                // X
                                let ZZDBXVAL = $("#ZZDBX").val();
                                if (ZZDBXVAL.length > 0 && !isNaN(parseFloat(ZZDBXVAL))) {
                                    let ZZDBX = parseFloat(ZZDBXVAL);

                                    // X 介于 X1 和 X2 之间
                                    let ZZDBXMin = Math.min(ZZDBX1, ZZDBX2);
                                    let ZZDBXMax = Math.max(ZZDBX1, ZZDBX2);
                                    if (ZZDBX >= ZZDBXMin && ZZDBX <= ZZDBXMax) {

                                        let ZZDBXY1, ZZDBXY2;
                                        if (ZZDBX1 === ZZDBX2) {
                                            ZZDBXY1 = (ZZDBX1Y1 + ZZDBX2Y1) / 2;
                                            ZZDBXY2 = (ZZDBX1Y2 + ZZDBX2Y2) / 2;
                                        } else {
                                            ZZDBXY1 = ZZDBX1Y1 + (ZZDBX - ZZDBX1) / (ZZDBX2 - ZZDBX1) * (ZZDBX2Y1 - ZZDBX1Y1);
                                            ZZDBXY2 = ZZDBX1Y2 + (ZZDBX - ZZDBX1) / (ZZDBX2 - ZZDBX1) * (ZZDBX2Y2 - ZZDBX1Y2);
                                        }

                                        // Y1
                                        let ZZDBY1VAL = $("#ZZDBY1").val();
                                        if (ZZDBY1VAL.length > 0 && !isNaN(parseFloat(ZZDBY1VAL))) {
                                            let ZZDBY1 = parseFloat(ZZDBY1VAL);

                                            // Y2
                                            let ZZDBY2VAL = $("#ZZDBY2").val();
                                            if (ZZDBY2VAL.length > 0 && !isNaN(parseFloat(ZZDBY2VAL))) {
                                                let ZZDBY2 = parseFloat(ZZDBY2VAL);

                                                // Y
                                                let ZZDBYVAL = $("#ZZDBY").val();
                                                if (ZZDBYVAL.length > 0 && !isNaN(parseFloat(ZZDBYVAL))) {
                                                    let ZZDBY = parseFloat(ZZDBYVAL);

                                                    // Y 介于 Y1 和 Y2 之间
                                                    let ZZDBYMin = Math.min(ZZDBY1, ZZDBY2);
                                                    let ZZDBYMax = Math.max(ZZDBY1, ZZDBY2);
                                                    if (ZZDBY >= ZZDBYMin && ZZDBY <= ZZDBYMax) {

                                                        let ZZDBXY;
                                                        if (ZZDBY1 === ZZDBY2) {
                                                            ZZDBXY = (ZZDBXY1 + ZZDBXY2) / 2;
                                                        }
                                                        else {
                                                            ZZDBXY = ZZDBXY1 + (ZZDBY - ZZDBY1) / (ZZDBY2 - ZZDBY1) * (ZZDBXY2 - ZZDBXY1);
                                                        }

                                                        $("#ZZDBXY").html(ZZDBXY.toFixed(6));
                                                    }
                                                    else {
                                                        $("#ZZDBXY").html("Y ∉ [Y1, Y2]");
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        $("#ZZDBXY").html("X ∉ [X1, X2]");
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
});