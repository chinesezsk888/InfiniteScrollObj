function wapPullUpMore(el,url,num) {
    //分别设置滑动距离，开始位置，结束位置，和模拟数据的定时器, 节流处理
    // let disY, startY, endY, timer, t;
    var definedNum 
    if(num) {
        definedNum = num
    }else {
        definedNum = 20
    }
    var type = false
    var g_pageidx = 1;
    //获取滚动条当前的位置
    function getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }
    //获取当前可视范围的高度
    function getClientHeight() {
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
        } else {
            clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        }
        return clientHeight;
    }
    //获取文档完整的高度
    function getScrollHeight() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }
    // 发送请求
    function sendAjax () {
        var lastTime = $(".newspath").attr("lastTime");
        var lastEle = el.children('div').last()
        if (lastEle != null && lastEle.hasClass("newspath")) {
            g_pageidx = parseInt(lastEle.attr("pageIndex"));
            console.log(g_pageidx)
            lastTime = lastEle.attr("lastTime");
        }
        var n_pageidx = g_pageidx + 1;
        // 删除上一次下拉刷新新增的newspath
        el.children('div').last().remove()
        // el.children('p').last().remove()
        $.ajax({
            type: "get",
            url: url,
            data: "nodeids=26468&topCids=1272947&pageidx=" + n_pageidx + "&lastTime=" + lastTime + "&mrd=" + Math.random(),
            timeout: 30000,
            dataType: "html",
            success: function (dataHtml) {
                if(dataHtml) {
                    var jsonObj = JSON.parse(dataHtml)
                    console.log(jsonObj)
                    el.append(jsonObj.html);
                }else {
                    $("#more_bt").html("已经到底")
                }
            },
            error: function (XMLHttpRequest, textStatus,
                             errorThrown) {
               console.log("加载失败")
            }
        });
    }
    //滚动事件触发
    window.onscroll = function () {
        // 节流处理
        var timeId = null
        if (type === true) return;
        type = true;
        timeId = setTimeout(() => {
            if (getScrollTop() + getClientHeight() >= getScrollHeight()-definedNum) {
                sendAjax()
            }
            type = false;
            clearTimeout(timeId);
        }, 500)
    }
}
function loadnextpage(){
    
    if($("#more_bt").attr("data-disabled")=="false"){
      return;
    }

    $("#more_bt").attr("data-disabled","false");
    g_pageidx = parseInt($("#loadnextpage").prev(".newspath").attr("pageIndex"));
    var hasUserCount = parseInt($("#loadnextpage").prev(".newspath").attr("hasUserCount"));
    var n_pageidx = g_pageidx + 1;
    $("#more_bt").html("加载中...");
    $.ajax({
        type:"get",
        url:nextpageUrl,
        data:"pageidx=" + n_pageidx + "&hasUserCount=" + hasUserCount + "&category=${fn:escapeXml(category)}&sort=${fn:escapeXml(sort)}&topCids=${filterIds}&mrd=" + Math.random(),
        timeout:30000,
        dataType:"html",
        success:function(dataHtml){
            $("#more_bt").attr("data-disabled","true");
            if(dataHtml.indexOf("user_bd")>-1){
                $("#loadnextpage").before(dataHtml);
                $("#more_bt").html("加载更多…");
                ppstore.setItem("localAskIndexKeys",$("#ask_ulist").html());
            } 
            else if (dataHtml.indexOf("newspath")>-1 && dataHtml.indexOf("user_bd")<0) {
                $("#more_bt").html("已经到底");
            } else {
                $("#more_bt").html("加载出错，请重新点击加载");
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        $("#more_bt").attr("data-disabled","true");
            $("#more_bt").html("加载失败，请重新点击加载");
        }
    });
    
}