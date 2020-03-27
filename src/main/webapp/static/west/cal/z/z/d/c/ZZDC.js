$(document).ready(function () {
    $(document).on("input propertychange", "input.ZZDCARequired", function () {

        $("td.ZZDCAResult").empty();

        // X1
        let ZZDCAX1VAL = $("#ZZDCAX1").val();
        if (ZZDCAX1VAL.length > 0 && !isNaN(parseFloat(ZZDCAX1VAL))) {
            let ZZDCAX1 = parseFloat(ZZDCAX1VAL);

            // X2
            let ZZDCAX2VAL = $("#ZZDCAX2").val();
            if (ZZDCAX2VAL.length > 0 && !isNaN(parseFloat(ZZDCAX2VAL))) {
                let ZZDCAX2 = parseFloat(ZZDCAX2VAL);

                // X1Y1
                let ZZDCAX1Y1VAL = $("#ZZDCAX1Y1").val();
                if (ZZDCAX1Y1VAL.length > 0 && !isNaN(parseFloat(ZZDCAX1Y1VAL))) {
                    let ZZDCAX1Y1 = parseFloat(ZZDCAX1Y1VAL);

                    // X2Y1
                    let ZZDCAX2Y1VAL = $("#ZZDCAX2Y1").val();
                    if (ZZDCAX2Y1VAL.length > 0 && !isNaN(parseFloat(ZZDCAX2Y1VAL))) {
                        let ZZDCAX2Y1 = parseFloat(ZZDCAX2Y1VAL);

                        // X1Y2
                        let ZZDCAX1Y2VAL = $("#ZZDCAX1Y2").val();
                        if (ZZDCAX1Y2VAL.length > 0 && !isNaN(parseFloat(ZZDCAX1Y2VAL))) {
                            let ZZDCAX1Y2 = parseFloat(ZZDCAX1Y2VAL);

                            // X2Y2
                            let ZZDCAX2Y2VAL = $("#ZZDCAX2Y2").val();
                            if (ZZDCAX2Y2VAL.length > 0 && !isNaN(parseFloat(ZZDCAX2Y2VAL))) {
                                let ZZDCAX2Y2 = parseFloat(ZZDCAX2Y2VAL);

                                // X
                                let ZZDCAXVAL = $("#ZZDCAX").val();
                                if (ZZDCAXVAL.length > 0 && !isNaN(parseFloat(ZZDCAXVAL))) {
                                    let ZZDCAX = parseFloat(ZZDCAXVAL);

                                    // X 介于 X1 和 X2 之间
                                    let ZZDCAXMin = Math.min(ZZDCAX1, ZZDCAX2);
                                    let ZZDCAXMax = Math.max(ZZDCAX1, ZZDCAX2);
                                    if (ZZDCAX >= ZZDCAXMin && ZZDCAX <= ZZDCAXMax) {

                                        let ZZDCAXY1, ZZDCAXY2;
                                        if (ZZDCAX1 === ZZDCAX2) {
                                            ZZDCAXY1 = (ZZDCAX1Y1 + ZZDCAX2Y1) / 2;
                                            ZZDCAXY2 = (ZZDCAX1Y2 + ZZDCAX2Y2) / 2;
                                        } else {
                                            ZZDCAXY1 = ZZDCAX1Y1 + (ZZDCAX - ZZDCAX1) / (ZZDCAX2 - ZZDCAX1) * (ZZDCAX2Y1 - ZZDCAX1Y1);
                                            ZZDCAXY2 = ZZDCAX1Y2 + (ZZDCAX - ZZDCAX1) / (ZZDCAX2 - ZZDCAX1) * (ZZDCAX2Y2 - ZZDCAX1Y2);
                                        }

                                        // Y1
                                        let ZZDCAY1VAL = $("#ZZDCAY1").val();
                                        if (ZZDCAY1VAL.length > 0 && !isNaN(parseFloat(ZZDCAY1VAL))) {
                                            let ZZDCAY1 = parseFloat(ZZDCAY1VAL);

                                            // Y2
                                            let ZZDCAY2VAL = $("#ZZDCAY2").val();
                                            if (ZZDCAY2VAL.length > 0 && !isNaN(parseFloat(ZZDCAY2VAL))) {
                                                let ZZDCAY2 = parseFloat(ZZDCAY2VAL);

                                                // Y
                                                let ZZDCAYVAL = $("#ZZDCAY").val();
                                                if (ZZDCAYVAL.length > 0 && !isNaN(parseFloat(ZZDCAYVAL))) {
                                                    let ZZDCAY = parseFloat(ZZDCAYVAL);

                                                    // Y 介于 Y1 和 Y2 之间
                                                    let ZZDCAYMin = Math.min(ZZDCAY1, ZZDCAY2);
                                                    let ZZDCAYMax = Math.max(ZZDCAY1, ZZDCAY2);
                                                    if (ZZDCAY >= ZZDCAYMin && ZZDCAY <= ZZDCAYMax) {

                                                        let ZZDCAXY;
                                                        if (ZZDCAY1 === ZZDCAY2) {
                                                            ZZDCAXY = (ZZDCAXY1 + ZZDCAXY2) / 2;
                                                        } else {
                                                            ZZDCAXY = ZZDCAXY1 + (ZZDCAY - ZZDCAY1) / (ZZDCAY2 - ZZDCAY1) * (ZZDCAXY2 - ZZDCAXY1);
                                                        }

                                                        $("#ZZDCAXY").html(ZZDCAXY.toFixed(6));

                                                    } else {
                                                        $("#ZZDCAXY").html("Y ∉ [Y1, Y2]");
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        $("#ZZDCAXY").html("X ∉ [X1, X2]");
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    $(document).on("input propertychange", "input.ZZDCBRequired", function () {

        $("td.ZZDCBResult").empty();

        // X1
        let ZZDCBX1VAL = $("#ZZDCBX1").val();
        if (ZZDCBX1VAL.length > 0 && !isNaN(parseFloat(ZZDCBX1VAL))) {
            let ZZDCBX1 = parseFloat(ZZDCBX1VAL);

            // X2
            let ZZDCBX2VAL = $("#ZZDCBX2").val();
            if (ZZDCBX2VAL.length > 0 && !isNaN(parseFloat(ZZDCBX2VAL))) {
                let ZZDCBX2 = parseFloat(ZZDCBX2VAL);

                // X1Y1
                let ZZDCBX1Y1VAL = $("#ZZDCBX1Y1").val();
                if (ZZDCBX1Y1VAL.length > 0 && !isNaN(parseFloat(ZZDCBX1Y1VAL))) {
                    let ZZDCBX1Y1 = parseFloat(ZZDCBX1Y1VAL);

                    // X2Y1
                    let ZZDCBX2Y1VAL = $("#ZZDCBX2Y1").val();
                    if (ZZDCBX2Y1VAL.length > 0 && !isNaN(parseFloat(ZZDCBX2Y1VAL))) {
                        let ZZDCBX2Y1 = parseFloat(ZZDCBX2Y1VAL);

                        // X1Y2
                        let ZZDCBX1Y2VAL = $("#ZZDCBX1Y2").val();
                        if (ZZDCBX1Y2VAL.length > 0 && !isNaN(parseFloat(ZZDCBX1Y2VAL))) {
                            let ZZDCBX1Y2 = parseFloat(ZZDCBX1Y2VAL);

                            // X2Y2
                            let ZZDCBX2Y2VAL = $("#ZZDCBX2Y2").val();
                            if (ZZDCBX2Y2VAL.length > 0 && !isNaN(parseFloat(ZZDCBX2Y2VAL))) {
                                let ZZDCBX2Y2 = parseFloat(ZZDCBX2Y2VAL);

                                // X
                                let ZZDCBXVAL = $("#ZZDCBX").val();
                                if (ZZDCBXVAL.length > 0 && !isNaN(parseFloat(ZZDCBXVAL))) {
                                    let ZZDCBX = parseFloat(ZZDCBXVAL);

                                    // X 介于 X1 和 X2 之间
                                    let ZZDCBXMin = Math.min(ZZDCBX1, ZZDCBX2);
                                    let ZZDCBXMax = Math.max(ZZDCBX1, ZZDCBX2);
                                    if (ZZDCBX >= ZZDCBXMin && ZZDCBX <= ZZDCBXMax) {

                                        let ZZDCBXY1, ZZDCBXY2;
                                        if (ZZDCBX1 === ZZDCBX2) {
                                            ZZDCBXY1 = (ZZDCBX1Y1 + ZZDCBX2Y1) / 2;
                                            ZZDCBXY2 = (ZZDCBX1Y2 + ZZDCBX2Y2) / 2;
                                        } else {
                                            ZZDCBXY1 = ZZDCBX1Y1 + (ZZDCBX - ZZDCBX1) / (ZZDCBX2 - ZZDCBX1) * (ZZDCBX2Y1 - ZZDCBX1Y1);
                                            ZZDCBXY2 = ZZDCBX1Y2 + (ZZDCBX - ZZDCBX1) / (ZZDCBX2 - ZZDCBX1) * (ZZDCBX2Y2 - ZZDCBX1Y2);
                                        }

                                        // Y1
                                        let ZZDCBY1VAL = $("#ZZDCBY1").val();
                                        if (ZZDCBY1VAL.length > 0 && !isNaN(parseFloat(ZZDCBY1VAL))) {
                                            let ZZDCBY1 = parseFloat(ZZDCBY1VAL);

                                            // Y2
                                            let ZZDCBY2VAL = $("#ZZDCBY2").val();
                                            if (ZZDCBY2VAL.length > 0 && !isNaN(parseFloat(ZZDCBY2VAL))) {
                                                let ZZDCBY2 = parseFloat(ZZDCBY2VAL);

                                                // Y
                                                let ZZDCBYVAL = $("#ZZDCBY").val();
                                                if (ZZDCBYVAL.length > 0 && !isNaN(parseFloat(ZZDCBYVAL))) {
                                                    let ZZDCBY = parseFloat(ZZDCBYVAL);

                                                    // Y 介于 Y1 和 Y2 之间
                                                    let ZZDCBYMin = Math.min(ZZDCBY1, ZZDCBY2);
                                                    let ZZDCBYMax = Math.max(ZZDCBY1, ZZDCBY2);
                                                    if (ZZDCBY >= ZZDCBYMin && ZZDCBY <= ZZDCBYMax) {

                                                        let ZZDCBXY;
                                                        if (ZZDCBY1 === ZZDCBY2) {
                                                            ZZDCBXY = (ZZDCBXY1 + ZZDCBXY2) / 2;
                                                        } else {
                                                            ZZDCBXY = ZZDCBXY1 + (ZZDCBY - ZZDCBY1) / (ZZDCBY2 - ZZDCBY1) * (ZZDCBXY2 - ZZDCBXY1);
                                                        }

                                                        $("#ZZDCBXY").html(ZZDCBXY.toFixed(6));

                                                    } else {
                                                        $("#ZZDCBXY").html("Y ∉ [Y1, Y2]");
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        $("#ZZDCBXY").html("X ∉ [X1, X2]");
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    $(document).on("DOMSubtreeModified", "#ZZDCAXY, #ZZDCBXY", function () {

        $("td.ZZDCResult").empty();

        // Z1
        let ZZDCZ1VAL = $("#ZZDCZ1").val();
        if (ZZDCZ1VAL.length > 0 && !isNaN(parseFloat(ZZDCZ1VAL))) {
            let ZZDCZ1 = parseFloat(ZZDCZ1VAL);

            // Z2
            let ZZDCZ2VAL = $("#ZZDCZ2").val();
            if (ZZDCZ2VAL.length > 0 && !isNaN(parseFloat(ZZDCZ2VAL))) {
                let ZZDCZ2 = parseFloat(ZZDCZ2VAL);

                // AXY
                let ZZDCAXYVAL = $("#ZZDCAXY").html();
                if (ZZDCAXYVAL.length > 0 && !isNaN(parseFloat(ZZDCAXYVAL))) {
                    let ZZDCAXY = parseFloat(ZZDCAXYVAL);

                    // BXY
                    let ZZDCBXYVAL = $("#ZZDCBXY").html();
                    if (ZZDCBXYVAL.length > 0 && !isNaN(parseFloat(ZZDCBXYVAL))) {
                        let ZZDCBXY = parseFloat(ZZDCBXYVAL);

                        // Z
                        let ZZDCZVAL = $("#ZZDCZ").val();
                        if (ZZDCZVAL.length > 0 && !isNaN(parseFloat(ZZDCZVAL))) {
                            let ZZDCZ = parseFloat(ZZDCZVAL);

                            // Z 介于 Z1 和 Z2 之间
                            let ZZDCZMin = Math.min(ZZDCZ1, ZZDCZ2);
                            let ZZDCZMax = Math.max(ZZDCZ1, ZZDCZ2);
                            if (ZZDCZ >= ZZDCZMin && ZZDCZ <= ZZDCZMax) {

                                let ZZDCZR;
                                if (ZZDCZ1 === ZZDCZ2) {
                                    ZZDCZR = (ZZDCAXY + ZZDCBXY) / 2;
                                    $("#ZZDCZR").html(ZZDCZR.toFixed(6));
                                } else {
                                    ZZDCZR = ZZDCAXY + (ZZDCZ - ZZDCZ1) / (ZZDCZ2 - ZZDCZ1) * (ZZDCBXY - ZZDCAXY);
                                    $("#ZZDCZR").html(ZZDCZR.toFixed(6));
                                }
                            } else {
                                $("#ZZDCZR").html("Z ∉ [Z1, Z2]");
                            }
                        }
                    }
                }
            }
        }
    });
    $(document).on("input propertychange", "input.ZZDCRequired", function () {

        $("td.ZZDCResult").empty();

        // Z1
        let ZZDCZ1VAL = $("#ZZDCZ1").val();
        if (ZZDCZ1VAL.length > 0 && !isNaN(parseFloat(ZZDCZ1VAL))) {
            let ZZDCZ1 = parseFloat(ZZDCZ1VAL);

            // Z2
            let ZZDCZ2VAL = $("#ZZDCZ2").val();
            if (ZZDCZ2VAL.length > 0 && !isNaN(parseFloat(ZZDCZ2VAL))) {
                let ZZDCZ2 = parseFloat(ZZDCZ2VAL);

                // AXY
                let ZZDCAXYVAL = $("#ZZDCAXY").html();
                if (ZZDCAXYVAL.length > 0 && !isNaN(parseFloat(ZZDCAXYVAL))) {
                    let ZZDCAXY = parseFloat(ZZDCAXYVAL);

                    // BXY
                    let ZZDCBXYVAL = $("#ZZDCBXY").html();
                    if (ZZDCBXYVAL.length > 0 && !isNaN(parseFloat(ZZDCBXYVAL))) {
                        let ZZDCBXY = parseFloat(ZZDCBXYVAL);

                        // Z
                        let ZZDCZVAL = $("#ZZDCZ").val();
                        if (ZZDCZVAL.length > 0 && !isNaN(parseFloat(ZZDCZVAL))) {
                            let ZZDCZ = parseFloat(ZZDCZVAL);

                            // Z 介于 Z1 和 Z2 之间
                            let ZZDCZMin = Math.min(ZZDCZ1, ZZDCZ2);
                            let ZZDCZMax = Math.max(ZZDCZ1, ZZDCZ2);
                            if (ZZDCZ >= ZZDCZMin && ZZDCZ <= ZZDCZMax) {

                                let ZZDCZR;
                                if (ZZDCZ1 === ZZDCZ2) {
                                    ZZDCZR = (ZZDCAXY + ZZDCBXY) / 2;
                                    $("#ZZDCZR").html(ZZDCZR.toFixed(6));
                                } else {
                                    ZZDCZR = ZZDCAXY + (ZZDCZ - ZZDCZ1) / (ZZDCZ2 - ZZDCZ1) * (ZZDCBXY - ZZDCAXY);
                                    $("#ZZDCZR").html(ZZDCZR.toFixed(6));
                                }
                            } else {
                                $("#ZZDCZR").html("Z ∉ [Z1, Z2]");
                            }
                        }
                    }
                }
            }
        }
    });
});