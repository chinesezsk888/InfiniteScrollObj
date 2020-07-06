function wapPullUpMore(el,url,status,distance,callback) {
    var scrollStatus =  status || false
    var scrollDistance = distance || 50
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
            beforeSend:function() {
                scrollStatus = true
            },
            success: function (dataHtml) {
                if(dataHtml) {
                    scrollStatus = false
                    var jsonObj = JSON.parse(dataHtml)
                    console.log(jsonObj)
                    el.append(jsonObj.html);
                }else {
                    scrollStatus = true
                    $("#more_bt").html("已经到底")
                }
            },
            error: function (XMLHttpRequest, textStatus,
                             errorThrown) {
               console.log("加载失败")
            }
        });
    }
    $(window).scroll(function() {
        if(!scrollStatus) {
            if (getScrollTop() + getClientHeight() >= getScrollHeight()-scrollDistance) {
                sendAjax()
            }
        }else {
            return false
        }
    })
}