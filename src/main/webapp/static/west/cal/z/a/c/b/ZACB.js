$(document).ready(function () {

    //绑定change事件
    $(document).on("change", "#ZACBSelector", function () {
        let ZACBSelectorVal = $("#ZACBSelector").val();

        let ZACBToxicityTr = $("#ZACBToxicityTr");
        let ZACBExplosionTr = $("#ZACBExplosionTr");
        let ZACBSearch = $("#ZACBSearch");
        let ZACBSketch = $("#ZACBSketch");
        let ZACBToxicity = $("#ZACBToxicity");
        let ZACBExplosion = $("#ZACBExplosion");

        ZACBToxicityTr.css("display", "none");
        ZACBToxicity.val("ZACBNone");
        ZACBExplosionTr.css("display", "none");
        ZACBExplosion.val("ZACBNone");
        ZACBSearch.css("display", "none");
        $("#ZACBSearchContent").val("");
        ZACBSketch.empty().attr("rowspan", "2");
        $(".ZACBResult").remove();

        if (ZACBSelectorVal === "ZACBSearch") {

            ZACBSketch.attr("rowspan", "3").html("&ensp;注：\"_\"匹配任意单个字符，\"%\"匹配任意多个字符(包括零个)，留空列出全部。");
            ZACBSearch.css("display", "table-row");

            // 搜索按钮 Ajax 事件
            $("#ZACBSearchButton").off("click").on("click", function () {

                $(".ZACBResult").remove();
                $("#ZACBError").remove();

                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "hgt_20660_2017_search.action",
                    async: true,
                    dataType: "json",
                    data: JSON.stringify({
                        "name": $("#ZACBSearchContent").val()
                    }),
                    beforeSend: function () {
                        $("#ZACBTBody").append('<tr id="ZACBWait"><td colspan="24" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            '<i class=\'fa fa-spinner fa-spin fa-2x fa-fw\'></i>' +
                            '</td></tr>');
                    },
                    success: function (result) {
                        $("#ZACBWait").remove();
                        let itemNameChn, itemAliases, itemNameEn, itemFormula, itemToxicity, itemExplosion, itemRemarks,
                            itemFrom;
                        $.each(result, function (i, item) {

                            itemNameChn = item.nameChn;

                            if (item.aliases === undefined) {
                                itemAliases = "";
                            } else {
                                itemAliases = item.aliases;
                            }

                            if (item.nameEn === undefined) {
                                itemNameEn = "";
                            } else {
                                itemNameEn = item.nameEn;
                            }

                            if (item.formula === undefined) {
                                itemFormula = "";
                            } else {
                                let oldStr = item.formula;
                                let tempChar;
                                let newStr = "";
                                for (let i = 0; i < oldStr.length; i++) {
                                    tempChar = oldStr.charAt(i);
                                    if (isNaN(tempChar)) {
                                        newStr = newStr + tempChar;
                                    } else {
                                        newStr = newStr + "<sub>" + tempChar + "</sub>";
                                    }
                                }
                                itemFormula = newStr;
                            }

                            if (item.toxicity === undefined) {
                                itemToxicity = "/";
                            } else {
                                itemToxicity = item.toxicity;
                            }

                            if (item.explosion === undefined) {
                                itemExplosion = "/";
                            } else {
                                itemExplosion = item.explosion;
                            }

                            if (item.remarks === undefined) {
                                itemRemarks = "";
                            } else {
                                itemRemarks = item.remarks;
                            }

                            if (item.from === undefined) {
                                itemFrom = "";
                            } else {
                                itemFrom = item.from;
                            }

                            $("#ZACBTBody").append('<tr class="ZACBResult">' +
                                '<td colspan="3" valign="middle" style="padding-left:6px;color:#18bc9c;border-color:black;">' + itemNameChn + '</td>' +
                                '<td colspan="3" valign="middle" style="padding-left:6px;color:#18bc9c;border-color:black;">' + itemAliases + '</td>' +
                                '<td colspan="4" valign="middle" style="padding-left:6px;color:#18bc9c;border-color:black;">' + itemNameEn + '</td>' +
                                '<td colspan="5" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' + itemFormula + '</td>' +
                                '<td colspan="2" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' + itemToxicity + '</td>' +
                                '<td colspan="3" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' + itemExplosion + '</td>' +
                                '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' + itemRemarks + '</td>' +
                                '<td colspan="3" valign="middle" style="padding-left:6px;color:#18bc9c;border-color:black;">' + itemFrom + '</td>' +
                                '</tr>');
                        });
                        if ($(".ZACBResult").length <= 0) {
                            $("#ZACBTBody").append('<tr class="ZACBResult"><td colspan="24" align="center" valign="middle" style="color:#18bc9c;border-color:black;">搜索结果为空！</td></tr>');
                        }
                    },
                    error: function () {
                        $("#ZACBWait").remove();
                        $("#ZACBTBody").append('<tr id="ZACBError"><td colspan="24" align="center" valign="middle" style="color:red;border-color:black;">' +
                            '数据获取失败，请重试' +
                            '</td></tr>');
                    }
                });

            });

        }
        else if (ZACBSelectorVal === "ZACBBrowse") {

            ZACBSketch.attr("rowspan", "4");
            ZACBToxicityTr.css("display", "table-row");
            ZACBExplosionTr.css("display", "table-row");

            // 分类浏览
            $("#ZACBToxicity, #ZACBExplosion").off("change").on("change", function () {

                $(".ZACBResult").remove();
                $("#ZACBError").remove();

                let toxicity = $("#ZACBToxicity").val(),
                    explosion = $("#ZACBExplosion").val();

                if ((toxicity !== "ZACBNone") && (explosion !== "ZACBNone")) {

                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "hgt_20660_2017_browser.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "toxicity": toxicity,
                            "explosion": explosion
                        }),
                        beforeSend: function () {
                            $("#ZACBTBody").append('<tr id="ZACBWait"><td colspan="24" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                                '<i class=\'fa fa-spinner fa-spin fa-2x fa-fw\'></i>' +
                                '</td></tr>');
                        },
                        success: function (result) {
                            $("#ZACBWait").remove();
                            let itemNameChn, itemAliases, itemNameEn, itemFormula, itemToxicity, itemExplosion,
                                itemRemarks, itemFrom;
                            $.each(result, function (i, item) {

                                itemNameChn = item.nameChn;

                                if (item.aliases === undefined) {
                                    itemAliases = "";
                                } else {
                                    itemAliases = item.aliases;
                                }

                                if (item.nameEn === undefined) {
                                    itemNameEn = "";
                                } else {
                                    itemNameEn = item.nameEn;
                                }

                                if (item.formula === undefined) {
                                    itemFormula = "";
                                } else {
                                    let oldStr = item.formula;
                                    let tempChar;
                                    let newStr = "";
                                    for (let i = 0; i < oldStr.length; i++) {
                                        tempChar = oldStr.charAt(i);
                                        if (isNaN(tempChar)) {
                                            newStr = newStr + tempChar;
                                        } else {
                                            newStr = newStr + "<sub>" + tempChar + "</sub>";
                                        }
                                    }
                                    itemFormula = newStr;
                                }

                                if (item.toxicity === undefined) {
                                    itemToxicity = "/";
                                } else {
                                    itemToxicity = item.toxicity;
                                }

                                if (item.explosion === undefined) {
                                    itemExplosion = "/";
                                } else {
                                    itemExplosion = item.explosion;
                                }

                                if (item.remarks === undefined) {
                                    itemRemarks = "";
                                } else {
                                    itemRemarks = item.remarks;
                                }

                                if (item.from === undefined) {
                                    itemFrom = "";
                                } else {
                                    itemFrom = item.from;
                                }

                                $("#ZACBTBody").append('<tr class="ZACBResult">' +
                                    '<td colspan="3" valign="middle" style="padding-left:6px;color:#18bc9c;border-color:black;">' + itemNameChn + '</td>' +
                                    '<td colspan="3" valign="middle" style="padding-left:6px;color:#18bc9c;border-color:black;">' + itemAliases + '</td>' +
                                    '<td colspan="4" valign="middle" style="padding-left:6px;color:#18bc9c;border-color:black;">' + itemNameEn + '</td>' +
                                    '<td colspan="5" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' + itemFormula + '</td>' +
                                    '<td colspan="2" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' + itemToxicity + '</td>' +
                                    '<td colspan="3" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' + itemExplosion + '</td>' +
                                    '<td colspan="1" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' + itemRemarks + '</td>' +
                                    '<td colspan="3" valign="middle" style="padding-left:6px;color:#18bc9c;border-color:black;">' + itemFrom + '</td>' +
                                    '</tr>');
                            });
                            if ($(".ZACBResult").length <= 0) {
                                $("#ZACBTBody").append('<tr class="ZACBResult"><td colspan="24" align="center" valign="middle" style="color:#18bc9c;border-color:black;">搜索结果为空！</td></tr>');
                            }
                        },
                        error: function () {
                            $("#ZACBWait").remove();
                            $("#ZACBTBody").append('<tr id="ZACBError"><td colspan="24" align="center" valign="middle" style="color:red;border-color:black;">' +
                                '数据获取失败，请重试' +
                                '</td></tr>');
                        }
                    });
                }

            });

        }
    });
});