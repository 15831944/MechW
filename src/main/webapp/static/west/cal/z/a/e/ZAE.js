$(document).ready(function () {

    $("#cal").html("<ul id='zae'></ul>");

    let currentContentID = null;
    let center = $("#center");
    let south = $("#south");

    $.getJSON("/static/west/cal/z/a/e/ZAE.json", function (result) {
        $('#zae').tree({
            data: result,
            animate: true,
            lines: true,
            formatter: function (node) {

                let s = node.text;
                if (node.children) {
                    s += "&ensp;<span style='color:deepskyblue'>(" + node.children.length + ")</span>";
                }
                return s;
            },
            onClick: function (node) {

                let num = parseInt(node.id.substring(4));

                if (num !== 1
                    && num !== 11
                    && num !== 112
                    && num !== 1122
                    && num !== 12
                    && num !== 124
                    && num !== 127
                    && num !== 13
                    && num !== 132
                    && num !== 1321
                    && num !== 1322
                    && num !== 135
                    && num !== 138
                    && num !== 139
                    && num !== 1310
                    && num !== 1311
                    && num !== 14
                    && num !== 141
                    && num !== 142
                    && num !== 1423
                    && num !== 1424
                    && num !== 143
                    && num !== 144
                    && num !== 1410
                    && num !== 14106
                    && num !== 15
                    && num !== 152
                    && num !== 156
                    && num !== 16
                    && num !== 17
                    && num !== 18) {

                    if (currentContentID !== node.id) {

                        center.mCustomScrollbar("destroy");
                        center.empty();
                        south.empty();
                        let url = "/static/west/cal/z/a/e/html/" + node.id + ".html";
                        $.ajax({
                            type: "GET",
                            contentType: "application/html; charset=utf-8",
                            url: url,
                            async: true,
                            beforeSend: function () {
                                center.html(
                                    "<div style='display:table;height:100%;width:100%'>" +
                                    "<h3 style='display:table-cell;vertical-align:middle;text-align:center;'>" +
                                    "<i class='fa fa-spinner fa-spin fa-2x fa-fw'></i>" +
                                    "</h3>" +
                                    "</div>");
                                south.html("<i class='fa fa-spinner fa-pulse fa-fw' style='color:#18bc9c;'></i>" +
                                    "<span style='color:#18bc9c;'>&ensp;&ensp;数据获取中</span>");
                            },
                            success: function (result) {
                                center.html(result).mCustomScrollbar({theme: "minimal-dark"});
                                south.html("<i class='fa fa-check' style='color:#18bc9c;'></i>" +
                                    "<span style='color:#18bc9c;'>&ensp;&ensp;数据获取成功</span>");
                            },
                            error: function () {
                                center.html(
                                    "<div style='display:table;height:100%;width:100%'>" +
                                    "<h3 style='display:table-cell;vertical-align:middle;text-align:center;color:red'>" +
                                    "数据加载失败，请检查网络稍后重试！" +
                                    "</h3>" +
                                    "</div>");
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;&ensp;数据获取失败，请检查网络后重试</span>");
                            }
                        });
                    } else {

                    }
                } else {
                    center.mCustomScrollbar("destroy");
                    center.empty();
                    south.empty();
                }
                currentContentID = node.id;
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({
                    theme: "minimal-dark",
                    axis: "yx"
                });
            }
        });
    });
});