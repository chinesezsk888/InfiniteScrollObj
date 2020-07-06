
function InfiniteScrollObj(config) {
    this.scrollStatus = config.status || true
    this.scrollDistance = config.distance || 50
    this.callback = config.callback
    this.init()
}
//获取滚动条当前的位置
InfiniteScrollObj.prototype.getScrollTop = function() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}
//获取当前可视范围的高度
InfiniteScrollObj.prototype.getClientHeight = function() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
}
//获取文档完整的高度
InfiniteScrollObj.prototype.getScrollHeight = function() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}
InfiniteScrollObj.prototype.init = function() {
    var that = this
    $(window).scroll(function() {
        if(that.scrollStatus) {
            if (that.getScrollTop() + that.getClientHeight() >= that.getScrollHeight()-that.scrollDistance) {
                that.callback
            }
        }
    })
}