$(document).ready(function () {

    /**
     * 准半球封头
     */
    $(document).on("input propertychange", "input.ZZAARequired", function () {

        $("td.ZZAAResult").empty();

        // DI
        let ZZAADIVAL = $("#ZZAADI").val();
        if (ZZAADIVAL.length > 0 && !isNaN(parseFloat(ZZAADIVAL)) && parseFloat(ZZAADIVAL) > 0) {
            let ZZAADI = parseFloat(ZZAADIVAL);

            // THKN
            let ZZAATHKNVAL = $("#ZZAATHKN").val();
            if (ZZAATHKNVAL.length > 0 && !isNaN(parseFloat(ZZAATHKNVAL)) && parseFloat(ZZAATHKNVAL) > 0) {
                let ZZAATHKN = parseFloat(ZZAATHKNVAL);

                // H
                let ZZAAHVAL = $("#ZZAAH").val();
                if (ZZAAHVAL.length > 0 && !isNaN(parseFloat(ZZAAHVAL)) && parseFloat(ZZAAHVAL) >= 0 && parseFloat(ZZAAHVAL) < (ZZAADI / 2)) {
                    let ZZAAH = parseFloat(ZZAAHVAL);

                    // DO
                    let ZZAADO = ZZAADI + 2 * ZZAATHKN;
                    $("#ZZAADO").html(ZZAADO);

                    // AI
                    let ZZAAAI = (0.5 * Math.PI * ZZAADI * ZZAADI - Math.PI * ZZAADI * ZZAAH) / 1000000;
                    $("#ZZAAAI").html(ZZAAAI.toFixed(4));

                    // AO
                    let ZZAAAO = (0.5 * Math.PI * ZZAADO * ZZAADO - Math.PI * ZZAADO * ZZAAH) / 1000000;
                    $("#ZZAAAO").html(ZZAAAO.toFixed(4));

                    // VI
                    let ZZAAVI = (Math.PI * ZZAADI * ZZAADI * ZZAADI / 12 - Math.PI * ZZAADI * ZZAADI * ZZAAH / 4) / 1000000000;
                    $("#ZZAAVI").html(ZZAAVI.toFixed(4));

                    // VO
                    let ZZAAVO = (Math.PI * ZZAADO * ZZAADO * ZZAADO / 12 - Math.PI * ZZAADO * ZZAADO * ZZAAH / 4) / 1000000000;

                    let ZZAAV = ZZAAVO - ZZAAVI;

                    // MASS
                    let ZZAADVAL = $("#ZZAAD").val();
                    if (ZZAADVAL.length > 0 && !isNaN(parseFloat(ZZAADVAL)) && parseFloat(ZZAADVAL) > 0) {
                        let ZZAAD = parseFloat(ZZAADVAL);

                        let ZZAAM = ZZAAV * ZZAAD;
                        $("#ZZAAM").html(ZZAAM.toFixed(2));

                    }

                    // 计算变形率
                    let ZZAATHKMVAL = $("#ZZAATHKM").val();
                    if (ZZAATHKMVAL.length > 0 && !isNaN(parseFloat(ZZAATHKMVAL)) && parseFloat(ZZAATHKMVAL) >= ZZAATHKN) {
                        let ZZAATHKM = parseFloat(ZZAATHKMVAL);

                        let ZZAAFR = 75 * ZZAATHKM / (ZZAADI / 2);
                        $("#ZZAAFR").html(ZZAAFR.toFixed(2));
                    }
                }
            }
        }
    });

    /**
     * 半球封头
     */
    $(document).on("input propertychange", "input.ZZABRequired", function () {

        $("td.ZZABResult").empty();

        // DI
        let ZZABDIVAL = $("#ZZABDI").val();
        if (ZZABDIVAL.length > 0 && !isNaN(parseFloat(ZZABDIVAL)) && parseFloat(ZZABDIVAL) > 0) {
            let ZZABDI = parseFloat(ZZABDIVAL);

            // THKN
            let ZZABTHKNVAL = $("#ZZABTHKN").val();
            if (ZZABTHKNVAL.length > 0 && !isNaN(parseFloat(ZZABTHKNVAL)) && parseFloat(ZZABTHKNVAL) > 0) {
                let ZZABTHKN = parseFloat(ZZABTHKNVAL);

                // DO
                let ZZABDO = ZZABDI + 2 * ZZABTHKN;

                // AI
                let ZZABAI = (0.5 * Math.PI * ZZABDI * ZZABDI) / 1000000;
                $("#ZZABAI").html(ZZABAI.toFixed(4));

                // AO
                let ZZABAO = (0.5 * Math.PI * ZZABDO * ZZABDO) / 1000000;
                $("#ZZABAO").html(ZZABAO.toFixed(4));

                // VI
                let ZZABVI = (Math.PI * ZZABDI * ZZABDI * ZZABDI / 12) / 1000000000;
                $("#ZZABVI").html(ZZABVI.toFixed(4));

                // VO
                let ZZABVO = (Math.PI * ZZABDO * ZZABDO * ZZABDO / 12) / 1000000000;

                // V
                let ZZABV = ZZABVO - ZZABVI;

                // M
                let ZZABDVAL = $("#ZZABD").val();
                if (ZZABDVAL.length > 0 && !isNaN(parseFloat(ZZABDVAL)) && parseFloat(ZZABDVAL) > 0) {
                    let ZZABD = parseFloat(ZZABDVAL);

                    let ZZABM = ZZABV * ZZABD;
                    $("#ZZABM").html(ZZABM.toFixed(2));

                }

                // FR
                let ZZABTHKMVAL = $("#ZZABTHKM").val();
                if (ZZABTHKMVAL.length > 0 && !isNaN(parseFloat(ZZABTHKMVAL)) && parseFloat(ZZABTHKMVAL) >= ZZABTHKN) {
                    let ZZABTHKM = parseFloat(ZZABTHKMVAL);

                    let ZZABFR = 75 * ZZABTHKM / (ZZABDI / 2);
                    $("#ZZABFR").html(ZZABFR.toFixed(2));
                }
            }
        }
    });

    /**
     * 带直边半球
     */
    $(document).on("input propertychange", "input.ZZACRequired", function () {

        $("td.ZZACResult").empty();

        // DI
        let ZZACDIVAL = $("#ZZACDI").val();
        if (ZZACDIVAL.length > 0 && !isNaN(parseFloat(ZZACDIVAL)) && parseFloat(ZZACDIVAL) > 0) {
            let ZZACDI = parseFloat(ZZACDIVAL);

            // THKN
            let ZZACTHKNVAL = $("#ZZACTHKN").val();
            if (ZZACTHKNVAL.length > 0 && !isNaN(parseFloat(ZZACTHKNVAL)) && parseFloat(ZZACTHKNVAL) > 0) {
                let ZZACTHKN = parseFloat(ZZACTHKNVAL);

                // H
                let ZZACHVAL = $("#ZZACH").val();
                if (ZZACHVAL.length > 0 && !isNaN(parseFloat(ZZACHVAL)) && parseFloat(ZZACHVAL) >= 0) {
                    let ZZACH = parseFloat(ZZACHVAL);

                    // DO
                    let ZZACDO = ZZACDI + 2 * ZZACTHKN;
                    $("#ZZACDO").html(ZZACDO);

                    // AI
                    let ZZACAI = (0.5 * Math.PI * ZZACDI * ZZACDI + Math.PI * ZZACDI * ZZACH) / 1000000;
                    $("#ZZACAI").html(ZZACAI.toFixed(4));

                    // AO
                    let ZZACAO = (0.5 * Math.PI * ZZACDO * ZZACDO + Math.PI * ZZACDO * ZZACH) / 1000000;
                    $("#ZZACAO").html(ZZACAO.toFixed(4));

                    // VI
                    let ZZACVI = (Math.PI * ZZACDI * ZZACDI * ZZACDI / 12 + Math.PI * ZZACDI * ZZACDI * ZZACH / 4) / 1000000000;
                    $("#ZZACVI").html(ZZACVI.toFixed(4));

                    // VO
                    let ZZACVO = (Math.PI * ZZACDO * ZZACDO * ZZACDO / 12 + Math.PI * ZZACDO * ZZACDO * ZZACH / 4) / 1000000000;

                    // V
                    let ZZACV = ZZACVO - ZZACVI;

                    // M
                    let ZZACDVAL = $("#ZZACD").val();
                    if (ZZACDVAL.length > 0 && !isNaN(parseFloat(ZZACDVAL)) && parseFloat(ZZACDVAL) > 0) {
                        let ZZACD = parseFloat(ZZACDVAL);

                        let ZZACM = ZZACV * ZZACD;
                        $("#ZZACM").html(ZZACM.toFixed(2));

                    }

                    // 计算变形率
                    let ZZACTHKMVAL = $("#ZZACTHKM").val();
                    if (ZZACTHKMVAL.length > 0 && !isNaN(parseFloat(ZZACTHKMVAL)) && parseFloat(ZZACTHKMVAL) >= ZZACTHKN) {
                        let ZZACTHKM = parseFloat(ZZACTHKMVAL);

                        let ZZACFR = 75 * ZZACTHKM / (ZZACDI / 2);
                        $("#ZZACFR").html(ZZACFR.toFixed(2));
                    }
                }
            }
        }
    });

    /**
     * EHA(2:1)
     */
    $(document).on("input propertychange", "input.ZZADRequired", function () {

        $("td.ZZADResult").empty();

        // DI
        let ZZADDIVAL = $("#ZZADDI").val();
        if (ZZADDIVAL.length > 0 && !isNaN(parseFloat(ZZADDIVAL)) && parseFloat(ZZADDIVAL) > 0) {
            let ZZADDI = parseFloat(ZZADDIVAL);

            // THKN
            let ZZADTHKNVAL = $("#ZZADTHKN").val();
            if (ZZADTHKNVAL.length > 0 && !isNaN(parseFloat(ZZADTHKNVAL)) && parseFloat(ZZADTHKNVAL) > 0) {
                let ZZADTHKN = parseFloat(ZZADTHKNVAL);

                // H
                let ZZADHVAL = $("#ZZADH").val();
                if (ZZADHVAL.length > 0 && !isNaN(parseFloat(ZZADHVAL)) && parseFloat(ZZADHVAL) >= 0) {
                    let ZZADH = parseFloat(ZZADHVAL);

                    // RATE
                    let ZZADAB = 2;

                    // AXI
                    let ZZADAXI = ZZADDI / 2;

                    // BXI
                    let ZZADBXI = ZZADAXI / ZZADAB;

                    // AXO
                    let ZZADAXO = ZZADAXI + ZZADTHKN;

                    // BXO
                    let ZZADBXO = ZZADBXI + ZZADTHKN;

                    // AI
                    let ZZADAI = Math.PI * ZZADAXI * (ZZADAXI + (ZZADBXI / (Math.sqrt((ZZADAXI / ZZADBXI) * (ZZADAXI / ZZADBXI) - 1)) * Math.log(ZZADAXI / ZZADBXI + Math.sqrt((ZZADAXI / ZZADBXI) * (ZZADAXI / ZZADBXI) - 1))) + 2 * ZZADH) / 1000000;
                    $("#ZZADAI").html(ZZADAI.toFixed(4));

                    // AO
                    let ZZADAO = Math.PI * ZZADAXO * (ZZADAXO + (ZZADBXO / (Math.sqrt((ZZADAXO / ZZADBXO) * (ZZADAXO / ZZADBXO) - 1)) * Math.log(ZZADAXO / ZZADBXO + Math.sqrt((ZZADAXO / ZZADBXO) * (ZZADAXO / ZZADBXO) - 1))) + 2 * ZZADH) / 1000000;
                    $("#ZZADAO").html(ZZADAO.toFixed(4));

                    // VI
                    let ZZADVI = (2 / 3 * Math.PI * ZZADAXI * ZZADAXI * ZZADBXI + Math.PI * ZZADAXI * ZZADAXI * ZZADH) / 1000000000;
                    $("#ZZADVI").html(ZZADVI.toFixed(4));

                    // VO
                    let ZZADVO = (2 / 3 * Math.PI * ZZADAXO * ZZADAXO * ZZADBXO + Math.PI * ZZADAXO * ZZADAXO * ZZADH) / 1000000000;

                    // V
                    let ZZADV = ZZADVO - ZZADVI;
                    $("#ZZADV").html(ZZADV.toFixed(4));

                    // M
                    let ZZADDVAL = $("#ZZADD").val();
                    if (ZZADDVAL.length > 0 && !isNaN(parseFloat(ZZADDVAL)) && parseFloat(ZZADDVAL) > 0) {
                        let ZZADD = parseFloat(ZZADDVAL);

                        let ZZADM = ZZADV * ZZADD;
                        $("#ZZADM").html(ZZADM.toFixed(2));

                    }

                    // FR
                    let ZZADTHKMVAL = $("#ZZADTHKM").val();
                    if (ZZADTHKMVAL.length > 0 && !isNaN(parseFloat(ZZADTHKMVAL)) && parseFloat(ZZADTHKMVAL) >= ZZADTHKN) {
                        let ZZADTHKM = parseFloat(ZZADTHKMVAL);

                        let ZZADFR = 75 * ZZADTHKM / (0.1727 * ZZADDI);
                        $("#ZZADFR").html(ZZADFR.toFixed(2));
                    }
                }
            }
        }
    });

    /**
     * EHB(2:1)
     */
    $(document).on("input propertychange", "input.ZZAERequired", function () {

        $("td.ZZAEResult").empty();

        // DO
        let ZZAEDOVAL = $("#ZZAEDO").val();
        if (ZZAEDOVAL.length > 0 && !isNaN(parseFloat(ZZAEDOVAL)) && parseFloat(ZZAEDOVAL) > 0) {
            let ZZAEDO = parseFloat(ZZAEDOVAL);

            // THKN
            let ZZAETHKNVAL = $("#ZZAETHKN").val();
            if (ZZAETHKNVAL.length > 0 && !isNaN(parseFloat(ZZAETHKNVAL)) && parseFloat(ZZAETHKNVAL) > 0 && parseFloat(ZZAETHKNVAL) <= ZZAEDO / 2) {
                let ZZAETHKN = parseFloat(ZZAETHKNVAL);

                // H
                let ZZAEHVAL = $("#ZZAEH").val();
                if (ZZAEHVAL.length > 0 && !isNaN(parseFloat(ZZAEHVAL)) && parseFloat(ZZAEHVAL) >= 0) {
                    let ZZAEH = parseFloat(ZZAEHVAL);

                    // DI
                    let ZZAEDI = ZZAEDO - 2 * ZZAETHKN;

                    // RATE
                    let ZZAEAB = 2;

                    // AXO
                    let ZZAEAXO = ZZAEDO / 2;

                    // BXO
                    let ZZAEBXO = ZZAEAXO / ZZAEAB;

                    // AXI
                    let ZZAEAXI = ZZAEAXO - ZZAETHKN;

                    // BXI
                    let ZZAEBXI = ZZAEBXO - ZZAETHKN;

                    // AI
                    let ZZAEAI = Math.PI * ZZAEAXI * (ZZAEAXI + (ZZAEBXI / (Math.sqrt((ZZAEAXI / ZZAEBXI) * (ZZAEAXI / ZZAEBXI) - 1)) * Math.log(ZZAEAXI / ZZAEBXI + Math.sqrt((ZZAEAXI / ZZAEBXI) * (ZZAEAXI / ZZAEBXI) - 1))) + 2 * ZZAEH) / 1000000;
                    $("#ZZAEAI").html(ZZAEAI.toFixed(4));

                    // AO
                    let ZZAEAO = Math.PI * ZZAEAXO * (ZZAEAXO + (ZZAEBXO / (Math.sqrt((ZZAEAXO / ZZAEBXO) * (ZZAEAXO / ZZAEBXO) - 1)) * Math.log(ZZAEAXO / ZZAEBXO + Math.sqrt((ZZAEAXO / ZZAEBXO) * (ZZAEAXO / ZZAEBXO) - 1))) + 2 * ZZAEH) / 1000000;
                    $("#ZZAEAO").html(ZZAEAO.toFixed(4));

                    // VI
                    let ZZAEVI = (2 / 3 * Math.PI * ZZAEAXI * ZZAEAXI * ZZAEBXI + Math.PI * ZZAEAXI * ZZAEAXI * ZZAEH) / 1000000000;
                    $("#ZZAEVI").html(ZZAEVI.toFixed(4));

                    // VO
                    let ZZAEVO = (2 / 3 * Math.PI * ZZAEAXO * ZZAEAXO * ZZAEBXO + Math.PI * ZZAEAXO * ZZAEAXO * ZZAEH) / 1000000000;

                    // V
                    let ZZAEV = ZZAEVO - ZZAEVI;

                    // M
                    let ZZAEDVAL = $("#ZZAED").val();
                    if (ZZAEDVAL.length > 0 && !isNaN(parseFloat(ZZAEDVAL)) && parseFloat(ZZAEDVAL) > 0) {
                        let ZZAED = parseFloat(ZZAEDVAL);

                        let ZZAEM = ZZAEV * ZZAED;
                        $("#ZZAEM").html(ZZAEM.toFixed(2));

                    }

                    // 计算变形率
                    let ZZAETHKMVAL = $("#ZZAETHKM").val();
                    if (ZZAETHKMVAL.length > 0 && !isNaN(parseFloat(ZZAETHKMVAL)) && parseFloat(ZZAETHKMVAL) >= ZZAETHKN) {
                        let ZZAETHKM = parseFloat(ZZAETHKMVAL);

                        let ZZAEFR = 75 * ZZAETHKM / (0.1727 * ZZAEDI);
                        $("#ZZAEFR").html(ZZAEFR.toFixed(2));
                    }
                }
            }
        }
    });

    /**
     * SDH
     */
    $(document).on("input propertychange", "input.ZZAFRequired", function () {

        $("td.ZZAFResult").empty();

        // DO
        let ZZAFDOVAL = $("#ZZAFDO").val();
        if (ZZAFDOVAL.length > 0 && !isNaN(parseFloat(ZZAFDOVAL)) && parseFloat(ZZAFDOVAL) > 0) {
            let ZZAFDO = parseFloat(ZZAFDOVAL);

            // THKN
            let ZZAFTHKNVAL = $("#ZZAFTHKN").val();
            if (ZZAFTHKNVAL.length > 0 && !isNaN(parseFloat(ZZAFTHKNVAL)) && parseFloat(ZZAFTHKNVAL) > 0) {
                let ZZAFTHKN = parseFloat(ZZAFTHKNVAL);

                // DI
                let ZZAFDI = ZZAFDO - ZZAFTHKN;

                // RIS
                let ZZAFRIS = ZZAFDI;

                // RI
                let ZZAFRI = ZZAFDI / 2;

                // H
                let ZZAFH = ZZAFDO - Math.sqrt(ZZAFDO * ZZAFDO - ZZAFRI * ZZAFRI);
                $("#ZZAFH").html(ZZAFH.toFixed(0));

                // C1
                let ZZAFC1 = ZZAFDO - Math.sqrt(ZZAFDO * ZZAFDO - ZZAFRI * ZZAFRI);

                // AI
                let ZZAFAI = 2 * Math.PI * ZZAFDO * ZZAFC1 / 1000000;
                $("#ZZAFAI").html(ZZAFAI.toFixed(4));

                // C2
                let ZZAFC2 = (ZZAFDO + ZZAFTHKN / 2) - Math.sqrt(Math.pow(ZZAFDO + ZZAFTHKN / 2, 2) - Math.pow(ZZAFDO / 2 - ZZAFTHKN / 4, 2));

                // AM
                let ZZAFAM = 2 * Math.PI * (ZZAFDO + ZZAFTHKN / 2) * ZZAFC2 / 1000000;

                // AO
                let ZZAFAO = 2 * ZZAFAM - ZZAFAI;
                $("#ZZAFAO").html(ZZAFAO.toFixed(4));

                // VI
                let ZZAFVI = Math.PI * ZZAFC1 * ZZAFC1 * (ZZAFDO - ZZAFC1 / 3) / 1000000000;
                $("#ZZAFVI").html(ZZAFVI.toFixed(4));

                // V
                let ZZAFV = ZZAFAM * ZZAFTHKN / 1000;

                // M
                let ZZAFDVAL = $("#ZZAFD").val();
                if (ZZAFDVAL.length > 0 && !isNaN(parseFloat(ZZAFDVAL)) && parseFloat(ZZAFDVAL) > 0) {
                    let ZZAFD = parseFloat(ZZAFDVAL);

                    let ZZAFM = ZZAFV * ZZAFD;
                    $("#ZZAFM").html(ZZAFM.toFixed(2));

                }

                // FR
                let ZZAFTHKMVAL = $("#ZZAFTHKM").val();
                if (ZZAFTHKMVAL.length > 0 && !isNaN(parseFloat(ZZAFTHKMVAL)) && parseFloat(ZZAFTHKMVAL) >= ZZAFTHKN) {
                    let ZZAFTHKM = parseFloat(ZZAFTHKMVAL);

                    let ZZAFFR = 75 * ZZAFTHKM / ZZAFRIS;
                    $("#ZZAFFR").html(ZZAFFR.toFixed(2));
                }
            }
        }
    });

    /**
     * THA
     */
    $(document).on("input propertychange", "input.ZZAGRequired", function () {

        $("td.ZZAGResult").empty();

        // DI
        let ZZAGDIVAL = $("#ZZAGDI").val();
        if (ZZAGDIVAL.length > 0 && !isNaN(parseFloat(ZZAGDIVAL)) && parseFloat(ZZAGDIVAL) > 0) {
            let ZZAGDI = parseFloat(ZZAGDIVAL);

            // 封头厚度
            let ZZAGTHKNVAL = $("#ZZAGTHKN").val();
            if (ZZAGTHKNVAL.length > 0 && !isNaN(parseFloat(ZZAGTHKNVAL)) && parseFloat(ZZAGTHKNVAL) > 0) {
                let ZZAGTHKN = parseFloat(ZZAGTHKNVAL);

                // H
                let ZZAGHVAL = $("#ZZAGH").val();
                if (ZZAGHVAL.length > 0 && !isNaN(parseFloat(ZZAGHVAL)) && parseFloat(ZZAGHVAL) >= 0) {
                    let ZZAGH = parseFloat(ZZAGHVAL);

                    // 内壁球冠半径
                    let ZZAGRIB = ZZAGDI;

                    // 内壁转角半径
                    let ZZAGRIS = 0.1 * ZZAGDI;

                    // 封头外直径
                    let ZZAGDO = ZZAGDI + 2 * ZZAGTHKN;

                    // 外壁球冠半径
                    let ZZAGROB = ZZAGRIB + ZZAGTHKN;

                    // 外壁转角半径
                    let ZZAGROS = ZZAGRIS + ZZAGTHKN;

                    // 弧度角θ
                    let ZZAGANG = Math.acos((ZZAGDI / 2 - ZZAGRIS) / (ZZAGRIB - ZZAGRIS));

                    // 系数C1
                    let ZZAGC1 = (Math.sin(ZZAGANG)) / 4;

                    // 系数C2
                    let ZZAGC2 = ((Math.sin(ZZAGANG) * Math.cos(ZZAGANG)) + ZZAGANG) / 2 - Math.sin(ZZAGANG);

                    // 系数C3
                    let ZZAGC3 = (2 * Math.sin(ZZAGANG)) - ((Math.pow(Math.sin(ZZAGANG), 3)) / 3) - (Math.sin(ZZAGANG) * Math.cos(ZZAGANG)) - ZZAGANG;

                    // 系数C4
                    let ZZAGC4 = (2 + Math.sin(ZZAGANG)) * Math.pow(1 - Math.sin(ZZAGANG), 2) / 3;

                    // 内表面积
                    let ZZAGAI = 2 * Math.PI * (ZZAGDI * ZZAGRIS * ZZAGANG / 2 + ZZAGRIS * ZZAGRIS * (Math.sin(ZZAGANG) - ZZAGANG) + ZZAGRIB * ZZAGRIB * (1 - Math.sin(ZZAGANG)) + ZZAGDI * ZZAGH / 2) / 1000000;
                    $("#ZZAGAI").html(ZZAGAI.toFixed(4));

                    // 外表面积
                    let ZZAGAO = 2 * Math.PI * (ZZAGDO * ZZAGROS * ZZAGANG / 2 + ZZAGROS * ZZAGROS * (Math.sin(ZZAGANG) - ZZAGANG) + ZZAGROB * ZZAGROB * (1 - Math.sin(ZZAGANG)) + ZZAGDO * ZZAGH / 2) / 1000000;
                    $("#ZZAGAO").html(ZZAGAO.toFixed(4));

                    // 内壁容积
                    let ZZAGVI = Math.PI * (ZZAGC1 * ZZAGDI * ZZAGDI * ZZAGRIS + ZZAGC2 * ZZAGDI * ZZAGRIS * ZZAGRIS + ZZAGC3 * ZZAGRIS * ZZAGRIS * ZZAGRIS + ZZAGC4 * ZZAGRIB * ZZAGRIB * ZZAGRIB + ZZAGDI * ZZAGDI * ZZAGH / 4) / 1000000000;
                    $("#ZZAGVI").html(ZZAGVI.toFixed(4));

                    // 外壁容积
                    let ZZAGVO = Math.PI * (ZZAGC1 * ZZAGDO * ZZAGDO * ZZAGROS + ZZAGC2 * ZZAGDO * ZZAGROS * ZZAGROS + ZZAGC3 * ZZAGROS * ZZAGROS * ZZAGROS + ZZAGC4 * ZZAGROB * ZZAGROB * ZZAGROB + ZZAGDO * ZZAGDO * ZZAGH / 4) / 1000000000;

                    // 封头体积
                    let ZZAGV = ZZAGVO - ZZAGVI;

                    // 封头深度
                    let ZZAGHI = (1 - Math.sin(ZZAGANG)) * ZZAGRIB + ZZAGRIS * Math.sin(ZZAGANG) + ZZAGH;
                    $("#ZZAGHI").html(ZZAGHI.toFixed(1));

                    // M
                    let ZZAGDVAL = $("#ZZAGD").val();
                    if (ZZAGDVAL.length > 0 && !isNaN(parseFloat(ZZAGDVAL)) && parseFloat(ZZAGDVAL) > 0) {
                        let ZZAGD = parseFloat(ZZAGDVAL);

                        let ZZAGM = ZZAGV * ZZAGD;
                        $("#ZZAGM").html(ZZAGM.toFixed(2));

                    }

                    // 计算变形率
                    let ZZAGTHKMVAL = $("#ZZAGTHKM").val();
                    if (ZZAGTHKMVAL.length > 0 && !isNaN(parseFloat(ZZAGTHKMVAL)) && parseFloat(ZZAGTHKMVAL) >= ZZAGTHKN) {
                        let ZZAGTHKM = parseFloat(ZZAGTHKMVAL);

                        let ZZAGFR = 75 * ZZAGTHKM / ZZAGRIS;
                        $("#ZZAGFR").html(ZZAGFR.toFixed(2));
                    }
                }
            }
        }
    });

    /**
     * THB
     */
    $(document).on("input propertychange", "input.ZZAHRequired", function () {

        $("td.ZZAHResult").empty();

        // DO
        let ZZAHDOVAL = $("#ZZAHDO").val();
        if (ZZAHDOVAL.length > 0 && !isNaN(parseFloat(ZZAHDOVAL)) && parseFloat(ZZAHDOVAL) > 0) {
            let ZZAHDO = parseFloat(ZZAHDOVAL);

            // THKN
            let ZZAHTHKNVAL = $("#ZZAHTHKN").val();
            if (ZZAHTHKNVAL.length > 0 && !isNaN(parseFloat(ZZAHTHKNVAL)) && parseFloat(ZZAHTHKNVAL) > 0) {
                let ZZAHTHKN = parseFloat(ZZAHTHKNVAL);

                // H
                let ZZAHHVAL = $("#ZZAHH").val();
                if (ZZAHHVAL.length > 0 && !isNaN(parseFloat(ZZAHHVAL)) && parseFloat(ZZAHHVAL) >= 0) {
                    let ZZAHH = parseFloat(ZZAHHVAL);

                    // DI
                    let ZZAHDI = ZZAHDO - 2 * ZZAHTHKN;

                    // ROB
                    let ZZAHROB = ZZAHDO;

                    // ROS
                    let ZZAHROS = 0.1 * ZZAHDO;

                    // RIB
                    let ZZAHRIB = ZZAHROB - ZZAHTHKN;

                    // RIS
                    let ZZAHRIS = ZZAHROS - ZZAHTHKN;

                    // θ
                    let ZZAHANG = Math.acos((ZZAHDO / 2 - ZZAHROS) / (ZZAHROB - ZZAHROS));

                    // C1
                    let ZZAHC1 = (Math.sin(ZZAHANG)) / 4;

                    // C2
                    let ZZAHC2 = ((Math.sin(ZZAHANG) * Math.cos(ZZAHANG)) + ZZAHANG) / 2 - Math.sin(ZZAHANG);

                    // C3
                    let ZZAHC3 = (2 * Math.sin(ZZAHANG)) - ((Math.pow(Math.sin(ZZAHANG), 3)) / 3) - (Math.sin(ZZAHANG) * Math.cos(ZZAHANG)) - ZZAHANG;

                    // C4
                    let ZZAHC4 = (2 + Math.sin(ZZAHANG)) * Math.pow(1 - Math.sin(ZZAHANG), 2) / 3;

                    // AI
                    let ZZAHAI = 2 * Math.PI * (ZZAHDI * ZZAHRIS * ZZAHANG / 2 + ZZAHRIS * ZZAHRIS * (Math.sin(ZZAHANG) - ZZAHANG) + ZZAHRIB * ZZAHRIB * (1 - Math.sin(ZZAHANG)) + ZZAHDI * ZZAHH / 2) / 1000000;
                    $("#ZZAHAI").html(ZZAHAI.toFixed(4));

                    // AO
                    let ZZAHAO = 2 * Math.PI * (ZZAHDO * ZZAHROS * ZZAHANG / 2 + ZZAHROS * ZZAHROS * (Math.sin(ZZAHANG) - ZZAHANG) + ZZAHROB * ZZAHROB * (1 - Math.sin(ZZAHANG)) + ZZAHDO * ZZAHH / 2) / 1000000;
                    $("#ZZAHAO").html(ZZAHAO.toFixed(4));

                    // VI
                    let ZZAHVI = Math.PI * (ZZAHC1 * ZZAHDI * ZZAHDI * ZZAHRIS + ZZAHC2 * ZZAHDI * ZZAHRIS * ZZAHRIS + ZZAHC3 * ZZAHRIS * ZZAHRIS * ZZAHRIS + ZZAHC4 * ZZAHRIB * ZZAHRIB * ZZAHRIB + ZZAHDI * ZZAHDI * ZZAHH / 4) / 1000000000;
                    $("#ZZAHVI").html(ZZAHVI.toFixed(4));

                    // VO
                    let ZZAHVO = Math.PI * (ZZAHC1 * ZZAHDO * ZZAHDO * ZZAHROS + ZZAHC2 * ZZAHDO * ZZAHROS * ZZAHROS + ZZAHC3 * ZZAHROS * ZZAHROS * ZZAHROS + ZZAHC4 * ZZAHROB * ZZAHROB * ZZAHROB + ZZAHDO * ZZAHDO * ZZAHH / 4) / 1000000000;

                    // V
                    let ZZAHV = ZZAHVO - ZZAHVI;

                    // HO
                    let ZZAHHO = (1 - Math.sin(ZZAHANG)) * ZZAHROB + ZZAHROS * Math.sin(ZZAHANG) + ZZAHH;
                    $("#ZZAHHO").html(ZZAHHO.toFixed(1));

                    // M
                    let ZZAHDVAL = $("#ZZAHD").val();
                    if (ZZAHDVAL.length > 0 && !isNaN(parseFloat(ZZAHDVAL)) && parseFloat(ZZAHDVAL) > 0) {
                        let ZZAHD = parseFloat(ZZAHDVAL);

                        let ZZAHM = ZZAHV * ZZAHD;
                        $("#ZZAHM").html(ZZAHM.toFixed(2));

                    }

                    // FR
                    let ZZAHTHKMVAL = $("#ZZAHTHKM").val();
                    if (ZZAHTHKMVAL.length > 0 && !isNaN(parseFloat(ZZAHTHKMVAL)) && parseFloat(ZZAHTHKMVAL) >= ZZAHTHKN) {
                        let ZZAHTHKM = parseFloat(ZZAHTHKMVAL);

                        let ZZAHFR = 75 * ZZAHTHKM / ZZAHRIS;
                        $("#ZZAHFR").html(ZZAHFR.toFixed(2));
                    }
                }
            }
        }
    });

    /**
     * FHA
     */
    $(document).on("input propertychange", "input.ZZAIRequired", function () {

        $("td.ZZAIResult").empty();

        // DI
        let ZZAIDIVAL = $("#ZZAIDI").val();
        if (ZZAIDIVAL.length > 0 && !isNaN(parseFloat(ZZAIDIVAL)) && parseFloat(ZZAIDIVAL) > 0) {
            let ZZAIDI = parseFloat(ZZAIDIVAL);

            // THKN
            let ZZAITHKNVAL = $("#ZZAITHKN").val();
            if (ZZAITHKNVAL.length > 0 && !isNaN(parseFloat(ZZAITHKNVAL)) && parseFloat(ZZAITHKNVAL) > 0) {
                let ZZAITHKN = parseFloat(ZZAITHKNVAL);

                // RI
                let ZZAIRIVAL = $("#ZZAIRI").val();
                if (ZZAIRIVAL.length > 0 && !isNaN(parseFloat(ZZAIRIVAL)) && parseFloat(ZZAIRIVAL) >= 3 * ZZAITHKN) {
                    let ZZAIRI = parseFloat(ZZAIRIVAL);

                    // H
                    let ZZAIHVAL = $("#ZZAIH").val();
                    if (ZZAIHVAL.length > 0 && !isNaN(parseFloat(ZZAIHVAL)) && parseFloat(ZZAIHVAL) >= 0) {
                        let ZZAIH = parseFloat(ZZAIHVAL);

                        // DO
                        let ZZAIDO = ZZAIDI + 2 * ZZAITHKN;

                        // RO
                        let ZZAIRO = ZZAIRI + ZZAITHKN;

                        // AI
                        let ZZAIAI = Math.PI * (Math.PI / 2 * ZZAIDI * ZZAIRI - (Math.PI - 2) * ZZAIRI * ZZAIRI + ZZAIDI * ZZAIH + (ZZAIDI / 2 - ZZAIRI) * (ZZAIDI / 2 - ZZAIRI)) / 1000000;
                        $("#ZZAIAI").html(ZZAIAI.toFixed(4));

                        // AO
                        let ZZAIAO = Math.PI * (Math.PI / 2 * ZZAIDO * ZZAIRO - (Math.PI - 2) * ZZAIRO * ZZAIRO + ZZAIDO * ZZAIH + (ZZAIDO / 2 - ZZAIRO) * (ZZAIDO / 2 - ZZAIRO)) / 1000000;
                        $("#ZZAIAO").html(ZZAIAO.toFixed(4));

                        // VI
                        let ZZAIVI = Math.PI * (1 / 4 * ZZAIDI * ZZAIDI * ZZAIRI + (Math.PI / 4 - 1) * ZZAIDI * ZZAIRI * ZZAIRI + (5 / 3 - Math.PI / 2) * ZZAIRI * ZZAIRI * ZZAIRI + 1 / 4 * ZZAIDI * ZZAIDI * ZZAIH) / 1000000000;
                        $("#ZZAIVI").html(ZZAIVI.toFixed(4));

                        // VO
                        let ZZAIVO = Math.PI * (1 / 4 * ZZAIDO * ZZAIDO * ZZAIRO + (Math.PI / 4 - 1) * ZZAIDO * ZZAIRO * ZZAIRO + (5 / 3 - Math.PI / 2) * ZZAIRO * ZZAIRO * ZZAIRO + 1 / 4 * ZZAIDO * ZZAIDO * ZZAIH) / 1000000000;

                        // V
                        let ZZAIV = ZZAIVO - ZZAIVI;
                        $("#ZZAIV").html(ZZAIV.toFixed(4));

                        // M
                        let ZZAIDVAL = $("#ZZAID").val();
                        if (ZZAIDVAL.length > 0 && !isNaN(parseFloat(ZZAIDVAL)) && parseFloat(ZZAIDVAL) > 0) {
                            let ZZAID = parseFloat(ZZAIDVAL);

                            let ZZAIM = ZZAIV * ZZAID;
                            $("#ZZAIM").html(ZZAIM.toFixed(2));

                        }

                        // FR
                        let ZZAITHKMVAL = $("#ZZAITHKM").val();
                        if (ZZAITHKMVAL.length > 0 && !isNaN(parseFloat(ZZAITHKMVAL)) && parseFloat(ZZAITHKMVAL) >= ZZAITHKN) {
                            let ZZAITHKM = parseFloat(ZZAITHKMVAL);

                            let ZZAIFR = 75 * ZZAITHKM / ZZAIRI;
                            $("#ZZAIFR").html(ZZAIFR.toFixed(2));
                        }
                    }
                }
            }
        }
    });

    /**
     * CHA(30)
     */
    $(document).on("input propertychange", "input.ZZAJRequired", function () {

        $("td.ZZAJResult").empty();

        // DIB
        let ZZAJDIBVAL = $("#ZZAJDIB").val();
        if (ZZAJDIBVAL.length > 0 && !isNaN(parseFloat(ZZAJDIBVAL)) && parseFloat(ZZAJDIBVAL) > 0) {
            let ZZAJDIB = parseFloat(ZZAJDIBVAL);

            // DIS
            let ZZAJDISVAL = $("#ZZAJDIS").val();
            if (ZZAJDISVAL.length > 0 && !isNaN(parseFloat(ZZAJDISVAL)) && parseFloat(ZZAJDISVAL) > 0 && parseFloat(ZZAJDISVAL) < ZZAJDIB) {
                let ZZAJDIS = parseFloat(ZZAJDISVAL);

                // THKN
                let ZZAJTHKNVAL = $("#ZZAJTHKN").val();
                if (ZZAJTHKNVAL.length > 0 && !isNaN(parseFloat(ZZAJTHKNVAL)) && parseFloat(ZZAJTHKNVAL) > 0) {
                    let ZZAJTHKN = parseFloat(ZZAJTHKNVAL);

                    // RIB
                    let ZZAJRIBVAL = $("#ZZAJRIB").val();
                    if (ZZAJRIBVAL.length > 0 && !isNaN(parseFloat(ZZAJRIBVAL))
                        && parseFloat(ZZAJRIBVAL) >= Math.max(3 * ZZAJTHKN, 0.1 * ZZAJDIB)) {
                        let ZZAJRIB = parseFloat(ZZAJRIBVAL);

                        // H
                        let ZZAJHBVAL = $("#ZZAJHB").val();
                        if (ZZAJHBVAL.length > 0 && !isNaN(parseFloat(ZZAJHBVAL)) && parseFloat(ZZAJHBVAL) >= 0) {
                            let ZZAJHB = parseFloat(ZZAJHBVAL);

                            // 获取锥壳半顶角
                            let ZZAJDEG = 30;
                            let ZZAJRAD = ZZAJDEG / 180 * Math.PI;

                            // DOB
                            let ZZAJDOB = ZZAJDIB + 2 * ZZAJTHKN;

                            // ROB
                            let ZZAJROB = ZZAJRIB + ZZAJTHKN;

                            // DOS
                            let ZZAJDOS = ZZAJDIS + 2 * ZZAJTHKN * Math.cos(ZZAJRAD);

                            // C1
                            let ZZAJC1 = Math.sin(ZZAJRAD) / 4;

                            // C2
                            let ZZAJC2 = (Math.sin(ZZAJRAD) * Math.cos(ZZAJRAD) + ZZAJRAD) / 2 - Math.sin(ZZAJRAD);

                            // C3
                            let ZZAJC3 = 2 * Math.sin(ZZAJRAD) - (Math.pow(Math.sin(ZZAJRAD), 3)) / 3 - Math.sin(ZZAJRAD) * Math.cos(ZZAJRAD) - ZZAJRAD;

                            // AI
                            let ZZAJAI = Math.PI * (ZZAJDIB * ZZAJRIB * ZZAJRAD + 2 * ZZAJRIB * ZZAJRIB * (Math.sin(ZZAJRAD) - ZZAJRAD) + (Math.pow(ZZAJDIB - 2 * (1 - Math.cos(ZZAJRAD)) * ZZAJRIB, 2)) / (4 * Math.sin(ZZAJRAD)) - (ZZAJDIS * ZZAJDIS) / (4 * Math.sin(ZZAJRAD)) + ZZAJDIB * ZZAJHB) / 1000000;
                            $("#ZZAJAI").html(ZZAJAI.toFixed(4));

                            // AO
                            let ZZAJAO = Math.PI * (ZZAJDOB * ZZAJROB * ZZAJRAD + 2 * ZZAJROB * ZZAJROB * (Math.sin(ZZAJRAD) - ZZAJRAD) + (Math.pow(ZZAJDOB - 2 * (1 - Math.cos(ZZAJRAD)) * ZZAJROB, 2)) / (4 * Math.sin(ZZAJRAD)) - (ZZAJDOS * ZZAJDOS) / (4 * Math.sin(ZZAJRAD)) + ZZAJDOB * ZZAJHB) / 1000000;
                            $("#ZZAJAO").html(ZZAJAO.toFixed(4));

                            // VI
                            let ZZAJVI = Math.PI * (ZZAJC1 * ZZAJDIB * ZZAJDIB * ZZAJRIB + ZZAJC2 * ZZAJDIB * ZZAJRIB * ZZAJRIB + ZZAJC3 * ZZAJRIB * ZZAJRIB * ZZAJRIB + ZZAJDIB * ZZAJDIB * ZZAJHB / 4 + (Math.pow(ZZAJDIB - 2 * (1 - Math.cos(ZZAJRAD)) * ZZAJRIB, 3)) / (24 * Math.tan(ZZAJRAD)) - (ZZAJDIS * ZZAJDIS * ZZAJDIS) / (24 * Math.tan(ZZAJRAD))) / 1000000000;
                            $("#ZZAJVI").html(ZZAJVI.toFixed(4));

                            // VO
                            let ZZAJVO = Math.PI * (ZZAJC1 * ZZAJDOB * ZZAJDOB * ZZAJROB + ZZAJC2 * ZZAJDOB * ZZAJROB * ZZAJROB + ZZAJC3 * ZZAJROB * ZZAJROB * ZZAJROB + ZZAJDOB * ZZAJDOB * ZZAJHB / 4 + (Math.pow(ZZAJDOB - 2 * (1 - Math.cos(ZZAJRAD)) * ZZAJROB, 3)) / (24 * Math.tan(ZZAJRAD)) - (ZZAJDOS * ZZAJDOS * ZZAJDOS) / (24 * Math.tan(ZZAJRAD))) / 1000000000;

                            // V
                            let ZZAJV = ZZAJVO - ZZAJVI - Math.PI / 12 * ZZAJTHKN * Math.sin(ZZAJRAD) * (ZZAJDOS * ZZAJDOS + ZZAJDOS * ZZAJDIS + ZZAJDIS * ZZAJDIS) / 1000000000;

                            // HO
                            let ZZAJHO = ((ZZAJDIB - ZZAJDIS) / 2 - (1 - Math.cos(ZZAJRAD)) * ZZAJRIB) / Math.tan(ZZAJRAD) + ZZAJROB * Math.sin(ZZAJRAD) + ZZAJHB;
                            $("#ZZAJHO").html(ZZAJHO.toFixed(1));

                            // M
                            let ZZAJDVAL = $("#ZZAJD").val();
                            if (ZZAJDVAL.length > 0 && !isNaN(parseFloat(ZZAJDVAL)) && parseFloat(ZZAJDVAL) > 0) {
                                let ZZAJD = parseFloat(ZZAJDVAL);

                                let ZZAJM = ZZAJV * ZZAJD;
                                $("#ZZAJM").html(ZZAJM.toFixed(2));

                            }

                            // FR
                            let ZZAJTHKMVAL = $("#ZZAJTHKM").val();
                            if (ZZAJTHKMVAL.length > 0 && !isNaN(parseFloat(ZZAJTHKMVAL)) && parseFloat(ZZAJTHKMVAL) >= ZZAJTHKN) {
                                let ZZAJTHKM = parseFloat(ZZAJTHKMVAL);

                                let ZZAJFR = 75 * ZZAJTHKM / ZZAJRIB;
                                $("#ZZAJFR").html(ZZAJFR.toFixed(2));
                            }
                        }
                    }
                }
            }
        }
    });

    /**
     * CHA(45)
     */
    $(document).on("input propertychange", "input.ZZAKRequired", function () {

        $("td.ZZAKResult").empty();

        // DIB
        let ZZAKDIBVAL = $("#ZZAKDIB").val();
        if (ZZAKDIBVAL.length > 0 && !isNaN(parseFloat(ZZAKDIBVAL)) && parseFloat(ZZAKDIBVAL) > 0) {
            let ZZAKDIB = parseFloat(ZZAKDIBVAL);

            // DIS
            let ZZAKDISVAL = $("#ZZAKDIS").val();
            if (ZZAKDISVAL.length > 0 && !isNaN(parseFloat(ZZAKDISVAL)) && parseFloat(ZZAKDISVAL) > 0 && parseFloat(ZZAKDISVAL) < ZZAKDIB) {
                let ZZAKDIS = parseFloat(ZZAKDISVAL);

                // THKN
                let ZZAKTHKNVAL = $("#ZZAKTHKN").val();
                if (ZZAKTHKNVAL.length > 0 && !isNaN(parseFloat(ZZAKTHKNVAL)) && parseFloat(ZZAKTHKNVAL) > 0) {
                    let ZZAKTHKN = parseFloat(ZZAKTHKNVAL);

                    // RIB
                    let ZZAKRIBVAL = $("#ZZAKRIB").val();
                    if (ZZAKRIBVAL.length > 0 && !isNaN(parseFloat(ZZAKRIBVAL)) && parseFloat(ZZAKRIBVAL) >= Math.max(3 * ZZAKTHKN, 0.1 * ZZAKDIB)) {
                        let ZZAKRIB = parseFloat(ZZAKRIBVAL);

                        // H
                        let ZZAKHBVAL = $("#ZZAKHB").val();
                        if (ZZAKHBVAL.length > 0 && !isNaN(parseFloat(ZZAKHBVAL)) && parseFloat(ZZAKHBVAL) >= 0) {
                            let ZZAKHB = parseFloat(ZZAKHBVAL);

                            // 获取锥壳半顶角
                            let ZZAKDEG = 45;
                            let ZZAKRAD = ZZAKDEG / 180 * Math.PI;

                            // DOB
                            let ZZAKDOB = ZZAKDIB + 2 * ZZAKTHKN;

                            // ROB
                            let ZZAKROB = ZZAKRIB + ZZAKTHKN;

                            // DOS
                            let ZZAKDOS = ZZAKDIS + 2 * ZZAKTHKN * Math.cos(ZZAKRAD);

                            // C1
                            let ZZAKC1 = Math.sin(ZZAKRAD) / 4;

                            // C2
                            let ZZAKC2 = (Math.sin(ZZAKRAD) * Math.cos(ZZAKRAD) + ZZAKRAD) / 2 - Math.sin(ZZAKRAD);

                            // C3
                            let ZZAKC3 = 2 * Math.sin(ZZAKRAD) - (Math.pow(Math.sin(ZZAKRAD), 3)) / 3 - Math.sin(ZZAKRAD) * Math.cos(ZZAKRAD) - ZZAKRAD;

                            // AI
                            let ZZAKAI = Math.PI * (ZZAKDIB * ZZAKRIB * ZZAKRAD + 2 * ZZAKRIB * ZZAKRIB * (Math.sin(ZZAKRAD) - ZZAKRAD) + (Math.pow(ZZAKDIB - 2 * (1 - Math.cos(ZZAKRAD)) * ZZAKRIB, 2)) / (4 * Math.sin(ZZAKRAD)) - (ZZAKDIS * ZZAKDIS) / (4 * Math.sin(ZZAKRAD)) + ZZAKDIB * ZZAKHB) / 1000000;
                            $("#ZZAKAI").html(ZZAKAI.toFixed(4));

                            // AO
                            let ZZAKAO = Math.PI * (ZZAKDOB * ZZAKROB * ZZAKRAD + 2 * ZZAKROB * ZZAKROB * (Math.sin(ZZAKRAD) - ZZAKRAD) + (Math.pow(ZZAKDOB - 2 * (1 - Math.cos(ZZAKRAD)) * ZZAKROB, 2)) / (4 * Math.sin(ZZAKRAD)) - (ZZAKDOS * ZZAKDOS) / (4 * Math.sin(ZZAKRAD)) + ZZAKDOB * ZZAKHB) / 1000000;
                            $("#ZZAKAO").html(ZZAKAO.toFixed(4));

                            // VI
                            let ZZAKVI = Math.PI * (ZZAKC1 * ZZAKDIB * ZZAKDIB * ZZAKRIB + ZZAKC2 * ZZAKDIB * ZZAKRIB * ZZAKRIB + ZZAKC3 * ZZAKRIB * ZZAKRIB * ZZAKRIB + ZZAKDIB * ZZAKDIB * ZZAKHB / 4 + (Math.pow(ZZAKDIB - 2 * (1 - Math.cos(ZZAKRAD)) * ZZAKRIB, 3)) / (24 * Math.tan(ZZAKRAD)) - (ZZAKDIS * ZZAKDIS * ZZAKDIS) / (24 * Math.tan(ZZAKRAD))) / 1000000000;
                            $("#ZZAKVI").html(ZZAKVI.toFixed(4));

                            // VO
                            let ZZAKVO = Math.PI * (ZZAKC1 * ZZAKDOB * ZZAKDOB * ZZAKROB + ZZAKC2 * ZZAKDOB * ZZAKROB * ZZAKROB + ZZAKC3 * ZZAKROB * ZZAKROB * ZZAKROB + ZZAKDOB * ZZAKDOB * ZZAKHB / 4 + (Math.pow(ZZAKDOB - 2 * (1 - Math.cos(ZZAKRAD)) * ZZAKROB, 3)) / (24 * Math.tan(ZZAKRAD)) - (ZZAKDOS * ZZAKDOS * ZZAKDOS) / (24 * Math.tan(ZZAKRAD))) / 1000000000;

                            // V
                            let ZZAKV = ZZAKVO - ZZAKVI - Math.PI / 12 * ZZAKTHKN * Math.sin(ZZAKRAD) * (ZZAKDOS * ZZAKDOS + ZZAKDOS * ZZAKDIS + ZZAKDIS * ZZAKDIS) / 1000000000;

                            // HO
                            let ZZAKHO = ((ZZAKDIB - ZZAKDIS) / 2 - (1 - Math.cos(ZZAKRAD)) * ZZAKRIB) / Math.tan(ZZAKRAD) + ZZAKROB * Math.sin(ZZAKRAD) + ZZAKHB;
                            $("#ZZAKHO").html(ZZAKHO.toFixed(1));

                            // M
                            let ZZAKDVAL = $("#ZZAKD").val();
                            if (ZZAKDVAL.length > 0 && !isNaN(parseFloat(ZZAKDVAL)) && parseFloat(ZZAKDVAL) > 0) {
                                let ZZAKD = parseFloat(ZZAKDVAL);

                                let ZZAKM = ZZAKV * ZZAKD;
                                $("#ZZAKM").html(ZZAKM.toFixed(2));

                            }

                            // FR
                            let ZZAKTHKMVAL = $("#ZZAKTHKM").val();
                            if (ZZAKTHKMVAL.length > 0 && !isNaN(parseFloat(ZZAKTHKMVAL)) && parseFloat(ZZAKTHKMVAL) >= ZZAKTHKN) {
                                let ZZAKTHKM = parseFloat(ZZAKTHKMVAL);

                                let ZZAKFR = 75 * ZZAKTHKM / ZZAKRIB;
                                $("#ZZAKFR").html(ZZAKFR.toFixed(2));
                            }
                        }
                    }
                }
            }
        }
    });

    /**
     * CHA(60)
     */
    $(document).on("input propertychange", "input.ZZALRequired", function () {

        $("td.ZZALResult").empty();

        // DIB
        let ZZALDIBVAL = $("#ZZALDIB").val();
        if (ZZALDIBVAL.length > 0 && !isNaN(parseFloat(ZZALDIBVAL)) && parseFloat(ZZALDIBVAL) > 0) {
            let ZZALDIB = parseFloat(ZZALDIBVAL);

            // RIB
            let ZZALRIBVAL = $("#ZZALRIB").val();
            if (ZZALRIBVAL.length > 0 && !isNaN(parseFloat(ZZALRIBVAL)) && parseFloat(ZZALRIBVAL) >= 0.1 * ZZALDIB) {
                let ZZALRIB = parseFloat(ZZALRIBVAL);

                // HB
                let ZZALHBVAL = $("#ZZALHB").val();
                if (ZZALHBVAL.length > 0 && !isNaN(parseFloat(ZZALHBVAL)) && parseFloat(ZZALHBVAL) >= 0) {
                    let ZZALHB = parseFloat(ZZALHBVAL);

                    // DIS
                    let ZZALDISVAL = $("#ZZALDIS").val();
                    if (ZZALDISVAL.length > 0 && !isNaN(parseFloat(ZZALDISVAL)) && parseFloat(ZZALDISVAL) > 0 && parseFloat(ZZALDISVAL) <= ZZALDIB) {
                        let ZZALDIS = parseFloat(ZZALDISVAL);

                        // RIS
                        let ZZALRISVAL = $("#ZZALRIS").val();
                        if (ZZALRISVAL.length > 0 && !isNaN(parseFloat(ZZALRISVAL)) && parseFloat(ZZALRISVAL) >= 0.05 * ZZALDIS) {
                            let ZZALRIS = parseFloat(ZZALRISVAL);

                            // HS
                            let ZZALHSVAL = $("#ZZALHS").val();
                            if (ZZALHSVAL.length > 0 && !isNaN(parseFloat(ZZALHSVAL)) && parseFloat(ZZALHSVAL) >= 0) {
                                let ZZALHS = parseFloat(ZZALHSVAL);

                                // THKN
                                let ZZALTHKNVAL = $("#ZZALTHKN").val();
                                if (ZZALTHKNVAL.length > 0 && !isNaN(parseFloat(ZZALTHKNVAL)) && parseFloat(ZZALTHKNVAL) > 0 && parseFloat(ZZALTHKNVAL) <= Math.min(ZZALRIB / 3, ZZALRIS / 3)) {
                                    let ZZALTHKN = parseFloat(ZZALTHKNVAL);

                                    // DEG
                                    let ZZALDEG = 60;

                                    // RAD
                                    let ZZALRAD = ZZALDEG / 180 * Math.PI;

                                    // DOB
                                    let ZZALDOB = ZZALDIB + 2 * ZZALTHKN;

                                    // ROB
                                    let ZZALROB = ZZALRIB + ZZALTHKN;

                                    // DOS
                                    let ZZALDOS = ZZALDIS + 2 * ZZALTHKN;

                                    // ROS
                                    let ZZALROS = ZZALRIS + ZZALTHKN;

                                    // C1
                                    let ZZALC1 = Math.sin(ZZALRAD) / 4;

                                    // C2
                                    let ZZALC2 = (Math.sin(ZZALRAD) * Math.cos(ZZALRAD) + ZZALRAD) / 2 - Math.sin(ZZALRAD);

                                    // C3
                                    let ZZALC3 = 2 * Math.sin(ZZALRAD) - (Math.pow(Math.sin(ZZALRAD), 3)) / 3 - Math.sin(ZZALRAD) * Math.cos(ZZALRAD) - ZZALRAD;

                                    // AI1
                                    let ZZALAI1 = Math.PI * ZZALDIB * ZZALHB / 1000000;

                                    // AO1
                                    let ZZALAO1 = Math.PI * ZZALDOB * ZZALHB / 1000000;

                                    // VI1
                                    let ZZALVI1 = Math.PI / 4 * ZZALDIB * ZZALDIB * ZZALHB / 1000000000;

                                    // VO1
                                    let ZZALVO1 = Math.PI / 4 * ZZALDOB * ZZALDOB * ZZALHB / 1000000000;

                                    // AI2
                                    let ZZALAI2 = 2 * Math.PI * (ZZALRAD / 2 * ZZALDIB * ZZALRIB + ZZALRIB * ZZALRIB * (Math.sin(ZZALRAD) - ZZALRAD)) / 1000000;

                                    // AO2
                                    let ZZALAO2 = 2 * Math.PI * (ZZALRAD / 2 * ZZALDOB * ZZALROB + ZZALROB * ZZALROB * (Math.sin(ZZALRAD) - ZZALRAD)) / 1000000;

                                    // VI2
                                    let ZZALVI2 = Math.PI * (ZZALC1 * ZZALDIB * ZZALDIB * ZZALRIB + ZZALC2 * ZZALDIB * ZZALRIB * ZZALRIB + ZZALC3 * ZZALRIB * ZZALRIB * ZZALRIB) / 1000000000;

                                    // VO2
                                    let ZZALVO2 = Math.PI * (ZZALC1 * ZZALDOB * ZZALDOB * ZZALROB + ZZALC2 * ZZALDOB * ZZALROB * ZZALROB + ZZALC3 * ZZALROB * ZZALROB * ZZALROB) / 1000000000;

                                    // AI3
                                    let ZZALAI3 = Math.PI / 4 / Math.sin(ZZALRAD) * (Math.pow(ZZALDIB - 2 * (1 - Math.cos(ZZALRAD)) * ZZALRIB, 2) - Math.pow(ZZALDIS + 2 * (1 - Math.cos(ZZALRAD)) * ZZALROS, 2)) / 1000000;

                                    // AO3
                                    let ZZALAO3 = Math.PI / 4 / Math.sin(ZZALRAD) * (Math.pow(ZZALDOB - 2 * (1 - Math.cos(ZZALRAD)) * ZZALROB, 2) - Math.pow(ZZALDOS + 2 * (1 - Math.cos(ZZALRAD)) * ZZALRIS, 2)) / 1000000;

                                    // VI3
                                    let ZZALVI3 = Math.PI / 24 / Math.tan(ZZALRAD) * (Math.pow(ZZALDIB - 2 * (1 - Math.cos(ZZALRAD)) * ZZALRIB, 3) - Math.pow(ZZALDIS + 2 * (1 - Math.cos(ZZALRAD)) * ZZALROS, 3)) / 1000000000;

                                    // VO3
                                    let ZZALVO3 = Math.PI / 24 / Math.tan(ZZALRAD) * (Math.pow(ZZALDOB - 2 * (1 - Math.cos(ZZALRAD)) * ZZALROB, 3) - Math.pow(ZZALDOS + 2 * (1 - Math.cos(ZZALRAD)) * ZZALRIS, 3)) / 1000000000;

                                    // AI4
                                    let ZZALAI4 = 2 * Math.PI * (ZZALRAD / 2 * ZZALDIS * ZZALROS + ZZALROS * ZZALROS * (Math.sin(ZZALRAD) - ZZALRAD)) / 1000000;

                                    // AO4
                                    let ZZALAO4 = 2 * Math.PI * (ZZALRAD / 2 * ZZALDOS * ZZALRIS + ZZALRIS * ZZALRIS * (Math.sin(ZZALRAD) - ZZALRAD)) / 1000000;

                                    // VI4
                                    let ZZALVI4 = Math.PI * (ZZALC1 * ZZALDIS * ZZALDIS * ZZALROS - ZZALC2 * ZZALDIS * ZZALROS * ZZALROS + ZZALC3 * ZZALROS * ZZALROS * ZZALROS) / 1000000000;

                                    // VO4
                                    let ZZALVO4 = Math.PI * (ZZALC1 * ZZALDOS * ZZALDOS * ZZALRIS - ZZALC2 * ZZALDOS * ZZALRIS * ZZALRIS + ZZALC3 * ZZALRIS * ZZALRIS * ZZALRIS) / 1000000000;

                                    // AI5
                                    let ZZALAI5 = Math.PI * ZZALDIS * ZZALHS / 1000000;

                                    // AO5
                                    let ZZALAO5 = Math.PI * ZZALDOS * ZZALHS / 1000000;

                                    // VI5
                                    let ZZALVI5 = Math.PI / 4 * ZZALDIS * ZZALDIS * ZZALHS / 1000000000;

                                    // VO5
                                    let ZZALVO5 = Math.PI / 4 * ZZALDOS * ZZALDOS * ZZALHS / 1000000000;

                                    // AI
                                    let ZZALAI = ZZALAI1 + ZZALAI2 + ZZALAI3 + ZZALAI4 + ZZALAI5;
                                    $("#ZZALAI").html(ZZALAI.toFixed(4));

                                    // AO
                                    let ZZALAO = ZZALAO1 + ZZALAO2 + ZZALAO3 + ZZALAO4 + ZZALAO5;
                                    $("#ZZALAO").html(ZZALAO.toFixed(4));

                                    // VI
                                    let ZZALVI = ZZALVI1 + ZZALVI2 + ZZALVI3 + ZZALVI4 + ZZALVI5;
                                    $("#ZZALVI").html(ZZALVI.toFixed(4));

                                    // VO
                                    let ZZALVO = ZZALVO1 + ZZALVO2 + ZZALVO3 + ZZALVO4 + ZZALVO5;

                                    // V
                                    let ZZALV = ZZALVO - ZZALVI;

                                    // HO
                                    let ZZALHO = ((ZZALDIB - ZZALDIS) / 2 - (1 - Math.cos(ZZALRAD)) * (ZZALRIB + ZZALRIS + ZZALTHKN)) / Math.tan(ZZALRAD) + (ZZALRIB + ZZALRIS + ZZALTHKN) * Math.sin(ZZALRAD) + ZZALHB + ZZALHS;
                                    $("#ZZALHO").html(ZZALHO.toFixed(1));

                                    // M
                                    let ZZALDVAL = $("#ZZALD").val();
                                    if (ZZALDVAL.length > 0 && !isNaN(parseFloat(ZZALDVAL)) && parseFloat(ZZALDVAL) > 0) {
                                        let ZZALD = parseFloat(ZZALDVAL);

                                        let ZZALM = ZZALV * ZZALD;
                                        $("#ZZALM").html(ZZALM.toFixed(2));

                                    }

                                    // FR
                                    let ZZALTHKMVAL = $("#ZZALTHKM").val();
                                    if (ZZALTHKMVAL.length > 0 && !isNaN(parseFloat(ZZALTHKMVAL)) && parseFloat(ZZALTHKMVAL) >= ZZALTHKN) {
                                        let ZZALTHKM = parseFloat(ZZALTHKMVAL);

                                        let ZZALFRB = 75 * ZZALTHKM / ZZALRIB;
                                        $("#ZZALFRB").html(ZZALFRB.toFixed(2));

                                        let ZZALFRS = 75 * ZZALTHKM / ZZALRIS;
                                        $("#ZZALFRS").html(ZZALFRS.toFixed(2));
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