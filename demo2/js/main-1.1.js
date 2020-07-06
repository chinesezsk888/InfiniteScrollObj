/**/
pubUrl = "/wap/comment.msp";
favUrl = "/wap/addFavorite.msp";
traceUrl = "/wap/addTrack.msp";
priseUrl = "/wap/commentPraise.msp";
cancelFavUrl = "/wap/deleteFavorite.msp";

var getPics;
var flag = 1;
var flagA = 1;
var totalIdsArr = [];
var bqfReg = new RegExp("[\ud83c-\ud83d]");  //琛ㄦ儏绗﹀彿
var useragent = navigator.userAgent.toLowerCase();
//var httpProtocol = 'https:' == document.location.protocol ? 'https://': 'http://'; 
var localProtocol = document.location.protocol;
var httpProtocol = '//';
var backUrl = document.referrer; //history.back();
var host = httpProtocol + window.location.host; //"thepaper"
var host2 = document.domain;
function goback() {
    if (backUrl != "" && backUrl.indexOf(host) == 0) {
        if (useragent.indexOf("360browser") > -1) {
            window.history.back().reload();
            window.setTimeout(function () { window.location.href = backUrl; }, 600);
        } else {
            window.history.back();
            window.setTimeout(function () { window.location.href = backUrl; }, 600);
        }
    } else {
        window.location = httpProtocol + '139.196.248.235:8089/wap/v3/jsp/index.jsp';
    }
}

function ToTencent(title, picUrl, type) {
    //var _t = encodeURI(title);
    var objectType = 1;
    var pp = encodeURI("鎴戣婢庢箖");
    if (type == 2) {
        var _t = encodeURI("銆愭編婀冧笓棰橈細" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");//涓撻
    } else if (type == 3) {
        var _t = encodeURI("銆愭編婀冪洿鎾細" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");//鐩存挱
    } else if (type == 4) {
        var _t = encodeURI("銆愭編婀冨浘闆嗭細" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");//鍥鹃泦
    } else if (type == 5) {
        var _t = encodeURI("銆愭編婀冮棶鍚э細" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");//闂惂
        objectType = 3;
    } else if (type == 6) {//鍗＄墖椤靛垎浜�
        var _t = encodeURI("銆愭編婀冭棰戯細" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");//闂惂
    } else if (type == 7) {
        var _t = encodeURI("銆愭編婀冮棶鏀匡細" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");
    } else if (type == 8) {
        var _t = encodeURI("銆愭編婀冮棶鏀跨洿鎾細" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");
    } else if (type == 9) {
        var _t = encodeURI("銆愭箖瀹㈡柊闂伙細" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");
    } else if (type == 10) {
        var _t = encodeURI("銆愭編婀冨獟浣撳彿锛�" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");
    } else {
        var _t = encodeURI("銆愭編婀冩柊闂伙細" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");
    }

    var docUrl = document.location;
    if (type == 6 || !isVliving(docUrl)) {
        docUrl = getVideoCardHref();
    }
    addShareCounts(docUrl, "TENCENT", "weibo", objectType);
    var _url = encodeURIComponent(docUrl);
    var _appkey = encodeURI("801495950");//浣犱粠鑵捐鑾峰緱鐨刟ppkey
    var pic = localProtocol + picUrl;
    var _pic = encodeURI(pic);//锛堜緥濡傦細var _pic='鍥剧墖url1|鍥剧墖url2|鍥剧墖url3....锛�
    var _site = '';//浣犵殑缃戠珯鍦板潃
    var _u = 'http://v.t.qq.com/share/share.php?url=' + _url + '&appkey=' + _appkey + '&site=' + _site + '&pic=' + _pic + '&title=' + _t + '%23' + pp + '%23';
    window.open(_u, '', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no');
}

function ToSina(title, picUrl, type) {
    //var _t = encodeURI(title);
    var objectType = 1;
    var pp = encodeURI("鎴戣婢庢箖");
    if (type == 2) {
        var _t = encodeURI("銆愭編婀冧笓棰橈細" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");
    } else if (type == 3) {
        var _t = encodeURI("銆愭編婀冪洿鎾細" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");
    } else if (type == 4) {
        var _t = encodeURI("銆愭編婀冨浘闆嗭細" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");
    } else if (type == 5) {
        var _t = encodeURI("銆愭編婀冮棶鍚э細" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");
        objectType = 3;
    } else if (type == 6) {//鍗＄墖椤靛垎浜�
        var _t = encodeURI("銆愭編婀冭棰戯細" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");
    } else if (type == 7) {
        var _t = encodeURI("銆愭編婀冮棶鏀匡細" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");
    } else if (type == 8) {
        var _t = encodeURI("銆愭編婀冮棶鏀跨洿鎾細" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");
    } else if (type == 9) {
        var _t = encodeURI("銆愭編婀冩箖瀹細" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");
    } else if (type == 10) {
        var _t = encodeURI("銆愭編婀冨獟浣撳彿锛�" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");
    } else {
        var _t = encodeURI("銆愭編婀冩柊闂伙細" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");
    }

    var docUrl = document.location;
    if (type == 6 || !isVliving(docUrl)) {
        docUrl = getVideoCardHref();
    }
    addShareCounts(docUrl, "SINA", "", objectType);
    var _url = encodeURIComponent(docUrl.toString());
    var _appkey = encodeURI("441808809");
    var pic = localProtocol + picUrl;
    var _pic = encodeURI(pic);
    var _site = '';
    var _u = 'http://service.weibo.com/share/share.php?url=' + _url + '&appkey=' + _appkey + '&pic=' + _pic + '&title=' + _t + '%23' + pp + '%23';
    window.open(_u, '', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no');
}

function Torenren(title, picUrl, description, type) {
    var objectType = 1;
    var _t = encodeURI(title);
    if (type == 2) {
        var _t2 = encodeURI("銆愭編婀冧笓棰橈細" + title + "銆�");
    } else if (type == 3) {
        var _t2 = encodeURI("銆愭編婀冪洿鎾細" + title + "銆�");
    } else if (type == 4) {
        var _t2 = encodeURI("銆愭編婀冨浘闆嗭細" + title + "銆�");
    } else if (type == 5) {
        var _t2 = encodeURI("銆愭編婀冮棶鍚э細" + title + "銆�");
        objectType = 3;
    } else if (type == 6) {//鍗＄墖椤靛垎浜�
        var _t2 = encodeURI("銆愭編婀� 瑙嗛锛�" + title + "銆�");
    } else if (type == 7) {
        var _t2 = encodeURI("銆愭編婀冮棶鏀匡細" + title + "銆�");
    } else if (type == 8) {
        var _t2 = encodeURI("銆愭編婀冮棶鏀跨洿鎾細" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");
    } else if (type == 9) {
        var _t2 = encodeURI("銆愭編婀冩箖瀹細" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");
    } else if (type == 10) {
        var _t2 = encodeURI("銆愭編婀冨獟浣撳彿锛�" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");
    } else {
        var _t2 = encodeURI("銆愭編婀冩柊闂伙細" + title + "銆�");
    }

    var docUrl = document.location;
    if (type == 6 || !isVliving(docUrl)) {
        docUrl = getVideoCardHref();
    }
    addShareCounts(docUrl, "DOUBAN", "", objectType);
    var _url = encodeURIComponent(docUrl);
    var _appkey = encodeURI("266744");
    var pic = localProtocol + picUrl;
    var _pic = encodeURI(pic);
    var _site = '';
    var _d = !description ? _t : encodeURI(description);
    var _u = 'http://www.douban.com/share/service?name=' + _t2 + '&title=' + _t2 + '&text=' + _d + '&href=' + _url + '&url=' + _url + '&image=' + _pic + '&bm=1&v=1';
    window.open(_u, '', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no');
}

function ToQzone(title, picUrl, type, summary) {
    var objectType = 1;
    var _t = encodeURI(title);
    if (type == 2) {
        var _t2 = encodeURIComponent("銆愭編婀冧笓棰橈細" + title + "銆�");
    } else if (type == 3) {
        var _t2 = encodeURIComponent("銆愭編婀冪洿鎾細" + title + "銆�");
    } else if (type == 4) {
        var _t2 = encodeURIComponent("銆愭編婀冨浘闆嗭細" + title + "銆�");
    } else if (type == 5) {
        var _t2 = encodeURIComponent("銆愭編婀冮棶鍚э細" + title + "銆�");
        objectType = 3;
    } else if (type == 6) {
        var _t2 = encodeURIComponent("銆愭編婀冭棰戯細" + title + "銆�");
    } else if (type == 7) {
        var _t2 = encodeURIComponent("銆愭編婀冮棶鏀匡細" + title + "銆�");
    } else if (type == 8) {
        var _t2 = encodeURIComponent("銆愭編婀冮棶鏀跨洿鎾細" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");
    } else if (type == 9) {
        var _t2 = encodeURIComponent(title + "_婢庢箖鏂伴椈_婀冨");
    } else if (type == 10) {
        var _t2 = encodeURI("銆愭編婀冨獟浣撳彿锛�" + title + "銆�(鍒嗕韩鑷狜婢庢箖鏂伴椈)");
    } else {
        var _t2 = encodeURIComponent("銆愭編婀冩柊闂伙細" + title + "銆�");
    }
    var docUrl = document.location;
    if (docUrl.toString().indexOf('?') == -1) {
        docUrl = docUrl.toString(); + '?from=qq';
    }
    if (type == 6 || !isVliving(docUrl)) {
        docUrl = getVideoCardHref();
        if (docUrl.indexOf('?') == -1) {
            docUrl = docUrl.toString() + '?from=qq';
        }
    }
    addShareCounts(docUrl, "TENCENT", "qzone", objectType);
    var _url = encodeURIComponent(docUrl);
    var pic = localProtocol + picUrl;
    var _pic = encodeURIComponent(pic);
    var _summary = encodeURIComponent(summary);

    var _u = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + _url + '&pics=' + _pic + '&summary=' + _summary + '&showcount=0&title=' + _t2;
    window.open(_u, '', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no');
}

function isVliving(shareUrl) {
    var channelReg = /channel_\d{1,}/;
    var listReg = /list_\d{1,}/;
    var bool = true;
    shareUrl = shareUrl.toString();
    if (shareUrl.match(channelReg) != null || shareUrl.match(listReg) != null) {
        bool = false;
    }
    return bool;
}

//鍒嗕韩缁熻 
function addShareCounts(shareUrl, weiboType, shareChannel, objectType) {	//objectType 1 鍐呭锛�2 鏀垮姟鍙凤紝3 璇濋锛�6 闂瓟
    var newsReg = /newsDetail_forward_\d{1,}/;
    var topicReg = /asktopic_detail_\d{1,}/;
    var govReg = /govAffairs_index.jsp\?govId=\d{1,}/;
    var askReg = /govQa_detail.jsp\?quesId=\d{1,}/
    var objectId = "";
    var reg = "";
    shareUrl = shareUrl.toString();
    if (shareUrl.match(newsReg) != null) {
        reg = shareUrl.match(newsReg).toString().split('_');
        objectId = reg[reg.length - 1];
        objectType = 1;
    } else if (shareUrl.match(topicReg) != null) {
        reg = shareUrl.match(topicReg).toString().split('_');
        objectId = reg[reg.length - 1];
        objectType = 3;
    } else if (shareUrl.match(govReg) != null) {
        reg = shareUrl.match(govReg).toString().split('=');
        objectId = reg[reg.length - 1];
        objectType = 2;
    } else if (shareUrl.match(askReg) != null) {
        reg = shareUrl.match(askReg).toString().split('=');
        objectId = reg[reg.length - 1];
        objectType = 6;
    }

    if (weiboType == "" || objectId == "") {
        return;
    } else {
        $.ajax({
            url: "/wap/shareLog.msp",
            data: "weiboType=" + weiboType + "&objectId=" + objectId + "&shareChannel=" + shareChannel + "&objectType=" + objectType,
            cache: false,
            success: function (html) {
            },
            failure: function (html) { }
        });
    }
}

function trim(string) {
    return string.replace(/( +)$/g, "").replace(/^( +)/g, "");
}

// 杞崲涓烘暟瀛� 
function intval(v) {
    v = parseInt(v);
    return isNaN(v) ? 0 : v;
}
// 鑾峰彇鍏冪礌淇℃伅 
function getPos(e) {
    var l = 0;
    var t = 0;
    var w = intval(e.style.width);
    var h = intval(e.style.height);
    var wb = e.offsetWidth;
    var hb = e.offsetHeight;
    while (e.offsetParent) {
        l += e.offsetLeft + (e.currentStyle ? intval(e.currentStyle.borderLeftWidth) : 0);
        t += e.offsetTop + (e.currentStyle ? intval(e.currentStyle.borderTopWidth) : 0);
        e = e.offsetParent;
    }
    l += e.offsetLeft + (e.currentStyle ? intval(e.currentStyle.borderLeftWidth) : 0);
    t += e.offsetTop + (e.currentStyle ? intval(e.currentStyle.borderTopWidth) : 0);
    return {
        x: l,
        y: t,
        w: w,
        h: h,
        wb: wb,
        hb: hb
    };
}
// 鑾峰彇婊氬姩鏉′俊鎭�   
function getScroll() {
    var t, l, w, h;
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight;
    }
    else
        if (document.body) {
            t = document.body.scrollTop;
            l = document.body.scrollLeft;
            w = document.body.scrollWidth;
            h = document.body.scrollHeight;
        }
    return {
        t: t,
        l: l,
        w: w,
        h: h
    };
}
// 閿氱偣(Anchor)闂村钩婊戣烦杞�
//el : 鐩爣閿氱偣 ID
//duration : 鎸佺画鏃堕棿锛屼互姣涓哄崟浣嶏紝瓒婂皬瓒婂揩
function scroller(el, duration) {
    if (typeof el != 'object') {
        el = document.getElementById(el);
    }
    if (!el)
        return;
    var z = this;
    z.el = el;
    z.p = getPos(el);
    z.s = getScroll();
    z.clear = function () {
        window.clearInterval(z.timer);
        z.timer = null
    };
    z.t = (new Date).getTime();
    z.step = function () {
        var t = (new Date).getTime();
        var p = (t - z.t) / duration;
        if (t >= duration + z.t) {
            z.clear();
            window.setTimeout(function () {
                z.scroll(z.p.y, z.p.x)
            }, 13);
        }
        else {
            st = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.y - z.s.t) + z.s.t;
            sl = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.x - z.s.l) + z.s.l;
            z.scroll(st, sl);
        }
    };
    z.scroll = function (t, l) {
        window.scrollTo(l, t)
    };
    z.timer = window.setInterval(function () {
        z.step();
    }, 13);
}

function pubQuestion(contid, commentType, isLogin, isatlas) {
    if (isLogin != true) {
        lgwdsshow();
        return;
    }
    var temp = $("#aswText").val();
    /*if(bqfReg.test(temp)){
        mlAlert("璇蜂笉瑕佽緭鍏ヨ〃鎯呯鍙�!")
        return;
    }*/
    var content = encodeURIComponent(temp.trim());
    $("#aswText").val("");
    if (commentType)
        $.ajax({
            type: "post",
            url: pubUrl,
            data: "c=" + contid + "&commentType=" + commentType + "&content=" + content,
            timeout: 30000,
            dataType: "json",
            success: function (data) {
                if (data.resultCode == "1") {
                    if (commentType == 2) {
                        $.ajax({
                            url: "newDetail_aq.jsp",
                            data: "contid=" + contid + "&isatlas=" + isatlas,
                            cache: false,
                            success: function (html) {
                                $("#aq_commt").html(html);
                            }
                        });
                    }
                } else {
                    if (data.resultCode == "11") {
                        mlAlert(data.resultMsg);
                        $("#aswText").val("");
                    } else {
                        mlAlert(data.resultMsg);
                        $("#aswText").val(temp);
                    }

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                mlAlert("绯荤粺鍑洪敊");
                $("#aswText").val(temp);
            }
        });
}


function pubComment(contid, commentType, isLogin) {
    if (isLogin != true) {
        lgwdsshow();
        return;
    }
    var content = $("#commText").val().trim();
    /*if(bqfReg.test(content)){
        mlAlert("璇蜂笉瑕佽緭鍏ヨ〃鎯呯鍙�!")
        return;
    }*/
    var contents = encodeURIComponent(content || '');
    $.ajax({
        type: "post",
        url: pubUrl,
        data: "c=" + contid + "&commentType=" + commentType + "&content=" + contents,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                if (commentType == 1) {
                    $.ajax({
                        url: "newDetail_commt.jsp",
                        data: "contid=" + contid,
                        cache: false,
                        success: function (html) {
                            $("#commt_list").html(html);
                        }
                    });
                    $("#commText").val("");
                }
            } else if (data.resultCode == "11") {
                mlAlert(data.resultMsg);
                $("#commText").val("");
            } else if (data.resultCode == "2") {
                lgwdsshow();
            } else {
                mlAlert(data.resultMsg);
                $("#commText").val(content);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            mlAlert("绯荤粺鍑洪敊");
            $("#commText").val(content);
        }
    });
}


function replyComment(contid, commentType, isLogin, parentId, ot) {
    if (isLogin != true) {
        lgwdsshow();
        return;
    }
    var content = $("#commText" + parentId).val().trim();
    /*if(bqfReg.test(content)){
        mlAlert("璇蜂笉瑕佽緭鍏ヨ〃鎯呯鍙�!")
        return;
    }*/
    var contents = encodeURIComponent(content);
    $.ajax({
        type: "post",
        url: pubUrl,
        data: "c=" + contid + "&commentType=" + commentType + "&content=" + contents + "&parentId=" + parentId + "&ot=" + ot,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                if (commentType == 1) {
                    $.ajax({
                        url: "newDetail_commt.jsp",
                        data: "contid=" + contid + "&ot=" + ot,
                        cache: false,
                        success: function (html) {
                            $("#commt_list").html(html);
                        }
                    });
                    $("#commText" + parentId).val("");
                } else if (commentType == 3 && ot == 3) {
                    $("#commText" + parentId).val("");
                    window.location.reload();
                }
            } else if (data.resultCode == "2") {
                lgwdsshow();
            } else if (data.resultCode == "11") {//杈撳叆鐨勫唴瀹瑰皢鍦ㄥ鏍稿悗鍙戣〃
                mlAlert(data.resultMsg);
                $("#commText" + parentId).val("");
            } else {
                mlAlert(data.resultMsg);
                $("#commText").val(content);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            mlAlert("绯荤粺鍑洪敊");
            $("#commText").val(content);
        }
    });
}

function followComment(contid, commentType, parentId) {
    var content = $("#input_text" + parentId).val().trim();
    /*if(bqfReg.test(content)){
        mlAlert("璇蜂笉瑕佽緭鍏ヨ〃鎯呯鍙�!")
        return;
    }*/
    var contents = encodeURIComponent(content);
    $.ajax({
        type: "post",
        url: pubUrl,
        data: "c=" + contid + "&commentType=" + commentType + "&content=" + contents + "&parentId=" + parentId,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                window.location.reload();
            } else if (data.resultCode == "2") {
                lgwdsshow();
            } else {
                mlAlert(data.resultMsg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            mlAlert("绯荤粺鍑洪敊");
        }
    });
}

function pubAnswer(contid, parentId, isLogin) {
    if (isLogin != true) {
        lgwdsshow();
        return;
    }
    var content = $("#input_ians" + parentId).val().trim();
    /*if(bqfReg.test(content)){
        mlAlert("璇蜂笉瑕佽緭鍏ヨ〃鎯呯鍙�!")
        return;
    }*/
    $("#input_ians" + parentId).val("");
    if (content == '') {
        mlAlert('璇疯緭鍏ヤ綘鐨勭瓟妗堬紒');
        $("#danwenti").removeAttr("style");
        return;
    }
    var contents = encodeURIComponent(content);
    $.ajax({
        type: "post",
        url: "/wap/comment.msp",
        data: "c=" + contid + "&commentType=3" + "&content=" + contents + "&parentId=" + parentId,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                $("textarea").val("");
                window.location.reload();
            } else if (data.resultCode == "2") {
                lgwdsshow();
            } else {
                if (data.resultCode == "11") {
                    mlAlert(data.resultMsg);
                    $("#input_ians" + parentId).val("");
                } else {
                    mlAlert(data.resultMsg);
                    $("#input_ians" + parentId).val(content);
                }

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            mlAlert("绯荤粺鍑洪敊");
            $("#input_ians" + parentId).val(content);
        }
    });
}

function replyanswer(contid, commentType, qeId, parentId, isLogin, ot) {
    if (isLogin != true) {
        lgwdsshow();
        return;
    }
    var content = $("#commText" + parentId).val().trim();
    if (content.length == 0) {
        mlAlert("璇疯緭鍏ヨ瘎璁哄唴瀹癸紒");
        return;
    }
    if (content.length > 800) {
        mlAlert("瀵逛笉璧凤紝璇勮涓嶈兘瓒呰繃800涓瓧绗︼紒");
        return;
    }
    var contents = encodeURIComponent(content);
    $.ajax({
        type: "post",
        url: "/wap/comment.msp",
        data: "c=" + contid + "&commentType=" + commentType + "&content=" + contents + "&quoteId=" + parentId + "&parentId=" + qeId + "&ot=" + ot,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                $("textarea").val("");
                mlAlert(data.resultMsg);
                setTimeout(function () {
                    window.location.reload();
                }, 1000)
            } else if (data.resultCode == 2) {
                lgwdsshow();
            } else {
                if (data.resultCode == 11) {
                    $("#commText" + parentId).val('');
                    $("#commText" + parentId).blur();
                }
                mlAlert(data.resultMsg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            mlAlert('瀵逛笉璧凤紝绯荤粺蹇欙紝璇风◢鍚庡啀璇曪紒');
        }
    });
}

function pubFollow(contid, commentType, parentId) {
    var content = $("#text_" + parentId).val().trim();
    /*if(bqfReg.test(content)){
        mlAlert("璇蜂笉瑕佽緭鍏ヨ〃鎯呯鍙�!")
        return;
    }*/
    var contents = encodeURIComponent(content);
    $.ajax({
        type: "post",
        url: pubUrl,
        data: "c=" + contid + "&commentType=" + commentType + "&content=" + contents + "&parentId=" + parentId,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                $("#cur_ans").removeClass("cur");
                $("#comm_span").addClass("cur");
                $.ajax({
                    url: "../jsp/newDetail_commt.jsp",
                    cache: false,
                    data: "contid=" + contid,
                    success: function (html) {
                        if (document.getElementById("news_aski") != null) {
                            document.getElementById("aq_commt").removeChild(document.getElementById("news_aski"));
                        }
                        $("#aq_commt").append(html);
                    }
                });
            } else if (data.resultCode == "2") {

                lgwdsshow();

            } else {
                mlAlert(data.resultMsg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            mlAlert("绯荤粺鍑洪敊");
        }
    });
}

function checkAswMore(commentId, recordTota) {
    var a_pagesize = 10, a_pageidx = 1, a_begin = 1, a_recordTotal = recordTota;
    if (document.getElementById("asw_more" + commentId) != null) {
        document.getElementById("hot_ans_other" + commentId).removeChild(document.getElementById("asw_more" + commentId));
        return;
    }
    $.ajax({
        url: "../jsp/newDetail_moreAq.jsp",
        data: "commentId=" + commentId + "&pagesize=" + a_pagesize + "&pageidx=" + a_pageidx,
        cache: false,
        success: function (html) {
            data = $.trim(html);
            if (data == '') {

            } else {
                var tempCount = a_recordTotal - (a_pageidx * a_pagesize);
                if (tempCount > 0) {
                    $("#hot_ans_more_other" + commentId).remove();
                    $("#hot_ans_other" + commentId).append(html);
                    $("#hot_ans_other" + commentId).append('<p class="hot_ans_more" id="hot_ans_more_other' + commentId + '"><a href="javascript:checkAswMore(' + commentId + ',' + recordTota + ')">鏌ョ湅姝ら棶棰樼殑鍙﹀' + tempCount + '涓洖绛�</a></p>');
                    a_pageidx++;
                    a_begin = 0;
                }
            }
        }
    });
}

function cancelTrack(contid, count) {
    if (contid)
        $.ajax({
            type: "post",
            url: "/wap/cancelTrack.msp",
            data: "contIds=" + contid,
            timeout: 30000,
            dataType: "json",
            success: function (data) {
                if (data.resultCode == "1") {
                    if (count > 1) {
                        $('#' + contid).remove();
                    }
                    if (count == 1) {
                        window.location.reload();
                    }
                } else if (data.resultCode == "2") {
                    lgwdsshow();
                } else {
                    mlAlert(data.resultMsg);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                mlAlert("绯荤粺鍑洪敊");
            }
        });
}

function reply(commentId) {
    if (flag == 1) {
        $("#comm_textarea" + commentId).fadeIn("slow");
        $("#comm_textarea" + commentId).style.display = "block";
        flag = 0;
        return;
    }
    $("#comm_textarea" + commentId).hide();
    flag = 1;
}

function letmeAnswer(commentId) {
    if (flagA == 1) {
        $("#ians_textarea" + commentId).fadeIn("slow");
        flagA = 0;
        return;
    }
    $("#ians_textarea" + commentId).hide();
    flagA = 1;
}

function favoriteCont2() {
    var obj = $("#shoucang");
    var contid = $('#hidden_contid').val();
    $.ajax({
        type: "post",
        url: favUrl,
        data: "c=" + contid,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1" || data.resultMsg == "閲嶅鏀惰棌") {
                obj[0].href = "javascript:cancelFavoriteCont();";
                obj.html('<img src="../img/love_big_f.png" alt="" /><span>宸叉敹钘�</span>');
            } else {
                $("#shoucang").leanModal({ closeButton: ".modal_close", title: '閿欒鎻愮ず', content: data.resultMsg });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#shoucang").leanModal({ closeButton: ".modal_close", title: '閿欒鎻愮ず', content: '绯荤粺鍑洪敊' });
        }
    });
}

function priseCommt(commentId, priseTimes) {
    if (localStorage.getItem('priseCommt' + commentId) != undefined) {
        $('#' + commentId).html('<span class="num_ask num_zan_f">' + priseTimes + '</span>');
        $("#" + commentId).removeAttr("href");
        return false
    } else {
        $('#' + commentId).html('<span class="num_ask num_zan_f">' + priseTimes + '</span>');
        $('#' + commentId).removeAttr("href");
        localStorage.setItem('priseCommt' + commentId, 'praised')
        $.ajax({
            type: "post",
            url: priseUrl,
            data: { "commentId": commentId, "origPraiseNum": priseTimes },
            timeout: 30000,
            dataType: "json",
            success: function (data) {
                if (data.resultCode == "1") {
                    $('#' + commentId).html('<span class="num_ask num_zan_f">' + data.praiseTimes + '</span>');
                } else {
                    //$("#"+commentId).leanModal({closeButton: ".modal_close",title:'閿欒鎻愮ず',content:data.resultMsg});
                    $('#' + commentId).attr("href", "javascript:priseCommt(" + commentId + "," + priseTimes + "})");
                    $('#' + commentId).html('<span class="num_ask num_zan">' + priseTimes + '</span>');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#' + commentId).attr("href", "javascript:priseCommt(" + commentId + "," + priseTimes + "})");
                $('#' + commentId).html('<span class="num_ask num_zan">' + priseTimes + '</span>');
                //$("#"+commentId).leanModal({closeButton: ".modal_close",title:'閿欒鎻愮ず',content:'绯荤粺鍑洪敊'});
            }
        });
    }

}

function priseCommtHotqa(commentId, priseTimes) {
    var id = commentId;
    var times = $('#' + commentId).text();
    if (praiseControll.get('topicAnsPraise' + id) != undefined) {
        $("#" + commentId).removeAttr("onclick");
        return false
    } else {
        $('#' + commentId).html(priseTimes + '<em class="zan"></em>');
        $('#' + commentId).addClass("cur");
        //$('#'+commentId).children("em").addClass("zan");
        $('#' + commentId).removeAttr("onclick");
        praiseControll.save('topicAnsPraise' + id, 'praised')
        $.ajax({
            type: "post",
            url: priseUrl,
            data: { "commentId": commentId, "origPraiseNum": priseTimes },
            timeout: 30000,
            dataType: "json",
            success: function (data) {
                if (data.resultCode == "1") {
                    $("#" + commentId).html(data.praiseTimes + '<em class="zan"></em>')
                    //$('#'+commentId).html("<img src='../img/ydw_zan_y.png' alt='璧�'><p>"+priseTimes+"</p>");
                    //$('#'+commentId).removeAttr("onclick");
                } else {
                    //
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //
            }
        });
    }

}

function priseHotqa(commentId, priseTimes) {

    $.ajax({
        type: "post",
        url: priseUrl,
        data: "commentId=" + commentId,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                $('#hotqa' + commentId).html('<span class="icon_love_f"></span><span class="num_love">' + data.praiseTimes + '</span>');
            } else {
                //$("#hotqa"+commentId).leanModal({closeButton: ".modal_close",title:'閿欒鎻愮ず',content:data.resultMsg});
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //$("#hotqa"+commentId).leanModal({closeButton: ".modal_close",title:'閿欒鎻愮ず',content:'绯荤粺鍑洪敊'});
        }
    });
}

function priseCommtReply(commentId, priseTimes) {
    $.ajax({
        type: "post",
        url: priseUrl,
        data: "commentId=" + commentId,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                $('#' + commentId).html('<img src="../img/love_com.png" alt="" /><span>' + data.praiseTimes + '</span><a href="javascript:reply(' + commentId + ')" id="comm_reply">鍥炲</a>');
            } else {
                //$("#"+commentId).leanModal({closeButton: ".modal_close",title:'閿欒鎻愮ず',content:data.resultMsg});
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //$("#"+commentId).leanModal({closeButton: ".modal_close",title:'閿欒鎻愮ず',content:'绯荤粺鍑洪敊'});
        }
    });
}

function prisePoint_question(commentId, priseTimes) {

    $.ajax({
        type: "post",
        url: priseUrl,
        data: { "commentId": commentId, "origPraiseNum": priseTimes },
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                $('#' + commentId).html('<img src="../img/love_com.png" alt="" /><span class="letme_ans letme_ans2">' + data.praiseTimes + '</span>');
            } else {
                $("#" + commentId).leanModal({ closeButton: ".modal_close", title: '閿欒鎻愮ず', content: data.resultMsg });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#" + commentId).leanModal({ closeButton: ".modal_close", title: '閿欒鎻愮ず', content: '绯荤粺鍑洪敊' });
        }
    });
}

function cancelFavoriteCont() {
    var obj = $("#shoucang");
    var contid = $('#hidden_contid').val();
    $.ajax({
        type: "post",
        url: "/wap/deleteFavorite.msp",
        data: "c=" + contid,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                obj[0].href = "javascript:favoriteCont2();";
                obj.html('<img src="../img/love_big.png" alt="" /><span>鏀惰棌</span>');
            } else {
                $("#shoucang").leanModal({ closeButton: ".modal_close", title: '閿欒鎻愮ず', content: data.resultMsg });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#shoucang").leanModal({ closeButton: ".modal_close", title: '閿欒鎻愮ず', content: '绯荤粺鍑洪敊' });
        }
    });
}


function voteCont() {
    var obj = $("#zan");
    var contid = $('#hidden_contid').val();
    $.ajax({
        type: "post",
        url: "/wap/addVote.msp",
        data: "contentId=" + contid,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                obj[0].href = "javascript:void(0);";
                obj.html('<img src="../img/zan_big_f.png" alt="" /><span>' + data.voteTimes + '</span>');
            } else {
                $("#zan").leanModal({ closeButton: ".modal_close", title: '閿欒鎻愮ず', content: data.resultMsg });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#zan").leanModal({ closeButton: ".modal_close", title: '閿欒鎻愮ず', content: '绯荤粺鍑洪敊' });
        }
    });
}

function voteContxq(cid, voteTimes) {
    $("#news_praise").attr("href", "javascript:void(0);");
    $("#news_praise").html('<em class="zan"></em>' + voteTimes);
    //$("#news_praise").children("em").addClass("zan");
    $.ajax({
        type: "post",
        url: "/wap/addVote.msp",
        data: "contentId=" + cid,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                //$("#news_praise").attr("href","javascript:void(0);");
                //$("#news_praise").html('<img src="../img/ydw_xqfx_zan_y.png" alt="璧�">'+data.voteTimes);  
            } else {
                //
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //
        }
    });
}

function optTopic(cid, voteTimes) {
    $("#topic_praise").attr("href", "javascript:void(0);");
    $("#topic_praise").html('<em class="zan"></em>' + voteTimes);
    //$("#topic_praise").html('<img src="../img/ydw_xqfx_zan_y.png" alt="璧�">'+voteTimes); 
    $.ajax({
        type: "post",
        url: "/wap/optTopic.msp",
        data: "topicId=" + cid + "&otype=3",
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                //$("#topic_praise").attr("href","javascript:void(0);");
                //$("#topic_praise").html('<img src="../img/ydw_xqfx_zan_y.png" alt="璧�">'+data.voteTimes);  
            } else {
                //
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //
        }
    });
}

function voteContatlas(cid) {
    $.ajax({
        type: "post",
        url: "/wap/addVote.msp",
        data: "contentId=" + cid,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                $("#news_praise").attr("href", "javascript:void(0);");
                $("#news_praise").html('<img src="../img/atlas_zan50_y.png"><p>' + data.voteTimes + '</p>');
            } else {
                //alert(data.resultMsg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //
        }
    });
}


function addAttention(commentId) {
    var obj = $("#guanzhu" + commentId);
    $.ajax({
        type: "post",
        url: "/wap/addAttention.msp",
        data: "commentId=" + commentId,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                obj[0].href = "javascript:canAttention(" + commentId + ")";
                obj.html('<span>宸插叧娉�</span>');
            } else {
                $("#guanzhu" + commentId).leanModal({ closeButton: ".modal_close", title: '閿欒鎻愮ず', content: data.resultMsg });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#guanzhu" + commentId).leanModal({ closeButton: ".modal_close", title: '閿欒鎻愮ず', content: '绯荤粺鍑洪敊' });
        }
    });
}

function canAttention(commentId) {
    var obj = $("#guanzhu" + commentId);
    $.ajax({
        type: "post",
        url: "/wap/cancelAttention.msp",
        data: "commentId=" + commentId,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                obj[0].href = "javascript:addAttention(" + commentId + ")";
                obj.html('<span>鍏虫敞</span>');
            } else {
                $("#guanzhu" + commentId).leanModal({ closeButton: ".modal_close", title: '閿欒鎻愮ず', content: data.resultMsg });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#guanzhu" + commentId).leanModal({ closeButton: ".modal_close", title: '閿欒鎻愮ず', content: '绯荤粺鍑洪敊' });
        }
    });
}

function cancelAttention(commentId) {
    $.ajax({
        type: "post",
        url: "/wap/cancelAttention.msp",
        data: "commentId=" + commentId,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                $('#' + commentId).remove();
            } else {
                alert(data.resultMsg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            mlAlert("绯荤粺鍑洪敊");
        }
    });
}

function cancelfavoriteCont(contid, count) {
    $.ajax({
        type: "post",
        url: cancelFavUrl,
        data: "c=" + contid,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                if (count > 1) {
                    $('#' + contid).remove();
                }
                if (count == 1) {
                    window.location.reload();
                }
            } else {
                $("#shoucang").leanModal({ closeButton: ".modal_close", title: '閿欒鎻愮ず', content: data.resultMsg });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("绯荤粺鍑洪敊");
        }
    });
}

function showCancelbutton(contId) {
    $('#favorites' + contId).show();
    $("#f" + contId).css({ background: "#f1f1f1" });
}

function hideCancelbutton(contId) {
    $('#favorites' + contId).hide();
    $("#f" + contId).css({ background: "none" });
}

function showShare(contId) {
    $("#cont" + contId).css({ background: "#f1f1f1" });
    $("#index" + contId).append("<div class='share_live24' id='share'><a href='' id='share_share01'></a><a href='' id='share_share02' ></a><a href='' id='share_share03'></a><span>鍒嗕韩鍒�&nbsp;&nbsp;</span></div>");
}

function removeShare(contId) {
    $("#cont" + contId).css({ background: "none" });
    $("#share").remove();
}

function showAttentionCancel(contId) {
    $('#guanzhu' + contId).show();
    $("#gz" + contId).css({ background: "#f1f1f1" });
}

function hideAttentionCancel(contId) {
    $('#guanzhu' + contId).hide();
    $("#gz" + contId).css({ background: "none" });
}

function mlAlert(str, type) {
    $("#tiptitleStr").css("lineHeight", "26px");
    $("#overlay").css('display', '').show();
    $("#tiptitle").css('display', '').show();
    $("#tiptitleStr").text(str);
    if (type == 2) {
        $("#tiptitleNO").css('display', '').show();
    }

    var tiptitleHeight = $("#tiptitleStr").height();
    if (tiptitleHeight < 46) {
        $("#tiptitleStr").css("lineHeight", "46px");
    } else {
        //$("#tiptitleStr").css("lineHeight","26px");
    }
}

function closeNotice() {
    $("#overlay").css('display', 'none').hide();
    $("#tiptitle").css('display', 'none').hide();
    $("#tiptitleNO").css('display', 'none').hide();
    $("#tiptitleStr").text("");
    $(".tiptitleOK").attr("id", "tiptitleOK");

    $(".tiptitleOK").attr("onClick", "closeNotice()");
}

function removeNotice(type, contid, index, commentId, commentType, isLogin) {
    if (isLogin == false) {
        lgwdsshow();
        return;
    }
    if (index == "") {
        index = "''";
    }

    mlAlert("鏄惁纭鍒犻櫎姝ゅ彂瑷€锛�", 2);
    $(".tiptitleOK").attr("id", "tiptitleOK_");
    $(".tiptitleOK").attr("onClick", "removeComment(" + type + "," + contid + "," + index + "," + commentId + "," + commentType + ")");
    /*
        if(window.confirm("鏄惁纭鍒犻櫎姝ゅ彂瑷€锛�")){
            removeComment(type, contid, index, commentId, commentType);
        }
    */

}

//type:1 鐑拷闂� 2 鏂拌拷闂� 3 璇勮 4 鍥炵瓟  5 璇濋杩介棶  6 璇濋鍥炵瓟
function removeComment(type, contid, index, commentId, commentType) {
    closeNotice();
    var element = "";
    var jspurl = "";

    if (type == "1") {
        jspurl = "../jsp/queryHotAnswer.jsp";
        element = "hot" + commentId + index;
    }
    else if (type == "2") {
        jspurl = "../jsp/queryNewAnswer.jsp";
        element = "new" + commentId;
    }
    else if (type == "3") {
        jspurl = "../jsp/queryCommt.jsp";
        element = "comment" + commentId;
    }
    else if (type == "4") {
        jspurl = "../jsp/queryReply.jsp";
        element = "answerId" + commentId;
    }
    else if (type == "5") {
        jspurl = "../jsp/query_ask_answered.jsp";
        element = "new" + commentId;
    }
    else if (type == "6") {
        jspurl = "../jsp/query_ask_reply.jsp";
        element = "answerId" + commentId;
    }
    else {
        return;
    }
    $.ajax({
        type: "post",
        url: removeCommentUrl,
        data: "commentIds=" + commentId + "&commentType=" + commentType,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                $("#ans_ct" + commentId).html("姝ゅ彂瑷€宸茶鐢ㄦ埛鍒犻櫎");
            } else if (data.resultCode == 2) {
                lgwdsshow();
            } else {
                mlAlert(data.resultMsg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            mlAlert("瀵逛笉璧凤紝绯荤粺蹇欙紝璇风◢鍚庡啀璇曪紒");
        }
    });

}
var currentVideoId = 0;
function getVideoCardHref() {
    var href = document.location.href;
    var ind = href.lastIndexOf("/");
    href = href.substring(0, ind) + "/newsDetail_forward_" + currentVideoId;
    return href;
}

function PaperWxShare(shareObj) {
    this.wxShareInfo = shareObj;
}
PaperWxShare.prototype.getWxSign = function () {
    if (this.wxShareInfo) {
        var shareWxObj = this;
        var requrl = "wxShare_jssdk.jsp?shareUrl=" + encodeURIComponent(this.wxShareInfo.link);
        $.getJSON(requrl, { random: Math.random() }, function (json) {
            shareWxObj.wxReady(json);
        });
    }
}
PaperWxShare.prototype.wxReady = function (data) {
    wx.config({
        debug: false,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
    });
    var title = this.wxShareInfo.title;
    var desc = this.wxShareInfo.desc;
    var link = this.wxShareInfo.link;
    if (this.wxShareInfo.img.indexOf("//") == 0) {
        var img = localProtocol + this.wxShareInfo.img;
    } else {
        var img = this.wxShareInfo.img;
    }
    var success = this.wxShareInfo.success || null;
    var type = "link";
    var dataUrl = "";
    if (this.wxShareInfo.type) { type = this.wxShareInfo.type }
    if (this.wxShareInfo.dataUrl) { dataUrl = this.wxShareInfo.dataUrl }
    wx.ready(function () {
        wx.onMenuShareAppMessage({
            title: title,
            desc: desc,
            link: link,
            imgUrl: img,
            type: type,
            dataUrl: dataUrl,
            trigger: function (res) {
            },
            success: function (res) {
                if (success) success(res);
                addShareCounts(document.location, 'WEIXIN', 'friend', '');
            },
            cancel: function (res) {
            },
            fail: function (res) {
            }
        });
        wx.onMenuShareTimeline({
            title: title,
            desc: desc,
            link: link,
            imgUrl: img,
            type: type,
            dataUrl: dataUrl,
            success: function (res) {
                // 鐢ㄦ埛纭鍒嗕韩鍚庢墽琛岀殑鍥炶皟鍑芥暟
                if (success) success(res);
                addShareCounts(document.location, 'WEIXIN', 'pengyouquan', '')
            },
            cancel: function () {
                // 鐢ㄦ埛鍙栨秷鍒嗕韩鍚庢墽琛岀殑鍥炶皟鍑芥暟
            }
        });
    });
}
PaperWxShare.prototype.doWxShare = function () {
    if (this.wxShareInfo) {
        this.getWxSign();
    }
}
function wxShare(shareInfo) {
    var paperWxShare = new PaperWxShare(shareInfo);
    paperWxShare.doWxShare();
}
function replyFloorComment(contid, commentType, isLogin, parentId, ot, txtAreaId, floor, type) {
    if (isLogin != true) {
        lgwdsshow();
        return;
    }
    var dstCommId = parentId;
    if (typeof (txtAreaId) != 'undefined') {
        dstCommId = txtAreaId;
    }
    var type = type || "";
    var content = $("#" + type + "commText" + dstCommId).val().trim();
    var ajaxBtn = $("#" + type + "commText" + dstCommId).parents(".com_writeans").find(".bt_pubans");
    ajaxBtn.attr('disabled', 'true');
	/*if(bqfReg.test(content)){
		mlAlert("璇蜂笉瑕佽緭鍏ヨ〃鎯呯鍙�!")
		return;
	}*/
    var contents = encodeURIComponent(content);
    $.ajax({
        type: "post",
        url: pubUrl,
        data: "c=" + contid + "&commentType=" + commentType + "&content=" + contents + "&parentId=" + parentId + "&ot=" + ot + "&floor=" + floor,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                if (commentType == 1) {
                    $.ajax({
                        url: "newDetail_floorCommt.jsp",
                        data: "contid=" + contid + "&ot=" + ot,
                        cache: false,
                        success: function (html) {
                            ajaxBtn.removeAttr('disabled');
                            $("#commt_list").html(html);
                        }
                    });
                    $("#commText" + parentId).val("");
                } else if (commentType == 3 && ot == 3) {
                    ajaxBtn.removeAttr('disabled');
                    $("#commText" + parentId).val("");
                    window.location.reload();
                }
            } else if (data.resultCode == "2") {
                ajaxBtn.removeAttr('disabled');
                lgwdsshow();
            } else if (data.resultCode == "11") {//杈撳叆鐨勫唴瀹瑰皢鍦ㄥ鏍稿悗鍙戣〃
                mlAlert(data.resultMsg);
                $("#commText" + parentId).val("");
            } else {
                ajaxBtn.removeAttr('disabled');
                mlAlert(data.resultMsg);
                $("#commText").val(content);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            ajaxBtn.removeAttr('disabled');
            mlAlert("绯荤粺鍑洪敊");
            $("#commText").val(content);
        }
    });
}
function priseFloorCommt(obj, floorCommentId, priseTimes) {
    if (praiseControll.get('floorCommt' + floorCommentId) != undefined) {
        $(obj).find("img").attr("src", "http://file.thepaper.cn/wap/v3/img/v3-014.png");
        $(obj).removeAttr("onclick");
        return false
    } else {
        $(obj).find("img").attr("src", "http://file.thepaper.cn/wap/v3/img/v3-014.png");
        $(obj).removeAttr("onclick");
        praiseControll.save('floorCommt' + floorCommentId, 'praised')
        $.ajax({
            type: "post",
            url: priseUrl,
            data: { "commentId": floorCommentId, "origPraiseNum": parseInt(priseTimes - 1) },
            timeout: 30000,
            dataType: "json",
            success: function (data) {
                if (data.resultCode == "1") {
                    $(obj).find("span").html(data.praiseTimes)
                } else {
                    //
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    }

}
function removeFloorNotice(type, contid, index, commentId, commentType, isLogin, parentId, hotOrNew) {
    if (isLogin == false) {
        lgwdsshow();
        return;
    }
    if (index == "") {
        index = "''";
    }
    var parId = "''";
    if (typeof (parentId) != 'undefined' && parentId != "") {
        parId = parentId;
    }
    var hotOrNew = hotOrNew || "";
    mlAlert("鏄惁纭鍒犻櫎姝ゅ彂瑷€锛�", 2);
    $(".tiptitleOK").attr("id", "tiptitleOK_");
    $(".tiptitleOK").attr("onClick", "removeFloorComment(" + type + "," + contid + "," + index + "," + commentId + "," + commentType + "," + parId + ",'" + hotOrNew + "')");
    /*
        if(window.confirm("鏄惁纭鍒犻櫎姝ゅ彂瑷€锛�")){
            removeComment(type, contid, index, commentId, commentType);
        }
    */

}
function expandFloor(commentId, type) {
    var type = type || "";
    var hiddenEle = $("#" + type + "floor_" + commentId).find(".comm_floor_main");
    console.log(hiddenEle);
    var ind = 2;
    var count = 0;
    $(hiddenEle).each(function (index, value) {
        if (index > 1 && value.style.display == 'none') {
            value.style.display = 'block';
            count++;
        }
    });
    $("#" + type + "expFloor_" + commentId).remove();
    //	if(count==0){
    //		$("#expFloor_"+commentId).find("span").html("宸插叏閮ㄥ睍寮€");
    //	}
}

function pubFloorComment(contid, commentType, isLogin) {
    if (isLogin != true) {
        if ($('.img100').length > 0) {
            $(".img100")[0].pause();
            $('#ds_tab').hide();
            lgwdsshow();

        } else {
            $('#ds_tab').hide();
            lgwdsshow();

        }
        return;
    }
    var content = $("#commText").val().trim();
    var ajaxBtn = $("#commText").parents(".com_write").find(".bt_pub");
    ajaxBtn.attr('disabled', 'true');
    /*if(bqfReg.test(content)){
        mlAlert("璇蜂笉瑕佽緭鍏ヨ〃鎯呯鍙�!")
        return;
    }*/
    var contents = encodeURIComponent(content || '');
    $.ajax({
        type: "post",
        url: pubUrl,
        data: "c=" + contid + "&commentType=" + commentType + "&content=" + contents,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                if (commentType == 1) {
                    $.ajax({
                        url: "newDetail_floorCommt.jsp",
                        data: "contid=" + contid,
                        dataType: "HTML",
                        cache: false,
                        success: function (html) {
                            ajaxBtn.removeAttr('disabled');
                            $("#commt_list").html(html);
                        }
                    });
                    $("#commText").val("");
                }
            } else if (data.resultCode == "11") {
                mlAlert(data.resultMsg);
                $("#commText").val("");
            } else if (data.resultCode == "2") {
                ajaxBtn.removeAttr('disabled');
                lgwdsshow();
            } else {
                ajaxBtn.removeAttr('disabled');
                mlAlert(data.resultMsg);
                $("#commText").val(content);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            ajaxBtn.removeAttr('disabled');
            mlAlert("绯荤粺鍑洪敊");
            $("#commText").val(content);
        }
    });
}


//type:1 鐑拷闂� 2 鏂拌拷闂� 3 璇勮 4 鍥炵瓟  5 璇濋杩介棶  6 璇濋鍥炵瓟
function removeFloorComment(type, contid, index, commentId, commentType, parentId, hotOrNew) {
    closeNotice();
    var element = "";
    var jspurl = "";
    var hotOrNew = hotOrNew || "";
    var reqComm = commentId;
    if (parentId != "") reqComm = parentId;
    if (type == "1") {
        jspurl = "../jsp/queryHotAnswer.jsp";
        element = "hot" + commentId + index;
    }
    else if (type == "2") {
        jspurl = "../jsp/queryNewAnswer.jsp";
        element = "new" + commentId;
    }
    else if (type == "3") {
        jspurl = "../jsp/queryCommt.jsp";
        element = "floor_" + commentId;
    }
    else if (type == "4") {
        jspurl = "../jsp/queryReply.jsp";
        element = "answerId" + commentId;
    }
    else if (type == "5") {
        jspurl = "../jsp/query_ask_answered.jsp";
        element = "new" + commentId;
    }
    else if (type == "6") {
        jspurl = "../jsp/query_ask_reply.jsp";
        element = "answerId" + commentId;
    }
    else {
        return;
    }
    $.ajax({
        type: "post",
        url: removeCommentUrl,
        data: "commentIds=" + reqComm + "&commentType=" + commentType,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                if (index == 0) {//鍒犻櫎鏁翠釜
                    var floor = $("#" + hotOrNew + "floor_" + commentId);
                    if (floor.parent().find(".qusans_bd").length == 1) {
                        floor.parent().remove();
                    } else {
                        floor.remove();
                    }
                } else {
                    console.log($("#" + hotOrNew + "comm_floor_" + commentId + index).find(".floor_comment"));
                    $("#" + hotOrNew + "comm_" + commentId + "_" + parentId).html("姝ゅ彂瑷€宸茶鐢ㄦ埛鍒犻櫎");
                }
            } else if (data.resultCode == 2) {
                lgwdsshow();
            } else {
                mlAlert(data.resultMsg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            mlAlert("瀵逛笉璧凤紝绯荤粺蹇欙紝璇风◢鍚庡啀璇曪紒");
        }
    });

}

var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || { type: 'unknown' };
var type_text = ['unknown', 'ethernet', 'wifi', '2g', '3g', '4g', 'none'];

// is connecting wifi
function isConnectingWifi() {
    if (connection.type == "unknown") {
        return true;
    }
    if (typeof (connection.type) == "number") {
        connection.type_text = type_text[connection.type];
    } else {
        connection.type_text = connection.type;
    }
    if (String(connection.type_text).trim().match("wifi") != null) {
        return true;
    } else {
        return false;
    }
}
function alertWordCount(obj, id, type) {
    var type = type || "";
    var lenInput = $(obj).val().length;
    if (lenInput >= 0 && lenInput <= 800) {
        $('#' + type + 'textareaInput' + id).html(lenInput);
    }
}
//鍒嗕韩鏃惰棰戞帶鍒跺璞� 瑙ｅ喅瑙嗛閬尅鍒嗕韩鑿滃崟闂
var VideoDealShare = {
    paused: {},
    startArray: function (videoArray) {
        for (var i = 0; i < videoArray.length; i++) {
            this.start(videoArray.eq(i));
        }
    },
    endArray: function (videoArray) {
        for (var i = 0; i < videoArray.length; i++) {
            this.end(videoArray.eq(i));
        }
    },
    start: function ($video, posterDiv) {
        var posterString = posterDiv || "#videoDiv_";
        var videoId = $video.data("contid");
        if ($video && videoId) {
            var domVideo = $video[0];
            if (!domVideo.paused) {//璁板綍鍘熻棰戠殑鎾斁鐘舵€�
                this.paused[videoId] = false;
            } else {
                this.paused[videoId] = true;
            }
            var videoPoster = $(posterString + videoId);
            domVideo.pause();
            $video.hide();
            videoPoster.show();
        }
    },
    end: function ($video, posterDiv) {
        var posterString = posterDiv || "#videoDiv_";
        var videoId = $video.data("contid");
        if ($video && videoId) {
            var domVideo = $video[0];
            if (!this.paused[videoId]) {//鍘熻棰戞槸鎾斁鐨勫垯鍥炲鎾斁
                $video[0].play();
            }
            var videoPoster = $(posterString + videoId);
            $video.show();
            videoPoster.hide();
        }
    }
}
var praiseControll = {
    localStorage: window.localStorage || localStorage,
    save: function (k, v) {
        try {
            var localStor = this.localStorage;
            var totalIds = localStor.getItem("totalIdsArr");
            if (totalIds != "undefined" && totalIds != null) {
                var totalIdsArr = totalIds.split(',');
                if (totalIdsArr.length > 500) {
                    totalIdsArr.shift();
                    var deletEle = totalIdsArr.shift();
                    localStor.removeItem(deletEle)
                    totalIdsArr.push(k);
                    localStor.setItem("totalIdsArr", totalIdsArr)
                } else {
                    localStor.removeItem(k);
                    localStor.setItem(k, v);
                    totalIdsArr.push(k);
                    localStor.setItem("totalIdsArr", totalIdsArr)
                }
            } else if (totalIds == null) {
                localStor.setItem("totalIdsArr", k)
            }
        } catch (err) { }
    },
    get: function (k) {
        try {
            var localstor = this.localStorage
            if (localstor.getItem(k) != undefined || localstor.getItem(k) != "") {
                return localstor.getItem(k);
            }
        } catch (err) { }
    }
}
//鏂囩珷鐑瘎璁虹偣璧�
function detailHotPrise(obj) {
    praiseControll.save("totalIdsArr", totalIdsArr)
    var id = $(obj).attr("id");
    if (praiseControll.get('hotPraise' + id) != undefined) {
        $(obj).children().attr("class", "icon_praised");
        $(obj).removeAttr("onclick");
        return false
    } else {
        var times = parseInt($(obj).attr("data-praisetimes"))
        $(obj).html(times + '<span class="icon_praised"></span>');
        $(obj).removeAttr("onclick");
        praiseControll.save('hotPraise' + id, 'praised')
        $.ajax({
            type: "post",
            url: priseUrl,
            data: { "commentId": id, "origPraiseNum": times },
            timeout: 30000,
            dataType: "json",
            success: function (data) {
                if (data.resultCode == 1) {
                    $(obj).html(data.praiseTimes + '<span class="icon_praised"></span>');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) { }
        });

    }

}
function onloadCommt(paramId, ot) {
    $.ajax({
        type: "get",
        url: "newDetail_floorCommt.jsp?1=1",
        cache: false,
        data: "contid=" + paramId + "&ot=" + ot,
        timeout: 30000,
        dataType: "html",
        success: function (html) {
            var dom = $(html);
            try {
                if (dom.find(".xiaoshou-d").length != 0) {
                    dom.find(".xiaoshou-d").each(function (index, item) {
                        var quotIdx = $(item).attr("onclick").indexOf(",");
                        var lastQuotIdx = $(item).attr("onclick").lastIndexOf(",");
                        var hotId = $(item).attr("id").substr(3);
                        if ($(item).parents(".comm_floor_main") != undefined) {
                            var id = $(item).attr("onclick").substring(quotIdx + 1, lastQuotIdx)
                        } else {
                            var id = hotId;
                        }
                        if (praiseControll.get('floorCommt' + id) != undefined) {
                            $(item).find("img").attr("src", "//file.thepaper.cn/wap/v3/img/v3-014.png");
                            $(item).removeAttr("onclick");
                        }

                    })
                }

            } catch (err) {
                console.log(err)
            }
            $("#commt_list").append(dom);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //
        }
    });
}
//澶氶煶棰戝鐞�
function audiosInit() {
    var audioList = $(".cont_audio");
    audioList.each(function () {
        var duration = $(this).data("duration");
        duration = typeof (duration) == "undefined" ? "..." : duration;
        $(this).audioPlayer({ "duration": duration });
    })
}
//璇︽儏椤佃〃鏍煎鐞�
function newsTabelInit() {
    var tables = $("table");
    for (var i = 0; i < tables.length; i++) {
        var dom = "<div class='table_panel'></div>";
        var father = $(dom);
        tables.eq(i).after(father);
        father.append(tables.eq(i));
    }
}
//vue moblink
function vueMoblinkInit() {
    var mobArray = [];
    $("a[id^='vuemoblink']").each(function () {
        var id = $(this).attr('id');
        var path = "demo/a";
        var mobVal = $(this).attr("data-moblink");
        var mobData = {};
        if (mobVal) {
            mobVal = mobVal.substr(path.length + 1);
            var pairs = mobVal.split("&");
            for (var i = 0; i < pairs.length; i++) {
                var pos = pairs[i].indexOf('=');
                if (pos != -1) {
                    var proName = pairs[i].substring(0, pos);
                    var proVal = pairs[i].substring(pos + 1);
                    mobData[proName] = proVal;
                }
            }
        }
        var obj = {
            el: "#" + id,
            path: "demo/a",
        };
        obj.params = mobData;
        mobArray.push(obj);
    })
    var mobLen = mobArray.length;
    var maxMobLen = 30;
    if (mobLen > maxMobLen) {
        var minCount = Math.floor(mobLen / maxMobLen);
        var totalCount = (mobLen % maxMobLen == 0) ? (minCount) : (minCount + 1);
        for (var c = 0; c < totalCount; c++) {
            var endInd = (c + 1) * maxMobLen;
            if (endInd >= mobLen) endInd = mobLen;
            var insertArray = mobArray.slice(c * maxMobLen, endInd);
            try { MobLink(insertArray); }
            catch (err) { }
        }
    } else {
        try { MobLink(mobArray) }
        catch (err) { };
    }
}
/**骞垮憡xml澶勭悊**/
var ADXml = {
    config: {},
    /*
       
        data.caid 鏍忕洰id 
        data.arid 鏂囩珷id
        data.adVal 骞垮憡鍙�
        data.adAddress "${adAddress}"
        
        鑾峰彇骞垮憡鍐呭
    */
    getAd: function (data, callback) {
        var adval = data.adval || 0;
        var caid = data.caid || 0;
        var arid = data.arid || 0;
        var adAddress = data.adAddress || "";
        var paramStr = 'c=' + adval + '&WD-CLIENT-TYPE=05&caid=' + caid + '&arid=' + arid + '&op=1';
        $.ajax({
            url: adAddress,
            data: paramStr,
            cache: false,
            crossDomain: true,
            async: false,
            success: function (xml) {
                if (callback) callback(xml);
            },
            error: function () { }
        });
    },
    //鑾峰彇xml瀛楁
    handleXmlArgs: function (xml, arg) {
        if (typeof xml.find(arg)[0] != "undefined") {
            var argVal = '';
            argVal = xml.find(arg)[0].textContent.trim();
            argVal = new String(argVal)
            return argVal;
        } else {
            if (arg == 'adflag') {
                return 0;
            } else {
                return '';
            }
        }
    },
    //瑙ｆ瀽xml骞惰祴鍊煎埌椤甸潰
    //delParam 椤甸潰缁撴瀯瀵硅薄鐢ㄤ簬琚玿ml鍐呭鏇挎崲
    handleXmlRes: function (advXml, delParam, callback) {
        var HTTP_PREFIX = "http://";
        var xmlDoc = $.parseXML(advXml);
        var xml = $(xmlDoc);
        var vdLink = delParam.vdLink;
        var img = delParam.img;
        var adTitle = delParam.adTitle;
        var ele = delParam.ele;
        var adFlag = delParam.adFlag;
        var creative = this.handleXmlArgs(xml, "creative")
        var click = this.handleXmlArgs(xml, "click");
        var adFlagStr = this.handleXmlArgs(xml, "adflag")
        var newAdtitleStr = this.handleXmlArgs(xml, "adtitle")
        if (click != '') {
            if (click.replace(HTTP_PREFIX, "") == "" || click.replace(HTTP_PREFIX, "") == "####") {
                click = "javascript:;";
            }
        } else {
            click = "javascript:;";
        }
        if (click != "" || creative != '' || newAdtitleStr != '') {
            vdLink.attr("href", click);
            img.attr("src", creative);
            adTitle.text(newAdtitleStr);
        }
        //adflag 1鎴�0
        if (adFlagStr != 1) {
            adFlag.hide();
        } else {
            adFlag.show();
        }
        try {
            if (callback) {
                callback(delParam)
            }
        } catch (err) { };
    },
    setConfig: function (config) {
        this.config = config;
    },
    //鐑棬鎺ㄨ崘骞垮憡 璋冪敤 4涓箍鍛婁綅
    initAdforRecommend: function () {
        if ($('.ad_item').length != -1) {
            for (var i = 0; i < $('.ad_item').length; i++) {
                var ele = $('.ad_item').eq(i);
                if (i == 0 && ele) {
                    this.getAdHotRecommend(ele, '73')
                } else if (i == 1 && ele) {
                    this.getAdHotRecommend(ele, '74')
                } else if (i == 2 && ele) {
                    this.getAdHotRecommend(ele, '75')
                } else if (i == 3 && ele) {
                    this.getAdHotRecommend(ele, '94')
                }
            }
        }
    },
    // 鐑棬鎺ㄨ崘骞垮憡 鑾峰彇
    getAdHotRecommend: function (ele, adval) {
        var delParam = {
            vdLink: ele.children("a"),
            img: ele.find('img'),
            adTitle: ele.find(".item_title"),
            adFlag: ele.find(".label_ad"),
            ele: ele
        }
        var adParam = {
            adval: adval,
        }
        $.extend(adParam, this.config);
        ADXml.getAd(adParam, function (xml) {
            ADXml.handleXmlRes(xml, delParam, ADXml.handleAdHotRecommend)
        })
    },
    // 鐑棬鎺ㄨ崘骞垮憡涓虹┖鏃堕殣钘�
    handleAdHotRecommend: function (delParam) {
        var adTitle = delParam.adTitle
        var ele = delParam.ele
        if (adTitle.text() == '' || adTitle.text().length == 0) {
            ele.hide();
        } else {
            ele.show();
        }
    },
    //搴曢儴骞垮憡浣�
    getAdBotBanner: function (ele, adval) {
        var delParam = {
            vdLink: ele.children("a"),
            img: ele.find('img'),
            adTitle: ele.find(".cont-name"),
            adFlag: ele.find(".label_ad"),
            ele: ele
        }
        var adParam = {
            adval: adval,
        }
        $.extend(adParam, this.config);
        ADXml.getAd(adParam, function (xml) {
            ADXml.handleXmlRes(xml, delParam, ADXml.handleBottomBanner)
        })
    },
    handleBottomBanner: function (delParam) {
        var vdLink = delParam.vdLink
        if (vdLink.attr('href') != '' && vdLink.find('img').attr('src') != '') {
            $('#last_content .last_cont').hide();
            $('#last_content .cont_ad').show();
        } else {
            $('#last_content .last_cont').show();
            $('#last_content .cont_ad').hide();
        }
    }


}
/*璇︽儏椤垫姇绁ㄥ鐞�*/
var VotePanel = function (dom, votesArray) {
    this.votesArray = votesArray || [];
    this.dom = dom;
    this.voteId = "0";
    this.totalNum = "";
    this.voteCountList = {}; //璁板綍鎶曠エ鏁�
    this.votePercentList = {};//璁板綍鎶曠エ鐧惧垎姣�
    this.selectOptionId = -1;//鍒ゆ柇鍙姇绁ㄦ儏鍐垫槸鍚﹀凡缁忔姇绁�
    this.saved = false;//瀹㈡埛绔繚瀛樻槸鍚︽姇绁ㄨ繃锛屾姇绁ㄨ繃涓嶈兘缁х画鎶�
}
VotePanel.prototype.resetVote = function () {//鍒濆鎴栭噸缃姇绁�
    var votePanel = this.dom;
    if (votePanel == null) { //椤甸潰娌℃湁鎶曠エ
        return
    }
    this.voteId = votePanel.data("voteid");

    for (var i = 0; i < this.votesArray.length; i++) {
        var voteObj = this.votesArray[i];
        var voteItems = voteObj.optionList;
        if (this.voteId == voteObj.voteId) {
            this.totalNum = voteObj.voteNum;
            votePanel.find(".vote__count span").text(voteObj.voteNum);
            for (var j = 0; j < voteItems.length; j++) {
                var voteItem = voteItems[j];
                var optionId = voteItem.optionId;
                var voteCount = voteItem.voteCount;
                this.voteCountList[optionId] = voteCount;
            }
            break;
        }
    }
    /*var voteItem = this.dom.find(".vote__item");
    this.voteId = votePanel.data("voteid");
    this.totalNum = votePanel.data("totalnum");
    for(var i = 0;i<voteItem.length;i++){
      var item = voteItem.eq(i);
      var optionId = item.data("optionid");
      var voteCount = item.data("votecount");
      this.voteCountList[optionId] = voteCount;
    }*/
}
VotePanel.prototype.getVoteStorage = function () {//鑾峰彇storage涓姇绁ㄦ暟鎹�
    var wlstorage = window.localStorage;
    var voteStorageStr = wlstorage.getItem("voteStorage") || "{}";
    var voteStorage = JSON.parse(voteStorageStr);
    return voteStorage
}
VotePanel.prototype.checkIsSave = function () {//鍒ゆ柇褰撳墠鎶曠エ鏄惁淇濆瓨锛岃嫢瀛樺湪鍒欒繑鍥為€夐」id
    var voteStorage = this.getVoteStorage();
    var optionId = voteStorage[this.voteId] || "-1";
    return optionId
}
VotePanel.prototype.saveVote = function (optionId) {//鎶曠エ淇濆瓨storage涓紝key 鎶曠エid value 閫夐」id
    var voteStorage = this.getVoteStorage();
    var voteId = this.voteId;
    voteStorage[voteId] = optionId;
    var voteStorageStr = JSON.stringify(voteStorage);
    window.localStorage.setItem("voteStorage", voteStorageStr);
}
VotePanel.prototype.getMaxVoteOptionId = function () {//鑾峰彇鎶曠エ鏁版渶澶氱殑閫夐」Id
    var maxVoteCount = -1;
    var maxOptionId = -1;
    for (var optionId in this.voteCountList) {
        var voteCount = parseInt(this.voteCountList[optionId]);
        if (maxVoteCount < voteCount) {
            maxVoteCount = voteCount;
            maxOptionId = optionId;
        }
    }
    return maxOptionId;
}
VotePanel.prototype.voteAnimate = function () {//鐧惧垎姣斿姩鐢�
    var that = this;
    var perActionIndex = 1;
    var perActionTimer = setInterval(function () {
        var tempObject = {}
        for (var optionId in that.votePercentList) {
            $voteItemPercent = that.dom.find(".vote__item[data-optionId='" + optionId + "']").find(".vote__item__percent");
            if (perActionIndex == 9) {
                $voteItemPercent.html(that.votePercentList[optionId]);
            } else {
                var voteCount = parseInt(that.votePercentList[optionId]);
                $voteItemPercent.html(Math.round(voteCount / 10 * perActionIndex) + "%");
            }
        }
        perActionIndex++;
        if (perActionIndex == 10) {
            clearInterval(perActionTimer);
            perActionTimer = null;
        }
    }, 40)//400濂界杩愯10娆″彉鍖� 鍥犳鍙樺寲闂撮殧鏃堕棿涓�400/10
}
VotePanel.prototype.changePercent = function (maxOptionId) {//鏈€澶у€奸噰鐢�1-鍏朵粬璁＄畻
    var otherTotalPer = 0; //鎺掗櫎鏈€澶у€煎叾浣欐瘮渚嬪拰
    for (var optionId in this.voteCountList) {
        $voteItemBg = this.dom.find(".vote__item[data-optionId='" + optionId + "']").find(".vote__item__bg");
        var voteCount = parseInt(this.voteCountList[optionId]);
        if (maxOptionId != optionId) {
            if (this.totalNum == 0) {
                var bl = 0;
                this.votePercentList[optionId] = "0%";
            } else {
                var bl = Math.round(voteCount / this.totalNum * 100)
                if (voteCount != 0 && bl == 0) {
                    bl = 1
                }
                this.votePercentList[optionId] = bl + "%";
            }
            otherTotalPer += bl;
            $voteItemBg.css("width", this.votePercentList[optionId])
        }

    }
    this.votePercentList[maxOptionId] = (100 - otherTotalPer) + "%";
    this.dom.find(".vote__item[data-optionId='" + maxOptionId + "']").find(".vote__item__bg").css("width", (100 - otherTotalPer) + "%");

}
//addVote.msp?optionId=1
VotePanel.prototype.sendAjax = function (optionId, success, error) {
    $.ajax({
        type: "post",
        url: "/wap/addContentNoteVote.msp",
        data: "optionId=" + optionId + '&voteId=' + this.voteId,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            //{"resultMsg":"鎶曠エ鎴愬姛","resultCode":"1","voteCount":"1"}
            if (data.resultCode == 1) {
                if (success) success();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (error) error();
        }
    });
}
VotePanel.prototype.addVote = function (optionId, num) {
    if (this.saved) {
        return;
    }
    this.resetVote();
    this.totalNum = parseInt(this.totalNum) + num;
    this.dom.find(".vote__count span").html(this.totalNum);
    this.dom.find(".vote__item").removeClass("vote__item--select");
    this.dom.find(".vote__item[data-optionId='" + optionId + "']").addClass("vote__item--select");
    this.dom.find(".vote__itemlist").addClass("vote__itemlist--select");
    var newVote = parseInt(this.voteCountList[optionId]) + num;
    this.saved = true;//涓€浣嗛€夋嫨涓嶈兘鏇存敼
    var that = this;
    if (num != 0) { //涓洪浂璁剧疆鍒濆鐘舵€佷笉闇€瑕佸彂璇锋眰
        this.sendAjax(optionId, function () {
            that.dealAdd(optionId, newVote)
        }, function () {
            that.saved = false;
        });
    } else {
        that.dealAdd(optionId, newVote)
    }
}
VotePanel.prototype.dealAdd = function (optionId, newVote) {
    this.voteCountList[optionId] = newVote;
    var maxOptionId = this.getMaxVoteOptionId();
    this.changePercent(maxOptionId);
    this.voteAnimate();
    this.saveVote(optionId);
}
VotePanel.prototype.initEvent = function () {
    var voteItem = this.dom.find(".vote__item");
    var that = this;
    for (var i = 0; i < voteItem.length; i++) {
        (function (j) {
            voteItem.eq(j).on("click", function () {
                that.addVote(voteItem.eq(j).data("optionid"), 1)
            })
        })(i)
    }
}
function votePanelInit(votesArray) {
    if (Object.prototype.toString.call(votesArray) == "[object Array]" && votesArray.length != 0) {
        for (var votePanelIndex = 0; votePanelIndex < $(".vote__panel").length; votePanelIndex++) {
            var $votePanel = $(".vote__panel").eq(votePanelIndex);
            var votePanelObj = new VotePanel($votePanel, votesArray);
            votePanelObj.resetVote();
            votePanelObj.initEvent();
            var saveOptionId = votePanelObj.checkIsSave();
            if (saveOptionId != "-1") {
                //鐩存帴灞曠ず
                votePanelObj.addVote(saveOptionId, 0)
                votePanelObj.saved = true;
            }
        }
    }
}