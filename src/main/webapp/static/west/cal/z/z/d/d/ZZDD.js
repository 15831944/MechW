$(document).ready(function () {
    $(document).on("input propertychange", "input.ZZDD1Required", function () {

        $("td.ZZDD1Result").empty();

        // X1
        let ZZDD1X1VAL = $("#ZZDD1X1").val();
        if (ZZDD1X1VAL.length > 0 && !isNaN(parseFloat(ZZDD1X1VAL))) {
            let ZZDD1X1 = parseFloat(ZZDD1X1VAL);

            // X2
            let ZZDD1X2VAL = $("#ZZDD1X2").val();
            if (ZZDD1X2VAL.length > 0 && !isNaN(parseFloat(ZZDD1X2VAL))) {
                let ZZDD1X2 = parseFloat(ZZDD1X2VAL);

                // Y1
                let ZZDD1Y1VAL = $("#ZZDD1Y1").val();
                if (ZZDD1Y1VAL.length > 0 && !isNaN(parseFloat(ZZDD1Y1VAL))) {
                    let ZZDD1Y1 = parseFloat(ZZDD1Y1VAL);

                    // Y2
                    let ZZDD1Y2VAL = $("#ZZDD1Y2").val();
                    if (ZZDD1Y2VAL.length > 0 && !isNaN(parseFloat(ZZDD1Y2VAL))) {
                        let ZZDD1Y2 = parseFloat(ZZDD1Y2VAL);

                        // X
                        let ZZDD1XVAL = $("#ZZDD1X").val();
                        if (ZZDD1XVAL.length > 0 && !isNaN(parseFloat(ZZDD1XVAL))) {
                            let ZZDD1X = parseFloat(ZZDD1XVAL);

                            // X 介于 X1 和 X2 之间
                            let ZZDD1XMin = Math.min(ZZDD1X1, ZZDD1X2);
                            let ZZDD1XMax = Math.max(ZZDD1X1, ZZDD1X2);
                            if (ZZDD1X >= ZZDD1XMin && ZZDD1X <= ZZDD1XMax) {

                                let ZZDD1Y;
                                if (ZZDD1X1 === ZZDD1X2) {
                                    if (ZZDD1Y1 === ZZDD1Y2) {
                                        ZZDD1Y = (ZZDD1Y1 + ZZDD1Y2) / 2;
                                        $("#ZZDD1Y").html(ZZDD1Y.toFixed(6));
                                    } else {
                                        $("#ZZDD1Y").html("Y1 ≠ Y2");
                                    }
                                }
                                else {
                                    ZZDD1Y = ZZDD1Y1 * Math.pow(ZZDD1Y2 / ZZDD1Y1, Math.log(ZZDD1X1 / ZZDD1X) / Math.log(ZZDD1X1 / ZZDD1X2));
                                    $("#ZZDD1Y").html(ZZDD1Y.toFixed(6));
                                }
                            }
                            else {
                                $("#ZZDD1Y").html("X ∉ [X1, X2]");
                            }
                        }
                    }
                }
            }
        }
    });


    $(document).on("input propertychange", "input.ZZDD2Required", function () {

        $("td.ZZDD2Result").empty();

        // X1
        let ZZDD2X1VAL = $("#ZZDD2X1").val();
        if (ZZDD2X1VAL.length > 0 && !isNaN(parseFloat(ZZDD2X1VAL))) {
            let ZZDD2X1 = parseFloat(ZZDD2X1VAL);

            // X2
            let ZZDD2X2VAL = $("#ZZDD2X2").val();
            if (ZZDD2X2VAL.length > 0 && !isNaN(parseFloat(ZZDD2X2VAL))) {
                let ZZDD2X2 = parseFloat(ZZDD2X2VAL);

                // Y1
                let ZZDD2Y1VAL = $("#ZZDD2Y1").val();
                if (ZZDD2Y1VAL.length > 0 && !isNaN(parseFloat(ZZDD2Y1VAL))) {
                    let ZZDD2Y1 = parseFloat(ZZDD2Y1VAL);

                    // Y2
                    let ZZDD2Y2VAL = $("#ZZDD2Y2").val();
                    if (ZZDD2Y2VAL.length > 0 && !isNaN(parseFloat(ZZDD2Y2VAL))) {
                        let ZZDD2Y2 = parseFloat(ZZDD2Y2VAL);

                        // X
                        let ZZDD2XVAL = $("#ZZDD2X").val();
                        if (ZZDD2XVAL.length > 0 && !isNaN(parseFloat(ZZDD2XVAL))) {
                            let ZZDD2X = parseFloat(ZZDD2XVAL);

                            // X 介于 X1 和 X2 之间
                            let ZZDD2XMin = Math.min(ZZDD2X1, ZZDD2X2);
                            let ZZDD2XMax = Math.max(ZZDD2X1, ZZDD2X2);
                            if (ZZDD2X >= ZZDD2XMin && ZZDD2X <= ZZDD2XMax) {

                                let ZZDD2Y;
                                if (ZZDD2X1 === ZZDD2X2) {
                                    if (ZZDD2Y1 === ZZDD2Y2) {
                                        ZZDD2Y = (ZZDD2Y1 + ZZDD2Y2) / 2;
                                        $("#ZZDD2Y").html(ZZDD2Y.toFixed(6));
                                    } else {
                                        $("#ZZDD2Y").html("Y1 ≠ Y2");
                                    }
                                }
                                else {
                                    ZZDD2Y = ZZDD2Y1 * Math.pow(ZZDD2Y2 / ZZDD2Y1, (ZZDD2X - ZZDD2X1) / (ZZDD2X2 - ZZDD2X1));
                                    $("#ZZDD2Y").html(ZZDD2Y.toFixed(6));
                                }
                            }
                            else {
                                $("#ZZDD2Y").html("X ∉ [X1, X2]");
                            }
                        }
                    }
                }
            }
        }
    });
});