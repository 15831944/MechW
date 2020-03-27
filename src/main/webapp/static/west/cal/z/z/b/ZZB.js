$(document).ready(function () {

    /**
     * 长方板
     */
    $(document).on("input propertychange", "input.ZZBARequired", function () {

        $("td.ZZBAResult").empty();

        // L
        let ZZBALVal = $("#ZZBAL").val();
        if (ZZBALVal.length > 0 && !isNaN(ZZBALVal) && parseFloat(ZZBALVal) > 0) {
            let ZZBAL = parseFloat(ZZBALVal);

            // W
            let ZZBAWVal = $("#ZZBAW").val();
            if (ZZBAWVal.length > 0 && !isNaN(ZZBAWVal) && parseFloat(ZZBAWVal) > 0) {
                let ZZBAW = parseFloat(ZZBAWVal);

                // A
                let ZZBAA = ZZBAL * ZZBAW / 1000000;
                $("#ZZBAA").html(ZZBAA.toFixed(4));

                // THKN
                let ZZBATHKNVal = $("#ZZBATHKN").val();
                if (ZZBATHKNVal.length > 0 && !isNaN(ZZBATHKNVal) && parseFloat(ZZBATHKNVal) > 0) {
                    let ZZBATHKN = parseFloat(ZZBATHKNVal);

                    // V
                    let ZZBAV = ZZBAA * ZZBATHKN / 1000;
                    $("#ZZBAV").html(ZZBAV.toFixed(4));

                    // D
                    let ZZBADVal = $("#ZZBAD").val();
                    if (ZZBADVal.length > 0 && !isNaN(ZZBADVal) && parseFloat(ZZBADVal) > 0) {
                        let ZZBAD = parseFloat(ZZBADVal);

                        // M
                        let ZZBAM = ZZBAV * ZZBAD;
                        $("#ZZBAM").html(ZZBAM.toFixed(2));
                    }
                }
            }
        }
    });

    /**
     * 圆形板
     */
    $(document).on("input propertychange", "input.ZZBBRequired", function () {

        $("td.ZZBBResult").empty();

        // DO
        let ZZBBDOVal = $("#ZZBBDO").val();
        if (ZZBBDOVal.length > 0 && !isNaN(ZZBBDOVal) && parseFloat(ZZBBDOVal) > 0) {
            let ZZBBDO = parseFloat(ZZBBDOVal);

            // A
            let ZZBBA = 0.25 * Math.PI * ZZBBDO * ZZBBDO / 1000000;
            $("#ZZBBA").html(ZZBBA.toFixed(4));

            // THKN
            let ZZBBTHKNVal = $("#ZZBBTHKN").val();
            if (ZZBBTHKNVal.length > 0 && !isNaN(ZZBBTHKNVal) && parseFloat(ZZBBTHKNVal) > 0) {
                let ZZBBTHKN = parseFloat(ZZBBTHKNVal);

                // V
                let ZZBBV = Math.PI * ZZBBDO * ZZBBDO / 4 * ZZBBTHKN / 1000000000;
                $("#ZZBBV").html(ZZBBV.toFixed(4));

                // D
                let ZZBBDVal = $("#ZZBBD").val();
                if (ZZBBDVal.length > 0 && !isNaN(ZZBBDVal) && parseFloat(ZZBBDVal) > 0) {
                    let ZZBBD = parseFloat(ZZBBDVal);

                    // M
                    let ZZBBM = ZZBBV * ZZBBD;
                    $("#ZZBBM").html(ZZBBM.toFixed(2));
                }
            }
        }
    });

    /**
     * 梯形板
     */
    $(document).on("input propertychange", "input.ZZBCRequired", function () {

        $("td.ZZBCResult").empty();

        // LT
        let ZZBCLTVal = $("#ZZBCLT").val();
        if (ZZBCLTVal.length > 0 && !isNaN(ZZBCLTVal) && parseFloat(ZZBCLTVal) > 0) {
            let ZZBCLT = parseFloat(ZZBCLTVal);

            // LB
            let ZZBCLBVal = $("#ZZBCLB").val();
            if (ZZBCLBVal.length > 0 && !isNaN(ZZBCLBVal) && parseFloat(ZZBCLBVal) > 0) {
                let ZZBCLB = parseFloat(ZZBCLBVal);

                // H
                let ZZBCHVal = $("#ZZBCH").val();
                if (ZZBCHVal.length > 0 && !isNaN(ZZBCHVal) && parseFloat(ZZBCHVal) > 0) {
                    let ZZBCH = parseFloat(ZZBCHVal);

                    // A
                    let ZZBCA = 0.5 * (ZZBCLT + ZZBCLB) * ZZBCH / 1000000;
                    $("#ZZBCA").html(ZZBCA.toFixed(4));

                    // THKN
                    let ZZBCTHKNVal = $("#ZZBCTHKN").val();
                    if (ZZBCTHKNVal.length > 0 && !isNaN(ZZBCTHKNVal) && parseFloat(ZZBCTHKNVal) > 0) {
                        let ZZBCTHKN = parseFloat(ZZBCTHKNVal);

                        // V
                        let ZZBCV = ZZBCA * ZZBCTHKN / 1000;
                        $("#ZZBCV").html(ZZBCV.toFixed(4));

                        // D
                        let ZZBCDVal = $("#ZZBCD").val();
                        if (ZZBCDVal.length > 0 && !isNaN(ZZBCDVal) && parseFloat(ZZBCDVal) > 0) {
                            let ZZBCD = parseFloat(ZZBCDVal);

                            // M
                            let ZZBCM = ZZBCV * ZZBCD;
                            $("#ZZBCM").html(ZZBCM.toFixed(2));
                        }
                    }
                }
            }
        }
    });

    /**
     * 三角板
     */
    $(document).on("input propertychange", "input.ZZBDRequired", function () {

        $("td.ZZBDResult").empty();

        // L1
        let ZZBDL1Val = $("#ZZBDL1").val();
        if (ZZBDL1Val.length > 0 && !isNaN(ZZBDL1Val) && parseFloat(ZZBDL1Val) > 0) {
            let ZZBDL1 = parseFloat(ZZBDL1Val);

            // L2
            let ZZBDL2Val = $("#ZZBDL2").val();
            if (ZZBDL2Val.length > 0 && !isNaN(ZZBDL2Val) && parseFloat(ZZBDL2Val) > 0) {
                let ZZBDL2 = parseFloat(ZZBDL2Val);

                // L3
                let ZZBDL3Val = $("#ZZBDL3").val();
                if (ZZBDL3Val.length > 0 && !isNaN(ZZBDL3Val) && parseFloat(ZZBDL3Val) > Math.abs(ZZBDL1 - ZZBDL2) && parseFloat(ZZBDL3Val) < (ZZBDL1 + ZZBDL2)) {
                    let ZZBDL3 = parseFloat(ZZBDL3Val);

                    // P
                    let ZZBDP = (ZZBDL1 + ZZBDL2 + ZZBDL3) / 2;

                    // a
                    let ZZBDA = Math.sqrt(ZZBDP * (ZZBDP - ZZBDL1) * (ZZBDP - ZZBDL2) * (ZZBDP - ZZBDL3)) / 1000000;
                    $("#ZZBDA").html(ZZBDA.toFixed(4));

                    // THKN
                    let ZZBDTHKNVal = $("#ZZBDTHKN").val();
                    if (ZZBDTHKNVal.length > 0 && !isNaN(ZZBDTHKNVal) && parseFloat(ZZBDTHKNVal) > 0) {
                        let ZZBDTHKN = parseFloat(ZZBDTHKNVal);

                        // V
                        let ZZBDV = ZZBDA * ZZBDTHKN / 1000;
                        $("#ZZBDV").html(ZZBDV.toFixed(4));

                        // d
                        let ZZBDDVal = $("#ZZBDD").val();
                        if (ZZBDDVal.length > 0 && !isNaN(ZZBDDVal) && parseFloat(ZZBDDVal) > 0) {
                            let ZZBDD = parseFloat(ZZBDDVal);

                            // M
                            let ZZBDM = ZZBDV * ZZBDD;
                            $("#ZZBDM").html(ZZBDM.toFixed(2));
                        }
                    }
                }
            }
        }
    });

    /**
     * 圆环板
     */
    $(document).on("input propertychange", "input.ZZBERequired", function () {

        $("td.ZZBEResult").empty();

        // DO
        let ZZBEDOVal = $("#ZZBEDO").val();
        if (ZZBEDOVal.length > 0 && !isNaN(ZZBEDOVal) && parseFloat(ZZBEDOVal) > 0) {
            let ZZBEDO = parseFloat(ZZBEDOVal);

            // DI
            let ZZBEDIVal = $("#ZZBEDI").val();
            if (ZZBEDIVal.length > 0 && !isNaN(ZZBEDIVal) && parseFloat(ZZBEDIVal) >= 0 && parseFloat(ZZBEDIVal) <= ZZBEDO) {
                let ZZBEDI = parseFloat(ZZBEDIVal);

                // A
                let ZZBEA = 0.25 * Math.PI * (ZZBEDO * ZZBEDO - ZZBEDI * ZZBEDI) / 1000000;
                $("#ZZBEA").html(ZZBEA.toFixed(4));

                // THKN
                let ZZBETHKNVal = $("#ZZBETHKN").val();
                if (ZZBETHKNVal.length > 0 && !isNaN(ZZBETHKNVal) && parseFloat(ZZBETHKNVal) > 0) {
                    let ZZBETHKN = parseFloat(ZZBETHKNVal);

                    // V
                    let ZZBEV = ZZBEA * ZZBETHKN / 1000;
                    $("#ZZBEV").html(ZZBEV.toFixed(4));

                    // D
                    let ZZBEDVal = $("#ZZBED").val();
                    if (ZZBEDVal.length > 0 && !isNaN(ZZBEDVal) && parseFloat(ZZBEDVal) > 0) {
                        let ZZBED = parseFloat(ZZBEDVal);

                        // M
                        let ZZBEM = ZZBEV * ZZBED;
                        $("#ZZBEM").html(ZZBEM.toFixed(2));
                    }
                }
            }
        }
    });

    /**
     * 圆柱体
     */
    $(document).on("input propertychange", "input.ZZBFRequired", function () {

        $("td.ZZBFResult").empty();

        // DO
        let ZZBFDOVal = $("#ZZBFDO").val();
        if (ZZBFDOVal.length > 0 && !isNaN(ZZBFDOVal) && parseFloat(ZZBFDOVal) > 0) {
            let ZZBFDO = parseFloat(ZZBFDOVal);

            // L
            let ZZBFLVal = $("#ZZBFL").val();
            if (ZZBFLVal.length > 0 && !isNaN(ZZBFLVal) && parseFloat(ZZBFLVal) > 0) {
                let ZZBFL = parseFloat(ZZBFLVal);

                // A
                let ZZBFA = Math.PI * ZZBFDO * ZZBFL / 1000000;
                $("#ZZBFA").html(ZZBFA.toFixed(4));

                // V
                let ZZBFV = 0.25 * Math.PI * ZZBFDO * ZZBFDO * ZZBFL / 1000000000;
                $("#ZZBFV").html(ZZBFV.toFixed(4));

                // D
                let ZZBFDVal = $("#ZZBFD").val();
                if (ZZBFDVal.length > 0 && !isNaN(ZZBFDVal) && parseFloat(ZZBFDVal) > 0) {
                    let ZZBFD = parseFloat(ZZBFDVal);

                    // M
                    let ZZBFM = ZZBFV * ZZBFD;
                    $("#ZZBFM").html(ZZBFM.toFixed(2));
                }
            }
        }
    });

    /**
     * 圆柱壳(内径)
     */
    $(document).on("input propertychange", "input.ZZBGRequired", function () {

        $("td.ZZBGResult").empty();

        // Di
        let ZZBGDIVal = $("#ZZBGDI").val();
        if (ZZBGDIVal.length > 0 && !isNaN(ZZBGDIVal) && parseFloat(ZZBGDIVal) > 0) {
            let ZZBGDI = parseFloat(ZZBGDIVal);

            // THKN
            let ZZBGTHKNVal = $("#ZZBGTHKN").val();
            if (ZZBGTHKNVal.length > 0 && !isNaN(ZZBGTHKNVal) && parseFloat(ZZBGTHKNVal) >= 0) {
                let ZZBGTHKN = parseFloat(ZZBGTHKNVal);

                // DO
                let ZZBGDO = ZZBGDI + 2 * ZZBGTHKN;

                // L
                let ZZBGLVal = $("#ZZBGL").val();
                if (ZZBGLVal.length > 0 && !isNaN(ZZBGLVal) && parseFloat(ZZBGLVal) > 0) {
                    let ZZBGL = parseFloat(ZZBGLVal);

                    // AI
                    let ZZBGAI = Math.PI * ZZBGDI * ZZBGL / 1000000;
                    $("#ZZBGAI").html(ZZBGAI.toFixed(4));

                    // AO
                    let ZZBGAO = Math.PI * ZZBGDO * ZZBGL / 1000000;
                    $("#ZZBGAO").html(ZZBGAO.toFixed(4));

                    // VI
                    let ZZBGVI = 0.25 * Math.PI * ZZBGDI * ZZBGDI * ZZBGL / 1000000000;
                    $("#ZZBGVI").html(ZZBGVI.toFixed(4));

                    // VO
                    let ZZBGVO = 0.25 * Math.PI * ZZBGDO * ZZBGDO * ZZBGL / 1000000000;

                    // V
                    let ZZBGV = ZZBGVO - ZZBGVI;

                    // D
                    let ZZBGDVal = $("#ZZBGD").val();
                    if (ZZBGDVal.length > 0 && !isNaN(ZZBGDVal) && parseFloat(ZZBGDVal) > 0) {
                        let ZZBGD = parseFloat(ZZBGDVal);

                        // M
                        let ZZBGM = ZZBGV * ZZBGD;
                        $("#ZZBGM").html(ZZBGM.toFixed(2));
                    }
                }
            }
        }
    });

    /**
     * 圆柱壳(外径)
     */
    $(document).on("input propertychange", "input.ZZBHRequired", function () {

        $("td.ZZBHResult").empty();

        // DO
        let ZZBHDOVal = $("#ZZBHDO").val();
        if (ZZBHDOVal.length > 0 && !isNaN(ZZBHDOVal) && parseFloat(ZZBHDOVal) > 0) {
            let ZZBHDO = parseFloat(ZZBHDOVal);

            // THKN
            let ZZBHTHKNVal = $("#ZZBHTHKN").val();
            if (ZZBHTHKNVal.length > 0 && !isNaN(ZZBHTHKNVal) && parseFloat(ZZBHTHKNVal) >= 0) {
                let ZZBHTHKN = parseFloat(ZZBHTHKNVal);

                // DI
                let ZZBHDI = ZZBHDO - 2 * ZZBHTHKN;

                // L
                let ZZBHLVal = $("#ZZBHL").val();
                if (ZZBHLVal.length > 0 && !isNaN(ZZBHLVal) && parseFloat(ZZBHLVal) > 0) {
                    let ZZBHL = parseFloat(ZZBHLVal);

                    // AI
                    let ZZBHAI = Math.PI * ZZBHDI * ZZBHL / 1000000;
                    $("#ZZBHAI").html(ZZBHAI.toFixed(4));

                    // AO
                    let ZZBHAO = Math.PI * ZZBHDO * ZZBHL / 1000000;
                    $("#ZZBHAO").html(ZZBHAO.toFixed(4));

                    // VI
                    let ZZBHVI = 0.25 * Math.PI * ZZBHDI * ZZBHDI * ZZBHL / 1000000000;
                    $("#ZZBHVI").html(ZZBHVI.toFixed(4));

                    // VO
                    let ZZBHVO = 0.25 * Math.PI * ZZBHDO * ZZBHDO * ZZBHL / 1000000000;

                    // V
                    let ZZBHV = ZZBHVO - ZZBHVI;

                    // D
                    let ZZBHDVal = $("#ZZBHD").val();
                    if (ZZBHDVal.length > 0 && !isNaN(ZZBHDVal) && parseFloat(ZZBHDVal) > 0) {
                        let ZZBHD = parseFloat(ZZBHDVal);

                        // M
                        let ZZBHM = ZZBHV * ZZBHD;
                        $("#ZZBHM").html(ZZBHM.toFixed(2));
                    }
                }
            }
        }
    });

    /**
     * 锥壳
     */
    $(document).on("input propertychange", "input.ZZBIRequired", function () {

        $("td.ZZBIResult").empty();

        // DIB
        let ZZBIDIBVal = $("#ZZBIDIB").val();
        if (ZZBIDIBVal.length > 0 && !isNaN(ZZBIDIBVal) && parseFloat(ZZBIDIBVal) > 0) {
            let ZZBIDIB = parseFloat(ZZBIDIBVal);

            // DIS
            let ZZBIDISVal = $("#ZZBIDIS").val();
            if (ZZBIDISVal.length > 0 && !isNaN(ZZBIDISVal) && parseFloat(ZZBIDISVal) > 0) {
                let ZZBIDIS = parseFloat(ZZBIDISVal);

                // H
                let ZZBIHVal = $("#ZZBIH").val();
                if (ZZBIHVal.length > 0 && !isNaN(ZZBIHVal) && parseFloat(ZZBIHVal) > 0) {
                    let ZZBIH = parseFloat(ZZBIHVal);

                    // ANG
                    let ZZBIANGLE = Math.atan((ZZBIDIB - ZZBIDIS) / (2 * ZZBIH));
                    $("#ZZBIA").html((ZZBIANGLE / Math.PI * 180).toFixed(4));

                    // AI
                    let ZZBIAI = ((Math.PI * ZZBIH / 2 / Math.cos(ZZBIANGLE)) * (ZZBIDIB + ZZBIDIS)) / 1000000;
                    $("#ZZBIAI").html(ZZBIAI.toFixed(4));

                    // VI
                    let ZZBIVI = ((Math.PI * ZZBIH / 12) * (ZZBIDIB * ZZBIDIB + ZZBIDIB * ZZBIDIS + ZZBIDIS * ZZBIDIS)) / 1000000000;
                    $("#ZZBIVI").html(ZZBIVI.toFixed(4));

                    // THKN
                    let ZZBITHKNVal = $("#ZZBITHKN").val();
                    if (ZZBITHKNVal.length > 0 && !isNaN(ZZBITHKNVal) && parseFloat(ZZBITHKNVal) > 0) {
                        let ZZBITHKN = parseFloat(ZZBITHKNVal);

                        // DOB
                        let ZZBIDOB = ZZBIDIB + 2 * ZZBITHKN / Math.cos(ZZBIANGLE);

                        // DOS
                        let ZZBIDOS = ZZBIDIS + 2 * ZZBITHKN / Math.cos(ZZBIANGLE);

                        // AO
                        let ZZBIAO = ((Math.PI * ZZBIH / 2 / Math.cos(ZZBIANGLE)) * (ZZBIDOB + ZZBIDOS)) / 1000000;
                        $("#ZZBIAO").html(ZZBIAO.toFixed(4));

                        // VO
                        let ZZBIVO = ((Math.PI * ZZBIH / 12) * (ZZBIDOB * ZZBIDOB + ZZBIDOB * ZZBIDOS + ZZBIDOS * ZZBIDOS)) / 1000000000;

                        // V
                        let ZZBIV = ZZBIVO - ZZBIVI;

                        // D
                        let ZZBIDVal = $("#ZZBID").val();
                        if (ZZBIDVal.length > 0 && !isNaN(ZZBIDVal) && parseFloat(ZZBIDVal) > 0) {
                            let ZZBID = parseFloat(ZZBIDVal);

                            // M
                            let ZZBIM = ZZBIV * ZZBID;
                            $("#ZZBIM").html(ZZBIM.toFixed(2));
                        }
                    }
                }
            }
        }
    });

    /**
     * 锥壳
     */
    $(document).on("input propertychange", "input.ZZBJRequired", function () {

        $("td.ZZBJResult").empty();

        // DIB
        let ZZBJDIBVal = $("#ZZBJDIB").val();
        if (ZZBJDIBVal.length > 0 && !isNaN(ZZBJDIBVal) && parseFloat(ZZBJDIBVal) > 0) {
            let ZZBJDIB = parseFloat(ZZBJDIBVal);

            // DIS
            let ZZBJDISVal = $("#ZZBJDIS").val();
            if (ZZBJDISVal.length > 0 && !isNaN(ZZBJDISVal) && parseFloat(ZZBJDISVal) > 0) {
                let ZZBJDIS = parseFloat(ZZBJDISVal);

                // A
                let ZZBJAVal = $("#ZZBJA").val();
                if (ZZBJAVal.length > 0 && !isNaN(ZZBJAVal) && parseFloat(ZZBJAVal) > 0) {
                    let ZZBJA = parseFloat(ZZBJAVal);

                    let ZZBJANGLE = ZZBJA / 180 * Math.PI;

                    // H
                    let ZZBJH = (ZZBJDIB - ZZBJDIS) / 2 / Math.tan(ZZBJANGLE);
                    $("#ZZBJH").html(ZZBJH.toFixed(2));

                    // AI
                    let ZZBJAI = ((Math.PI * ZZBJH / 2 / Math.cos(ZZBJANGLE)) * (ZZBJDIB + ZZBJDIS)) / 1000000;
                    $("#ZZBJAI").html(ZZBJAI.toFixed(4));

                    // VI
                    let ZZBJVI = ((Math.PI * ZZBJH / 12) * (ZZBJDIB * ZZBJDIB + ZZBJDIB * ZZBJDIS + ZZBJDIS * ZZBJDIS)) / 1000000000;
                    $("#ZZBJVI").html(ZZBJVI.toFixed(4));

                    // THKN
                    let ZZBJTHKNVal = $("#ZZBJTHKN").val();
                    if (ZZBJTHKNVal.length > 0 && !isNaN(ZZBJTHKNVal) && parseFloat(ZZBJTHKNVal) > 0) {
                        let ZZBJTHKN = parseFloat(ZZBJTHKNVal);

                        // DOB
                        let ZZBJDOB = ZZBJDIB + 2 * ZZBJTHKN / Math.cos(ZZBJANGLE);

                        // DOS
                        let ZZBJDOS = ZZBJDIS + 2 * ZZBJTHKN / Math.cos(ZZBJANGLE);

                        // AO
                        let ZZBJAO = ((Math.PI * ZZBJH / 2 / Math.cos(ZZBJANGLE)) * (ZZBJDOB + ZZBJDOS)) / 1000000;
                        $("#ZZBJAO").html(ZZBJAO.toFixed(4));

                        // VO
                        let ZZBJVO = ((Math.PI * ZZBJH / 12) * (ZZBJDOB * ZZBJDOB + ZZBJDOB * ZZBJDOS + ZZBJDOS * ZZBJDOS)) / 1000000000;

                        // V
                        let ZZBJV = ZZBJVO - ZZBJVI;

                        // D
                        let ZZBJDVal = $("#ZZBJD").val();
                        if (ZZBJDVal.length > 0 && !isNaN(ZZBJDVal) && parseFloat(ZZBJDVal) > 0) {
                            let ZZBJD = parseFloat(ZZBJDVal);

                            // M
                            let ZZBJM = ZZBJV * ZZBJD;
                            $("#ZZBJM").html(ZZBJM.toFixed(2));
                        }
                    }
                }
            }
        }
    });
});