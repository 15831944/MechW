$(document).ready(function () {

    //绑定change事件
    $(document).on("change", "#ZACASelector", function () {
        let ZACASelectorVal = $("#ZACASelector").val();

        let ZACAToxicityTr = $("#ZACAToxicityTr");
        let ZACAExplosionTr = $("#ZACAExplosionTr");
        let ZACASearch = $("#ZACASearch");
        let ZACASketch = $("#ZACASketch");
        let ZACAToxicity = $("#ZACAToxicity");
        let ZACAExplosion = $("#ZACAExplosion");

        ZACAToxicityTr.css("display", "none");
        ZACAToxicity.val("ZACANone");
        ZACAExplosionTr.css("display", "none");
        ZACAExplosion.val("ZACANone");
        ZACASearch.css("display", "none");
        $("#ZACASearchContent").val("");
        ZACASketch.empty().attr("rowspan", "2");
        $(".ZACAResult").remove();

        if (ZACASelectorVal === "ZACASearch") {

            ZACASketch.attr("rowspan", "3").html("&ensp;注：\"_\"匹配任意单个字符，\"%\"匹配任意多个字符(包括零个)，留空列出全部。");
            ZACASearch.css("display", "table-row");

            // 搜索按钮 Ajax 事件
            $("#ZACASearchButton").off("click").on("click", function () {

                $(".ZACAResult").remove();
                $("#ZACAError").remove();

                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "hg_20660_2000_search.action",
                    async: true,
                    dataType: "json",
                    data: JSON.stringify({
                        "name": $("#ZACASearchContent").val()
                    }),
                    beforeSend: function () {
                        $("#ZACATBody").append('<tr id="ZACAWait"><td colspan="12" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                            '<i class=\'fa fa-spinner fa-spin fa-2x fa-fw\'></i>' +
                            '</td></tr>');
                    },
                    success: function (result) {
                        $("#ZACAWait").remove();
                        let itemName, itemToxicity, itemExplosion;
                        $.each(result, function (i, item) {
                            itemName = item.name;
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
                            $("#ZACATBody").append('<tr class="ZACAResult">' +
                                '<td colspan="3" valign="middle" style="color:#18bc9c;border-color:black;">' + '&ensp;' + itemName + '</td>' +
                                '<td colspan="2" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' + itemToxicity + '</td>' +
                                '<td colspan="2" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' + itemExplosion + '</td>' +
                                '<td colspan="5" valign="middle" style="color:#18bc9c;border-color:black;">' + '&ensp;' + item.from + '</td>' +
                                '</tr>');
                        });
                        if ($(".ZACAResult").length <= 0) {
                            $("#ZACATBody").append('<tr class="ZACAResult"><td colspan="12" align="center" valign="middle" style="color:#18bc9c;border-color:black;">搜索结果为空！</td></tr>');
                        }
                    },
                    error: function () {
                        $("#ZACAWait").remove();
                        $("#ZACATBody").append('<tr id="ZACAError"><td colspan="12" align="center" valign="middle" style="color:red;border-color:black;">' +
                            '数据获取失败，请重试' +
                            '</td></tr>');
                    }
                });

            });

        }
        else if (ZACASelectorVal === "ZACABrowse") {

            ZACASketch.attr("rowspan", "4");
            ZACAToxicityTr.css("display", "table-row");
            ZACAExplosionTr.css("display", "table-row");

            // 分类浏览
            $("#ZACAToxicity, #ZACAExplosion").off("change").on("change", function () {

                $(".ZACAResult").remove();
                $("#ZACAError").remove();

                let toxicity = $("#ZACAToxicity").val(),
                    explosion = $("#ZACAExplosion").val();

                if ((toxicity !== "ZACANone") && (explosion !== "ZACANone")) {

                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "hg_20660_2000_browser.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "toxicity": toxicity,
                            "explosion": explosion
                        }),
                        beforeSend: function () {
                            $("#ZACATBody").append('<tr id="ZACAWait"><td colspan="12" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' +
                                '<i class=\'fa fa-spinner fa-spin fa-2x fa-fw\'></i>' +
                                '</td></tr>');
                        },
                        success: function (result) {
                            $("#ZACAWait").remove();
                            let itemName, itemToxicity, itemExplosion;
                            $.each(result, function (i, item) {
                                itemName = item.name;
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
                                $("#ZACATBody").append('<tr class="ZACAResult">' +
                                    '<td colspan="3" valign="middle" style="color:#18bc9c;border-color:black;">' + '&ensp;' + itemName + '</td>' +
                                    '<td colspan="2" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' + itemToxicity + '</td>' +
                                    '<td colspan="2" align="center" valign="middle" style="color:#18bc9c;border-color:black;">' + itemExplosion + '</td>' +
                                    '<td colspan="5" valign="middle" style="color:#18bc9c;border-color:black;">' + '&ensp;' + item.from + '</td>' +
                                    '</tr>');
                            });
                        },
                        error: function () {
                            $("#ZACAWait").remove();
                            $("#ZACATBody").append('<tr id="ZACAError"><td colspan="12" align="center" valign="middle" style="color:red;border-color:black;">' +
                                '数据获取失败，请重试' +
                                '</td></tr>');
                        }
                    });
                }

            });

        }
    });
});