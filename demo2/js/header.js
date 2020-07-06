//var httpProtocol = 'https:' == document.location.protocol ? 'https://': 'http://'; 
var httpProtocol = '//';
var host = httpProtocol + window.location.host;
var statClickUrl = "statClick.jsp";
var bindTab = function (heads, tabs, curHeadCName, curTabCName, context) {
    var old = 0, cur = 0;
    old = $('.cur-state').index();
    if (!heads || !tabs) {
        return;
    }
    heads = $(heads, context);
    tabs = $(tabs, context);
    //tabs.hide().eq(0).show(); 

    heads.parent().click(function (event) {
        var target = event.target,
            oldTab, curTab;
        cur = heads.index(target);
        cur == -1 && heads.each(function (i, h) {
            heads.eq(i).find(target).length && (cur = i);
        })
        if (cur == old) {
            return;
        }
        if (cur != -1) {
            oldTab = tabs.eq(old).hide();
            curTab = tabs.eq(cur).show();
            if (curHeadCName) {
                heads.eq(old).removeClass(curHeadCName);
                heads.eq(old).siblings("li").removeClass(curHeadCName);
                heads.eq(cur).addClass(curHeadCName);
            }
            old = cur;
        }
    }).end();

}
$(function () {


    // 涓昏鍙傛暟鍒楄〃 
    var $burger = $("#burger");
    var ski = 0;
    var timeout;
    var timeout1;
    var sheight = $(window).height();
    var upa = $(".upv30-icon").height();
    var flsize;
    var disScroll, lastScrollTop = 0, delat = 5, navHight = $(".header-v4").outerHeight();
    var burtop = 0, burski = 0;
    //鍒ゆ柇head鍑虹幇鐨勫厓绱�
    var isdiscont = $('#isdiscont').val();
    if (isdiscont == "" || isdiscont == undefined) {
        isdiscont = "0";

    }

    function touchScroll() {
        var a = $(this).scrollTop();
        if (!$(".page_ds")) {
            Math.abs(a - lastScrollTop) <= delat ||
                (a > navHight && a > lastScrollTop ?
                    $(".header-v4").slideUp("150") : a + $(window).height() < $(document).height() &&
                    $(".header-v4").slideDown("150"), lastScrollTop = a);
        }
    }

    switch (isdiscont) {
        case '0'://棣栭〉姹夊牎
            $('.burger-p').show();
            $('#moblink_top_detail').show();
            break;
        case '1'://鍒嗙被
            $('.fl-icon').show();
            $('.bg-opacity30').click(function () {
                $("#v3cont_id").css("height", "auto");
                //$(".sy-downward-sort").slideToggle();
                $(".sy-downward").eq(1).slideToggle();
                $(".bg-opacity30").hide();
                ski = 0;
            });
            break;
        case '2'://鐩存挱
            $('.zb-icon').show();
            break;
        case '3'://鍙充晶鍒嗕韩鎸夐挳
            $('.zt-icon-p').show();
            break;
        case '4'://鍙充晶鏂囧瓧浣�  鏂伴椈闂瓟璇︽儏椤靛彸渚�
            $('.logon-shuline').hide();
            $('.toptit-cont').hide();
            $('#news_right_cont').show();
            break;
        case 'index':
            $('.burger-p').show();
            $('#moblink_top_detail').show();
            break;
        case '5'://鍙充晶鍥剧墖浣�
            $('.right-img').show();
            break;
        case '6'://鍙充晶浣嶇┖
            break;
        case '7'://鍙充晶浣嶇┖ 璇濋闂瓟璇︽儏椤靛彸渚�
            $('#ask_right_cont').show();
            break;
        case '8'://搴旂敤浜庢鏂囪鎯呴〉
            $('.burger-p').show();
            $('#moblink_top_detail').show();
            break;
        case '9'://瑙嗛棰戦亾
            $('.burger-p').show();
            $('#moblink_top_detail').show();
            break;
        case '10'://鏀垮姟涓嬭浇app+鎼滅储
            $('.politics_head_download').show();
            break;
        case '11'://鏀垮姟鍘绘彁闂�+鍒嗕韩
            $('.politics_head_ask').show();
            break;
        case '12'://鏀垮姟鍘荤櫥褰曞墠
            $('.politics_head_unlogin').show();
            break;
        case '13'://鏀垮姟鍘荤櫥褰曞悗
            $('.politics_head_login').show();
            break;
        case '14'://
            $('.politics_head_ask').show();
            $('.politics_head .txt').hide();
            break;
        case '15'://vue 澶撮儴
            $('.burger-p').show();
            $('#vuemoblink_top_xiazai').show();
            break;
    }


    if (isdiscont != "1") {
        //鐐瑰嚮鍘嬫殫鍏抽棴鍒嗕韩
        $('.bg-opacity30').click(function () {
            $('.bg-opacity30').hide();
            $('.v3-shareBox').slideToggle();
            ski = 0;
        });
    }

    $(window).scroll(function () {
        disScroll = !0;
    });
    setInterval(function () {
        if (burski == 0) {
            disScroll && (touchScroll(), disScroll = !1);
        } else {
            $(".header-v4").show();
        }
    },
        250);

    $(".sy-downward").css("height", sheight);
    $(".sy-downward-cont").css("height", sheight - upa);

    $(".sections-list").css("height", sheight - upa - navHight - 118);
    $(".sy-downward-sort").hide();
    $(".sy-downward-sort").css('height', sheight - upa);
    var sortContHeight = navHight + $(".retract-up").outerHeight(true) + 115;//鐑棬鏈€鏂扮殑楂樺害鍔犱笂搴曢儴鎺у埗涓夎鐨勯珮搴﹀姞涓婇棿闅�
    $(".sort-cont").css('height', $('.sy-downward-sort').height() - sortContHeight);
    flsize = Number($(".sy-downward-flcont").children().size());
    if (flsize > 2) {
        //alert(flsize);
        $(".sy-downward-sort").css('height', $('.sy-downward-sort').height() + 70);
    }
    //alert($(".sy-downward-sort").height());
    //鍒嗕韩
    $('#fx').click(function () {
        if (ski == 0) {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                showShareHelpForWx();
            }
            $('.bg-opacity30').show();
            $(".header-v4").slideDown("150");
            $('.v3-shareBox').slideDown("150");
            ski = 1;
        } else {
            $('.bg-opacity30').hide();
            $('.v3-shareBox').slideUp("150");
            ski = 0;
        }


    });
    $('.v3-shareBox span').click(function () {
        $('.bg-opacity30').hide();
        $('.v3-shareBox').slideUp("150");
        ski = 0;
    });
    $('.fl-icon').click(function () {
        if (ski == 0) {
            var th = $(".header-v4").height();
            var tph = Number(sheight - th);
            //alert(tph);
            $("#v3cont_id").css({ "height": tph, "overflow": "hidden" });
            $(".sy-downward").eq(1).slideToggle();
            $(".bg-opacity30").show();
            //$("#v3cont_id").hide();
            ski = 1;
            burski = 1;
        } else {
            $("#v3cont_id").css("height", "auto");
            //$(".sy-downward-sort").slideToggle();
            $(".sy-downward").eq(1).slideToggle();
            $(".bg-opacity30").hide();
            ski = 0;
            burski = 0;
        }

    });
    $('.retract-up').click(function () {
        if (ski == 1) {
            $("#v3cont_id").css("height", "auto");
            $(".sy-downward").eq(1).slideToggle();
            $(".bg-opacity30").hide();
            ski = 0;
            burski = 1;
        } else {
            $("#v3cont_id").css("height", "auto");
            $(".sy-downward").eq(1).slideToggle();
            $(".bg-opacity30").hide();
            ski = 0;
            burski = 1;
        }

    });

    $burger.click(function () {
        burtop = burtop;
        if (ski == 0) {
            $(".burger").addClass("transform");
            $(".sy-downward").eq(0).fadeIn("150");

            // 瑙嗛鐨勭埗鐩掑瓙娑堝け锛岃棰戞殏鍋�
            if ($(".img100").length > 0) {
                $(".img100")[0].pause()
                $("#ds_tab").hide()
            };
            clearTimeout(timeout);
            //鑾峰彇褰撳墠瀹氫綅
            burtop = $(window).scrollTop();
            timeout = setTimeout(function () { $("#v3cont_id").hide(); }, 500);
            var uph = $(".user-view-info").height();
            $(".cont-list").css("height", sheight - uph);

            //鍙嶈壊
            $('.header-v4 .logo a:first').css("background-image", "url('../img/logo_wap_v3-white.png')");
            clearTimeout(timeout1);
            timeout1 = setTimeout(function () { $('.header-v4 .header-container').css("background-color", "#3e3e46"); }, 150);
            $('.burger div').css("background-color", "#fff");
            $('.sy-downward').css("top", "43px");
            if ($(window).width() >= 640) {
                $('.sy-downward').css("top", "81px");
            }
            // $('.user-view-info').css("margin-top","16px");
            //鏂囧瓧鍔犲弽鑹�
            $('.header-v4 .toptit-cont').css("color", "#fff");
            ski = 1;
            burski = 1;
            if (isdiscont == '3' || isdiscont == '0') {
                $('.bg-opacity30').hide();
                $('.v3-shareBox').hide();
            }


        } else {
            $(".burger").removeClass("transform");
            $(".sy-downward").eq(0).fadeOut("150");
            // 瑙嗛鐨勭埗鐩掑瓙鍑虹幇
            $("#ds_tab").show();
            clearTimeout(timeout);
            timeout = setTimeout(function () { $("#v3cont_id").show(); $(window).scrollTop(burtop); }, 50);
            var uph = $(".user-view-info").height();
            $(".cont-list").css("height", sheight - uph);
            //鍙嶈壊
            $('.header-v4 .logo a:first').css("background-image", "url('../img/logo_wap_v3.png')");
            clearTimeout(timeout1);
            timeout1 = setTimeout(function () { $('.header-v4 .header-container').css("background-color", "#fff"); }, 150);
            $('.burger div').css("background-color", "#333");
            $('.sy-downward').css("top", "44px");
            if ($(window).width() >= 640) {
                $('.sy-downward').css("top", "83px");
            }
            // $('.user-view-info').css("margin-top","29px");
            //鏂囧瓧鍔犲弽鑹�
            $('.header-v4 .toptit-cont').css("color", "#000");
            ski = 0;
            burski = 0;
        }

    });
    //tab鍒囨崲鍒濆鍖�
    $('.scrolly:has(.sections-nav)').each(function (_, el) {
        var ctrlSelector = '.sections-nav li',
            tabSelector = '.sections-list';
        bindTab(ctrlSelector, tabSelector, 'cur-state', 'cur', el);
    });


    function Tiplength(Plun, Tshi, Max) {
        Plun.blur(function () {
            $('.tj-plOrhf .tj-plOrhf-cont em').hide();
            var Length = Plun.val().length;
            if (Length > Max) {
                the_value = Plun.val().substring(0, Max);
                Plun.val(the_value);
                var Over = 0;
            } else {
                var Over = Max - Length;
            }
            Tshi.html("鎻愮ず锛氬綋鍓嶈繕鑳借緭鍏�<font style='color:red;'>" + Over + "</font>涓眽瀛�");
        });
        Plun.keyup(function () {
            $('.tj-plOrhf .tj-plOrhf-cont em').hide();
            var Length = Plun.val().length;
            if (Length > Max) {
                the_value = Plun.val().substring(0, Max);
                Plun.val(the_value);
                var Over = 0;
            } else {
                var Over = Max - Length;
            }
            Tshi.html("鎻愮ず锛氬綋鍓嶈繕鑳借緭鍏�<font style='color:red;'>" + Over + "</font>涓眽瀛�");
        });
    }
    //鍙戣〃璇勮瀛楁暟鎻愮ず
    Tiplength($("#suggestContent"), $("#v3-pl p"), 140);
    Tiplength($("#suggestContent1"), $("#v3-zw p"), 140);
    Tiplength($("#suggestContent"), $("#wb-tishi"), 140);

    //璇勮杩介棶鍒囨崲
    $('.tj-plOrhf-nav span').eq(0).click(function () { $('.tj-plOrhf-nav span').eq(0).addClass('cur-color'); $('.tj-plOrhf-nav span').eq(1).removeClass('cur-color'); $('#v3-zw').hide(); $('#v3-pl').show(); });
    $('.tj-plOrhf-nav span').eq(1).click(function () { $('.tj-plOrhf-nav span').eq(1).addClass('cur-color'); $('.tj-plOrhf-nav span').eq(0).removeClass('cur-color'); $('#v3-zw').show(); $('#v3-pl').hide(); });
    $('.top-img h2.pos').css('height', $('.top-img h2.pos a').height() + $('.top-state-strip').height());
    $(window).resize(function () {
        $('.top-img h2.pos').css('height', $('.top-img h2.pos a').height() + $('.top-state-strip').height());
        resizer($(this));  //do sonrthing
    });
    //鍏抽棴涓嬭浇
    $('.close-1').click(function () {
        $('#pp-download-box').hide();
    });
    //alert(isNaN($('.ws-box p').html()));
    $('.ask_ulist').css("padding-top", "15px");
    // $('#backtotop').attr("href","");
    $('#backtotop').click(function () {
        // $('#backtotop').attr("href","#");
        var scrtop = $(window).scrollTop();
        var time, wct;
        var x_scrtop = parseInt(scrtop / 100);
        //alert(scrtop+','+x_scrtop);
        //$(window).scrollTop(0);
        if (scrtop <= 100) {
            $(window).scrollTop(0);
        } else if (scrtop <= 1000) {
            time = setInterval(function () {
                scrtop = scrtop - 100;
                $(window).scrollTop(scrtop);
                //alert(scrtop);
                if (scrtop <= 0) {
                    clearInterval(time);
                }
            }, 10);
        } else if (scrtop > 1000) {
            $(window).scrollTop(1000);
            scrtop = 1000;
            time = setInterval(function () {
                scrtop = scrtop - 100;
                $(window).scrollTop(scrtop);
                //alert(scrtop);
                if (scrtop <= 0) {
                    clearInterval(time);
                }
            }, 20);

        }
        return false;
    });
    //姝ｆ枃upd font
    var updAK = 0;
    $('#FTS-opt').click(function () {
        if (updAK == 0) {
            $(this).css("background-image", "url('../img/v3-a-.png')");
            $('.news_part').addClass('bigger');
            $('.news_part').removeClass('smaller');
            updAK = 1;
        } else {
            $(this).css("background-image", "url('../img/v3-a+.png')");
            $(".news_part").addClass("smaller");
            $('.news_part').removeClass("bigger");
            updAK = 0;
        }

    });

});
//20160531add 
var downAppCookie = "paper_wapdown";
var allPageDownId = "moblink-href";//head_ask_app_down
function closAllPageDownfixed() {
    $("#" + allPageDownId).html("").css('display', 'none');
    $("#" + allPageDownId).unbind("click");
    setAppDownCookie();
}
//
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return decodeURI(arr[2]);
    else
        return null;
}
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}
function setCookie(name, value, Days) {
    if (!Days) Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + encodeURI(value) + ";expires=" + exp.toGMTString();
}
//set appdown cookie one day
function setAppDownCookie() {
    setCookie(downAppCookie, "false", 1);
}
$(document).ready(function () {
    var isOpen = getCookie(downAppCookie);
    if (isOpen == null || isOpen == "true") {
        $("#" + allPageDownId).css('display', 'block');
    }
});
/*璇濋app涓嬭浇
1:棣栭〉 2:璇︽儏椤� 3涓撻 4鐩存挱 5鍥鹃泦 6 澶栭摼 7:璇濋 8锛屾垜鐨勭ぞ鍖猴紝9:瑙嗛璇︽儏椤�
*/
function allPageAppdowncheck(id, contid, contType) {
    var result = true, url;
    var ua = window.navigator.userAgent.toLowerCase();
    url = "app.thepaper.cn://" + contType + "|" + contid;
    if (contid == '' && contType != '') url = "app.thepaper.cn://" + contType;
    var timeout, t = 1000;
    var t1 = Date.now();
    var chromeIntent = "";
    var isChrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);
    var isOpera = ua.match(/opera\/([\d.]+)/);
    var isBaidu = ua.match(/baidubrowser\/([\d.]+)/);
    var isFirefox = ua.match(/firefox\/([\d.]+)/);
    var isAndriod = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    var ifr = null;
    var isIOS9 = window.navigator.userAgent.match(/OS 9/i) != null;
    var isIOS10 = window.navigator.userAgent.match(/OS 10/i) != null;
    var isIOS = ua.indexOf("iphone") != -1;
    var isWx = !!window.navigator.userAgent.match(/MicroMessenger/i);
    if (isBaidu) {
        if (isIOS9 || isIOS10) {
            window.location.href = "https://itunes.apple.com/cn/app/id878962716?mt=8";
        } else {
            window.location.href = "http://m.thepaper.cn/download?id=3";
        }
        return;
    }
    if (isIOS9 || isIOS10) {//閫傞厤ios9锛屼笉鏀寔iframe鏂瑰紡锛岀洿鎺ref
        window.location.href = url;
    } else {
        if (isWx && isAndriod) {
            var wxUrl = "http://a.app.qq.com/o/simple.jsp?pkgname=com.wondertek.paper&ckey=" + "CK1101792432" + "&android_schema=" + url;
            window.location.href = wxUrl;
        } else if ((isChrome || isOpera || isFirefox) && !isIOS) {
            var chromeIntent = "intent://app.thepaper.cn/#Intent;scheme=" + url + ";package=com.wondertek.paper;end";
            window.location.href = chromeIntent;
        } else {
            ifr = document.createElement("iframe");
            ifr.setAttribute('src', url);
            ifr.setAttribute('style', 'display:none');
            document.body.appendChild(ifr);
        }
    }
    timeout = setTimeout(function () {
        var t2 = Date.now();
        if (t2 - t1 < t + 100) {
            result = false;
        }
    }, t);
    /* setTimeout(function () {
         if(!result){
             var dUrl = $("#"+id).attr("data-url");
             if(!dUrl || dUrl.length < 5){
                 dUrl="http://m.thepaper.cn/download.jsp?id=3";
             }
             window.setTimeout(function(){window.location = dUrl;},1000);
         }
     }, 1500);*/
}

function mobLinkhref(contid, _id) {
    var ua = window.navigator.userAgent.toLowerCase();
    var isIOS9 = window.navigator.userAgent.match(/OS 9/i) != null;
    var isIOS10 = window.navigator.userAgent.match(/OS 10/i) != null;
    var isIOS = ua.indexOf("iphone") != -1;
    var isAndriod = ua.match(/(android);?[\s\/]+([\d.]+)?/);
    var isWx = !!window.navigator.userAgent.match(/MicroMessenger/i);
    var dowBottomUrl = [
        "https://at.umeng.com/WzSTTz",//瀹夊崜
        "https://at.umeng.com/HXv01b",//搴旂敤瀹�
        "https://at.umeng.com/ymuKfu" //iOS
    ],
        //鍏ㄧ珯椤堕儴button	
        dowtopUrl = [
            "https://at.umeng.com/y4ji8D",//瀹夊崜
            "https://at.umeng.com/qi8Pbe",//搴旂敤瀹�
            "https://at.umeng.com/8D4DSv"	//iOS
        ],
        //鐩稿叧鎺ㄨ崘闃呰	
        dowRecUrl = [
            "https://at.umeng.com/raSram",//瀹夊崜
            "https://at.umeng.com/5fG1zi",//搴旂敤瀹�
            "https://at.umeng.com/99jODu"	//iOS
        ],
        //鏇村璇勮
        dowCommUrl = [
            "https://at.umeng.com/0veSrq",//瀹夊崜
            "https://at.umeng.com/W1bG9r",//搴旂敤瀹�
            "https://at.umeng.com/ieyema"//iOS
        ];
    var getArray = [];
    var result = httpProtocol + "m.thepaper.cn/download.jsp";
    //鍏ㄧ珯椹诲簳
    if (_id == "moblink_top_detail_xiazai") {
        getArray = dowtopUrl;
    } else if (_id == "head_ask_app_down") {
        getArray = dowBottomUrl;
    } else if (_id == "moblink_" + contid) {
        getArray = dowRecUrl;
    } else if (_id == "moblink_morecomm") {
        getArray = dowCommUrl;
    }
    if (getArray.length > 0) {
        if (isIOS || isIOS9 || isIOS10) {
            result = getArray[2].toString();
        } else if (isAndriod) {
            if (isWx) {
                result = getArray[1].toString();
            } else {
                result = getArray[0].toString();
            }
        }
    }

    return result;
}

function initHtmlMob(html) {
    var newMobArray = [];
    $("a[id^='moblink']").each(function () {
        var id = $(this).attr("id");
        var path = "demo/a";
        var obj = {};
        var mobVal = $(this).attr("data-moblink");
        if (mobVal) {
            mobVal = mobVal.substr(path.length + 1);
            var pairs = mobVal.split("&");
            obj.el = "#" + id;
            obj.path = "demo/a";
            obj.params = {};
            for (var i = 0; i < pairs.length; i++) {
                var pos = pairs[i].indexOf('=');
                if (pos != -1) {
                    var proName = pairs[i].substring(0, pos);
                    var proVal = pairs[i].substring(pos + 1);
                    obj.params[proName] = proVal;
                }
            }
            newMobArray.push(obj);
        }
    });
    var mobLen = newMobArray.length;
    var maxMobLen = 30;
    if (mobLen > maxMobLen) {
        var minCount = Math.floor(mobLen / maxMobLen);
        var totalCount = (mobLen % maxMobLen == 0) ? (minCount) : (minCount + 1);
        for (var c = 0; c < totalCount; c++) {
            var endInd = (c + 1) * maxMobLen;
            if (endInd >= mobLen) endInd = mobLen;
            var insertArray = newMobArray.slice(c * maxMobLen, endInd);
            try { MobLink(insertArray); }
            catch (err) { }
        }
    } else {
        try {
            if (newMobArray != 0) {
                MobLink(newMobArray)
            }
        }
        catch (err) { };
    }
}

function initMobLink() {
    $("a[id^='moblink']").each(function () {
        var id = $(this).attr("id");
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
        var contid = mobData.contId;
        var mobCallBack = function () {
            window.location.href = mobLinkhref(contid, id);
        }
        MobLink.updateFeatured("#" + id, path, mobData, mobCallBack);
    });

}
//statClick.jsp type=downloadApp(涓嬭浇)   type=readMore(鍔犺浇鏇村) type=openAppFromComment(鐐瑰嚮璇勮锛�
function sendAjaxForStatClick(clickType) {
    var type = clickType || "downloadApp";
    $.ajax({
        url: statClickUrl + "?type=" + type,
        timeout: 30000,
        cache: false,
        success: function () {
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });

}


/*moblink璺宠浆*/
function getMobLinkArray() {
    var array = [];
    if (downObj != undefined || downObj) {
        array.push(downObj);
    }
    $("a[id^='moblink']").each(function () {
        var id = $(this).attr("id");
        var path = "demo/a";
        var obj = {};
        var mobVal = $(this).attr("data-moblink");
        if (mobVal) {
            mobVal = mobVal.substr(path.length + 1);
            var pairs = mobVal.split("&");
            obj.el = "#" + id;
            obj.path = "demo/a";
            obj.params = {};
            for (var i = 0; i < pairs.length; i++) {
                var pos = pairs[i].indexOf('=');
                if (pos != -1) {
                    var proName = pairs[i].substring(0, pos);
                    var proVal = pairs[i].substring(pos + 1);
                    obj.params[proName] = proVal;
                }
            }
            array.push(obj);
        }
        //moblink缁熻
        var statclick = $(this).attr("data-statclick");
        if (statclick) {
            $(this).on("click", function () {
                sendAjaxForStatClick(statclick);
            })
        }

    });
    return array;
}