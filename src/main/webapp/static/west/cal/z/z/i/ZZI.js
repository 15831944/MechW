$(document).ready(function () {

    /**
     * 长度
     */
    $(document).on("focus", "input.ZZIA", function () {
        $("input.ZZIA").val("");
    });
    $(document).on("input propertychange", "#ZZIAM", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIAM = parseFloat($(this).val());
            $("#ZZIAIN").val((ZZIAM * 39.3701).toFixed(4));
            $("#ZZIAFT").val((ZZIAM * 3.28084).toFixed(5));
            $("#ZZIAYD").val((ZZIAM * 1.09361).toFixed(5));
            $("#ZZIAMILE").val((ZZIAM * 6.21371).toFixed(5) + "×10⁻⁴");
            $("#ZZIANMILE").val((ZZIAM * 5.39957).toFixed(5) + "×10⁻⁴");
        }
    });
    $(document).on("input propertychange", "#ZZIAIN", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIAIN = parseFloat($(this).val());
            $("#ZZIAM").val((ZZIAIN * 0.0254).toFixed(4));
            $("#ZZIAFT").val((ZZIAIN * 0.0833333).toFixed(7));
            $("#ZZIAYD").val((ZZIAIN * 0.0277778).toFixed(7));
            $("#ZZIAMILE").val((ZZIAIN * 1.57828).toFixed(5) + "×10⁻⁵");
            $("#ZZIANMILE").val((ZZIAIN * 1.37149).toFixed(5) + "×10⁻⁵");
        }
    });
    $(document).on("input propertychange", "#ZZIAFT", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIAFT = parseFloat($(this).val());
            $("#ZZIAM").val((ZZIAFT * 0.3048).toFixed(4));
            $("#ZZIAIN").val(ZZIAFT * 12);
            $("#ZZIAYD").val((ZZIAFT * 0.333333).toFixed(6));
            $("#ZZIAMILE").val((ZZIAFT * 1.89394).toFixed(5) + "×10⁻⁴");
            $("#ZZIANMILE").val((ZZIAFT * 1.64579).toFixed(5) + "×10⁻⁴");
        }
    });
    $(document).on("input propertychange", "#ZZIAYD", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIAYD = parseFloat($(this).val());
            $("#ZZIAM").val((ZZIAYD * 0.9144).toFixed(4));
            $("#ZZIAIN").val(ZZIAYD * 36);
            $("#ZZIAFT").val(ZZIAYD * 3);
            $("#ZZIAMILE").val((ZZIAYD * 5.68182).toFixed(5) + "×10⁻⁴");
            $("#ZZIANMILE").val((ZZIAYD * 4.93737).toFixed(5) + "×10⁻⁴");
        }
    });
    $(document).on("input propertychange", "#ZZIAMILE", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIAMILE = parseFloat($(this).val());
            $("#ZZIAM").val((ZZIAMILE * 1609.344).toFixed(3));
            $("#ZZIAIN").val(ZZIAMILE * 63360);
            $("#ZZIAFT").val(ZZIAMILE * 5280);
            $("#ZZIAYD").val(ZZIAMILE * 1760);
            $("#ZZIANMILE").val((ZZIAMILE * 0.868976).toFixed(6));
        }
    });
    $(document).on("input propertychange", "#ZZIANMILE", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIANMILE = parseFloat($(this).val());
            $("#ZZIAM").val(ZZIANMILE * 1852);
            $("#ZZIAIN").val(ZZIANMILE * 72913.4);
            $("#ZZIAFT").val((ZZIANMILE * 6076.12).toFixed(2));
            $("#ZZIAYD").val((ZZIANMILE * 2025.37).toFixed(2));
            $("#ZZIAMILE").val((ZZIANMILE * 1.15078).toFixed(5));
        }
    });


    /**
     * 面积
     */
    $(document).on("focus", "input.ZZIB", function () {
        $("input.ZZIB").val("");
    });
    $(document).on("input propertychange", "#ZZIBM2", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIBM2 = parseFloat($(this).val());
            $("#ZZIBIN2").val((ZZIBM2 * 1550.00).toFixed(2));
            $("#ZZIBFT2").val((ZZIBM2 * 10.7639).toFixed(4));
            $("#ZZIBYD2").val((ZZIBM2 * 1.19599).toFixed(5));
            $("#ZZIBMILE2").val((ZZIBM2 * 3.86102).toFixed(5) + "×10⁻⁷");
            $("#ZZIBHM2").val(ZZIBM2 + "×10⁻⁴");
        }
    });
    $(document).on("input propertychange", "#ZZIBIN2", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIBIN2 = parseFloat($(this).val());
            $("#ZZIBM2").val((ZZIBIN2 * 6.4516).toFixed(4) + "×10⁻⁴");
            $("#ZZIBFT2").val((ZZIBIN2 * 6.94444).toFixed(5) + "×10⁻³");
            $("#ZZIBYD2").val((ZZIBIN2 * 7.71605).toFixed(5) + "×10⁻⁴");
            $("#ZZIBMILE2").val((ZZIBIN2 * 2.49098).toFixed(5) + "×10⁻¹⁰");
            $("#ZZIBHM2").val((ZZIBIN2 * 6.4516).toFixed(4) + "×10⁻⁸");
        }
    });
    $(document).on("input propertychange", "#ZZIBFT2", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIBFT2 = parseFloat($(this).val());
            $("#ZZIBM2").val((ZZIBFT2 * 0.0929030).toFixed(7));
            $("#ZZIBIN2").val(ZZIBFT2 * 144);
            $("#ZZIBYD2").val((ZZIBFT2 * 0.111111).toFixed(6));
            $("#ZZIBMILE2").val((ZZIBFT2 * 3.58701).toFixed(5) + "×10⁻⁸");
            $("#ZZIBHM2").val((ZZIBFT2 * 9.29030).toFixed(5) + "×10⁻⁵");
        }
    });
    $(document).on("input propertychange", "#ZZIBYD2", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIBYD2 = parseFloat($(this).val());
            $("#ZZIBM2").val((ZZIBYD2 * 0.836127).toFixed(6));
            $("#ZZIBIN2").val(ZZIBYD2 * 1296);
            $("#ZZIBFT2").val(ZZIBYD2 * 9);
            $("#ZZIBMILE2").val((ZZIBYD2 * 3.22831).toFixed(5) + "×10⁻⁷");
            $("#ZZIBHM2").val((ZZIBYD2 * 8.36127).toFixed(5) + "×10⁻⁵");
        }
    });
    $(document).on("input propertychange", "#ZZIBMILE2", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIBMILE2 = parseFloat($(this).val());
            $("#ZZIBM2").val((ZZIBMILE2 * 2.58999).toFixed(5) + "×10⁶");
            $("#ZZIBIN2").val((ZZIBMILE2 * 4.01449).toFixed(5) + "×10⁹");
            $("#ZZIBFT2").val((ZZIBMILE2 * 2.78784).toFixed(5) + "×10⁷");
            $("#ZZIBYD2").val((ZZIBMILE2 * 3.09760).toFixed(5) + "×10⁶");
            $("#ZZIBHM2").val((ZZIBMILE2 * 2.58999).toFixed(5) + "×10²");
        }
    });
    $(document).on("input propertychange", "#ZZIBHM2", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIBHM2 = parseFloat($(this).val());
            $("#ZZIBM2").val(ZZIBHM2 + "×10⁴");
            $("#ZZIBIN2").val((ZZIBHM2 * 1.55000).toFixed(5) + "×10⁷");
            $("#ZZIBFT2").val((ZZIBHM2 * 1.07639).toFixed(5) + "×10⁵");
            $("#ZZIBYD2").val((ZZIBHM2 * 1.19599).toFixed(5) + "×10⁴");
            $("#ZZIBMILE2").val((ZZIBHM2 * 3.86102).toFixed(5) + "×10⁻³");
        }
    });

    /**
     * 体积
     */
    $(document).on("focus", "input.ZZIC", function () {
        $("input.ZZIC").val("");
    });
    $(document).on("input propertychange", "#ZZICM3", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZICM3 = parseFloat($(this).val());
            $("#ZZICDM3").val(ZZICM3 * 1000);
            $("#ZZICIN3").val(ZZICM3 * 61023.7);
            $("#ZZICFT3").val((ZZICM3 * 35.3147).toFixed(4));
            $("#ZZICYD3").val((ZZICM3 * 1.30795).toFixed(5));
            $("#ZZICUKGAL").val((ZZICM3 * 219.969).toFixed(3));
            $("#ZZICUSGAL").val((ZZICM3 * 264.172).toFixed(3));
        }
    });
    $(document).on("input propertychange", "#ZZICDM3", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZICDM3 = parseFloat($(this).val());
            $("#ZZICM3").val((ZZICDM3 * 0.001).toFixed(3));
            $("#ZZICIN3").val((ZZICDM3 * 61.0237).toFixed(4));
            $("#ZZICFT3").val((ZZICDM3 * 0.0353147).toFixed(7));
            $("#ZZICYD3").val((ZZICDM3 * 1.30795).toFixed(5) + "×10⁻³");
            $("#ZZICUKGAL").val((ZZICDM3 * 0.219969).toFixed(6));
            $("#ZZICUSGAL").val((ZZICDM3 * 0.264172).toFixed(6));
        }
    });
    $(document).on("input propertychange", "#ZZICIN3", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZICIN3 = parseFloat($(this).val());
            $("#ZZICM3").val((ZZICIN3 * 0.16387064).toFixed(8) + "×10⁻⁴");
            $("#ZZICDM3").val((ZZICIN3 * 1.6387064).toFixed(7) + "×10⁻²");
            $("#ZZICFT3").val((ZZICIN3 * 5.78704).toFixed(5) + "×10⁻⁴");
            $("#ZZICYD3").val((ZZICIN3 * 2.14335).toFixed(5) + "×10⁻⁵");
            $("#ZZICUKGAL").val((ZZICIN3 * 3.60465).toFixed(5) + "×10⁻³");
            $("#ZZICUSGAL").val((ZZICIN3 * 4.32900).toFixed(5) + "×10⁻³");
        }
    });
    $(document).on("input propertychange", "#ZZICFT3", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZICFT3 = parseFloat($(this).val());
            $("#ZZICM3").val((ZZICFT3 * 0.0283168).toFixed(7));
            $("#ZZICDM3").val((ZZICFT3 * 28.3168).toFixed(4));
            $("#ZZICIN3").val(ZZICFT3 * 1728);
            $("#ZZICYD3").val((ZZICFT3 * 0.0370370).toFixed(7));
            $("#ZZICUKGAL").val((ZZICFT3 * 6.22883).toFixed(5));
            $("#ZZICUSGAL").val((ZZICFT3 * 7.48052).toFixed(5));
        }
    });
    $(document).on("input propertychange", "#ZZICYD3", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZICYD3 = parseFloat($(this).val());
            $("#ZZICM3").val((ZZICYD3 * 0.764555).toFixed(6));
            $("#ZZICDM3").val((ZZICYD3 * 764.555).toFixed(3));
            $("#ZZICIN3").val(ZZICYD3 * 46656);
            $("#ZZICFT3").val(ZZICYD3 * 27);
            $("#ZZICUKGAL").val((ZZICYD3 * 168.178557).toFixed(6));
            $("#ZZICUSGAL").val((ZZICYD3 * 201.974026).toFixed(6));
        }
    });
    $(document).on("input propertychange", "#ZZICUKGAL", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZICUKGAL = parseFloat($(this).val());
            $("#ZZICM3").val((ZZICUKGAL * 4.54609).toFixed(5) + "×10⁻³");
            $("#ZZICDM3").val((ZZICUKGAL * 4.54609).toFixed(5));
            $("#ZZICIN3").val((ZZICUKGAL * 277.420).toFixed(3));
            $("#ZZICFT3").val((ZZICUKGAL * 0.160544).toFixed(6));
            $("#ZZICYD3").val((ZZICUKGAL * 5.9461).toFixed(4) + "×10⁻³");
            $("#ZZICUSGAL").val((ZZICUKGAL * 1.20095).toFixed(5));
        }
    });
    $(document).on("input propertychange", "#ZZICUSGAL", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZICUSGAL = parseFloat($(this).val());
            $("#ZZICM3").val((ZZICUSGAL * 3.78541).toFixed(5) + "×10⁻³");
            $("#ZZICDM3").val((ZZICUSGAL * 3.78541).toFixed(5));
            $("#ZZICIN3").val(ZZICUSGAL * 231);
            $("#ZZICFT3").val((ZZICUSGAL * 0.133681).toFixed(6));
            $("#ZZICYD3").val((ZZICUSGAL * 4.95114).toFixed(5) + "×10⁻³");
            $("#ZZICUKGAL").val((ZZICUSGAL * 0.832674).toFixed(6));
        }
    });

    /**
     * 质量
     */
    $(document).on("focus", "input.ZZID", function () {
        $("input.ZZID").val("");
    });
    $(document).on("input propertychange", "#ZZIDT", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIDT = parseFloat($(this).val());
            $("#ZZIDKG").val(ZZIDT + "×10³");
            $("#ZZIDG").val(ZZIDT + "×10⁶");
            $("#ZZIDTON").val((ZZIDT * 0.984207).toFixed(6));
            $("#ZZIDUSTON").val((ZZIDT * 1.10231).toFixed(5));
            $("#ZZIDLB").val((ZZIDT * 2204.62).toFixed(2));
            $("#ZZIDOZ").val((ZZIDT * 35274.0).toFixed(0));
            $("#ZZIDSJ").val(ZZIDT * 2 + "×10³");
            $("#ZZIDSL").val(ZZIDT * 2 + "×10⁴");
        }
    });
    $(document).on("input propertychange", "#ZZIDKG", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIDKG = parseFloat($(this).val());
            $("#ZZIDT").val(ZZIDKG + "×10⁻³");
            $("#ZZIDG").val(ZZIDKG + "×10³");
            $("#ZZIDTON").val((ZZIDKG * 9.84207).toFixed(5) + "×10⁻⁴");
            $("#ZZIDUSTON").val((ZZIDKG * 1.10231).toFixed(5) + "×10⁻³");
            $("#ZZIDLB").val((ZZIDKG * 2.20462).toFixed(5));
            $("#ZZIDOZ").val((ZZIDKG * 35.2740).toFixed(4));
            $("#ZZIDSJ").val(ZZIDKG * 2);
            $("#ZZIDSL").val(ZZIDKG * 20);
        }
    });
    $(document).on("input propertychange", "#ZZIDG", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIDG = parseFloat($(this).val());
            $("#ZZIDT").val(ZZIDG + "×10⁻⁶");
            $("#ZZIDKG").val(ZZIDG + "×10⁻³");
            $("#ZZIDTON").val((ZZIDG * 9.84207).toFixed(5) + "×10⁻⁷");
            $("#ZZIDUSTON").val((ZZIDG * 1.10231).toFixed(5) + "×10⁻⁶");
            $("#ZZIDLB").val((ZZIDG * 2.20462).toFixed(5) + "×10⁻³");
            $("#ZZIDOZ").val((ZZIDG * 0.0352740).toFixed(7));
            $("#ZZIDSJ").val(ZZIDG * 2 + "×10⁻³");
            $("#ZZIDSL").val(ZZIDG * 2 + "×10⁻²");
        }
    });
    $(document).on("input propertychange", "#ZZIDTON", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIDTON = parseFloat($(this).val());
            $("#ZZIDT").val((ZZIDTON * 1.01605).toFixed(5));
            $("#ZZIDKG").val((ZZIDTON * 1016.05).toFixed(2));
            $("#ZZIDG").val((ZZIDTON * 1.01605).toFixed(5) + "×10⁶");
            $("#ZZIDUSTON").val((ZZIDTON * 1.12).toFixed(2));
            $("#ZZIDLB").val(ZZIDTON * 2240);
            $("#ZZIDOZ").val(ZZIDTON * 35840);
            $("#ZZIDSJ").val((ZZIDTON * 2032.1).toFixed(1));
            $("#ZZIDSL").val(ZZIDTON * 20321);
        }
    });
    $(document).on("input propertychange", "#ZZIDUSTON", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIDUSTON = parseFloat($(this).val());
            $("#ZZIDT").val((ZZIDUSTON * 0.907185).toFixed(6));
            $("#ZZIDKG").val((ZZIDUSTON * 907.185).toFixed(3));
            $("#ZZIDG").val((ZZIDUSTON * 9.07185).toFixed(5) + "×10⁵");
            $("#ZZIDTON").val((ZZIDUSTON * 0.892857).toFixed(6));
            $("#ZZIDLB").val(ZZIDUSTON * 2000);
            $("#ZZIDOZ").val(ZZIDUSTON * 32000);
            $("#ZZIDSJ").val((ZZIDUSTON * 1814.37).toFixed(2));
            $("#ZZIDSL").val((ZZIDUSTON * 18143.7).toFixed(1));
        }
    });
    $(document).on("input propertychange", "#ZZIDLB", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIDLB = parseFloat($(this).val());
            $("#ZZIDT").val((ZZIDLB * 4.5359237).toFixed(7) + "×10⁻⁴");
            $("#ZZIDKG").val((ZZIDLB * 0.45359237).toFixed(8));
            $("#ZZIDG").val((ZZIDLB * 453.59237).toFixed(5));
            $("#ZZIDTON").val((ZZIDLB * 4.46429).toFixed(5) + "×10⁻⁴");
            $("#ZZIDUSTON").val(ZZIDLB * 5 + "×10⁻⁴");
            $("#ZZIDOZ").val(ZZIDLB * 16);
            $("#ZZIDSJ").val((ZZIDLB * 0.907184).toFixed(6));
            $("#ZZIDSL").val((ZZIDLB * 9.07184).toFixed(5));
        }
    });
    $(document).on("input propertychange", "#ZZIDOZ", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIDOZ = parseFloat($(this).val());
            $("#ZZIDT").val((ZZIDOZ * 2.83495).toFixed(5) + "×10⁻⁵");
            $("#ZZIDKG").val((ZZIDOZ * 0.0283495).toFixed(7));
            $("#ZZIDG").val((ZZIDOZ * 28.3495).toFixed(4));
            $("#ZZIDTON").val((ZZIDOZ * 2.79018).toFixed(5) + "×10⁻⁵");
            $("#ZZIDUSTON").val((ZZIDOZ * 3.125).toFixed(3) + "×10⁻⁵");
            $("#ZZIDLB").val((ZZIDOZ * 6.25).toFixed(2) + "×10⁻²");
            $("#ZZIDSJ").val((ZZIDOZ * 0.056699).toFixed(6));
            $("#ZZIDSL").val((ZZIDOZ * 0.56699).toFixed(5));
        }
    });
    $(document).on("input propertychange", "#ZZIDSJ", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIDSJ = parseFloat($(this).val());
            $("#ZZIDT").val(ZZIDSJ * 0.5 + "×10⁻³");
            $("#ZZIDKG").val(ZZIDSJ * 0.5);
            $("#ZZIDG").val(ZZIDSJ * 5 + "×10²");
            $("#ZZIDTON").val((ZZIDSJ * 4.921).toFixed(3) + "×10⁻⁴");
            $("#ZZIDUSTON").val((ZZIDSJ * 5.5116).toFixed(4) + "×10⁻⁴");
            $("#ZZIDLB").val((ZZIDSJ * 1.10231).toFixed(5));
            $("#ZZIDOZ").val((ZZIDSJ * 17.6370).toFixed(4));
            $("#ZZIDSL").val(ZZIDSJ * 10);
        }
    });
    $(document).on("input propertychange", "#ZZIDSL", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIDSL = parseFloat($(this).val());
            $("#ZZIDT").val(ZZIDSL * 0.5 + "×10⁻⁴");
            $("#ZZIDKG").val((ZZIDSL * 0.05).toFixed(2));
            $("#ZZIDG").val(ZZIDSL * 50);
            $("#ZZIDTON").val((ZZIDSL * 4.921).toFixed(3) + "×10⁻⁵");
            $("#ZZIDUSTON").val((ZZIDSL * 5.5116).toFixed(4) + "×10⁻⁵");
            $("#ZZIDLB").val((ZZIDSL * 0.110231).toFixed(6));
            $("#ZZIDOZ").val((ZZIDSL * 1.76370).toFixed(5));
            $("#ZZIDSJ").val(ZZIDSL * 0.1);
        }
    });

    /**
     * 密度
     */
    $(document).on("focus", "input.ZZIE", function () {
        $("input.ZZIE").val("");
    });
    $(document).on("input propertychange", "#ZZIEKGM3", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIEKGM3 = parseFloat($(this).val());
            $("#ZZIETM3").val((ZZIEKGM3 * 0.001).toFixed(3));
            $("#ZZIELBIN3").val((ZZIEKGM3 * 3.61273).toFixed(5) + "×10⁻⁵");
            $("#ZZIELBFT3").val((ZZIEKGM3 * 6.24280).toFixed(5) + "×10⁻²");
            $("#ZZIELBUKGAL").val((ZZIEKGM3 * 1.00224).toFixed(5) + "×10⁻²");
            $("#ZZIELBUSGAL").val((ZZIEKGM3 * 0.834540).toFixed(6) + "×10⁻²");
        }
    });
    $(document).on("input propertychange", "#ZZIETM3", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIETM3 = parseFloat($(this).val());
            $("#ZZIEKGM3").val(ZZIETM3 * 1000);
            $("#ZZIELBIN3").val((ZZIETM3 * 0.0361273).toFixed(7));
            $("#ZZIELBFT3").val((ZZIETM3 * 62.4280).toFixed(4));
            $("#ZZIELBUKGAL").val((ZZIETM3 * 10.0224).toFixed(4));
            $("#ZZIELBUSGAL").val((ZZIETM3 * 8.34540).toFixed(5));
        }
    });
    $(document).on("input propertychange", "#ZZIELBIN3", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIELBIN3 = parseFloat($(this).val());
            $("#ZZIEKGM3").val((ZZIELBIN3 * 27679.9).toFixed(1));
            $("#ZZIETM3").val((ZZIELBIN3 * 27.6799).toFixed(4));
            $("#ZZIELBFT3").val(ZZIELBIN3 * 1728);
            $("#ZZIELBUKGAL").val((ZZIELBIN3 * 277.420).toFixed(3));
            $("#ZZIELBUSGAL").val(ZZIELBIN3 * 231);
        }
    });
    $(document).on("input propertychange", "#ZZIELBFT3", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIELBFT3 = parseFloat($(this).val());
            $("#ZZIEKGM3").val((ZZIELBFT3 * 16.0185).toFixed(4));
            $("#ZZIETM3").val((ZZIELBFT3 * 0.0160185).toFixed(7));
            $("#ZZIELBIN3").val((ZZIELBFT3 * 5.78704).toFixed(5) + "×10⁻⁴");
            $("#ZZIELBUKGAL").val((ZZIELBFT3 * 0.160544).toFixed(6));
            $("#ZZIELBUSGAL").val((ZZIELBFT3 * 0.133681).toFixed(6));
        }
    });
    $(document).on("input propertychange", "#ZZIELBUKGAL", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIELBUKGAL = parseFloat($(this).val());
            $("#ZZIEKGM3").val((ZZIELBUKGAL * 99.7763).toFixed(4));
            $("#ZZIETM3").val((ZZIELBUKGAL * 0.0997763).toFixed(7));
            $("#ZZIELBIN3").val((ZZIELBUKGAL * 3.60165).toFixed(5) + "×10⁻³");
            $("#ZZIELBFT3").val((ZZIELBUKGAL * 6.22883).toFixed(5));
            $("#ZZIELBUSGAL").val((ZZIELBUKGAL * 0.832674).toFixed(6));
        }
    });
    $(document).on("input propertychange", "#ZZIELBUSGAL", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIELBUSGAL = parseFloat($(this).val());
            $("#ZZIEKGM3").val((ZZIELBUSGAL * 119.826).toFixed(3));
            $("#ZZIETM3").val((ZZIELBUSGAL * 0.110826).toFixed(6));
            $("#ZZIELBIN3").val((ZZIELBUSGAL * 4.32900).toFixed(5) + "×10⁻³");
            $("#ZZIELBFT3").val((ZZIELBUSGAL * 7.48052).toFixed(5));
            $("#ZZIELBUKGAL").val((ZZIELBUSGAL * 1.20095).toFixed(5));
        }
    });

    /**
     * 力
     */
    $(document).on("focus", "input.ZZIF", function () {
        $("input.ZZIF").val("");
    });
    $(document).on("input propertychange", "#ZZIFN", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIFN = parseFloat($(this).val());
            $("#ZZIFKGF").val((ZZIFN * 0.101972).toFixed(6));
            $("#ZZIFDYN").val(ZZIFN + "×10⁵");
            $("#ZZIFTF").val((ZZIFN * 1.01972).toFixed(5) + "×10⁻⁴");
            $("#ZZIFPDL").val((ZZIFN * 7.23301).toFixed(5));
            $("#ZZIFLBF").val((ZZIFN * 0.224809).toFixed(6));
        }
    });
    $(document).on("input propertychange", "#ZZIFKGF", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIFKGF = parseFloat($(this).val());
            $("#ZZIFN").val((ZZIFKGF * 9.80665).toFixed(5));
            $("#ZZIFDYN").val(ZZIFKGF * 980665);
            $("#ZZIFTF").val(ZZIFKGF + "×10⁻³");
            $("#ZZIFPDL").val((ZZIFKGF * 70.9316).toFixed(4));
            $("#ZZIFLBF").val((ZZIFKGF * 2.20462).toFixed(5));
        }
    });
    $(document).on("input propertychange", "#ZZIFDYN", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIFDYN = parseFloat($(this).val());
            $("#ZZIFN").val(ZZIFDYN + "×10⁻⁵");
            $("#ZZIFKGF").val((ZZIFDYN * 1.01972).toFixed(5) + "×10⁻⁶");
            $("#ZZIFTF").val((ZZIFDYN * 1.01972).toFixed(5) + "×10⁻⁹");
            $("#ZZIFPDL").val((ZZIFDYN * 7.23301).toFixed(5) + "×10⁻⁵");
            $("#ZZIFLBF").val((ZZIFDYN * 2.24809).toFixed(5) + "×10⁻⁶");
        }
    });
    $(document).on("input propertychange", "#ZZIFTF", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIFTF = parseFloat($(this).val());
            $("#ZZIFN").val((ZZIFTF * 9806.65).toFixed(2));
            $("#ZZIFKGF").val(ZZIFTF * 1000);
            $("#ZZIFDYN").val((ZZIFTF * 9.80665).toFixed(5) + "×10⁸");
            $("#ZZIFPDL").val((ZZIFTF * 70931.6).toFixed(1));
            $("#ZZIFLBF").val((ZZIFTF * 2204.62).toFixed(2));
        }
    });
    $(document).on("input propertychange", "#ZZIFPDL", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIFPDL = parseFloat($(this).val());
            $("#ZZIFN").val((ZZIFPDL * 0.138255).toFixed(6));
            $("#ZZIFKGF").val((ZZIFPDL * 0.0140981).toFixed(7));
            $("#ZZIFDYN").val((ZZIFPDL * 13825.5).toFixed(1));
            $("#ZZIFTF").val((ZZIFPDL * 1.40981).toFixed(5) + "×10⁻⁵");
            $("#ZZIFLBF").val((ZZIFPDL * 0.0310810).toFixed(7));
        }
    });
    $(document).on("input propertychange", "#ZZIFLBF", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIFLBF = parseFloat($(this).val());
            $("#ZZIFN").val((ZZIFLBF * 4.44822).toFixed(5));
            $("#ZZIFKGF").val((ZZIFLBF * 0.453592).toFixed(6));
            $("#ZZIFDYN").val(ZZIFLBF * 444822);
            $("#ZZIFTF").val((ZZIFLBF * 4.53592).toFixed(5) + "×10⁻⁴");
            $("#ZZIFPDL").val((ZZIFLBF * 32.1740).toFixed(4));
        }
    });

    /**
     * 压力
     */
    $(document).on("focus", "input.ZZIG", function () {
        $("input.ZZIG").val("");
    });
    $(document).on("input propertychange", "#ZZIGPA", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIGPA = parseFloat($(this).val());
            $("#ZZIGMPA").val(ZZIGPA + "×10⁻⁶");
            $("#ZZIGAT").val((ZZIGPA * 1.01972).toFixed(5) + "×10⁻⁵");
            $("#ZZIGLBFIN2").val((ZZIGPA * 1.45038).toFixed(5) + "×10⁻⁴");
            $("#ZZIGBAR").val(ZZIGPA + "×10⁻⁵");
            $("#ZZIGMBAR").val(ZZIGPA + "×10⁻²");
            $("#ZZIGATM").val((ZZIGPA * 9.86923).toFixed(5) + "×10⁻⁶");
            $("#ZZIGTORR").val((ZZIGPA * 7.50062).toFixed(5) + "×10⁻³");
            $("#ZZIGINH2O").val((ZZIGPA * 4.01463).toFixed(5) + "×10⁻³");
            $("#ZZIGMMHG").val((ZZIGPA * 7.50062).toFixed(5) + "×10⁻³");
            $("#ZZIGMMH2O").val((ZZIGPA * 0.101972).toFixed(6));
        }
    });
    $(document).on("input propertychange", "#ZZIGMPA", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIGMPA = parseFloat($(this).val());
            $("#ZZIGPA").val(ZZIGMPA + "×10⁶");
            $("#ZZIGAT").val((ZZIGMPA * 10.1972).toFixed(4));
            $("#ZZIGLBFIN2").val((ZZIGMPA * 145.038).toFixed(3));
            $("#ZZIGBAR").val(ZZIGMPA * 10);
            $("#ZZIGMBAR").val(ZZIGMPA + "×10⁴");
            $("#ZZIGATM").val((ZZIGMPA * 9.869233).toFixed(6));
            $("#ZZIGTORR").val((ZZIGMPA * 7500.6376).toFixed(4));
            $("#ZZIGINH2O").val((ZZIGMPA * 4014.63076).toFixed(5));
            $("#ZZIGMMHG").val((ZZIGMPA * 7500.6376).toFixed(4));
            $("#ZZIGMMH2O").val((ZZIGMPA * 101971.6213).toFixed(4));
        }
    });
    $(document).on("input propertychange", "#ZZIGAT", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIGAT = parseFloat($(this).val());
            $("#ZZIGPA").val((ZZIGAT * 9.80665).toFixed(5) + "×10⁴");
            $("#ZZIGMPA").val((ZZIGAT * 9.80665).toFixed(5) + "×10⁻²");
            $("#ZZIGLBFIN2").val((ZZIGAT * 14.2233).toFixed(4));
            $("#ZZIGBAR").val((ZZIGAT * 0.980665).toFixed(6));
            $("#ZZIGMBAR").val((ZZIGAT * 980.665).toFixed(3));
            $("#ZZIGATM").val((ZZIGAT * 0.967841).toFixed(6));
            $("#ZZIGTORR").val((ZZIGAT * 735.559).toFixed(3));
            $("#ZZIGINH2O").val((ZZIGAT * 393.7008).toFixed(4));
            $("#ZZIGMMHG").val((ZZIGAT * 735.559).toFixed(3));
            $("#ZZIGMMH2O").val(ZZIGAT + "×10⁴");
        }
    });
    $(document).on("input propertychange", "#ZZIGLBFIN2", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIGLBFIN2 = parseFloat($(this).val());
            $("#ZZIGPA").val((ZZIGLBFIN2 * 6.89476).toFixed(5) + "×10³");
            $("#ZZIGMPA").val((ZZIGLBFIN2 * 6.89476).toFixed(5) + "×10⁻³");
            $("#ZZIGAT").val((ZZIGLBFIN2 * 0.0703070).toFixed(7));
            $("#ZZIGBAR").val((ZZIGLBFIN2 * 0.0689476).toFixed(7));
            $("#ZZIGMBAR").val((ZZIGLBFIN2 * 68.9476).toFixed(4));
            $("#ZZIGATM").val((ZZIGLBFIN2 * 0.068046).toFixed(6));
            $("#ZZIGTORR").val((ZZIGLBFIN2 * 51.7149).toFixed(4));
            $("#ZZIGINH2O").val((ZZIGLBFIN2 * 27.6799).toFixed(4));
            $("#ZZIGMMHG").val((ZZIGLBFIN2 * 51.7149).toFixed(4));
            $("#ZZIGMMH2O").val((ZZIGLBFIN2 * 703.07216).toFixed(5));
        }
    });
    $(document).on("input propertychange", "#ZZIGBAR", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIGBAR = parseFloat($(this).val());
            $("#ZZIGPA").val(ZZIGBAR + "×10⁵");
            $("#ZZIGMPA").val(ZZIGBAR * 0.1);
            $("#ZZIGAT").val((ZZIGBAR * 1.01972).toFixed(5));
            $("#ZZIGLBFIN2").val((ZZIGBAR * 14.5038).toFixed(4));
            $("#ZZIGMBAR").val(ZZIGBAR + "×10³");
            $("#ZZIGATM").val((ZZIGBAR * 0.986923).toFixed(6));
            $("#ZZIGTORR").val((ZZIGBAR * 750.062).toFixed(3));
            $("#ZZIGINH2O").val((ZZIGBAR * 401.463).toFixed(3));
            $("#ZZIGMMHG").val((ZZIGBAR * 750.062).toFixed(3));
            $("#ZZIGMMH2O").val((ZZIGBAR * 10197.16213).toFixed(5));
        }
    });
    $(document).on("input propertychange", "#ZZIGMBAR", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIGMBAR = parseFloat($(this).val());
            $("#ZZIGPA").val(ZZIGMBAR * 100);
            $("#ZZIGMPA").val(ZZIGMBAR + "×10⁻⁴");
            $("#ZZIGAT").val((ZZIGMBAR * 1.01972).toFixed(5) + "×10⁻³");
            $("#ZZIGLBFIN2").val((ZZIGMBAR * 0.0145038).toFixed(7));
            $("#ZZIGBAR").val(ZZIGMBAR * 0.001);
            $("#ZZIGATM").val((ZZIGMBAR * 9.86923).toFixed(5) + "×10⁻⁴");
            $("#ZZIGTORR").val((ZZIGMBAR * 0.750062).toFixed(6));
            $("#ZZIGINH2O").val((ZZIGMBAR * 0.401463).toFixed(6));
            $("#ZZIGMMHG").val((ZZIGMBAR * 0.750062).toFixed(6));
            $("#ZZIGMMH2O").val((ZZIGMBAR * 10.197162).toFixed(6));
        }
    });
    $(document).on("input propertychange", "#ZZIGATM", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIGATM = parseFloat($(this).val());
            $("#ZZIGPA").val((ZZIGATM * 101325.0).toFixed(1));
            $("#ZZIGMPA").val((ZZIGATM * 0.101325).toFixed(6));
            $("#ZZIGAT").val((ZZIGATM * 1.03323).toFixed(5));
            $("#ZZIGLBFIN2").val((ZZIGATM * 14.6959).toFixed(4));
            $("#ZZIGBAR").val((ZZIGATM * 1.01325).toFixed(5));
            $("#ZZIGMBAR").val(ZZIGATM * 1013250);
            $("#ZZIGTORR").val(ZZIGATM * 760);
            $("#ZZIGINH2O").val((ZZIGATM * 406.782462).toFixed(6));
            $("#ZZIGMMHG").val(ZZIGATM * 760);
            $("#ZZIGMMH2O").val((ZZIGATM * 10332.2745).toFixed(4));
        }
    });
    $(document).on("input propertychange", "#ZZIGTORR", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIGTORR = parseFloat($(this).val());
            $("#ZZIGPA").val((ZZIGTORR * 133.322).toFixed(3));
            $("#ZZIGMPA").val((ZZIGTORR * 1.33322).toFixed(5) + "×10⁻⁴");
            $("#ZZIGAT").val((ZZIGTORR * 1.35951).toFixed(5) + "×10⁻³");
            $("#ZZIGLBFIN2").val((ZZIGTORR * 0.0193368).toFixed(7));
            $("#ZZIGBAR").val((ZZIGTORR * 1.33322).toFixed(5) + "×10⁻³");
            $("#ZZIGMBAR").val((ZZIGTORR * 1.33322).toFixed(5));
            $("#ZZIGATM").val((ZZIGTORR * 1.31579).toFixed(5) + "×10⁻³");
            $("#ZZIGINH2O").val((ZZIGTORR * 0.535239).toFixed(6));
            $("#ZZIGMMHG").val(ZZIGTORR);
            $("#ZZIGMMH2O").val((ZZIGTORR * 13.5951).toFixed(4));
        }
    });
    $(document).on("input propertychange", "#ZZIGINH2O", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIGINH2O = parseFloat($(this).val());
            $("#ZZIGPA").val((ZZIGINH2O * 249.089).toFixed(3));
            $("#ZZIGMPA").val((ZZIGINH2O * 2.49089).toFixed(5) + "×10⁻⁴");
            $("#ZZIGAT").val((ZZIGINH2O * 2.54).toFixed(2) + "×10⁻³");
            $("#ZZIGLBFIN2").val((ZZIGINH2O * 0.036127).toFixed(6));
            $("#ZZIGBAR").val((ZZIGINH2O * 2.49089).toFixed(5) + "×10⁻³");
            $("#ZZIGMBAR").val((ZZIGINH2O * 2.49089).toFixed(5));
            $("#ZZIGATM").val((ZZIGINH2O * 2.458).toFixed(3) + "×10⁻³");
            $("#ZZIGTORR").val((ZZIGINH2O * 1.86832).toFixed(5));
            $("#ZZIGMMHG").val((ZZIGINH2O * 1.86832).toFixed(5));
            $("#ZZIGMMH2O").val((ZZIGINH2O * 25.4).toFixed(1));
        }
    });
    $(document).on("input propertychange", "#ZZIGMMHG", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIGMMHG = parseFloat($(this).val());
            $("#ZZIGPA").val((ZZIGMMHG * 133.322).toFixed(3));
            $("#ZZIGMPA").val((ZZIGMMHG * 1.33322).toFixed(5) + "×10⁻⁴");
            $("#ZZIGAT").val((ZZIGMMHG * 1.35951).toFixed(5) + "×10⁻³");
            $("#ZZIGLBFIN2").val((ZZIGMMHG * 0.0193368).toFixed(7));
            $("#ZZIGBAR").val((ZZIGMMHG * 1.33322).toFixed(5) + "×10⁻³");
            $("#ZZIGMBAR").val((ZZIGMMHG * 1.33322).toFixed(5));
            $("#ZZIGATM").val((ZZIGMMHG * 1.31579).toFixed(5) + "×10⁻³");
            $("#ZZIGTORR").val(ZZIGMMHG);
            $("#ZZIGINH2O").val((ZZIGMMHG * 0.535239).toFixed(6));
            $("#ZZIGMMH2O").val((ZZIGMMHG * 13.5951).toFixed(4));
        }
    });
    $(document).on("input propertychange", "#ZZIGMMH2O", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIGMMH2O = parseFloat($(this).val());
            $("#ZZIGPA").val((ZZIGMMH2O * 9.80665).toFixed(5));
            $("#ZZIGMPA").val(ZZIGMMH2O + "×10⁻⁵");
            $("#ZZIGAT").val(ZZIGMMH2O + "×10⁻⁴");
            $("#ZZIGLBFIN2").val((ZZIGMMH2O * 1.42233).toFixed(5) + "×10⁻³");
            $("#ZZIGBAR").val((ZZIGMMH2O * 9.80665).toFixed(5) + "×10⁻⁵");
            $("#ZZIGMBAR").val((ZZIGMMH2O * 0.098067).toFixed(6));
            $("#ZZIGATM").val((ZZIGMMH2O * 0.967841).toFixed(6));
            $("#ZZIGTORR").val((ZZIGMMH2O * 0.0736).toFixed(4));
            $("#ZZIGINH2O").val((ZZIGMMH2O * 3.281).toFixed(3) + "×10⁻³");
            $("#ZZIGMMHG").val((ZZIGMMH2O * 0.0736).toFixed(4));
        }
    });

    /**
     * ZZIH 温度
     */
    $(document).on("focus", "input.ZZIH", function () {
        $("input.ZZIH").val("");
    });
    $(document).on("input propertychange", "#ZZIHC", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIHC = parseFloat($(this).val());
            $("#ZZIHK").val((ZZIHC + 273.15).toFixed(2));
            $("#ZZIHF").val((ZZIHC * 1.8 + 32).toFixed(2));
            $("#ZZIHRA").val((ZZIHC * 1.8 + 32 + 459.67).toFixed(2));
            $("#ZZIHR").val((ZZIHC * 0.8).toFixed(2));
        }
    });
    $(document).on("input propertychange", "#ZZIHK", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIHK = parseFloat($(this).val());
            $("#ZZIHC").val((ZZIHK - 273.15).toFixed(2));
            $("#ZZIHF").val((ZZIHK * 1.8 - 459.67).toFixed(2));
            $("#ZZIHRA").val((ZZIHK * 1.8).toFixed(2));
            $("#ZZIHR").val(((ZZIHK - 273.15) * 0.8).toFixed(2));
        }
    });
    $(document).on("input propertychange", "#ZZIHF", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIHF = parseFloat($(this).val());
            $("#ZZIHC").val(((ZZIHF - 32) / 1.8).toFixed(2));
            $("#ZZIHK").val(((ZZIHF + 459.67) / 1.8).toFixed(2));
            $("#ZZIHRA").val((ZZIHF + 459.67).toFixed(2));
            $("#ZZIHR").val(((ZZIHF - 32) / 2.25).toFixed(2));
        }
    });
    $(document).on("input propertychange", "#ZZIHRA", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIHRA = parseFloat($(this).val());
            $("#ZZIHC").val(((ZZIHRA - 32 - 459.67) / 1.8).toFixed(2));
            $("#ZZIHK").val((ZZIHRA / 1.8).toFixed(2));
            $("#ZZIHF").val((ZZIHRA - 459.67).toFixed(2));
            $("#ZZIHR").val(((ZZIHRA - 459.67 - 32) / 2.25).toFixed(2));
        }
    });
    $(document).on("input propertychange", "#ZZIHR", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIHR = parseFloat($(this).val());
            $("#ZZIHC").val((ZZIHR * 1.25).toFixed(2));
            $("#ZZIHK").val((ZZIHR * 1.25 + 273.15).toFixed(2));
            $("#ZZIHF").val((ZZIHR * 2.25 + 32).toFixed(2));
            $("#ZZIHRA").val((ZZIHR * 2.25 + 32 + 459.67).toFixed(2));
        }
    });

    /**
     * ZZII 风速风压
     */
    // 风速换算
    $(document).on("focus", "input.ZZIIA", function () {
        $("input.ZZIIA").val("");
    });
    $(document).on("input propertychange", "#ZZIIAMS", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIIAMS = parseFloat($(this).val());
            $("#ZZIIAKMH").val((ZZIIAMS * 3.6).toFixed(2));
        }
    });
    $(document).on("input propertychange", "#ZZIIAKMH", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIIAKMH = parseFloat($(this).val());
            $("#ZZIIAMS").val((ZZIIAKMH / 3.6).toFixed(2));
        }
    });

    // 风速变风压
    $(document).on("input propertychange", "input.ZZIIB", function () {
        let ZZIIBMSVal = $("#ZZIIBMS").val();
        if (ZZIIBMSVal.length > 0 && !isNaN(parseFloat(ZZIIBMSVal))) {
            let ZZIIBMS = parseFloat(ZZIIBMSVal);
            let ZZIIBMVal = $("#ZZIIBM").val();
            if (ZZIIBMVal.length > 0 && !isNaN(parseFloat(ZZIIBMVal))) {
                let ZZIIBM = parseFloat(ZZIIBMVal);
                let ZZIIBPA = 0.5 * 1.25 * Math.pow(Math.E, -0.0001 * ZZIIBM) * ZZIIBMS * ZZIIBMS;
                $("#ZZIIBPA").html(ZZIIBPA.toFixed(2));
            }
        }
    });

    // 风压变风速
    $(document).on("input propertychange", "input.ZZIIC", function () {
        let ZZIICPAVal = $("#ZZIICPA").val();
        if (ZZIICPAVal.length > 0 && !isNaN(parseFloat(ZZIICPAVal))) {
            let ZZIICPA = parseFloat(ZZIICPAVal);
            let ZZIICMVal = $("#ZZIICM").val();
            if (ZZIICMVal.length > 0 && !isNaN(parseFloat(ZZIICMVal))) {
                let ZZIICM = parseFloat(ZZIICMVal);
                let ZZIICMS = Math.sqrt((2 * ZZIICPA) / (1.25 * Math.pow(Math.E, -0.0001 * ZZIICM)));
                $("#ZZIICMS").html(ZZIICMS.toFixed(2));
            }
        }
    });

    /**
     * ZZIJ 力矩
     */
    $(document).on("focus", "input.ZZIJ", function () {
        $("input.ZZIJ").val("");
    });
    $(document).on("input propertychange", "#ZZIJNM", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIJNM = parseFloat($(this).val());
            $("#ZZIJKGFM").val((ZZIJNM * 0.101972).toFixed(6));
            $("#ZZIJPDLFT").val((ZZIJNM * 23.7304).toFixed(4));
            $("#ZZIJLBFFT").val((ZZIJNM * 0.737562).toFixed(6));
            $("#ZZIJDYNCM").val(ZZIJNM + "×10⁷");
        }
    });
    $(document).on("input propertychange", "#ZZIJKGFM", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIJKGFM = parseFloat($(this).val());
            $("#ZZIJNM").val((ZZIJKGFM * 9.80665).toFixed(5));
            $("#ZZIJPDLFT").val((ZZIJKGFM * 232.715).toFixed(3));
            $("#ZZIJLBFFT").val((ZZIJKGFM * 7.23301).toFixed(5));
            $("#ZZIJDYNCM").val((ZZIJKGFM * 9.807).toFixed(3) + "×10⁷");
        }
    });
    $(document).on("input propertychange", "#ZZIJPDLFT", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIJPDLFT = parseFloat($(this).val());
            $("#ZZIJNM").val((ZZIJPDLFT * 0.0421401).toFixed(7));
            $("#ZZIJKGFM").val((ZZIJPDLFT * 4.29710).toFixed(5) + "×10⁻³");
            $("#ZZIJLBFFT").val((ZZIJPDLFT * 0.0310810).toFixed(7));
            $("#ZZIJDYNCM").val((ZZIJPDLFT * 421401.24).toFixed(2));
        }
    });
    $(document).on("input propertychange", "#ZZIJLBFFT", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIJLBFFT = parseFloat($(this).val());
            $("#ZZIJNM").val((ZZIJLBFFT * 1.35582).toFixed(5));
            $("#ZZIJKGFM").val((ZZIJLBFFT * 0.138255).toFixed(6));
            $("#ZZIJPDLFT").val((ZZIJLBFFT * 32.1740).toFixed(4));
            $("#ZZIJDYNCM").val((ZZIJLBFFT * 1.356).toFixed(3) + "×10⁷");
        }
    });
    $(document).on("input propertychange", "#ZZIJDYNCM", function () {
        if ($(this).val().length > 0 && !isNaN(parseFloat($(this).val()))) {
            let ZZIJDYNCM = parseFloat($(this).val());
            $("#ZZIJNM").val(ZZIJDYNCM + "×10⁻⁷");
            $("#ZZIJKGFM").val((ZZIJDYNCM * 1.020).toFixed(3) + "×10⁻⁸");
            $("#ZZIJPDLFT").val((ZZIJDYNCM * 2.373).toFixed(3) + "×10⁻⁶");
            $("#ZZIJLBFFT").val((ZZIJDYNCM * 0.7376).toFixed(4) + "×10⁻⁷");
        }
    });
});