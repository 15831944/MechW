$(document).ready(function () {
    $(document).on("input propertychange", "input.ZZDARequired", function () {

        $("td.ZZDAResult").empty();

        // X1
        let ZZDAX1VAL = $("#ZZDAX1").val();
        if (ZZDAX1VAL.length > 0 && !isNaN(parseFloat(ZZDAX1VAL))) {
            let ZZDAX1 = parseFloat(ZZDAX1VAL);

            // X2
            let ZZDAX2VAL = $("#ZZDAX2").val();
            if (ZZDAX2VAL.length > 0 && !isNaN(parseFloat(ZZDAX2VAL))) {
                let ZZDAX2 = parseFloat(ZZDAX2VAL);

                // Y1
                let ZZDAY1VAL = $("#ZZDAY1").val();
                if (ZZDAY1VAL.length > 0 && !isNaN(parseFloat(ZZDAY1VAL))) {
                    let ZZDAY1 = parseFloat(ZZDAY1VAL);

                    // Y2
                    let ZZDAY2VAL = $("#ZZDAY2").val();
                    if (ZZDAY2VAL.length > 0 && !isNaN(parseFloat(ZZDAY2VAL))) {
                        let ZZDAY2 = parseFloat(ZZDAY2VAL);

                        // X
                        let ZZDAXVAL = $("#ZZDAX").val();
                        if (ZZDAXVAL.length > 0 && !isNaN(parseFloat(ZZDAXVAL))) {
                            let ZZDAX = parseFloat(ZZDAXVAL);

                            // X 介于 X1 和 X2 之间
                            let ZZDAXMin = Math.min(ZZDAX1, ZZDAX2);
                            let ZZDAXMax = Math.max(ZZDAX1, ZZDAX2);
                            if (ZZDAX >= ZZDAXMin && ZZDAX <= ZZDAXMax) {

                                let ZZDAY;
                                if (ZZDAX1 === ZZDAX2) {
                                    if (ZZDAY1 === ZZDAY2) {
                                        ZZDAY = (ZZDAY1 + ZZDAY2) / 2;
                                        $("#ZZDAY").html(ZZDAY.toFixed(6));
                                    } else {
                                        $("#ZZDAY").html("Y1 ≠ Y2");
                                    }
                                } else {
                                    ZZDAY = ZZDAY1 + (ZZDAX - ZZDAX1) / (ZZDAX2 - ZZDAX1) * (ZZDAY2 - ZZDAY1);
                                    $("#ZZDAY").html(ZZDAY.toFixed(6));
                                }

                            } else {
                                $("#ZZDAY").html("X ∉ [X1, X2]");
                            }

                        }

                    }

                }

            }
        }
    });
});