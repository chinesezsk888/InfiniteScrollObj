//楠岃瘉閭
function isEmail(value) {
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return myreg.test(value);
}

//楠岃瘉鎵嬫満
function isPhone(value) {
    if (/^[0-9]{11}$/.test(value)) {
        if (/^13[0-9]/.test(value) || (/^15[0-9]/.test(value)) || (/^17[0-9]/.test(value)) || (/^19[89]/.test(value)) || (/^16[46]/.test(value)) || (/^18[0-9]/.test(value)) || (/^14[57]/.test(value))) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
var WWW_LOGIN_COOKIE = "PAPER_WAP_LOGIN";
var pyd = "";
function setLoginFlagCookie() {
    document.cookie = WWW_LOGIN_COOKIE + "=1";
}
function removeLoginFlagCookie() {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    document.cookie = WWW_LOGIN_COOKIE + "=1" + ";expires=" + exp.toGMTString();;
}
function login() {
    var loginName = $('#lg_wds_name').val();
    var psw = $('#lg_wds_pwd').val();
    var vcode = $('#lg_wds_dynCode').val();
    var remember_me = $('#remember_me') && $('#remember_me')[0].checked ? "1" : "";

    if (loginName == "" || loginName == "鎵嬫満鍙�/鐢靛瓙閭") {
        $('#login_msg').html("璇疯緭鍏ユ偍瑕佺櫥褰曠殑鎵嬫満鍙锋垨閭");
        return false;
    } else if (!isPhone(loginName) && !isEmail(loginName)) {
        $('#login_msg').html("杈撳叆鐨勬墜鏈哄彿鎴栭偖绠辨牸寮忎笉姝ｇ‘");
        return false;
    }
    if (psw == "") {
        $('#login_msg').html("璇疯緭鍏ュ瘑鐮�");
        return false;
    }
    if (vcode == "" || vcode == "璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗�") {
        $('#login_msg').html("璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗�");
        return false;
    } else if (!/^([a-zA-Z0-9]){4}$/.test(vcode)) {
        $('#login_msg').html("杈撳叆鐨勯獙璇佺爜涓嶆纭�");
        return false;
    }
    if ("1111" != vcode) {
        $('#login_msg').html("娴嬭瘯妯″紡,璇疯緭鍏�1111");
        return false;
    }
    $('#login_msg').html("");
    $.ajax({
        type: "post",
        url: "/wap/login.msp",
        data: "loginName=" + loginName + "&psw=" + psw + "&vcode=" + vcode + "&remember_me=" + remember_me + "&isVerify=1",
        timeout: 30000,
        dataType: "json",
        success: function (data) {

            if (data.resultCode == "1") {
                $("#login_msg").html("鐧诲綍鎴愬姛");
                setLoginFlagCookie();
                if ("1" == remember_me) {
                    setLoginCookie(loginName);
                } else {
                    delLoginCookie();
                }
                window.setTimeout(function () {
                    if (typeof jumpHref != "undefined") {
                        if (jumpHref != "") {
                            window.location.href = jumpHref;
                        } else {
                            window.scrollTo(0, 0);
                            window.location.reload();
                        }
                    } else {
                        window.scrollTo(0, 0);
                        window.location.reload();
                    }
                }, 600);
            } else if (data.resultMsg == "9999") {
                $("#login_msg").html("鐢ㄦ埛鍚嶆垨瀵嗙爜閿欒");
                document.getElementById('annexCode2').src = '/wap/RandomPicture?' + new Date().getTime();
                $('#lg_wds_dynCode').val('');
                $('#lg_wds_dynCode').val('');
            } else {
                document.getElementById('annexCode2').src = '/wap/RandomPicture?' + new Date().getTime();
                $('#lg_wds_dynCode').val('');
                $('#lg_wds_dynCode').val('');
                if (data.resultMsg != null && data.resultMsg != '') {
                    $("#login_msg").html(data.resultMsg);
                } else {
                    $("#login_msg").html("鐧诲綍澶辫触");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#login_msg").html("鐧诲綍澶辫触锛岃绋嶅悗鍐嶈瘯锛�");
        }
    });

}


function confirmlogout() {
    mlAlert("纭閫€鍑虹櫥褰曪紵", 2);
    $(".tiptitleOK").attr("id", "tiptitleOK_");
    $(".tiptitleOK").attr("onClick", "logout()");

}

//娉ㄩ攢 閫€鍑�
function logout() {
    var logoutUrl = "/wap/logout.msp";
    $.ajax({
        type: "post",
        url: logoutUrl,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                $('#lg_wds_dynCode').val('');
                window.location.reload();
                removeLoginFlagCookie();
                //window.location.href = "index.jsp";
            } else {
                try { } catch (e) { }
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { }
    });
}

//涓撻銆佸浘闆嗛〉闈㈡敞閿€ 閫€鍑�
function specialLogout() {
    var logoutUrl = "/wap/logout.msp";
    $.ajax({
        type: "post",
        url: logoutUrl,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                $('#lg_wds_dynCode').val('');
                window.location.reload();
            } else {
                try { } catch (e) { }
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { }
    });
}

function getRegisterCode(type) {
    var mail = $('#registerwds_mail').val();
    var vcode = $('#register_dynCode').val();
    var verType = type || 1; //楠岃瘉鐮佺被鍨嬶細1-娉ㄥ唽; 2-淇敼閭; 3-蹇樿瀵嗙爜 5-缁戝畾鎵嬫満
    if (mail == "" || mail == "鎵嬫満鍙�") {
        $('#register_msg').html("璇疯緭鍏ユ偍瑕佺櫥褰曠殑鎵嬫満鍙�");
        return false;
    } else if (!isPhone(mail)) {
        $('#register_msg').html("杈撳叆鐨勬墜鏈哄彿鏍煎紡涓嶆纭�");
        return false;
    }

    if (vcode == "" || vcode == "璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗�") {
        $('#register_msg').html("璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗�");
        return false;
    }

    if ($("#getregistercode").attr("data-disabled") == "false") {
        return;
    }
    $("#getregistercode").attr("data-disabled", "false");
    $("#register_msg").html("閭€璇风爜鍙戦€佷腑...");
    var dynCode = $("#getregistercode");
    var data = "verType=" + verType + "&mail=" + mail + "&vcode=" + vcode;
    var jid = trimData();
    var edata = data + "|";
    edata = esda(edata);
    $.ajax({
        type: "post",
        url: "/wap/getVerCode.msp",
        data: data + "&randStr=" + edata + "&py=" + pyd,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                //document.getElementById('annexCode3').src = '/wap/RandomPicture?' + new Date().getTime();
                $("#register_msg").html(data.resultMsg);
                if (dynCode.text() == "鑾峰彇閭€璇风爜") {
                    dynCode.css('background-color', '#7a7a7a').text(60);
                    $("#getregistercode").attr("data-disabled", "false");
                    var reduceTime = setInterval(function () {
                        dynCode.text(parseInt(dynCode.text()) - 1); if (parseInt(dynCode.text()) <= 0) {
                            dynCode.css('background-color', '#00a5eb').text("鑾峰彇閭€璇风爜");
                            $("#getregistercode").attr("data-disabled", "true");
                            clearInterval(reduceTime);
                        }
                    }, 1000);
                }
            } else {
                document.getElementById('annexCode3').src = '/wap/RandomPicture?' + new Date().getTime();
                $('#register_dynCode').val('');
                $('#register_dynCode').blur();
                $("#register_msg").html(data.resultMsg);
                $("#getregistercode").attr("data-disabled", "true");

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#register_msg").html("閭€璇风爜鍙戦€佸け璐ワ紝璇风◢鍚庡啀璇曪紒");
            window.setTimeout(function () {
                $("#getregistercode").attr("data-disabled", "true");
            }, 1000);
        }
    });

}
//浠巋tml鑾峰彇
function ajaxAgreement() {
    var agreement = "";
    $.ajax({
        type: "get",
        url: "//139.196.248.235:8089/www/v3/jsp/agreement.html",
        timeout: 30000,
        dataType: "html",
        async: false,
        success: function (data) {
            agreement = " <div class=\"lg_wds_agreement\"  id=\"agreementtxt\" style=\"display:none;\">" + data + "</div>";
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
    });
    return agreement;
}

function getLgAgreementHtml() {

    var lgAgreementHtml = ajaxAgreement();
    if (lgAgreementHtml != "") {
        return lgAgreementHtml;
    }

    lgAgreementHtml = " <div class=\"lg_wds_agreement\"  id=\"agreementtxt\" style=\"display:none;\">"
        + "<h2>婢庢箖鏅€氱敤鎴蜂娇鐢ㄥ崗璁�</h2>"
        + "<p>涓轰簡鏇村ソ鍦颁负鎮ㄦ彁渚涙湇鍔★紝璇锋偍鍦ㄥ喅瀹氭垚涓烘編婀冭蒋浠剁殑娉ㄥ唽鐢ㄦ埛鍓嶄粩缁嗛槄璇讳互涓嬪崗璁紝鐞嗚В骞跺悓鎰忓悗鍐嶈繘琛屾敞鍐屻€�</p>"
        + "<p>鏈崗璁槸鐢ㄦ埛涓庝笂娴蜂笢鏂规姤涓氭湁闄愬叕鍙稿氨浣跨敤锛堝寘鍚絾涓嶉檺浜庢敞鍐屻€佺櫥闄嗐€佹祻瑙堛€佽瘎璁虹瓑锛夋編婀冭蒋浠跺強鏈嶅姟绛夋墍娑夊強鐨勪簨瀹滆绔嬬殑鍗忚銆�<span style=\'font-weight:bold;\'><u>鐢ㄦ埛鍦ㄦ敞鍐屽墠搴斿綋浠旂粏闃呰鏈崗璁紝鐢ㄦ埛鍦ㄦ敞鍐岃繃绋嬩腑鐐瑰嚮鈥滃悓鎰忊€濇寜閽苟瀹屾垚娉ㄥ唽绋嬪簭鍗宠〃绀虹敤鎴蜂笌婢庢箖宸茶揪鎴愭湰鍗忚骞朵笖鐢ㄦ埛宸插畬鍏ㄥ厖鍒嗙悊瑙ｃ€佸悓鎰忓苟鑷効鎺ュ彈鏈崗璁墍鏈夊唴瀹广€�</u></span>鑻ョ敤鎴峰鏈崗璁殑浠讳綍鏉℃鏈夊紓璁紝璇峰仠姝㈡敞鍐屻€佺櫥褰曟垨缁х画浣跨敤婢庢箖鎻愪緵鐨勫叏閮ㄦ湇鍔°€�</p>"
        + "<p>婢庢箖淇濈暀鑷鍐冲畾鍦ㄤ换浣曟椂鍊欏彉鏇淬€佷慨鏀广€佸鍔犳垨鍒犻櫎鏈崗璁潯娆鹃儴鍒嗘垨鍏ㄩ儴鍐呭鐨勬潈鍒┿€傜敤鎴锋湁璐ｄ换瀹氭湡鏌ョ湅涓嶆椂鏇存柊鐨勬湰鍗忚鐨勫唴瀹广€傜敤鎴峰湪鏇存柊鐨勫崗璁潯娆惧彂甯冧箣鍚庣户缁娇鐢ㄦ編婀冿紝鍗宠〃绀虹敤鎴峰悓鎰忎笖鎺ュ彈璇ョ瓑鏇存柊銆�</p>"
        + "<h3>涓€銆佸畾涔�</h3>"
        + "<p>1.1	缃戠粶鏈嶅姟锛氭寚婢庢箖鎸夌収鏈崗璁殑瑙勫畾鍙婂叾涓嶆椂鍙戝竷鐨勮鍒欍€佽鑼冩彁渚涚殑鍩轰簬浜掕仈缃戜互鍙婄Щ鍔ㄧ綉鐨勭浉鍏虫湇鍔°€�</p>"
        + "<p>1.2	鐢ㄦ埛锛氭寚鐧婚檰婢庢箖銆佺洿鎺ユ垨閫氳繃浠讳綍鏂瑰紡闂存帴锛堝 RSS 婧愬拰绔欏 API 寮曠敤绛夛級浣跨敤婢庢箖鎻愪緵鐨勭綉缁滄湇鍔★紙鍖呮嫭浣嗕笉闄愪簬鐢ㄦ埛鍦ㄦ編婀冧笂杞姐€佸鍒躲€佸彂甯冦€佷笅杞姐€佽浆杞界瓑浠ュ悇绉嶅舰寮忎紶鎾枃瀛椼€佸浘鐗囥€侀煶棰戙€佽棰戙€佸浘琛ㄣ€佹极鐢荤瓑鍐呭锛夌殑鑷劧浜恒€佹硶浜烘垨鍏朵粬缁勭粐銆傜敤鎴蜂娇鐢ㄦ編婀冩彁渚涚殑缃戠粶鏈嶅姟锛屽簲褰撴帴鍙楁湰鍗忚椤逛笅鐨勫叏閮ㄦ潯娆惧苟瀹屾垚鍏ㄩ儴鐨勬敞鍐岀▼搴忋€�</p>"
        + "<h3>浜屻€佽处鎴锋敞鍐屽拰浣跨敤</h3>"
        + "<p>2.1	鐢ㄦ埛搴斿綋浣跨敤鐪熷疄銆佸噯纭€佸悎娉曘€佹湁鏁堢殑韬唤淇℃伅锛堝寘鎷絾涓嶉檺浜庡鍚嶃€佺數瀛愰偖浠跺湴鍧€銆佽仈绯荤數璇濄€佽仈绯诲湴鍧€锛夋敞鍐岃处鍙峰苟娉ㄦ剰鍙婃椂鏇存柊锛屼互渚挎編婀冨湪蹇呰鏃朵笌鐢ㄦ埛鑱旂郴銆�</p>"
        + "<p>2.2	婢庢箖鏈夋潈鍦ㄦ牳鏌ョ敤鎴锋彁浜ょ殑娉ㄥ唽淇℃伅鍚庡啀鍐冲畾鏄惁鏍稿噯鐢ㄦ埛鐨勬敞鍐岀敵璇枫€傝嫢鐢ㄦ埛鎻愪氦鐨勬敞鍐屼俊鎭笉瀹屾暣鎴栦笉鍑嗙‘锛屽垯鍙兘鏃犳硶瀹屾垚娉ㄥ唽銆�</p>"
        + "<p>2.3	鐢ㄦ埛璁剧疆鐨勭敤鎴峰悕绉颁笉寰楄繚鍙嶅浗瀹舵硶寰嬫硶瑙勫強婢庢箖鐩稿叧瑙勫垯銆佽鑼冿紝鍚﹀垯婢庢箖鍙鐢ㄦ埛鐨勮处鎴峰悕杩涜鏆傚仠浣跨敤鎴栦綔娉ㄩ攢澶勭悊锛屽苟鍚戠浉鍏充富绠℃満鍏虫姤鍛娿€�</p>"
        + "<p>2.4	鐢ㄦ埛鐞嗚В骞舵壙璇猴紝鐢ㄦ埛鐨勭敤鎴峰悕绉般€佸ご鍍忓拰绛惧悕绛夋敞鍐屼俊鎭腑涓嶅緱鍑虹幇杩濇硶鍜屼笉鑹俊鎭紝娌℃湁鍐掔敤銆佽繚娉曞叧鑱斿悕绉般€佷腑澶浗瀹舵満鍏冲悕绉般€佸湴鏂瑰悇鍦板厷鏀块瀵兼満鍏冲悕绉般€佺ぞ浼氬叕鍏辨満鏋勫悕绉般€佸鍥藉浗瀹跺悕绉般€佸浗闄呯粍缁囧悕绉般€佸鍐呭濯掍綋鍚嶇О銆佸厷鍜屽浗瀹堕瀵间汉銆佸澶栨斂瑕佹垨绀句細鍚嶄汉濮撳悕绛夛紝鐢ㄦ埛鍦ㄨ处鍙锋敞鍐岃繃绋嬩腑闇€閬靛畧娉曞緥娉曡銆佸浗瀹跺埄鐩娿€佸叕姘戝悎娉曟潈鐩娿€佸叕鍏辩З搴忋€佺ぞ浼氶亾寰烽灏氬拰淇℃伅鐪熷疄鎬х瓑鍐呭銆�</p>"
        + "<p>2.5	鐢ㄦ埛鍚屾剰骞舵巿鏉冿紝婢庢箖鍙互鏍规嵁鐢ㄦ埛鎻愪緵鐨勬墜鏈哄彿鐮併€佽韩浠借瘉鍙风爜绛変俊鎭紝鍚戝叏鍥藉叕姘戣韩浠藉彿鐮佹煡璇㈡湇鍔′腑蹇冦€佺數淇¤繍钀ュ晢銆侀噾铻嶆湇鍔℃満鏋勭瓑鍙潬鍗曚綅鍙戣捣鐢ㄦ埛韬唤鐪熷疄鎬с€佺敤鎴峰緛淇¤褰曘€佺敤鎴锋墜鏈哄彿鐮佹湁鏁堟€х姸鎬佺瓑鎯呭喌鐨勬煡璇€�</p>"
        + "<p>2.6	鐢ㄦ埛娉ㄥ唽鎴愬姛鍚庯紝婢庢箖灏嗙粰浜堟瘡涓敤鎴蜂竴涓敤鎴疯处鍙峰強鐩稿簲鐨勫瘑鐮侊紝璇ョ敤鎴疯处鍙峰拰瀵嗙爜鐢辩敤鎴疯礋璐ｄ繚绠★紱鐢ㄦ埛搴斿綋瀵逛互鍏剁敤鎴疯处鍙疯繘琛岀殑鎵€鏈夋椿鍔ㄥ拰浜嬩欢璐熸硶寰嬭矗浠汇€傚鐢ㄦ埛杩濆弽鏈崗璁唴瀹规垨婢庢箖鍏ず鐨勪换浣曡鍒欍€佽鑼冿紝婢庢箖鏈夋潈瀵圭敤鎴疯处鍙疯繘琛屾殏鍋滀娇鐢ㄣ€佹敞閿€鎴栧仠姝㈡彁渚涙湇鍔＄瓑澶勭悊锛岀敱姝ゅ鑷寸殑鍖呮嫭骞朵笉闄愪簬鐢ㄦ埛閫氳涓柇銆佽祫鏂欏拰鍐呭绛夋竻绌虹瓑鎹熷け鐢辩敤鎴疯嚜琛屾壙鎷呫€�</p>"
        + "<h3>涓夈€佺敤鎴蜂釜浜轰俊鎭繚鎶�</h3>"
        + "<p>3.1	淇濇姢鐢ㄦ埛涓汉淇℃伅鏄編婀冪殑鏈€鍩烘湰鍘熷垯涔嬩竴锛屾編婀冧繚璇佷笉鍚戝叾浠栦换浣曞叕鍙搞€佺粍缁囨垨涓汉鎶湶鍗曚釜鐢ㄦ埛鐨勬敞鍐屼俊鎭強鐢ㄦ埛鍦ㄤ娇鐢ㄧ綉缁滄湇鍔℃椂瀛樺偍鍦ㄦ編婀冪殑闈炲叕寮€鍐呭锛屼絾涓嬪垪鎯呭喌闄ゅ锛�</p>"
        + "<p>锛�1锛�	浜嬪厛鑾峰緱鐢ㄦ埛鐨勬槑纭巿鏉冿紱</p>"
        + "<p>锛�2锛�	鏍规嵁鏈夊叧鐨勬硶寰嬫硶瑙勮姹傦紱</p>"
        + "<p>锛�3锛�	鎸夌収鐩稿叧鏀垮簻涓荤閮ㄩ棬鐨勮姹傦紱</p>"
        + "<p>锛�4锛�	涓虹淮鎶ょぞ浼氬叕浼楃殑鍒╃泭锛�</p>"
        + "<p>锛�5锛�	涓虹淮鎶ゆ編婀冪殑鍚堟硶鏉冪泭銆�</p>"
        + "<p>3.2	鐢ㄦ埛鐞嗚В锛屾編婀冨彲鑳戒細涓庣涓夋柟鍚堜綔鍚戠敤鎴锋彁渚涚浉鍏崇殑缃戠粶鏈嶅姟锛屽湪姝ゆ儏鍐典笅锛屽璇ョ涓夋柟鍚屾剰鎵挎媴涓庢編婀冨悓绛夌殑淇濇姢鐢ㄦ埛闅愮鐨勮矗浠伙紝鍒欐編婀冩湁鏉冨皢鐢ㄦ埛鐨勬敞鍐屼俊鎭瓑鎻愪緵缁欒绗笁鏂广€�</p>"
        + "<p>3.3	鍦ㄤ笉閫忛湶鍗曚釜鐢ㄦ埛闅愮璧勬枡鐨勫墠鎻愪笅锛屾編婀冩湁鏉冨鏁翠釜鐢ㄦ埛鏁版嵁搴撹繘琛屽垎鏋愬苟瀵圭敤鎴锋暟鎹簱杩涜鍟嗕笟涓婄殑鍒╃敤銆�</p>"
        + "<p>3.4	鐢ㄦ埛鍦ㄤ娇鐢ㄦ編婀冪殑杩囩▼涓紝浜︿繚璇佷笉浠ユ悳闆嗐€佸鍒躲€佸瓨鍌ㄣ€佷紶鎾瓑浠讳綍鏂瑰紡浣跨敤鍏朵粬鐢ㄦ埛鐨勪釜浜轰俊鎭紝鍚﹀垯锛岀敱姝や骇鐢熺殑鍚庢灉鐢ㄦ埛搴斿綋鑷鎵挎媴銆�</p>"
        + "<h3>鍥涖€佺敤鎴风殑鏉冨埄鍜屼箟鍔�</h3>"
        + "<p>4.1	鐢ㄦ埛鏈夋潈淇敼鍏惰处鎴蜂腑鍚勯」鍙慨鏀逛俊鎭紝鑷閫夋嫨鏄电О鍜屽綍鍏ヤ粙缁嶆€ф枃瀛楋紝鑷鍐冲畾鏄惁鎻愪緵闈炲繀濉」鐨勫唴瀹广€�</p>"
        + "<p>4.2	鐢ㄦ埛椤诲鍦ㄦ編婀冪殑娉ㄥ唽淇℃伅鐨勭湡瀹炴€с€佸噯纭€с€佸悎娉曟€с€佹湁鏁堟€ф壙鎷呭叏閮ㄨ矗浠伙紝濡傜敤鎴锋敞鍐屼俊鎭櫄鍋囥€佷笉鍚堟硶銆佷笉鍑嗙‘鎴栨棤鏁堢粰婢庢箖鎴栫涓夋柟閫犳垚鎹熷鐨勶紝鐢ㄦ埛搴斿綋渚濇硶浜堜互璧斿伩銆�</p>"
        + "<p>4.3	鐢ㄦ埛鏈変箟鍔′繚璇佺敤鎴峰瘑鐮佸拰璐﹀彿鐨勫畨鍏ㄥ苟涓嶅緱灏嗗叾璐﹀彿銆佸瘑鐮佽浆璁╂垨鍑哄€熶簣浠栦汉浣跨敤锛岀敤鎴峰埄鐢ㄥ叾瀵嗙爜鍜岃处鍙锋墍杩涜鐨勪竴鍒囨椿鍔ㄥ紩璧风殑浠讳綍鎹熷け鎴栨崯瀹筹紝鐢辩敤鎴疯嚜琛屾壙鎷呭叏閮ㄨ矗浠伙紝婢庢箖涓嶆壙鎷呬换浣曡矗浠汇€傚鐢ㄦ埛鍙戠幇璐﹀彿閬埌鏈巿鏉冪殑浣跨敤鎴栧彂鐢熷叾浠栦换浣曞畨鍏ㄩ棶棰橈紝搴旂珛鍗充慨鏀硅处鍙峰瘑鐮佸苟閫氱煡婢庢箖銆傚鍥犻粦瀹㈣涓烘垨鐢ㄦ埛鐨勪繚绠＄枏蹇藉鑷磋处鍙疯闈炴硶浣跨敤锛屾編婀冧笉鎵挎媴浠讳綍璐ｄ换銆�</p>"
        + "<p>4.4	鐢ㄦ埛涓嶅緱鍐掑厖浠栦汉銆佸埄鐢ㄤ粬浜虹殑鍚嶄箟鍙戝竷浠讳綍淇℃伅鎴栨伓鎰忎娇鐢ㄦ敞鍐岃处鍙峰鑷村叾浠栫敤鎴疯璁わ紝鍚﹀垯婢庢箖鏈夋潈绔嬪嵆鍋滄鐢ㄦ埛璐﹀彿鐨勪娇鐢ㄦ潈闄愶紝鐢ㄦ埛搴旇嚜琛屾壙鎷呯敱姝よ€屼骇鐢熺殑涓€鍒囨硶寰嬭矗浠汇€�</p>"
        + "<p>4.5	鐢ㄦ埛搴斾繚璇佸鍦ㄦ編婀冨埗浣溿€佸鍒躲€佷笂杞姐€佸彂甯冦€佷紶鎾€佽浆杞界殑浠讳綍鍐呭浜湁鍚堟硶鏉冪泭锛岃嫢鍓嶈堪鍐呭鍙戠敓鏉冨埄绾犵悍鎴栦镜鐘簡浠讳綍绗笁鏂圭殑鍚堟硶鏉冪泭锛岄渶鐢ㄦ埛鎵挎媴鍏ㄩ儴娉曞緥璐ｄ换銆�</p>"
        + "<p>4.6	鐢ㄦ埛搴旈伒瀹堟硶寰嬫硶瑙勩€佹湰鍗忚鐨勫悇椤规潯娆惧拰婢庢箖鐨勫悇椤硅鍒欍€佽鑼冿紝骞舵纭€侀€傚綋鍦颁娇鐢ㄣ€佽繍钀ャ€佺鐞嗙敤鎴疯处鍙凤紝鍚﹀垯锛屾編婀冩湁鏉冭鎯呭喌涓鎴栫粓姝㈠鐢ㄦ埛鎻愪緵缃戠粶鏈嶅姟銆�</p>"
        + "<p>4.7	濡傜敤鎴锋敞鍐屽悗杩炵画涓変釜鏈堜笉鐧诲綍锛屼负閬垮厤璧勬簮娴垂锛屾編婀冩湁鏉冩敹鍥炶璐﹀彿锛屽洜姝ゅ甫鏉ョ殑鎹熷け灏嗙敱鐢ㄦ埛鑷鎵挎媴銆�</p>"
        + "<p>4.8	鐢ㄦ埛鐨勮█琛屽簲閬靛畧銆婅绠楁満淇℃伅缃戠粶鍥介檯鑱旂綉瀹夊叏淇濇姢绠＄悊鍔炴硶銆嬨€婁簰鑱旂綉淇℃伅鏈嶅姟绠＄悊鍔炴硶銆嬨€婁簰鑱旂綉鐢靛瓙鍏憡鏈嶅姟绠＄悊瑙勫畾銆嬨€婄淮鎶や簰鑱旂綉瀹夊叏鐨勫喅瀹氥€嬨€婁簰鑱旂綉鏂伴椈淇℃伅鏈嶅姟绠＄悊瑙勫畾銆嬨€婁腑鍗庝汉姘戝叡鍜屽浗璁＄畻鏈轰俊鎭郴缁熷畨鍏ㄤ繚鎶ゆ潯渚嬨€嬨€婅绠楁満杞欢淇濇姢鏉′緥銆嬨€婁俊鎭綉缁滀紶鎾潈淇濇姢鏉′緥銆嬬瓑涓浗鐨勭浉鍏虫硶寰嬫硶瑙勭殑瑙勫畾锛岄伒瀹堟墍鏈変笌缃戠粶鏈嶅姟鏈夊叧鐨勭綉缁滃崗璁€佽瀹氬拰绋嬪簭銆�</p>"
        + "<p>4.9	鐢ㄦ埛浣跨敤婢庢箖杩囩▼涓墍鍒朵綔銆佸鍒躲€佷笂浼犮€佸彂甯冦€佷紶鎾€佽浆杞界殑浠讳綍鍐呭锛堝寘鎷絾涓嶉檺浜庢枃瀛椼€佽闊炽€佸浘鐗囥€佽棰戙€佸浘鏂囥€佸浘琛ㄣ€佹极鐢汇€佺綉椤甸摼鎺ョ瓑锛夛紝涓嶅緱閫捐秺娉曞緥娉曡銆佺ぞ浼氫富涔夊埗搴︺€佸浗瀹跺埄鐩娿€佸叕姘戝悎娉曟潈鐩娿€佺ぞ浼氬叕鍏辩З搴忋€侀亾寰烽灏氬拰淇℃伅鐪熷疄鎬х瓑鈥滀竷鏉″簳绾库€濓紝涓嶅緱鍙戣〃鍚湁涓嬪垪淇℃伅鐨勫唴瀹癸細</p> "
        + "<p>锛�1锛�	鍙嶅瀹硶鎵€纭畾鐨勫熀鏈師鍒欑殑锛�</p>"
        + "<p>锛�2锛�	鍗卞鍥藉瀹夊叏锛屾硠闇插浗瀹剁瀵嗭紝棰犺鍥藉鏀挎潈锛岀牬鍧忓浗瀹剁粺涓€鐨勶紱</p>"
        + "<p>锛�3锛�	鎹熷鍥藉鑽ｈ獕鍜屽埄鐩婄殑锛�</p>"
        + "<p>锛�4锛�	鐓藉姩姘戞棌浠囨仺銆佹皯鏃忔瑙嗭紝鐮村潖姘戞棌鍥㈢粨鐨勶紱</p>"
        + "<p>锛�5锛�	鐮村潖鍥藉瀹楁暀鏀跨瓥锛屽鎵偑鏁欏拰灏佸缓杩蜂俊鐨勶紱</p>"
        + "<p>锛�6锛�	鏁ｅ竷璋ｈ█锛屾壈涔辩ぞ浼氱З搴忥紝鐮村潖绀句細绋冲畾鐨勶紱</p>"
        + "<p>锛�7锛�	鏁ｅ竷娣Ы銆佽壊鎯呫€佽祵鍗氥€佹毚鍔涖€佸嚩鏉€銆佹亹鎬栨垨鑰呮暀鍞嗙姱缃殑锛�</p>"
        + "<p>锛�8锛�	渚颈鎴栬€呰璋や粬浜猴紝渚靛浠栦汉鍚堟硶鏉冪泭鐨勶紱</p>"
        + "<p>锛�9锛�	瀵逛粬浜鸿繘琛屾毚鍔涙亹鍚撱€佸▉鑳侊紝瀹炴柦浜鸿倝鎼滅储鐨勶紱</p>"
        + "<p>锛�10锛�	鏈幏寰楁湭婊�18鍛ㄥ瞾鏈垚骞翠汉娉曞畾鐩戞姢浜虹殑涔﹂潰鍚屾剰锛屼紶鎾鏈垚骞翠汉鐨勯殣绉佷俊鎭殑锛�</p>"
        + "<p>锛�11锛�	鏁ｅ竷姹¤█绉借锛屾崯瀹崇ぞ浼氬叕搴忚壇淇楃殑锛�</p>"
        + "<p>锛�12锛�	渚电姱浠栦汉鐭ヨ瘑浜ф潈鐨勶紱</p>"
        + "<p>锛�13锛�	鏈粡婢庢箖鐨勫悓鎰忔暎甯冨晢涓氬箍鍛婏紝鎴栫被浼肩殑鍟嗕笟鎷涙徑淇℃伅锛�</p>"
        + "<p>锛�14锛�	浣跨敤婢庢箖鏂扮綉甯哥敤璇█鏂囧瓧浠ュ鐨勫叾浠栬瑷€鏂囧瓧璇勮鐨勶紱</p>"
        + "<p>锛�15锛�	涓庢墍璇勮鐨勪俊鎭鏃犲叧绯荤殑锛�</p>"
        + "<p>锛�16锛�	鎵€鍙戣〃鐨勪俊鎭鏃犳剰涔夌殑锛屾垨鍒绘剰浣跨敤瀛楃缁勫悎浠ラ€冮伩鎶€鏈鏍哥殑锛�</p>"
        + "<p>锛�17锛�	鐓藉姩闈炴硶闆嗕細銆佺粨绀俱€佹父琛屻€佺ず濞併€佽仛浼楁壈涔辩ぞ浼氱З搴忕殑锛�</p>"
        + "<p>锛�18锛�	浠ラ潪娉曟皯闂寸粍缁囧悕涔夋椿鍔ㄧ殑锛�</p>"
        + "<p>锛�19锛�	鍚湁娉曞緥銆佹硶瑙勫拰鏀跨瓥绂佹鐨勫叾浠栧唴瀹圭殑淇℃伅銆�</p>"
        + "<p>鏈夎繚涓婅堪鍐呭鑰咃紝婢庢箖鏈夋潈涓嶇粡鐢ㄦ埛鍚屾剰锛岀洿鎺ヨ鎯呭喌閲囧彇棰勫厛璀︾ず銆佹嫆缁濆彂甯冦€佷慨鏀广€佸睆钄姐€佸垹闄ょ敤鎴峰彂甯冪殑淇℃伅鎴栫煭鏈熺姝€佹案涔呭仠姝㈠叾璐﹀彿浣跨敤鏉冮檺绛夌鐞嗘帾鏂姐€傚娑夊珜杩濇硶鐘姜鐨勭敤鎴疯█璁烘編婀冨皢淇濆瓨鍦ㄦ銆佸苟鍦ㄦ帴鍙楁湁鍏虫斂搴滈儴闂ㄨ皟鏌ユ椂濡傚疄鎶ュ憡銆�</p>"
        + "<p>4.10	涓轰繚璇佹編婀冪殑姝ｅ父杩愯惀鍙婄敤鎴风殑鑹ソ浣撻獙锛岀敤鎴锋壙璇哄苟淇濊瘉涓嶅埄鐢ㄦ編婀冨埗浣溿€佸鍒躲€佷笂杞姐€佸彂甯冦€佷紶鎾€佽浆杞藉涓嬪唴瀹癸細</p> "
        + "<p>锛�1锛�	铏氬亣淇℃伅锛�</p>"
        + "<p>锛�2锛�	鍚湁浠讳綍楠氭壈鎬х殑銆佷腑浼や粬浜虹殑銆佽颈楠傛€х殑銆佹亹鍚撴€х殑銆佸焊淇楁帆绉界殑銆佹湁鎬ф垨鎬ф殫绀轰互鍙婁换浣曞叾浠栫被浼间俊鎭紱</p>"
        + "<p>锛�3锛�	楠氭壈銆佸瀮鍦惧箍鍛婏紱</p>"
        + "<p>锛�4锛�	娑夊強浠栦汉闅愮銆佷釜浜轰俊鎭垨璧勬枡鐨勪换浣曚俊鎭紱</p>"
        + "<p>锛�5锛�	渚靛浠栦汉鍚嶈獕鏉冦€佽倴鍍忔潈銆佺煡璇嗕骇鏉冦€佸晢涓氱瀵嗙瓑鍚堟硶鏉冪泭鐨勪换浣曚俊鎭紱</p>"
        + "<p>锛�6锛�	鍚湁鍏朵粬骞叉壈婢庢箖姝ｅ父杩愯惀鐨勪俊鎭€�</p>"
        + "<p>4.11	涓虹‘淇濇編婀冨拰鐢ㄦ埛鐨勫埄鐩婏紝鐢ㄦ埛鍦ㄤ娇鐢ㄦ湰骞冲彴鏃讹紝涓嶅緱杩涜濡備笅琛屼负锛堣琛屼负鏄寚浣跨敤璐︽埛鍜屾編婀冩墍杩涜鐨勪换浣曡涓猴紝鍖呮嫭浣嗕笉闄愪簬娉ㄥ唽鐧诲綍銆佽处鍙疯繍钀ャ€佺鐞嗗強鎺ㄥ箍浠ュ強鍏朵粬琛屼负锛夛細</p>"
        + "<p>锛�1锛�	寮哄埗銆佽瀵煎叾浠栫敤鎴峰叧娉ㄣ€佺偣鍑婚摼鎺ラ〉闈㈡垨鍒嗕韩淇℃伅锛�</p>"
        + "<p>锛�2锛�	鏈粡婢庢箖涔﹂潰璁稿彲浣跨敤鎻掍欢銆佸鎸傛垨鍏朵粬绗笁鏂瑰伐鍏枫€佹湇鍔℃帴鍏ユ編婀冿紱</p>"
        + "<p>锛�3锛�	鍒╃敤婢庢箖鍙婂叾鐢ㄦ埛璐﹀彿浠庝簨杩濇硶鐘姜娲诲姩锛�</p>"
        + "<p>锛�4锛�	鍒╃敤婢庢箖鐨勭綉缁滄湇鍔＄郴缁熻繘琛屼换浣曞彲鑳藉浜掕仈缃戞垨绉诲姩缃戞甯歌繍杞€犳垚涓嶅埄褰卞搷鐨勮涓猴紱</p>"
        + "<p>锛�5锛�	鍏朵粬杩濆弽娉曞緥娉曡瑙勫畾銆佷镜鐘編婀冩垨鍏朵粬鐢ㄦ埛鍚堟硶鏉冪泭銆佸共鎵版編婀冩甯歌繍钀ユ垨浠ユ編婀冪殑鍚嶄箟浠庝簨鏈粡婢庢箖鏄庣ず鎺堟潈鐨勮涓恒€�</p>"
        + "<p>4.12	鐢ㄦ埛鎵胯鍦ㄦ湭缁忔編婀冨悓鎰忕殑鎯呭喌涓嬩笉鍒╃敤婢庢箖鎻愪緵鐨勭綉缁滄湇鍔¤繘琛岄攢鍞垨鍏朵粬鍟嗕笟鐢ㄩ€斻€傝嫢鐢ㄦ埛闇€瀵规編婀冨唴瀹瑰垱浣滆鐢熶綔鍝佹垨鍒╃敤婢庢箖骞冲彴杩涜骞垮憡銆佹帹骞跨瓑鍟嗕笟娲诲姩锛岀敤鎴烽』鍚戞編婀冨彟琛屾彁浜や功闈㈢敵璇凤紝鍦ㄧ鍚堟編婀冭瀹氭潯浠跺苟涓斿緱鍒版編婀冨悓鎰忓悗锛岀敤鎴锋柟鍙婢庢箖鍐呭鍒涗綔琛嶇敓鍝併€侀€氳繃婢庢箖杩涜骞垮憡銆佹帹骞跨瓑鍟嗕笟娲诲姩锛屼絾鐢ㄦ埛搴斿綋鑷涓鸿绫诲晢涓氭椿鍔ㄨ礋娉曞緥璐ｄ换锛屾編婀冨苟鏃犱箟鍔″鐢ㄦ埛鐨勪换浣曡涓烘壙鎷呬换浣曡矗浠汇€�</p>"
        + "<p>4.13	鐢ㄦ埛鍚屾剰婢庢箖鏈夋潈鍦ㄦ彁渚涚綉缁滄湇鍔¤繃绋嬩腑浠ュ悇绉嶆柟寮忔姇鏀惧悇绉嶅晢涓氭€у箍鍛婃垨鍏朵粬浠讳綍绫诲瀷鐨勫晢涓氫俊鎭紝骞朵笖鐢ㄦ埛鍚屾剰鎺ュ彈婢庢箖閫氳繃鐢靛瓙閭欢鎴栧叾浠栨柟寮忓悜鐢ㄦ埛鍙戦€佸晢鍝佷績閿€鎴栧叾浠栫浉鍏冲晢涓氫俊鎭€�</p>"
        + "<p>4.14	婢庢箖鍐呰鏈夐€氬線鍏朵粬缃戠珯鍜岀綉椤电殑閾炬帴锛屼絾杩欎簺缃戠珯鍜岀綉椤靛苟闈炵敱婢庢箖缁忚惀鎴栨帶鍒讹紝婢庢箖涓嶅璇ヤ簺缃戠珯鍜岀綉椤靛唴瀹规壙鎷呰矗浠汇€傜敤鎴峰惎鍔ㄤ换浣曟绫婚摼鎺ユ垨缃戦〉鍜�/鎴栫寮€婢庢箖杩涘叆鍏朵粬缃戠珯鎴栫綉椤碉紝鎵€鏈夐闄╁潎鐢辩敤鎴疯嚜琛屾壙鎷咃紝婢庢箖涓嶅姝ゆ壙鎷呬换浣曡矗浠汇€�"
        + "<h3>浜斻€佹編婀冪殑鏉冨埄鍜屼箟鍔�</h3>"
        + "<p>5.1	婢庢箖鎻愪緵鐨勭綉缁滄湇鍔＄殑鍏蜂綋鍐呭鐢辨編婀冩牴鎹疄闄呮儏鍐佃嚜琛屽喅瀹氾紝渚嬪鏂伴椈銆佽棰戙€佹悳绱€佸浘鐗囥€佽鍧�(BBS)銆佸彂琛ㄦ柊闂昏瘎璁虹瓑銆傜敤鎴风悊瑙ｏ紝婢庢箖浠呮彁渚涚浉鍏崇殑缃戠粶鏈嶅姟锛岀敤鎴蜂娇鐢ㄦ編婀冪殑缃戠粶鏈嶅姟鎵€闇€鐨勮澶囷紙濡備釜浜虹數鑴戙€佹墜鏈恒€佸強鍏朵粬涓庢帴鍏ヤ簰鑱旂綉鎴栫Щ鍔ㄧ綉鏈夊叧鐨勮缃級鍙婃墍闇€鐨勮垂鐢紙濡備负鎺ュ叆浜掕仈缃戣€屾敮浠樼殑鐢佃瘽璐瑰強涓婄綉璐广€佷负浣跨敤绉诲姩缃戣€屾敮浠樼殑鎵嬫満璐癸級鍧囧簲鐢辩敤鎴疯嚜琛岃礋鎷呫€�</p>"
        + "<p>5.2	涓轰繚闅滅敤鎴峰拰婢庢箖鐨勫埄鐩婏紝婢庢箖鏈夋潈瀵圭敤鎴锋敞鍐屾椂鎻愪氦鐨勪俊鎭繘琛屽鏌ワ紝骞舵湁鏉冭姹傜敤鎴峰畬鍠勭浉鍏充俊鎭€備絾婢庢箖鐨勫鏌ヤ粎鏄舰寮忓鏌ワ紝婢庢箖涓嶅鐢ㄦ埛鎻愪氦鐨勬潗鏂欏拰淇℃伅鐨勭湡瀹炴€с€佸噯纭€с€佺湡瀹炴€с€佸悎娉曟€ц礋璐ｃ€�</p>"
        + "<p>5.3	閴翠簬缃戠粶鏈嶅姟鐨勭壒娈婃€э紝鐢ㄦ埛鍚屾剰婢庢箖鏈夋潈闅忔椂鍙樻洿銆佹殏鍋溿€侀檺鍒躲€佷腑鏂垨缁堟閮ㄥ垎鎴栧叏閮ㄧ殑缃戠粶鏈嶅姟銆傛編婀冩棤闇€閫氱煡鐢ㄦ埛锛屼篃鏃犻渶瀵逛换浣曠敤鎴锋垨浠讳綍绗笁鏂规壙鎷呬换浣曡矗浠汇€�</p>"
        + "<p>5.4	鐢ㄦ埛鐞嗚В锛屾編婀冮渶瑕佸畾鏈熸垨涓嶅畾鏈熷湴瀵规彁渚涚綉缁滄湇鍔＄殑骞冲彴锛堝浜掕仈缃戠綉绔欍€佺Щ鍔ㄧ綉缁滅瓑锛夋垨鐩稿叧鐨勮澶囪繘琛屾淇垨鑰呯淮鎶わ紝濡傚洜姝ょ被鎯呭喌鑰岄€犳垚鏀惰垂缃戠粶鏈嶅姟鍦ㄥ悎鐞嗘椂闂村唴鐨勪腑鏂紝婢庢箖鏃犻渶涓烘鎵挎媴浠讳綍璐ｄ换銆�</p>"
        + "<p>5.5	濡傜敤鎴疯繚鍙嶆硶寰嬫硶瑙勩€佹湰鍗忚浠讳竴鏉℃鐨勭害瀹氭垨婢庢箖瑙勫垯銆佽鑼冪殑瑙勫畾鐨勶紙鍖呮嫭浣嗕笉闄愪簬鎻愪氦铏氬亣娉ㄥ唽淇℃伅銆佸彂甯冭繚娉曚俊鎭瓑锛夛紝婢庢箖鏈夋潈瑕佹眰鐢ㄦ埛鏀规鎴栫洿鎺ラ噰鍙栦竴鍒囧繀瑕佹帾鏂斤紙鍖呮嫭浣嗕笉闄愪簬鏇存敼鎴栧垹闄ょ敤鎴峰彂甯冨唴瀹广€佷腑鏂垨缁堟鍚戠敤鎴锋彁渚涙湰鍗忚椤逛笅鐨勭綉缁滄湇鍔＄瓑锛夛紝婢庢箖鏃犻渶涓烘瀵圭敤鎴锋垨浠讳綍绗笁鏂规壙鎷呬换浣曡矗浠汇€�</p>"
        + "<p>5.6	濡傛灉鐢ㄦ埛鍋滄浣跨敤鏈湇鍔℃垨鏈嶅姟琚粓姝㈡垨鍙栨秷锛屾編婀冩湁鏉冭嚜涓诲喅瀹氭槸鍚︿粠鏈嶅姟鍣ㄤ笂姘镐箙鍦板垹闄ょ敤鎴风殑鏁版嵁涓旀棤闇€鍚戠敤鎴疯繑杩樹换浣曟暟鎹€�</p>"
        + "<p>5.7	鐢ㄦ埛鍏呭垎鐞嗚В骞跺悓鎰忥細婢庢箖鎻愪緵鐨勭綉缁滄湇鍔′腑鍙兘鍖呮嫭婢庢箖閽堝涓汉鎴栦紒涓氭帹鍑虹殑淇℃伅鍙戝竷鎴栧搧鐗屾帹骞挎湇鍔★紝鐢ㄦ埛鍚屾剰婢庢箖鏈夋潈鍦ㄦ編婀冧互鍚勭鏂瑰紡鎶曟斁鍚勭鍟嗕笟鎬у箍鍛婃垨鍏朵粬浠讳綍绫诲瀷鐨勫晢涓氫俊鎭紝骞朵笖鐢ㄦ埛鍚屾剰鎺ュ彈婢庢箖閫氳繃鐢靛瓙閭欢鎴栧叾浠栨柟寮忓悜鐢ㄦ埛鍙戦€佸晢鍝佷績閿€鎴栧叾浠栫浉鍏冲晢涓氫俊鎭€�</p>"
        + "<p>5.8	鐢ㄦ埛娉ㄥ唽鎴愬姛鍚庯紝鍦ㄤ娇鐢ㄦ編婀冩湇鍔＄殑杩囩▼涓紝婢庢箖鏈夋潈鍩轰簬鐢ㄦ埛鐨勬搷浣滆涓鸿繘琛岄潪鍟嗕笟鎬х殑璋冩煡鐮旂┒銆�</p>"
        + "<h3>鍏€佺煡璇嗕骇鏉�</h3>"
        + "<p>6.1	婢庢箖鎻愪緵鐨勬墍鏈夌綉椤靛唴瀹广€佺綉椤佃璁＄殑鎵€鏈夊唴瀹癸紙鍖呮嫭浣嗕笉闄愪簬鏂囧瓧銆佸浘鐗囥€佸０闊炽€佸綍鍍忋€佸浘琛ㄣ€佹爣蹇椼€佹爣璇嗐€佸箍鍛娿€佸晢鏍囥€佸晢鍙枫€佸煙鍚嶃€佽蒋浠躲€佺▼搴忋€佺増闈㈣璁°€佹帓鐗堟柟寮忋€佷笓鏍忕洰褰曚笌鍚嶇О銆佸唴瀹瑰垎绫绘爣鍑嗗強澶氬獟浣撳舰寮忕殑鏂伴椈锕戜俊鎭瓑锛夌綉缁滄湇鍔′腑鍖呭惈鐨勬爣璇嗐€佺増闈㈣璁°€佹帓鐗堟柟寮忋€佹枃鏈€佸浘鐗囥€佸浘褰㈢瓑鍧囧彈鎴戝浗鐩稿叧娉曞緥鍙婇€傜敤涔嬪浗闄呭叕绾︿腑鏈夊叧钁椾綔鏉冦€佸晢鏍囨潈銆佷笓鍒╂潈鍙�/鎴栧叾浠栬储浜ф墍鏈夋潈娉曞緥鐨勪繚鎶わ紝涓烘編婀冨強/鎴栫浉鍏虫潈鍒╀汉涓撳睘鎵€鏈夋垨鎸佹湁銆�</p>"
        + "<p>6.2	鏈粡婢庢箖鍙�/鎴栫浉鍏虫潈鍒╀汉鏄庣‘涔﹂潰鎺堟潈锛屼换浣曚汉涓嶅緱浠ュ鍒躲€佽浆杞姐€佷笅杞姐€佹憳缂栥€佷慨鏀广€侀摼鎺ャ€佽浆甯栥€佸湪闈炴編婀冩墍灞炵殑鏈嶅姟鍣ㄤ笂鍋氶暅鍍忔垨浠ュ叾浠栫洿鎺ャ€侀棿鎺ュ舰寮忎娇鐢ㄥ墠杩版編婀冩彁渚涚殑鎵€鏈夌綉椤靛唴瀹广€佺綉椤佃璁＄殑鎵€鏈夊唴瀹广€�</p>"
        + "<p>6.3	鐢ㄦ埛鍦ㄦ編婀冨彂琛ㄦ垨涓婁紶鍒版編婀冿紙鍖呮嫭浣嗕笉闄愪簬婢庢箖闂惂銆佹柊闂昏瘎璁恒€佽鍧涚瓑锛夌殑浠讳綍鍘熷垱鍐呭锛岃憲浣滄潈褰掔敤鎴锋湰浜烘墍鏈夛紝鐢ㄦ埛鍙緷娉曡嚜琛屾巿鏉冪涓夋柟浣跨敤銆傜涓夋柟鎷熻幏寰楀悎娉曟巿鏉冪殑锛屽簲鎸夋湁鍏冲浗闄呭叕绾﹀拰涓崕浜烘皯鍏卞拰鍥芥硶寰嬬殑鏈夊叧瑙勫畾閫氱煡婢庢箖鍙婅憲浣滄潈浜哄苟鏀粯鐗堟潈璐圭敤銆傜涓夋柟鑾峰緱鍚堟硶鎺堟潈鍚庯紝搴斿湪鎺堟潈鑼冨洿鍐呬娇鐢紝骞跺簲褰撳湪璇ョ瓑浣滃搧鐨勬鏂囧紑澶寸殑鏄捐憲浣嶇疆娉ㄦ槑鍘熶綔鑰呭鍚嶃€佸師濮嬮摼鎺ヤ互鍙娾€滄潵婧愪簬婢庢箖锛屾湭缁忔巿鏉冧笉寰楄浆杞解€濆瓧鏍枫€� </p>"
        + "<p>6.4	涓轰簡淇冭繘鐭ヨ瘑鐨勫垎浜拰浼犳挱锛岀敤鎴蜂竴缁忔敞鍐屽苟鍦ㄦ編婀冧笂鍙戝竷浠讳綍鍘熷垱鍐呭锛屽嵆涓哄悓鎰忔巿浜堟編婀冨湪鍏ㄤ笘鐣岃寖鍥村唴涓嶉檺褰㈠紡鍜岃浇浣撳湴瀵瑰墠杩扮敤鎴峰彂琛ㄧ殑鍏ㄩ儴鍘熷垱鍐呭浜湁姘镐箙鐨勩€佷笉鍙挙閿€鐨勩€佸厤璐圭殑銆侀潪鐙鐨勪娇鐢ㄦ潈鍜岃浆鎺堟潈鐨勬潈鍒╋紝鍖呮嫭浣嗕笉闄愪簬锛氫娇鐢ㄣ€佷慨鏀广€佸鍒躲€佸彂琛屻€佸嚭绉熴€佸睍瑙堛€佹憚鍒躲€佹敼缂栥€佹眹缂栥€佹暣鐞嗐€佹敞閲娿€佸嚭鐗堬紙鍚粨闆嗗嚭鐗堬級銆佺炕璇戙€佷俊鎭綉缁滀紶鎾€佸箍鎾€佽〃婕斻€佹嵁浠ュ垱浣滆鐢熶綔鍝佸強钁椾綔鏉冩硶绛夋硶寰嬫硶瑙勬墍瑙勫畾鐨勮憲浣滆储浜ф潈鍒╋紝婢庢箖鏈夋潈灏嗚绛夌敤鎴峰師鍒涘唴瀹圭敤浜庢編婀冨悇绉嶅舰鎬佺殑浜у搧銆佷綔鍝併€佸獟浣撳拰鎶€鏈腑锛屽寘鎷絾涓嶉檺浜庣綉绔欍€佸悇绫昏绠楁満搴旂敤绋嬪簭銆佺數瀛愭姤鍒婃潅蹇椼€佸叾浠栦簰鑱旂綉浜у搧銆佸钩闈㈠嚭鐗堢墿绛夈€傜敤鎴锋巿鏉冨叾浠栫涓夋柟浣跨敤鍏跺彂琛ㄥ湪婢庢箖涓婄殑鍘熷垱鍐呭鏃朵笉寰楁崯瀹虫垨濡ㄧ婢庢箖鍓嶈堪鍏ㄩ儴鎴栭儴鍒嗘潈鍒╃殑琛屼娇銆�</p>"
        + "<p>6.5	鐢ㄦ埛鍦ㄦ編婀冨彂琛ㄦ垨涓婁紶鐨勫唴瀹硅嫢闈炵敤鎴峰師鍒涳紝鐢ㄦ埛搴斾繚璇佸叾宸插彇寰楄憲浣滄潈浜烘垨鐩稿叧鏉冨埄浜虹殑鍚堟硶鎺堟潈銆�</p>"
        + "<p>6.6	鐢ㄦ埛鍧囧簲淇濊瘉鍏跺湪婢庢箖涓婂彂琛ㄦ垨涓婁紶鐨勪换浣曞唴瀹逛笉杩濆弽娉曞緥娉曡銆佹湭渚电姱浠讳綍绗笁鏂圭殑鍚堟硶鏉冪泭銆傛編婀冩湁鏉冧絾鏃犱箟鍔″鐢ㄦ埛鍙戣〃鎴栦笂浼犵殑鍐呭杩涜瀹℃牳锛屽鏋滄編婀冨彂鐜版垨鑰呯涓夋柟涓诲紶鐢ㄦ埛鍙戣〃鎴栦笂浼犵殑鍐呭娑夊珜杩濇硶鎴栦镜鏉冪殑锛屾編婀冩湁鏉冩牴鎹€婁镜鏉冭矗浠绘硶銆嬨€婁俊鎭綉缁滀紶鎾潈淇濇姢鏉′緥銆嬬瓑娉曞緥娉曡鍙婃編婀冪珯鐨勭浉鍏宠鑼冨渚垫潈淇℃伅閲囧彇鍒犻櫎绛夊鐞嗘柟寮忥紝骞舵湁鏉冭拷绌剁敤鎴风殑娉曞緥璐ｄ换銆傜粰婢庢箖鎴栦换浣曠涓夋柟閫犳垚鎹熷け鐨勶紝鐢ㄦ埛搴旇礋璐ｅ叏棰濊禂鍋裤€�</p>"
        + "<p>6.7	濡傛灉浠讳綍绗笁鏂逛镜鐘簡鐢ㄦ埛鐩稿叧鐨勬潈鍒╂垨鑰呮湭鎸夌収鈥滅煡璇嗕骇鏉冩潯娆锯€濈害瀹氫娇鐢ㄨ浇浜庢編婀冪殑鍐呭鐨勶紝鐢ㄦ埛鍚屾剰鎺堟潈婢庢箖鎴栨編婀冩寚瀹氱殑浠ｇ悊浜轰唬琛ㄦ編婀冭嚜韬垨鐢ㄦ埛杩界┒鍏剁浉鍏虫硶寰嬭矗浠伙紝鍖呮嫭浣嗕笉闄愪簬瀵硅绗笁鏂规彁鍑鸿鍛娿€佹姇璇夈€佸彂璧疯鏀挎墽娉曘€佸崟鐙彁璧疯瘔璁笺€佽繘琛屼笂璇夋垨璋堝垽鍜岃В锛屽苟涓旂敤鎴峰悓鎰忓湪婢庢箖璁や负蹇呰鐨勬儏鍐典笅鍙備笌鍏卞悓缁存潈銆�</p>"
        + "<p>6.8	婢庢箖鎵€杞浇銆侀摼鎺ョ殑鍐呭锛屽嚭浜庝紶閫掓洿澶氫俊鎭箣鐩殑锛屽苟涓嶆剰鍛崇潃璧炲悓鍏惰鐐规垨璇佸疄鍏跺唴瀹圭殑鐪熷疄鎬с€佸噯纭€с€�</p>"
        + "<p>6.9	婢庢箖瀵逛簬鐢ㄦ埛鎵€鍙戝竷鐨勫唴瀹逛粎浠ｈ〃鐢ㄦ埛鑷繁鐨勭珛鍦哄拰瑙傜偣锛屽苟涓嶄唬琛ㄦ編婀冪殑绔嬪満鍜岃鐐癸紝鐢ㄦ埛浣滀负鍐呭鐨勫彂琛ㄨ€呮垨涓婁紶鑰咃紝搴旇嚜琛屽鍏跺彂琛ㄦ垨涓婁紶鐨勫唴瀹瑰紩鍙戠殑鐭ヨ瘑浜ф潈銆佸悕瑾夋潈銆侀殣绉佹潈绛夌籂绾枫€佹崯澶辨壙鎷呯浉鍏虫硶寰嬭矗浠诲苟搴旂敱鐢ㄦ埛鑷璐熻矗濡ュ杽瑙ｅ喅銆傛編婀冧笉瀵规鎵挎媴浠讳綍娉曞緥鍙婅繛甯﹁矗浠汇€�</p>"
        + "<h3>涓冦€佸厤璐ｅ０鏄�</h3>"
        + "<p><span style=\'font-weight:bold;\'>7.1	鐢ㄦ埛鏄庣‘鍚屾剰鍏朵娇鐢ㄦ編婀冪殑缃戠粶鏈嶅姟鎵€瀛樺湪鐨勯闄╁強涓€鍒囧悗鏋滃皢瀹屽叏鐢辩敤鎴锋湰浜烘壙鎷咃紝婢庢箖瀵规涓嶆壙鎷呬换浣曡矗浠汇€�</p>"
        + "<p><span style=\'font-weight:bold;\'>7.2	婢庢箖鏃犳硶淇濊瘉鍏舵彁渚涚殑缃戠粶鏈嶅姟涓€瀹氳兘婊¤冻鐢ㄦ埛鐨勮姹傦紝涓嶄繚璇佺綉缁滄湇鍔＄殑鍙婃椂鎬с€佸畨鍏ㄦ€с€佸噯纭€с€佷篃涓嶄繚璇佺綉缁滄湇鍔′笉浼氫腑鏂€� </p>"
        + "<p><span style=\'font-weight:bold;\'>7.3	婢庢箖涓嶄繚璇佷负鏂逛究鐢ㄦ埛鑰岃缃殑澶栭儴閾炬帴鐨勫噯纭€у拰瀹屾暣鎬э紝鍚屾椂锛屽浜庤绛夊閮ㄩ摼鎺ユ寚鍚戠殑涓嶇敱婢庢箖瀹為檯鎺у埗鐨勪换浣曠綉椤典笂鐨勫唴瀹癸紝婢庢箖涓嶆壙鎷呬换浣曡矗浠汇€�</p>"
        + "<p><span style=\'font-weight:bold;\'>7.4	瀵逛簬鍥犱笉鍙姉鍔涙垨婢庢箖涓嶈兘鎺у埗鐨勫師鍥犻€犳垚鐨勭綉缁滄湇鍔′腑鏂垨鍏跺畠缂洪櫡锛屾編婀冧笉鎵挎媴浠讳綍璐ｄ换锛屼絾灏嗗敖鍔涘噺灏戝洜姝よ€岀粰鐢ㄦ埛閫犳垚鐨勬崯澶卞拰褰卞搷銆�</p>"
        + "<p><span style=\'font-weight:bold;\'>7.5	鐢ㄦ埛鍥犵涓夋柟濡傜數淇￠儴闂ㄧ殑閫氳绾胯矾鏁呴殰銆佹妧鏈棶棰樸€佺綉缁溿€佺數鑴戞晠闅溿€佺郴缁熶笉绋冲畾鎬у強绫讳技鍘熷洜鑰岄伃鍙楃殑涓€鍒囨崯澶憋紝婢庢箖涓嶆壙鎷呰矗浠汇€�</p>"
        + "<p><span style=\'font-weight:bold;\'>7.6	涓婅堪鍏嶈矗澹版槑閫傜敤浜庝换浣曢潪鍥犳編婀冭繃閿欏鑷寸殑涓嶅饱琛屻€侀敊璇€佺枏蹇姐€佷腑鏂€佸垹闄ゃ€佺己闄枫€佹搷浣滄垨浼犺緭杩熷欢銆佺數鑴戠梾姣掋€侀€氫俊绾胯矾鏁呴殰銆佸け绐冩垨鐮村潖鎴栨湭缁忔巿鏉冭闂€佺鏀规垨浣跨敤 (鏃犺鏄繚绾︺€佷镜鏉冦€佽繃澶辨垨浠讳綍鍏朵粬璇夊洜) 鑰岄€犳垚鐨勪换浣曟崯瀹炽€佽矗浠绘垨浼ゅ銆�</p>"
        + "<p><span style=\'font-weight:bold;\'>7.7	瀵逛簬婢庢箖鍚戠敤鎴锋彁渚涚殑涓嬪垪浜у搧鎴栬€呮湇鍔＄殑璐ㄩ噺缂洪櫡鏈韩鍙婂叾寮曞彂鐨勪换浣曟崯澶憋紝婢庢箖鏃犻渶鎵挎媴浠讳綍璐ｄ换锛�</p>"
        + "<p><span style=\'font-weight:bold;\'>锛�1锛�	婢庢箖鍚戠敤鎴峰厤璐规彁渚涚殑鍚勯」缃戠粶鏈嶅姟锛� </p>"
        + "<p><span style=\'font-weight:bold;\'>锛�2锛�	婢庢箖鍚戠敤鎴疯禒閫佺殑浠讳綍浜у搧鎴栬€呮湇鍔★紱</p>"
        + "<p><span style=\'font-weight:bold;\'>锛�3锛�	婢庢箖鍚戞敹璐圭綉缁滄湇鍔＄敤鎴烽檮璧犵殑鍚勭浜у搧鎴栬€呮湇鍔°€�</p>"
        + "<p><span style=\'font-weight:bold;\'>7.8	婢庢箖淇濈暀鍦ㄤ换浣曟椂鍊欎笉缁忛€氱煡杩涜浠ヤ笅浠讳綍琛屼负鐨勬潈鍒╋細</p>"
        + "<p><span style=\'font-weight:bold;\'>锛�1锛�	鍩轰簬浠讳綍鍘熷洜锛屼慨鏀广€佷腑姝㈡垨缁堟婢庢箖鎴栧叾浠讳綍閮ㄥ垎鐨勮繍琛屾垨璁块棶锛�</p>"
        + "<p><span style=\'font-weight:bold;\'>锛�2锛�	淇敼鎴栧彉鏇存編婀冩垨鍏朵换浣曢儴鍒嗗強浠讳綍閫傜敤瑙勫垯銆佽鑼冩垨鏉℃锛�</p>"
        + "<p><span style=\'font-weight:bold;\'>锛�3锛�	鍦ㄨ繘琛屽畾鏈熸垨闈炲畾鏈熺淮鎶ゃ€侀敊璇籂姝ｆ垨鍏朵粬鍙樻洿鎵€蹇呴』鏃讹紝涓柇婢庢箖鎴栧叾浠讳綍閮ㄥ垎鐨勮繍琛屻€�</span>"
        + "<h3>鍏€佹硶寰嬭矗浠�</h3>"
        + "<p>8.1	鐢ㄦ埛鐞嗚В骞惰鍙紝婢庢箖涓烘彁渚涗俊鎭垎浜€佷紶鎾強鑾峰彇鐨勫钩鍙帮紝鐢ㄦ埛鍦ㄤ娇鐢ㄦ編婀冩椂锛岃鐢ㄦ埛鑷瀵瑰唴瀹瑰姞浠ュ垽鏂紝骞舵壙鎷呭洜浣跨敤鍐呭鑰屽紩璧风殑鎵€鏈夐闄┿€傜敤鎴烽』涓鸿嚜宸辨敞鍐岃处鎴蜂笅鐨勪竴鍒囪涓鸿礋璐ｏ紝鍖呮嫭鐢ㄦ埛鎵€鍙戣〃鍐呭鐨勭湡瀹炴€с€佸悎娉曟€с€佸噯纭€с€佹湁鏁堟€э紝浠ュ強鎵挎媴鍥犺处鍙蜂娇鐢ㄣ€佽繍钀ャ€佺鐞嗚涓轰骇鐢熺殑缁撴灉銆傛編婀冩棤娉曚笖涓嶄細瀵瑰洜鐢ㄦ埛鐨勮涓鸿€屽鑷寸殑椋庨櫓鎹熷け鎴栨崯瀹虫壙鎷呰矗浠汇€傚鏋滅敤鎴峰彂鐜颁换浣曚汉杩濆弽鏈崗璁瀹氭垨浠ュ叾浠栦笉褰撶殑鏂瑰紡浣跨敤婢庢箖鏈嶅姟锛岃绔嬪嵆涓炬姤鎴栨姇璇夛紝婢庢箖灏嗕緷娉曡繘琛屽鐞嗐€�</p>"
        + "<p>8.2	瀵硅繚鍙嶆湁鍏虫硶寰嬫硶瑙勬垨鏈崗璁瀹氱殑琛屼负锛屾編婀冨皢渚濇硶寰嬭瀹氬強涓婅堪瑙勫垯绛夊姞浠ュ悎鐞嗗垽鏂繘琛屽鐞嗭紝瀵硅繚娉曡繚瑙勭殑浠讳綍浜哄＋閲囧彇閫傚綋鐨勬硶寰嬭鍔紝骞朵緷鎹硶寰嬫硶瑙勪繚瀛樻湁鍏充俊鎭苟鍚戞湁鍏抽儴闂ㄦ姤鍛婄瓑銆�</p>"
        + "<p>8.3	鑻ョ敤鎴蜂笂浼犮€佸彂甯冪殑鍐呭鎴栧叾浠栧湪婢庢箖涓婁粠浜嬬殑琛屼负渚靛浠栦汉鍒╃泭骞跺紩鍙戠涓夋柟鐨勪换浣曠储璧斻€佽姹傛垨璧斿伩鐨勶紝闇€鐢辩敤鎴锋壙鎷呭叏閮ㄦ硶寰嬭矗浠汇€傝嫢鍥犳缁欐編婀冩垨绗笁鏂归€犳垚浠讳綍鎹熷け锛岀敤鎴峰簲璐熻矗璧斿伩骞朵娇涔嬪厤鍙楁崯瀹筹紝鎹熷け鍖呮嫭浣嗕笉闄愪簬璇夎璐圭敤銆佸緥甯堣垂鐢ㄣ€佸拰瑙ｈ垂鐢ㄣ€佺綒娆炬垨鐢熸晥娉曞緥鏂囦功涓瀹氱殑鎹熷璧斿伩閲戦鍙婂叾浠栫洿鎺ユ垨闂存帴鏀嚭璐圭敤銆�</p>"
        + "<p>8.4	鑻ユ編婀冨彂鐜版湁鐢ㄦ埛涓嶅綋浣跨敤鐢ㄦ埛璐﹀彿鎴栨湁鐢ㄦ埛璐﹀彿琚粬浜轰妇鎶ユ姇璇夋椂锛屾編婀冩湁鏉冧笉缁忛€氱煡闅忔椂鍒犻櫎鐩稿叧鍐呭锛屽苟瑙嗙敤鎴疯涓烘儏鑺傚杩濊璐﹀彿杩涜澶勭悊锛屽鐞嗘柟寮忓寘鎷絾涓嶉檺浜庤鍛娿€佸垹闄ら儴鍒嗘垨鍏ㄩ儴璁㈤槄鐢ㄦ埛銆侀檺鍒舵垨绂佹浣跨敤鍏ㄩ儴鎴栭儴鍒嗗姛鑳姐€佽处鍙峰皝绂佺敋鑷虫敞閿€锛屽苟鏈夋潈瑙嗗叿浣撴儏鍐佃€屽叕鍛婂鐞嗙粨鏋溿€�</p>"
        + "<p>8.5	濡傚洜婢庢箖杩濆弽鏈夊叧娉曞緥銆佹硶瑙勬垨鏈崗璁」涓嬬殑浠讳綍鏉℃鑰岀粰鐢ㄦ埛閫犳垚鎹熷け锛屾編婀冨悓鎰忓鐢辨閫犳垚鐨勭敤鎴风洿鎺ユ崯澶辨壙鎷呰禂鍋胯矗浠汇€備絾婢庢箖瀵圭敤鎴蜂娇鐢ㄧ綉缁滄湇鍔℃墍浜х敓鐨勪换浣曢棿鎺ャ€佸伓鐒躲€佺壒娈婂強缁ц捣鐨勬崯瀹充笉璐熻矗浠伙紝杩欎簺鎹熷鍙兘鏉ヨ嚜锛氫笉姝ｅ綋浣跨敤缃戠粶鏈嶅姟銆佸湪缃戜笂璐拱鍟嗗搧鎴栬繘琛屽悓绫诲瀷鏈嶅姟銆佸湪缃戜笂杩涜浜ゆ槗銆侀潪娉曚娇鐢ㄧ綉缁滄湇鍔℃垨鐢ㄦ埛浼犻€佺殑淇℃伅鏈夋墍鍙樺姩銆�</p>"
        + "<h3>涔濄€佸崗璁殑淇敼</h3>"
        + "<p>9.1	鏍规嵁浜掕仈缃戠殑鍙戝睍鍜屾湁鍏虫硶寰嬨€佹硶瑙勫強瑙勮寖鎬ф枃浠剁殑鍙樻洿锛屾垨鑰呭洜婢庢箖鑷韩涓氬姟鍙戝睍闇€瑕侊紝婢庢箖鏈夋潈闅忔椂淇敼鏈崗璁殑浠讳綍鏉℃锛屼竴鏃︽湰鍗忚鐨勫唴瀹瑰彂鐢熷彉鍔紝婢庢箖灏嗕細鐩存帴鍦ㄧ綉绔欎笂鍏竷淇敼涔嬪悗鐨勫崗璁唴瀹癸紝璇ュ叕甯冭涓鸿涓烘編婀冨凡缁忛€氱煡鐢ㄦ埛淇敼鍐呭銆傛編婀冧篃鍙嚜琛屽喅瀹氶€氳繃鍏朵粬閫傚綋鏂瑰紡鍚戠敤鎴锋彁绀轰慨鏀瑰唴瀹广€�</p>"
        + "<p>9.2	鐢ㄦ埛搴斿綋鍙婃椂瀹氭湡銆佸強鏃舵煡鐪嬫洿鏂板悗鐨勫崗璁紝濡傛灉鐢ㄦ埛涓嶅悓鎰忔編婀冨鏈崗璁浉鍏虫潯娆炬墍鍋氱殑淇敼锛岀敤鎴锋湁鏉冨仠姝娇鐢ㄦ編婀冩彁渚涚殑缃戠粶鏈嶅姟銆傚鏋滅敤鎴风户缁娇鐢ㄦ編婀冩彁渚涚殑缃戠粶鏈嶅姟锛屽垯瑙嗕负鐢ㄦ埛鎺ュ彈婢庢箖瀵规湰鍗忚鐩稿叧鏉℃鎵€鍋氱殑淇敼銆�</p>"
        + "<h3>鍗併€侀€氱煡閫佽揪</h3>"
        + "<p>10.1	鏈崗璁」涓嬫編婀冨浜庣敤鎴锋墍鏈夌殑閫氱煡鍧囧彲閫氳繃缃戦〉鍏憡銆佺數瀛愰偖浠躲€佹墜鏈虹煭淇℃垨甯歌鐨勪俊浠朵紶閫佺瓑鏂瑰紡杩涜锛涙編婀冨彂鍑鸿绛夐€氱煡涔嬫棩瑙嗕负宸查€佽揪鏀朵欢浜轰箣鏃ャ€�</p>"
        + "<p>10.2	鐢ㄦ埛瀵逛簬婢庢箖鐨勯€氱煡搴斿綋閫氳繃婢庢箖瀵瑰姝ｅ紡鍏竷鐨勯€氫俊鍦板潃銆佷紶鐪熷彿鐮併€佺數瀛愰偖浠跺湴鍧€绛夎仈绯讳俊鎭繘琛岄€佽揪銆�"
        + "<h3>鍗佷竴銆佹硶寰嬬杈�</h3>"
        + "<p>11.1	鏈崗璁殑鎴愮珛銆佺敓鏁堛€佸饱琛屻€佽В閲婂強浜夎瑙ｅ喅锛岄兘閫傜敤涓浗娉曞緥骞跺彈涓浗娉曢櫌绠¤緰銆�</p>"
        + "<p>11.2	濡傚弻鏂瑰氨鏈崗璁唴瀹规垨鍏舵墽琛屽彂鐢熶换浣曚簤璁紝鍙屾柟搴斿敖閲忓弸濂藉崗鍟嗚В鍐炽€傚崗鍟嗕笉鎴愭椂锛屼换浣曚竴鏂瑰潎搴斿悜婢庢箖鎵€鍦ㄥ湴鏈夌杈栨潈鐨勪汉姘戞硶闄㈡彁璧疯瘔璁笺€�</p>"
        + "<h3>鍗佷簩銆佸叾浠栬瀹�</h3>"
        + "<p>12.1	鐢ㄦ埛鍜屾編婀冨潎鏄嫭绔嬬殑涓讳綋锛屽湪浠讳綍鎯呭喌涓嬫湰鍗忚涓嶆瀯鎴愬弻鏂逛箣闂寸殑浠ｇ悊銆佸悎浼欍€佸悎钀ユ垨闆囦剑鍏崇郴銆�</p>"
        + "<p>12.2	婢庢箖閽堝鍏ㄩ儴缃戠粶鏈嶅姟鐨勪娇鐢ㄥ拰/鎴栨煇浜涚壒瀹氱綉缁滄湇鍔＄殑浣跨敤閫氳繃鍚勭鏂瑰紡锛堝寘鎷絾涓嶉檺浜庣綉椤靛叕鍛娿€佺數瀛愰偖浠躲€佺煭淇℃彁閱掔瓑锛変綔鍑虹殑浠讳綍澹版槑銆侀€氱煡銆佽绀虹瓑鍐呭浠ュ強婢庢箖鍏竷鐨勪换浣曡鍒欍€佽鑼冨潎涓烘湰鍗忚鐨勪竴閮ㄥ垎锛岀敤鎴峰浣跨敤璇ョ瓑婢庢箖鐨勭綉缁滄湇鍔★紝瑙嗕负鐢ㄦ埛鍚屾剰璇ョ瓑澹版槑銆侀€氱煡銆佽绀恒€佽鍒欍€佽鑼冪殑鍐呭銆�</p>"
        + "<p>12.3	鏈崗璁瀯鎴愬弻鏂瑰鏈崗璁箣绾﹀畾浜嬮」鍙婂叾浠栨湁鍏充簨瀹滅殑瀹屾暣鍗忚锛岄櫎鏈崗璁瀹氱殑涔嬪锛屾湭璧嬩簣鏈崗璁悇鏂瑰叾浠栨潈鍒┿€�</p>"
        + "<p>12.4	鏈崗璁换浣曟潯娆炬棤璁哄洜浣曠鍘熷洜閮ㄥ垎鏃犳晥鎴栦笉鍙墽琛岋紝鍏朵綑鏉℃浠嶆湁鏁堬紝瀵规湰鍗忚鍚勬柟鍏锋湁绾︽潫鍔涖€�</p>"
        + "<p><span style=\'font-weight:bold;\'><u>12.5	婢庢箖閮戦噸鎻愰啋鐢ㄦ埛娉ㄦ剰鏈崗璁腑鍏嶉櫎婢庢箖璐ｄ换鍜岄檺鍒剁敤鎴锋潈鍒╃殑鏉℃锛岃鐢ㄦ埛浠旂粏闃呰锛岃嚜涓昏€冭檻椋庨櫓銆�</u></span>鏈垚骞翠汉搴斿湪娉曞畾鐩戞姢浜虹殑闄悓涓嬮槄璇绘湰鍗忚銆�</p>"
        + "<p>12.6	鏈崗璁腑鐨勬爣棰樹粎涓烘柟渚胯€岃锛屽湪瑙ｉ噴鏈崗璁椂搴旇蹇界暐銆�</p>"
        + "<p>12.7	鍦ㄦ硶寰嬭瀹氱殑鑼冨洿鍐咃紝鏈崗璁殑鏈€缁堣В閲婃潈褰掓編婀冩墍鏈夈€�</p>"
        + "  </div>";

    return lgAgreementHtml;
}
function weiboLoginShowAgree(callback) {
    btscroll = document.documentElement.scrollTop || document.body.scrollTop;
    $('body,html').animate({
        scrollTop: 0
    }, 10);

    wdscancer();
    var lgAgreementHtml = getLgAgreementHtml();
    var html = "<div class=\"lg_wds_pst \" id=\"weibo_agree_panel\"><div class='lg_pd10'><div class='lg_wds lg_wds_weiboagree'> "
        + "<div class=\"lg_wds_title\">娉ㄥ唽鍗忚</div>"
        + lgAgreementHtml
        + "<div class=\"lg_wds_rmmi\">"
        + "   <span class=\"lg_rem\"><input type=\"checkbox\" id=\"weibo_agreement\" >&nbsp;&nbsp;鍚屾剰鐩稿叧<font style=\"color:#00a5eb;cursor: pointer;\">娉ㄥ唽鍗忚</font></span>"
        + "</div>"
        + "<div class=\"wds_close\" onclick=\"wdscancer()\"></div>"
        + "<div class=\"lg_wds_bt\" id=\"weibo_agree_Ok\">纭� 瀹�</div>"
        + "</div></div>";
    $(document.body).append(html);
    $(".lg_wds_bt").css("background-color", "#7a7a7a");
    $("#bg_overlay").css('display', 'block');

    $("#weibo_agreement").click(function () {
        var regagreement = document.getElementById("weibo_agreement");
        // checking agreement toggle css 
        if (regagreement.checked) {
            $(".lg_wds_bt").css("background-color", "#00a5eb");
        } else {
            $(".lg_wds_bt").css("background-color", "#7a7a7a");
        }
    });
    $("#weibo_agree_Ok").click(function () {
        if (document.getElementById("weibo_agreement").checked) {
            if (callback) callback();
            $("#weibo_agree_panel").remove();
            $("#bg_overlay").css('display', 'none');
        }
    })
}
function esda(data, jid) {
    var kd = "";
    var kdstr = "";
    var py = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex); pyd = py;
    $.ajax({ type: "POST", url: "/wap/getVerCodeE.msp?iv=" + py, async: false, cache: false, success: function (ret) { kdstr = ret; } });
    var iv = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
    kd = CryptoJS.enc.Utf8.parse(kdstr);
    md = CryptoJS.mode.CBC;
    var edt = CryptoJS.AES.encrypt(data + "|" + kdstr, kd, { iv: CryptoJS.enc.Hex.parse(py), mode: md, padding: CryptoJS.pad.Pkcs7 });
    return encodeURIComponent(edt);
}
function registermsgwdsshow(type) {
    var mail = $('#registerwds_mail').val();
    var verCode = $('#registerwds_dynCode').val();
    var verType = type || 1; //楠岃瘉鐮佺被鍨嬶細1-娉ㄥ唽;2-淇敼閭;3-蹇樿瀵嗙爜

    if (mail == "" || mail == "鎵嬫満鍙�") {
        $('#register_msg').html("璇疯緭鍏ユ偍瑕佺櫥褰曠殑鎵嬫満鍙�");
        return false;
    } else if (!isPhone(mail)) {
        $('#register_msg').html("杈撳叆鐨勬墜鏈哄彿涓嶆纭�");
        return false;
    }
    if (verCode == "" || verCode == "杈撳叆閭€璇风爜") {
        $('#register_msg').html("璇疯緭鍏ラ個璇风爜");
        return;
    }
    var lgAgreementHtml = getLgAgreementHtml();
    mail = encodeURIComponent(mail);
    $.ajax({
        type: "post",
        url: "/wap/checkVerCode.msp",
        data: "verType=" + verType + "&mail=" + mail + "&verCode=" + verCode,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                $('body,html').animate({
                    scrollTop: 0
                }, 10);
                if (verType == 5) {
                    bindMobSucc();
                } else {
                    $(document.body).append("<div class=\"lg_wds_pst\" id=\"registermsgwds\">"
                        + "<div class=\"lg_pd10\">"
                        + "<div class=\"lg_wds\">"
                        + "  <div class=\"lg_wds_title\">娉ㄥ唽</div>"
                        + "  <div class=\"lg_wds_prompt\">璇峰～鍐欎互涓嬫敞鍐屼俊鎭�</div>"
                        + "  <div class=\"lg_wds_inp\" style=\"margin-top:0px;\"><input id=\"registermsg_name\" type=\"text\" maxlength=\"20\" class=\"wds_input\" tabindex=\"1\" onFocus=\"if(this.value==\'璁剧疆鐢ㄦ埛鍚峔'){this.value=\'\';document.getElementById(\'registermsg_name\').style.color=\'#333\';}\" onBlur=\"if(this.value==\'\'){this.value=\'璁剧疆鐢ㄦ埛鍚峔';document.getElementById(\'registermsg_name\').style.color=\'#999\';};\" value=\"璁剧疆鐢ㄦ埛鍚峔" ></div > "
                        + "  <div class=\"lg_wds_prompt2\">璇疯緭鍏�4-20瀛楃</div>"
                        + "  <div class=\"lg_wds_inp\" style=\"margin-top:0px;\"><input id=\"registermsg_pwd\" type=\"password\" maxlength=\"12\" class=\"wds_input\" tabindex=\"2\" style=\"display: none;\" onblur=\"showText(\'registermsg_pwd_text\',\'registermsg_pwd\',\'瀵嗙爜\');\" ><input style=\"color: #999;\" class=\"wds_input\" tabindex=\"2\" id=\"registermsg_pwd_text\" type=\"text\" value=\"瀵嗙爜\" onfocus=\"showPassWord(\'registermsg_pwd_text\',\'registermsg_pwd\')\"></div>"
                        + "  <div class=\"lg_wds_prompt2\">璇疯緭鍏�6-12鏁板瓧鎴栧瓧姣�</div>"
                        + "  <div class=\"lg_wds_rmmi\">"
                        + "    <span class=\"lg_rem\"><input type=\"checkbox\" id=\"register_agreement\" checked=\"checked\">&nbsp;&nbsp;鍚屾剰鐩稿叧<font onclick=\"agreementshow()\" style=\"color:#00a5eb;cursor: pointer;\">娉ㄥ唽鍗忚</font></span>"
                        + "  </div>"
                        + lgAgreementHtml
                        + "  <div class=\"lg_wds_ts\" id=\"register2_msg\"></div>"
                        + "  <div class=\"lg_wds_bt\" onclick=\"register()\">瀹� 鎴�</div>"
                        + ""
                        + "  <div class=\"lg_wds_tplg\" style=\"width:118px;margin:12px 0 6px;\">"
                        + "    <span>宸叉湁璐︽埛锛岄┈涓�<font onclick=\"lgwdsshow()\" style=\"color:#00a5eb;cursor: pointer;\">鐧诲綍</font></span>"
                        + "  </div>"
                        + "  <div class=\"lg_wds_tplg\" style=\"margin:12px 0 6px;\">"
                        + "    <span>绀句氦璐﹀彿鐩存帴鐧诲綍</span>"
                        + "    <a href=\"javascript:weibologin(\'DOUBAN\');\" class=\"tplgrr\"></a>"
                        + "    <a href=\"javascript:weibologin(\'TENCENT\');\" class=\"tplgtx\"></a>"
                        + "    <a href=\"javascript:weibologin(\'SINA\');\" class=\"tplgsn\"></a>"
                        + "  </div>"
                        + "  <div class=\"wds_close\" onclick=\"wdscancer()\"></div>"
                        + ""
                        + "</div>"
                        + "</div>"
                        + "</div>");

                    $("#registermsgwds").siblings(".lg_wds_pst").css("display", "none");
                    $("#bg_overlay").css('display', 'block');
                    //$("#registermsgwds").css('display', '');
                    $('#registermsg_name').val('');
                    $('#registermsg_name').blur();
                    $('#registermsg_pwd').val('');
                    $('#registermsg_pwd').blur();
                    $('#register2_msg').html("");
                }
            } else {
                $("#register_msg").html(data.resultMsg);

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#register_msg").html("缃戠粶閿欒锛岃绋嶅悗鍐嶈瘯锛�");
        }
    });


}


function register() {
    var mail = $('#registerwds_mail').val();
    var verCode = $('#registerwds_dynCode').val();
    var sname = $('#registermsg_name').val();
    var pwd = $('#registermsg_pwd').val();

    if (sname == "" || sname == "璁剧疆鐢ㄦ埛鍚�") {
        $('#register2_msg').html("璇疯缃敤鎴峰悕");
        return;
    }

    if (pwd == "" || pwd == "瀵嗙爜") {
        $('#register2_msg').html("璇疯緭鍏ュ瘑鐮�");
        return;
    }

    if (pwd.length < 6 || pwd.length > 12) {
        $('#register2_msg').html("瀵嗙爜鏍煎紡閿欒锛岃杈撳叆6-12涓暟瀛楁垨瀛楁瘝");
        return;
    }

    if (/[\u4E00-\u9FA5]/i.test(pwd)) {
        $('#register2_msg').html("瀵嗙爜涓嶈兘鍖呭惈涓枃");
        return;
    }

    if (!document.getElementById("register_agreement").checked) {
        $('#register2_msg').html("鏈悓鎰忕浉鍏虫敞鍐屽崗璁紒");
        return;
    }
    sname = encodeURIComponent(sname);
    pwd = encodeURIComponent(pwd);
    $.ajax({
        type: "post",
        url: "/wap/register.msp",
        data: "userName=" + sname + "&mail=" + mail + "&pwd=" + pwd + "&verCode=" + verCode + "&pwdAgain=" + pwd,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                $("#register2_msg").html(data.resultMsg);
                window.setTimeout(function () {
                    re_login(mail, pwd);
                }, 800);
            } else {
                if (data.resultMsg != null && data.resultMsg != '') {
                    $("#register2_msg").html(data.resultMsg);
                } else {
                    $("#register2_msg").html("娉ㄥ唽澶辫触锛岃绋嶅悗鍐嶈瘯锛�");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#register2_msg").html("娉ㄥ唽澶辫触锛岃绋嶅悗鍐嶈瘯锛�");
        }
    });

}

//娉ㄥ唽鎴愬姛鍚庣櫥褰�
function re_login(userName, Password) {
    $.ajax({
        type: "post",
        url: "/wap/login.msp",
        data: "loginName=" + userName + "&psw=" + Password + "&isVerify=1",
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                window.location.reload();
            } else if (data.resultMsg == "9999") {

            } else {
                if (data.resultMsg != null && data.resultMsg != '') {

                } else {

                }

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
    });
}

//绗笁鏂圭櫥褰�
function weibologin(type) {
    weiboLoginShowAgree(function () {
        var backUrl = encodeURIComponent(document.location);
        var url = "/wap/weiboAuthUrl.msp?weiboType=" + type + "&backUrl=" + backUrl;
        $.ajax({
            type: "post",
            url: url,
            timeout: 30000,
            dataType: "json",
            success: function (data) {
                if (data.resultCode == "1") {
                    window.location = data.authUrl;
                } else {
                    try { } catch (e) { }
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    })
}

//鐢ㄦ埛淇℃伅淇敼
function modifysname() {
    var sname = $("#mdf_sname_dynCode").val().trim();
    if (sname == "" || sname == "璇疯緭鍏�4-20涓瓧绗�") {
        $('#modifysname_msg').html("璇疯緭鍏ユ樀绉�");
        return;
    }
    var realLength = 0, len = sname.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = sname.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    if (realLength > 20 || realLength < 4) {
        $("#modifysname_msg").html("璇疯緭鍏ラ暱搴︿负4-20涓瓧绗︾殑鐢ㄦ埛鍚�");
        return false;
    }
    sname = encodeURIComponent(sname);
    $.ajax({
        type: "post",
        url: "/wap/userSave.msp",
        data: "sname=" + sname,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                $("#modifysname_msg").html("鏇存柊鎴愬姛");
                window.setTimeout(function () {
                    window.location.reload();
                }, 800);
            } else if (data.resultCode == "2") {
                lgwdsshow();
            } else {
                if (data.resultMsg != null && data.resultMsg != '') {
                    $("#modifysname_msg").html(data.resultMsg);
                } else {
                    $("#modifysname_msg").html("绯荤粺蹇欙紝璇风◢鍚庡啀璇曪紒");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#modifysname_msg").html("绯荤粺蹇欙紝璇风◢鍚庡啀璇曪紒");
        }
    });

}
function trimData() { var c_name = "JSESSIONID"; var c_end = -1; if (document.cookie.length > 0) { c_start = document.cookie.indexOf(c_name + "="); if (c_start != -1) { c_start = c_start + c_name.length + 1; c_end = document.cookie.indexOf(";", c_start) } if (c_end == -1) { c_end = document.cookie.length } return unescape(document.cookie.substring(c_start, c_end)) } };

//楠岃瘉鎵嬫満
function checkPhone(pName, pId) {
    if (/^[0-9]{11}$/.test(pName)) {
        if (/^13[0-9]/.test(pName) || (/^15[0-9]/.test(pName)) || (/^17[0-9]/.test(pName)) || (/^18[0-9]/.test(pName)) || (/^14[57]/.test(pName))) {
            return true;
        } else {
            $('#' + pId).html("杈撳叆鐨勬墜鏈哄彿涓嶆纭�");
            return false;
        }
    } else {
        $('#' + pId).html("杈撳叆鐨勬墜鏈哄彿涓嶆纭�");
        return false;
    }
}
function getmodifyphoneCode() {
    $('#modifyphone_msg').html("");
    var phone = $('#mdf_phone').val().trim();
    var verType = 4;
    var vcode = $('#modifyphone_dynCode').val();
    if (phone == "" || phone == "鎵嬫満鍙�") {
        $('#modifyphone_msg').html("璇疯緭鍏ユ墜鏈哄彿");
        return;
    }
    checkPhone(phone, 'modifyphone_msg');

    if (vcode == "" || vcode == "璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗�") {
        $('#modifyphone_msg').html("璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗�");
        return;
    }

    if ($("#getmodifyphonecode").attr("data-disabled") == "false") {
        return;
    }
    $("#getmodifyphonecode").attr("data-disabled", "false");
    $("#modifyphone_msg").html("楠岃瘉鐮佸彂閫佷腑...");
    var url = "/wap/getVerCode.msp";
    var dynCode = $("#getmodifyphonecode");
    var data = "verType=" + verType + "&mail=" + phone + "&vcode=" + vcode;
    var jid = trimData();
    var edata = data + "|";
    edata = esda(edata);
    $.ajax({
        type: "post",
        url: url,
        data: data + "&randStr=" + edata + "&py=" + pyd,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                // document.getElementById('annexCode5').src = '/wap/RandomPicture?' + new Date().getTime();
                dynCode.attr("data-disabled", "true");
                $("#modifyphone_msg").html(data.resultMsg);
                if (dynCode.text() == "鑾峰彇楠岃瘉鐮�") {
                    dynCode.css('background-color', '#7a7a7a').text(60);
                    dynCode.attr("data-disabled", "false");
                    var reduceTime = setInterval(function () {
                        dynCode.text(parseInt(dynCode.text()) - 1); if (parseInt(dynCode.text()) <= 0) {
                            dynCode.css('background-color', '#00a5eb').text("鑾峰彇楠岃瘉鐮�");
                            dynCode.attr("data-disabled", "true");
                            clearInterval(reduceTime);
                        }
                    }, 1000);
                }
            } else {
                document.getElementById('annexCode5').src = '/wap/RandomPicture?' + new Date().getTime();
                $('#modifyphone_dynCode').val('');
                $('#modifyphone_dynCode').blur();
                $("#modifyphone_msg").html(data.resultMsg);
                dynCode.attr("data-disabled", "true");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#modifyphone_msg").html("楠岃瘉鐮佸彂閫佸け璐ワ紝璇风◢鍚庡啀璇曪紒");
            window.setTimeout(function () {
                $("#getmodifyphonecode").attr("data-disabled", "true");
            }, 1000);
        }
    });

}

function modifyphone() {
    var phone = $('#mdf_phone').val();
    var verCode = $('#mdf_phone_dynCode').val();
    var verType = 4; //楠岃瘉鐮佺被鍨嬶細1-娉ㄥ唽;2-淇敼閭;3-蹇樿瀵嗙爜;4-淇敼鎵嬫満鍙�

    if (phone == "" || phone == "鎵嬫満鍙�") {
        $('#modifyphone_msg').html("璇疯緭鍏ユ墜鏈哄彿");
        return;
    }
    checkPhone(phone, 'modifyphone_msg');
    if (verCode == "" || verCode == "杈撳叆楠岃瘉鐮�") {
        $('#modifyphone_msg').html("璇疯緭鍏ラ獙璇佺爜");
        return;
    }

    $.ajax({
        type: "post",
        url: "/wap/checkVerCode.msp",
        data: "verType=" + verType + "&mail=" + phone + "&verCode=" + verCode,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                $("#modifyphone_msg").html(data.resultMsg);
                window.setTimeout(function () {
                    window.location.reload();
                }, 800);
            } else if (data.resultCode == "2") {
                lgwdsshow();
            } else {
                $("#modifyphone_msg").html(data.resultMsg);

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#modifyphone_msg").html("楠岃瘉鐮佸彂閫佸け璐ワ紝璇风◢鍚庡啀璇曪紒");
        }
    });

}

function getmodifymailCode() {
    var vcode = $('#modifymail_dynCode').val();
    var mail = $('#mdf_mail').val();
    var verType = 2; //楠岃瘉鐮佺被鍨嬶細1-娉ㄥ唽;2-淇敼閭;3-蹇樿瀵嗙爜; 4-淇敼鎵嬫満鍙风爜
    if (mail == "" || mail == "閭") {
        $('#modifymail_msg').html("璇疯緭鍏ラ偖绠�");
        return;
    }
    if (vcode == "" || vcode == "璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗�") {
        $('#modifymail_msg').html("璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗�");
        return;
    }
    if ($("#getmodifymailcode").attr("data-disabled") == "false") {
        return;
    }
    $("#getmodifymailcode").attr("data-disabled", "false");
    $("#modifymail_msg").html("楠岃瘉鐮佸彂閫佷腑...");
    var dynCode = $("#getmodifymailcode");
    var data = "verType=" + verType + "&mail=" + mail + "&vcode=" + vcode;
    var jid = trimData();
    var edata = data + "|";
    edata = esda(edata);
    $.ajax({
        type: "post",
        url: "/wap/getVerCode.msp",
        data: data + "&randStr=" + edata + "&py=" + pyd,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                // document.getElementById('annexCode6').src = '/wap/RandomPicture?' + new Date().getTime();
                dynCode.attr("data-disabled", "true");
                $("#modifymail_msg").html(data.resultMsg);
                if (dynCode.text() == "鑾峰彇楠岃瘉鐮�") {
                    dynCode.css('background-color', '#7a7a7a').text(60);
                    dynCode.attr("data-disabled", "false");
                    var reduceTime = setInterval(function () {
                        dynCode.text(parseInt(dynCode.text()) - 1); if (parseInt(dynCode.text()) <= 0) {
                            dynCode.css('background-color', '#00a5eb').text("鑾峰彇楠岃瘉鐮�");
                            dynCode.attr("data-disabled", "true");
                            clearInterval(reduceTime);
                        }
                    }, 1000);
                }
            } else {
                document.getElementById('annexCode6').src = '/wap/RandomPicture?' + new Date().getTime();
                $('#modifymail_dynCode').val('');
                $('#modifymail_dynCode').blur();
                $("#modifymail_msg").html(data.resultMsg);
                dynCode.attr("data-disabled", "true");
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#modifymail_msg").html("楠岃瘉鐮佸彂閫佸け璐ワ紝璇风◢鍚庡啀璇曪紒");
            window.setTimeout(function () {
                $("#getmodifymailcode").attr("data-disabled", "true");
            }, 1000);
        }
    });

}

function modifymail() {
    var mail = $('#mdf_mail').val();
    var verCode = $('#mdf_mail_dynCode').val();
    var verType = 2; //楠岃瘉鐮佺被鍨嬶細1-娉ㄥ唽;2-淇敼閭;3-蹇樿瀵嗙爜; 4-淇敼鎵嬫満鍙风爜

    if (mail == "" || mail == "閭") {
        $('#modifymail_msg').html("璇疯緭鍏ラ偖绠�");
        return;
    }

    if (verCode == "" || verCode == "杈撳叆楠岃瘉鐮�") {

        $('#modifymail_msg').html("璇疯緭鍏ラ獙璇佺爜");
        return;
    }

    $.ajax({
        type: "post",
        url: "/wap/checkVerCode.msp",
        data: "verType=" + verType + "&mail=" + mail + "&verCode=" + verCode,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                $("#modifymail_msg").html(data.resultMsg);
                window.setTimeout(function () {
                    window.location.reload();
                }, 800);
            } else if (data.resultCode == "2") {
                lgwdsshow();
            } else {
                $("#modifymail_msg").html(data.resultMsg);

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#modifymail_msg").html("楠岃瘉鐮佸彂閫佸け璐ワ紝璇风◢鍚庡啀璇曪紒");
        }
    });

}

function getForgetpwdCode() {
    var mail = $('#forgetpwd_mail').val();
    var vcode = $('#findpwd_dynCode').val();
    var verType = 3; //楠岃瘉鐮佺被鍨嬶細1-娉ㄥ唽; 2-淇敼閭; 3-蹇樿瀵嗙爜; 4-淇敼鎵嬫満鍙风爜

    if (mail == "" || mail == "鎵嬫満鍙�/鐢靛瓙閭") {
        $('#forgetpwd_msg').html("璇疯緭鍏ユ偍瑕佺櫥褰曠殑鎵嬫満鍙锋垨閭");
        return false;
    } else if (!isPhone(mail) && !isEmail(mail)) {
        $('#forgetpwd_msg').html("杈撳叆鐨勬墜鏈哄彿鎴栭偖绠辨牸寮忎笉姝ｇ‘");
        return false;
    }

    if (vcode == "" || vcode == "璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗�") {
        $('#forgetpwd_msg').html("璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗�");
        return false;
    }

    if ($("#getforgetpwdcode").attr("data-disabled") == "false") {
        return;
    }
    $("#getforgetpwdcode").attr("data-disabled", "false");
    $("#forgetpwd_msg").html("楠岃瘉鐮佸彂閫佷腑...");
    var dynCode = $("#getforgetpwdcode");
    var data = "verType=" + verType + "&mail=" + mail + "&vcode=" + vcode;
    var jid = trimData();
    var edata = data + "|";
    edata = esda(edata);
    $.ajax({
        type: "post",
        url: "/wap/getVerCode.msp",
        data: data + "&randStr=" + edata + "&py=" + pyd,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                //document.getElementById('annexCode4').src = '/wap/RandomPicture?' + new Date().getTime();
                $("#forgetpwd_msg").html(data.resultMsg);
                if (dynCode.text() == "鑾峰彇楠岃瘉鐮�") {
                    dynCode.css('background-color', '#7a7a7a').text(60);
                    dynCode.attr("data-disabled", "false");
                    var reduceTime = setInterval(function () {
                        dynCode.text(parseInt(dynCode.text()) - 1); if (parseInt(dynCode.text()) <= 0) {
                            dynCode.css('background-color', '#00a5eb').text("鑾峰彇楠岃瘉鐮�");
                            dynCode.attr("data-disabled", "true");
                            clearInterval(reduceTime);
                        }
                    }, 1000);
                }
            } else {
                document.getElementById('annexCode4').src = '/wap/RandomPicture?' + new Date().getTime();
                $('#findpwd_dynCode').val('');
                $('#findpwd_dynCode').blur();
                $("#forgetpwd_msg").html(data.resultMsg);
                $("#getforgetpwdcode").attr("data-disabled", "true");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#forgetpwd_msg").html("楠岃瘉鐮佸彂閫佸け璐ワ紝璇风◢鍚庡啀璇曪紒");
            window.setTimeout(function () {
                $("#getforgetpwdcode").attr("data-disabled", "true");
            }, 1000);
        }
    });

}

function findPwd() {
    var mail = $('#forgetpwd_mail').val();
    var verCode = $('#forgetpwd_dynCode').val();
    var vcode = $('#findpwd_dynCode').val();
    var verType = 3; //楠岃瘉鐮佺被鍨嬶細1-娉ㄥ唽;2-淇敼閭;3-蹇樿瀵嗙爜; 4-淇敼鎵嬫満鍙风爜

    if (mail == "" || mail == "鎵嬫満鍙�/鐢靛瓙閭") {
        $('#forgetpwd_msg').html("璇疯緭鍏ユ偍瑕佺櫥褰曠殑鎵嬫満鍙锋垨閭");
        return false;
    } else if (!isPhone(mail) && !isEmail(mail)) {
        $('#forgetpwd_msg').html("杈撳叆鐨勬墜鏈哄彿鎴栭偖绠辨牸寮忎笉姝ｇ‘");
        return false;
    }

    if (verCode == "" || verCode == "杈撳叆楠岃瘉鐮�") {
        $('#forgetpwd_msg').html("璇疯緭鍏ラ獙璇佺爜");
        return;
    }

    mail = encodeURIComponent(mail);
    $.ajax({
        type: "post",
        url: "/wap/checkVerCode.msp",
        data: "verType=" + verType + "&mail=" + mail + "&verCode=" + verCode + "&vcode=" + vcode,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                $(document.body).append("<div class=\"lg_wds_pst\" id=\"forgetpwdlgwds\">"
                    + "<div class=\"lg_pd10\">"
                    + "<div class=\"lg_wds\">"
                    + "  <div class=\"lg_wds_title\">蹇樿瀵嗙爜</div>"
                    + "  <div class=\"lg_wds_prompt\">鎮ㄧ殑瀵嗙爜宸查噸缃紝璇疯緭鍏ユ柊瀵嗙爜</div>"
                    + "  <div class=\"lg_wds_inp\"><input id=\"forgetpwdlg_pwd\" type=\"password\" value=\"\" class=\"wds_input\" placeholder=\"璇疯緭鍏�6-12鏁板瓧鎴栧瓧姣峔" tabindex =\"1\"></div>"
                    + "  <div class=\"lg_wds_ts\" id=\"resetpwd_msg\"></div>"
                    + "  <div class=\"lg_wds_bt\" onclick=\"resetPwd()\">瀹� 鎴�</div>"
                    + ""
                    + "  <div class=\"lg_wds_tplg\" style=\"width:118px;margin:12px 0 6px;\">"
                    + "    <span>宸叉湁璐︽埛锛岄┈涓�<font onclick=\"lgwdsshow()\" style=\"color:#00a5eb;cursor: pointer;\">鐧诲綍</font></span>"
                    + "  </div>"
                    + "  <div class=\"lg_wds_tplg\" style=\"margin:12px 0 6px;\">"
                    + "    <span>绀句氦璐﹀彿鐩存帴鐧诲綍</span>"
                    + ""
                    + "    <a href=\"javascript:weibologin(\'DOUBAN\');\" class=\"tplgrr\"></a>"
                    + "    <a href=\"javascript:weibologin(\'TENCENT\');\" class=\"tplgtx\"></a>"
                    + "    <a href=\"javascript:weibologin(\'SINA\');\" class=\"tplgsn\"></a>"
                    + "  </div>"
                    + "  <div class=\"wds_close\" onclick=\"wdscancer()\"></div>"
                    + "</div>"
                    + "</div>"
                + "</div>");
                $("#forgetpwdlgwds").siblings(".lg_wds_pst").css("display", "none");
                $("#bg_overlay").css('display', 'block');
                //$("#forgetpwdlgwds").css('display', '');
            } else {
                document.getElementById('annexCode4').src = '/wap/RandomPicture?' + new Date().getTime();
                $('#findpwd_dynCode').val('');
                $('#findpwd_dynCode').blur();
                $("#forgetpwd_msg").html(data.resultMsg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#forgetpwd_msg").html("楠岃瘉澶辫触锛岃绋嶅悗鍐嶈瘯锛�");
        }
    });

}

function resetPwd() {
    var pwd = $('#forgetpwdlg_pwd').val();
    var mail = $('#forgetpwd_mail').val();
    var verCode = $('#forgetpwd_dynCode').val();

    if (pwd == "") {
        $('#resetpwd_msg').html("璇疯緭鍏ユ柊瀵嗙爜");
        return;
    }

    $.ajax({
        type: "post",
        url: "/wap/resetPwd.msp",
        data: "pwd=" + pwd + "&mail=" + mail + "&verCode=" + verCode,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                $("#resetpwd_msg").html(data.resultMsg);
                window.setTimeout(function () {
                    re_login(mail, pwd);
                }, 800);
            } else {
                $("#resetpwd_msg").html(data.resultMsg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#resetpwd_msg").html("鏂板瘑鐮佽缃け璐ワ紝璇风◢鍚庡啀璇曪紒");
        }
    });

}

function modifypwd() {
    var oldpwd = $("#mdfpwd_old").val().trim();
    var newpwd = $("#mdfpwd_new").val().trim();
    if (oldpwd.length == 0 || oldpwd == "璇疯緭鍏�6-12涓瓧绗�") {
        $("#modifypwd_msg").html("鍘熷瘑鐮佷笉鑳戒负绌�");
        return false;
    } else if (oldpwd.length < 6 || oldpwd.length > 12) {
        $("#modifypwd_msg").html("鍘熷瘑鐮佹牸寮忛敊璇紝璇疯緭鍏�6-12涓暟瀛楁垨瀛楁瘝");
        return false;
    }
    if (newpwd.length == 0 || newpwd == "璇疯緭鍏�6-12涓瓧绗�") {
        $("#modifypwd_msg").html("鏂板瘑鐮佷笉鑳戒负绌�");
        return false;
    } else if (newpwd.length < 6 || newpwd.length > 12) {
        $("#modifypwd_msg").html("鏂板瘑鐮佹牸寮忛敊璇紝璇疯緭鍏�6-12涓暟瀛楁垨瀛楁瘝");
        return false;
    }
    if (/[\u4E00-\u9FA5]/i.test(newpwd)) {
        $("#modifypwd_msg").html("瀵嗙爜涓嶈兘鍖呭惈涓枃");
        return false;
    }
    oldpwd = encodeURIComponent(oldpwd);
    newpwd = encodeURIComponent(newpwd);
    if (oldpwd == 'undefined') {
        oldpwd = '';
    }
    $.ajax({
        type: "post",
        url: "/wap/modifyPwd.msp",
        data: "password=" + oldpwd + "&newPassword=" + newpwd,
        timeout: 30000,
        dataType: "json",
        success: function (data) {
            if (data.resultCode == "1") {
                $("#modifypwd_msg").html("鏇存柊鎴愬姛");
                $("#mdfpwd_old").val('');
                $("#mdfpwd_new").val('');
                window.setTimeout(function () {
                    $("#modifypwd_msg").html("");
                    wdscancer();
                }, 1200);

            } else if (data.resultCode == "2") {
                lgwdsshow();
            } else {
                if (data.resultMsg != null && data.resultMsg != '') {
                    $("#modifypwd_msg").html(data.resultMsg);
                } else {
                    $("#modifypwd_msg").html("瀵嗙爜淇敼澶辫触锛岃绋嶅悗鍐嶈瘯锛�");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#modifypwd_msg").html("瀵嗙爜淇敼澶辫触锛岃绋嶅悗鍐嶈瘯锛�");
        }
    });

}


function showText(text, password, value) {
    var pwdValue = document.getElementById(password).value;
    if (pwdValue == null || pwdValue.trim == "" || pwdValue.length < 1) {
        document.getElementById(text).value = value;
        document.getElementById(text).style.display = "";
        document.getElementById(password).style.display = "none";
    }
}

function showPassWord(text, password) {
    document.getElementById(text).style.display = "none";
    document.getElementById(password).style.display = "";
    document.getElementById(password).focus();
}
!function (t, e) { "object" == typeof exports ? module.exports = exports = e() : "function" == typeof define && define.amd ? define([], e) : t.CryptoJS = e() }(this, function () { var l, r, t, e, i, f, n, o, s, a, c, h, u, d, p, _, v, y, g, B, w, k, S, m, x, b, H, z, A, C, D, R, E, M, F, P, W, O, U, I, K, X, L, j, N, T, Z, q, G, J, $, Q, V, Y, tt, et, rt, it, nt, ot, st, at, ct, ht, lt, ft, ut, dt, pt, _t, vt, yt, gt, Bt, wt, kt, St, mt, xt, bt, Ht, zt, At, Ct = Ct || (l = Math, r = Object.create || function () { function r() { } return function (t) { var e; return r.prototype = t, e = new r, r.prototype = null, e } }(), e = (t = {}).lib = {}, i = e.Base = { extend: function (t) { var e = r(this); return t && e.mixIn(t), e.hasOwnProperty("init") && this.init !== e.init || (e.init = function () { e.$super.init.apply(this, arguments) }), (e.init.prototype = e).$super = this, e }, create: function () { var t = this.extend(); return t.init.apply(t, arguments), t }, init: function () { }, mixIn: function (t) { for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]); t.hasOwnProperty("toString") && (this.toString = t.toString) }, clone: function () { return this.init.prototype.extend(this) } }, f = e.WordArray = i.extend({ init: function (t, e) { t = this.words = t || [], this.sigBytes = null != e ? e : 4 * t.length }, toString: function (t) { return (t || o).stringify(this) }, concat: function (t) { var e = this.words, r = t.words, i = this.sigBytes, n = t.sigBytes; if (this.clamp(), i % 4) for (var o = 0; o < n; o++) { var s = r[o >>> 2] >>> 24 - o % 4 * 8 & 255; e[i + o >>> 2] |= s << 24 - (i + o) % 4 * 8 } else for (o = 0; o < n; o += 4)e[i + o >>> 2] = r[o >>> 2]; return this.sigBytes += n, this }, clamp: function () { var t = this.words, e = this.sigBytes; t[e >>> 2] &= 4294967295 << 32 - e % 4 * 8, t.length = l.ceil(e / 4) }, clone: function () { var t = i.clone.call(this); return t.words = this.words.slice(0), t }, random: function (t) { for (var e, r = [], i = function (e) { e = e; var r = 987654321, i = 4294967295; return function () { var t = ((r = 36969 * (65535 & r) + (r >> 16) & i) << 16) + (e = 18e3 * (65535 & e) + (e >> 16) & i) & i; return t /= 4294967296, (t += .5) * (.5 < l.random() ? 1 : -1) } }, n = 0; n < t; n += 4) { var o = i(4294967296 * (e || l.random())); e = 987654071 * o(), r.push(4294967296 * o() | 0) } return new f.init(r, t) } }), n = t.enc = {}, o = n.Hex = { stringify: function (t) { for (var e = t.words, r = t.sigBytes, i = [], n = 0; n < r; n++) { var o = e[n >>> 2] >>> 24 - n % 4 * 8 & 255; i.push((o >>> 4).toString(16)), i.push((15 & o).toString(16)) } return i.join("") }, parse: function (t) { for (var e = t.length, r = [], i = 0; i < e; i += 2)r[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - i % 8 * 4; return new f.init(r, e / 2) } }, s = n.Latin1 = { stringify: function (t) { for (var e = t.words, r = t.sigBytes, i = [], n = 0; n < r; n++) { var o = e[n >>> 2] >>> 24 - n % 4 * 8 & 255; i.push(String.fromCharCode(o)) } return i.join("") }, parse: function (t) { for (var e = t.length, r = [], i = 0; i < e; i++)r[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - i % 4 * 8; return new f.init(r, e) } }, a = n.Utf8 = { stringify: function (t) { try { return decodeURIComponent(escape(s.stringify(t))) } catch (t) { throw new Error("Malformed UTF-8 data") } }, parse: function (t) { return s.parse(unescape(encodeURIComponent(t))) } }, c = e.BufferedBlockAlgorithm = i.extend({ reset: function () { this._data = new f.init, this._nDataBytes = 0 }, _append: function (t) { "string" == typeof t && (t = a.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes }, _process: function (t) { var e = this._data, r = e.words, i = e.sigBytes, n = this.blockSize, o = i / (4 * n), s = (o = t ? l.ceil(o) : l.max((0 | o) - this._minBufferSize, 0)) * n, a = l.min(4 * s, i); if (s) { for (var c = 0; c < s; c += n)this._doProcessBlock(r, c); var h = r.splice(0, s); e.sigBytes -= a } return new f.init(h, a) }, clone: function () { var t = i.clone.call(this); return t._data = this._data.clone(), t }, _minBufferSize: 0 }), e.Hasher = c.extend({ cfg: i.extend(), init: function (t) { this.cfg = this.cfg.extend(t), this.reset() }, reset: function () { c.reset.call(this), this._doReset() }, update: function (t) { return this._append(t), this._process(), this }, finalize: function (t) { return t && this._append(t), this._doFinalize() }, blockSize: 16, _createHelper: function (r) { return function (t, e) { return new r.init(e).finalize(t) } }, _createHmacHelper: function (r) { return function (t, e) { return new h.HMAC.init(r, e).finalize(t) } } }), h = t.algo = {}, t); return d = (u = Ct).lib.WordArray, u.enc.Base64 = { stringify: function (t) { var e = t.words, r = t.sigBytes, i = this._map; t.clamp(); for (var n = [], o = 0; o < r; o += 3)for (var s = (e[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (e[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | e[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, a = 0; a < 4 && o + .75 * a < r; a++)n.push(i.charAt(s >>> 6 * (3 - a) & 63)); var c = i.charAt(64); if (c) for (; n.length % 4;)n.push(c); return n.join("") }, parse: function (t) { var e = t.length, r = this._map, i = this._reverseMap; if (!i) { i = this._reverseMap = []; for (var n = 0; n < r.length; n++)i[r.charCodeAt(n)] = n } var o = r.charAt(64); if (o) { var s = t.indexOf(o); -1 !== s && (e = s) } return function (t, e, r) { for (var i = [], n = 0, o = 0; o < e; o++)if (o % 4) { var s = r[t.charCodeAt(o - 1)] << o % 4 * 2, a = r[t.charCodeAt(o)] >>> 6 - o % 4 * 2; i[n >>> 2] |= (s | a) << 24 - n % 4 * 8, n++ } return d.create(i, n) }(t, e, i) }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" }, function (l) { var t = Ct, e = t.lib, r = e.WordArray, i = e.Hasher, n = t.algo, H = []; !function () { for (var t = 0; t < 64; t++)H[t] = 4294967296 * l.abs(l.sin(t + 1)) | 0 }(); var o = n.MD5 = i.extend({ _doReset: function () { this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878]) }, _doProcessBlock: function (t, e) { for (var r = 0; r < 16; r++) { var i = e + r, n = t[i]; t[i] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8) } var o = this._hash.words, s = t[e + 0], a = t[e + 1], c = t[e + 2], h = t[e + 3], l = t[e + 4], f = t[e + 5], u = t[e + 6], d = t[e + 7], p = t[e + 8], _ = t[e + 9], v = t[e + 10], y = t[e + 11], g = t[e + 12], B = t[e + 13], w = t[e + 14], k = t[e + 15], S = o[0], m = o[1], x = o[2], b = o[3]; m = D(m = D(m = D(m = D(m = C(m = C(m = C(m = C(m = A(m = A(m = A(m = A(m = z(m = z(m = z(m = z(m, x = z(x, b = z(b, S = z(S, m, x, b, s, 7, H[0]), m, x, a, 12, H[1]), S, m, c, 17, H[2]), b, S, h, 22, H[3]), x = z(x, b = z(b, S = z(S, m, x, b, l, 7, H[4]), m, x, f, 12, H[5]), S, m, u, 17, H[6]), b, S, d, 22, H[7]), x = z(x, b = z(b, S = z(S, m, x, b, p, 7, H[8]), m, x, _, 12, H[9]), S, m, v, 17, H[10]), b, S, y, 22, H[11]), x = z(x, b = z(b, S = z(S, m, x, b, g, 7, H[12]), m, x, B, 12, H[13]), S, m, w, 17, H[14]), b, S, k, 22, H[15]), x = A(x, b = A(b, S = A(S, m, x, b, a, 5, H[16]), m, x, u, 9, H[17]), S, m, y, 14, H[18]), b, S, s, 20, H[19]), x = A(x, b = A(b, S = A(S, m, x, b, f, 5, H[20]), m, x, v, 9, H[21]), S, m, k, 14, H[22]), b, S, l, 20, H[23]), x = A(x, b = A(b, S = A(S, m, x, b, _, 5, H[24]), m, x, w, 9, H[25]), S, m, h, 14, H[26]), b, S, p, 20, H[27]), x = A(x, b = A(b, S = A(S, m, x, b, B, 5, H[28]), m, x, c, 9, H[29]), S, m, d, 14, H[30]), b, S, g, 20, H[31]), x = C(x, b = C(b, S = C(S, m, x, b, f, 4, H[32]), m, x, p, 11, H[33]), S, m, y, 16, H[34]), b, S, w, 23, H[35]), x = C(x, b = C(b, S = C(S, m, x, b, a, 4, H[36]), m, x, l, 11, H[37]), S, m, d, 16, H[38]), b, S, v, 23, H[39]), x = C(x, b = C(b, S = C(S, m, x, b, B, 4, H[40]), m, x, s, 11, H[41]), S, m, h, 16, H[42]), b, S, u, 23, H[43]), x = C(x, b = C(b, S = C(S, m, x, b, _, 4, H[44]), m, x, g, 11, H[45]), S, m, k, 16, H[46]), b, S, c, 23, H[47]), x = D(x, b = D(b, S = D(S, m, x, b, s, 6, H[48]), m, x, d, 10, H[49]), S, m, w, 15, H[50]), b, S, f, 21, H[51]), x = D(x, b = D(b, S = D(S, m, x, b, g, 6, H[52]), m, x, h, 10, H[53]), S, m, v, 15, H[54]), b, S, a, 21, H[55]), x = D(x, b = D(b, S = D(S, m, x, b, p, 6, H[56]), m, x, k, 10, H[57]), S, m, u, 15, H[58]), b, S, B, 21, H[59]), x = D(x, b = D(b, S = D(S, m, x, b, l, 6, H[60]), m, x, y, 10, H[61]), S, m, c, 15, H[62]), b, S, _, 21, H[63]), o[0] = o[0] + S | 0, o[1] = o[1] + m | 0, o[2] = o[2] + x | 0, o[3] = o[3] + b | 0 }, _doFinalize: function () { var t = this._data, e = t.words, r = 8 * this._nDataBytes, i = 8 * t.sigBytes; e[i >>> 5] |= 128 << 24 - i % 32; var n = l.floor(r / 4294967296), o = r; e[15 + (i + 64 >>> 9 << 4)] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8), e[14 + (i + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), t.sigBytes = 4 * (e.length + 1), this._process(); for (var s = this._hash, a = s.words, c = 0; c < 4; c++) { var h = a[c]; a[c] = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8) } return s }, clone: function () { var t = i.clone.call(this); return t._hash = this._hash.clone(), t } }); function z(t, e, r, i, n, o, s) { var a = t + (e & r | ~e & i) + n + s; return (a << o | a >>> 32 - o) + e } function A(t, e, r, i, n, o, s) { var a = t + (e & i | r & ~i) + n + s; return (a << o | a >>> 32 - o) + e } function C(t, e, r, i, n, o, s) { var a = t + (e ^ r ^ i) + n + s; return (a << o | a >>> 32 - o) + e } function D(t, e, r, i, n, o, s) { var a = t + (r ^ (e | ~i)) + n + s; return (a << o | a >>> 32 - o) + e } t.MD5 = i._createHelper(o), t.HmacMD5 = i._createHmacHelper(o) }(Math), _ = (p = Ct).lib, v = _.WordArray, y = _.Hasher, g = p.algo, B = [], w = g.SHA1 = y.extend({ _doReset: function () { this._hash = new v.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]) }, _doProcessBlock: function (t, e) { for (var r = this._hash.words, i = r[0], n = r[1], o = r[2], s = r[3], a = r[4], c = 0; c < 80; c++) { if (c < 16) B[c] = 0 | t[e + c]; else { var h = B[c - 3] ^ B[c - 8] ^ B[c - 14] ^ B[c - 16]; B[c] = h << 1 | h >>> 31 } var l = (i << 5 | i >>> 27) + a + B[c]; l += c < 20 ? 1518500249 + (n & o | ~n & s) : c < 40 ? 1859775393 + (n ^ o ^ s) : c < 60 ? (n & o | n & s | o & s) - 1894007588 : (n ^ o ^ s) - 899497514, a = s, s = o, o = n << 30 | n >>> 2, n = i, i = l } r[0] = r[0] + i | 0, r[1] = r[1] + n | 0, r[2] = r[2] + o | 0, r[3] = r[3] + s | 0, r[4] = r[4] + a | 0 }, _doFinalize: function () { var t = this._data, e = t.words, r = 8 * this._nDataBytes, i = 8 * t.sigBytes; return e[i >>> 5] |= 128 << 24 - i % 32, e[14 + (i + 64 >>> 9 << 4)] = Math.floor(r / 4294967296), e[15 + (i + 64 >>> 9 << 4)] = r, t.sigBytes = 4 * e.length, this._process(), this._hash }, clone: function () { var t = y.clone.call(this); return t._hash = this._hash.clone(), t } }), p.SHA1 = y._createHelper(w), p.HmacSHA1 = y._createHmacHelper(w), function (n) { var t = Ct, e = t.lib, r = e.WordArray, i = e.Hasher, o = t.algo, s = [], B = []; !function () { function t(t) { for (var e = n.sqrt(t), r = 2; r <= e; r++)if (!(t % r)) return !1; return !0 } function e(t) { return 4294967296 * (t - (0 | t)) | 0 } for (var r = 2, i = 0; i < 64;)t(r) && (i < 8 && (s[i] = e(n.pow(r, .5))), B[i] = e(n.pow(r, 1 / 3)), i++), r++ }(); var w = [], a = o.SHA256 = i.extend({ _doReset: function () { this._hash = new r.init(s.slice(0)) }, _doProcessBlock: function (t, e) { for (var r = this._hash.words, i = r[0], n = r[1], o = r[2], s = r[3], a = r[4], c = r[5], h = r[6], l = r[7], f = 0; f < 64; f++) { if (f < 16) w[f] = 0 | t[e + f]; else { var u = w[f - 15], d = (u << 25 | u >>> 7) ^ (u << 14 | u >>> 18) ^ u >>> 3, p = w[f - 2], _ = (p << 15 | p >>> 17) ^ (p << 13 | p >>> 19) ^ p >>> 10; w[f] = d + w[f - 7] + _ + w[f - 16] } var v = i & n ^ i & o ^ n & o, y = (i << 30 | i >>> 2) ^ (i << 19 | i >>> 13) ^ (i << 10 | i >>> 22), g = l + ((a << 26 | a >>> 6) ^ (a << 21 | a >>> 11) ^ (a << 7 | a >>> 25)) + (a & c ^ ~a & h) + B[f] + w[f]; l = h, h = c, c = a, a = s + g | 0, s = o, o = n, n = i, i = g + (y + v) | 0 } r[0] = r[0] + i | 0, r[1] = r[1] + n | 0, r[2] = r[2] + o | 0, r[3] = r[3] + s | 0, r[4] = r[4] + a | 0, r[5] = r[5] + c | 0, r[6] = r[6] + h | 0, r[7] = r[7] + l | 0 }, _doFinalize: function () { var t = this._data, e = t.words, r = 8 * this._nDataBytes, i = 8 * t.sigBytes; return e[i >>> 5] |= 128 << 24 - i % 32, e[14 + (i + 64 >>> 9 << 4)] = n.floor(r / 4294967296), e[15 + (i + 64 >>> 9 << 4)] = r, t.sigBytes = 4 * e.length, this._process(), this._hash }, clone: function () { var t = i.clone.call(this); return t._hash = this._hash.clone(), t } }); t.SHA256 = i._createHelper(a), t.HmacSHA256 = i._createHmacHelper(a) }(Math), function () { var t = Ct, n = t.lib.WordArray, e = t.enc; e.Utf16 = e.Utf16BE = { stringify: function (t) { for (var e = t.words, r = t.sigBytes, i = [], n = 0; n < r; n += 2) { var o = e[n >>> 2] >>> 16 - n % 4 * 8 & 65535; i.push(String.fromCharCode(o)) } return i.join("") }, parse: function (t) { for (var e = t.length, r = [], i = 0; i < e; i++)r[i >>> 1] |= t.charCodeAt(i) << 16 - i % 2 * 16; return n.create(r, 2 * e) } }; function s(t) { return t << 8 & 4278255360 | t >>> 8 & 16711935 } e.Utf16LE = { stringify: function (t) { for (var e = t.words, r = t.sigBytes, i = [], n = 0; n < r; n += 2) { var o = s(e[n >>> 2] >>> 16 - n % 4 * 8 & 65535); i.push(String.fromCharCode(o)) } return i.join("") }, parse: function (t) { for (var e = t.length, r = [], i = 0; i < e; i++)r[i >>> 1] |= s(t.charCodeAt(i) << 16 - i % 2 * 16); return n.create(r, 2 * e) } } }(), function () { if ("function" == typeof ArrayBuffer) { var t = Ct.lib.WordArray, n = t.init; (t.init = function (t) { if (t instanceof ArrayBuffer && (t = new Uint8Array(t)), (t instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array) && (t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength)), t instanceof Uint8Array) { for (var e = t.byteLength, r = [], i = 0; i < e; i++)r[i >>> 2] |= t[i] << 24 - i % 4 * 8; n.call(this, r, e) } else n.apply(this, arguments) }).prototype = t } }(), function (t) { var e = Ct, r = e.lib, i = r.WordArray, n = r.Hasher, o = e.algo, m = i.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]), x = i.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]), b = i.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]), H = i.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]), z = i.create([0, 1518500249, 1859775393, 2400959708, 2840853838]), A = i.create([1352829926, 1548603684, 1836072691, 2053994217, 0]), s = o.RIPEMD160 = n.extend({ _doReset: function () { this._hash = i.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]) }, _doProcessBlock: function (t, e) { for (var r = 0; r < 16; r++) { var i = e + r, n = t[i]; t[i] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8) } var o, s, a, c, h, l, f, u, d, p, _, v = this._hash.words, y = z.words, g = A.words, B = m.words, w = x.words, k = b.words, S = H.words; l = o = v[0], f = s = v[1], u = a = v[2], d = c = v[3], p = h = v[4]; for (r = 0; r < 80; r += 1)_ = o + t[e + B[r]] | 0, _ += r < 16 ? C(s, a, c) + y[0] : r < 32 ? D(s, a, c) + y[1] : r < 48 ? R(s, a, c) + y[2] : r < 64 ? E(s, a, c) + y[3] : M(s, a, c) + y[4], _ = (_ = F(_ |= 0, k[r])) + h | 0, o = h, h = c, c = F(a, 10), a = s, s = _, _ = l + t[e + w[r]] | 0, _ += r < 16 ? M(f, u, d) + g[0] : r < 32 ? E(f, u, d) + g[1] : r < 48 ? R(f, u, d) + g[2] : r < 64 ? D(f, u, d) + g[3] : C(f, u, d) + g[4], _ = (_ = F(_ |= 0, S[r])) + p | 0, l = p, p = d, d = F(u, 10), u = f, f = _; _ = v[1] + a + d | 0, v[1] = v[2] + c + p | 0, v[2] = v[3] + h + l | 0, v[3] = v[4] + o + f | 0, v[4] = v[0] + s + u | 0, v[0] = _ }, _doFinalize: function () { var t = this._data, e = t.words, r = 8 * this._nDataBytes, i = 8 * t.sigBytes; e[i >>> 5] |= 128 << 24 - i % 32, e[14 + (i + 64 >>> 9 << 4)] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8), t.sigBytes = 4 * (e.length + 1), this._process(); for (var n = this._hash, o = n.words, s = 0; s < 5; s++) { var a = o[s]; o[s] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8) } return n }, clone: function () { var t = n.clone.call(this); return t._hash = this._hash.clone(), t } }); function C(t, e, r) { return t ^ e ^ r } function D(t, e, r) { return t & e | ~t & r } function R(t, e, r) { return (t | ~e) ^ r } function E(t, e, r) { return t & r | e & ~r } function M(t, e, r) { return t ^ (e | ~r) } function F(t, e) { return t << e | t >>> 32 - e } e.RIPEMD160 = n._createHelper(s), e.HmacRIPEMD160 = n._createHmacHelper(s) }(Math), S = (k = Ct).lib.Base, m = k.enc.Utf8, k.algo.HMAC = S.extend({ init: function (t, e) { t = this._hasher = new t.init, "string" == typeof e && (e = m.parse(e)); var r = t.blockSize, i = 4 * r; e.sigBytes > i && (e = t.finalize(e)), e.clamp(); for (var n = this._oKey = e.clone(), o = this._iKey = e.clone(), s = n.words, a = o.words, c = 0; c < r; c++)s[c] ^= 1549556828, a[c] ^= 909522486; n.sigBytes = o.sigBytes = i, this.reset() }, reset: function () { var t = this._hasher; t.reset(), t.update(this._iKey) }, update: function (t) { return this._hasher.update(t), this }, finalize: function (t) { var e = this._hasher, r = e.finalize(t); return e.reset(), e.finalize(this._oKey.clone().concat(r)) } }), b = (x = Ct).lib, H = b.Base, z = b.WordArray, A = x.algo, C = A.SHA1, D = A.HMAC, R = A.PBKDF2 = H.extend({ cfg: H.extend({ keySize: 4, hasher: C, iterations: 1 }), init: function (t) { this.cfg = this.cfg.extend(t) }, compute: function (t, e) { for (var r = this.cfg, i = D.create(r.hasher, t), n = z.create(), o = z.create([1]), s = n.words, a = o.words, c = r.keySize, h = r.iterations; s.length < c;) { var l = i.update(e).finalize(o); i.reset(); for (var f = l.words, u = f.length, d = l, p = 1; p < h; p++) { d = i.finalize(d), i.reset(); for (var _ = d.words, v = 0; v < u; v++)f[v] ^= _[v] } n.concat(l), a[0]++ } return n.sigBytes = 4 * c, n } }), x.PBKDF2 = function (t, e, r) { return R.create(r).compute(t, e) }, M = (E = Ct).lib, F = M.Base, P = M.WordArray, W = E.algo, O = W.MD5, U = W.EvpKDF = F.extend({ cfg: F.extend({ keySize: 4, hasher: O, iterations: 1 }), init: function (t) { this.cfg = this.cfg.extend(t) }, compute: function (t, e) { for (var r = this.cfg, i = r.hasher.create(), n = P.create(), o = n.words, s = r.keySize, a = r.iterations; o.length < s;) { c && i.update(c); var c = i.update(t).finalize(e); i.reset(); for (var h = 1; h < a; h++)c = i.finalize(c), i.reset(); n.concat(c) } return n.sigBytes = 4 * s, n } }), E.EvpKDF = function (t, e, r) { return U.create(r).compute(t, e) }, K = (I = Ct).lib.WordArray, X = I.algo, L = X.SHA256, j = X.SHA224 = L.extend({ _doReset: function () { this._hash = new K.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]) }, _doFinalize: function () { var t = L._doFinalize.call(this); return t.sigBytes -= 4, t } }), I.SHA224 = L._createHelper(j), I.HmacSHA224 = L._createHmacHelper(j), T = (N = Ct).lib, Z = T.Base, q = T.WordArray, (G = N.x64 = {}).Word = Z.extend({ init: function (t, e) { this.high = t, this.low = e } }), G.WordArray = Z.extend({ init: function (t, e) { t = this.words = t || [], this.sigBytes = null != e ? e : 8 * t.length }, toX32: function () { for (var t = this.words, e = t.length, r = [], i = 0; i < e; i++) { var n = t[i]; r.push(n.high), r.push(n.low) } return q.create(r, this.sigBytes) }, clone: function () { for (var t = Z.clone.call(this), e = t.words = this.words.slice(0), r = e.length, i = 0; i < r; i++)e[i] = e[i].clone(); return t } }), function (u) { var t = Ct, e = t.lib, d = e.WordArray, i = e.Hasher, l = t.x64.Word, r = t.algo, C = [], D = [], R = []; !function () { for (var t = 1, e = 0, r = 0; r < 24; r++) { C[t + 5 * e] = (r + 1) * (r + 2) / 2 % 64; var i = (2 * t + 3 * e) % 5; t = e % 5, e = i } for (t = 0; t < 5; t++)for (e = 0; e < 5; e++)D[t + 5 * e] = e + (2 * t + 3 * e) % 5 * 5; for (var n = 1, o = 0; o < 24; o++) { for (var s = 0, a = 0, c = 0; c < 7; c++) { if (1 & n) { var h = (1 << c) - 1; h < 32 ? a ^= 1 << h : s ^= 1 << h - 32 } 128 & n ? n = n << 1 ^ 113 : n <<= 1 } R[o] = l.create(s, a) } }(); var E = []; !function () { for (var t = 0; t < 25; t++)E[t] = l.create() }(); var n = r.SHA3 = i.extend({ cfg: i.cfg.extend({ outputLength: 512 }), _doReset: function () { for (var t = this._state = [], e = 0; e < 25; e++)t[e] = new l.init; this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32 }, _doProcessBlock: function (t, e) { for (var r = this._state, i = this.blockSize / 2, n = 0; n < i; n++) { var o = t[e + 2 * n], s = t[e + 2 * n + 1]; o = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), s = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), (x = r[n]).high ^= s, x.low ^= o } for (var a = 0; a < 24; a++) { for (var c = 0; c < 5; c++) { for (var h = 0, l = 0, f = 0; f < 5; f++) { h ^= (x = r[c + 5 * f]).high, l ^= x.low } var u = E[c]; u.high = h, u.low = l } for (c = 0; c < 5; c++) { var d = E[(c + 4) % 5], p = E[(c + 1) % 5], _ = p.high, v = p.low; for (h = d.high ^ (_ << 1 | v >>> 31), l = d.low ^ (v << 1 | _ >>> 31), f = 0; f < 5; f++) { (x = r[c + 5 * f]).high ^= h, x.low ^= l } } for (var y = 1; y < 25; y++) { var g = (x = r[y]).high, B = x.low, w = C[y]; if (w < 32) h = g << w | B >>> 32 - w, l = B << w | g >>> 32 - w; else h = B << w - 32 | g >>> 64 - w, l = g << w - 32 | B >>> 64 - w; var k = E[D[y]]; k.high = h, k.low = l } var S = E[0], m = r[0]; S.high = m.high, S.low = m.low; for (c = 0; c < 5; c++)for (f = 0; f < 5; f++) { var x = r[y = c + 5 * f], b = E[y], H = E[(c + 1) % 5 + 5 * f], z = E[(c + 2) % 5 + 5 * f]; x.high = b.high ^ ~H.high & z.high, x.low = b.low ^ ~H.low & z.low } x = r[0]; var A = R[a]; x.high ^= A.high, x.low ^= A.low } }, _doFinalize: function () { var t = this._data, e = t.words, r = (this._nDataBytes, 8 * t.sigBytes), i = 32 * this.blockSize; e[r >>> 5] |= 1 << 24 - r % 32, e[(u.ceil((r + 1) / i) * i >>> 5) - 1] |= 128, t.sigBytes = 4 * e.length, this._process(); for (var n = this._state, o = this.cfg.outputLength / 8, s = o / 8, a = [], c = 0; c < s; c++) { var h = n[c], l = h.high, f = h.low; l = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8), f = 16711935 & (f << 8 | f >>> 24) | 4278255360 & (f << 24 | f >>> 8), a.push(f), a.push(l) } return new d.init(a, o) }, clone: function () { for (var t = i.clone.call(this), e = t._state = this._state.slice(0), r = 0; r < 25; r++)e[r] = e[r].clone(); return t } }); t.SHA3 = i._createHelper(n), t.HmacSHA3 = i._createHmacHelper(n) }(Math), function () { var t = Ct, e = t.lib.Hasher, r = t.x64, i = r.Word, n = r.WordArray, o = t.algo; function s() { return i.create.apply(i, arguments) } var mt = [s(1116352408, 3609767458), s(1899447441, 602891725), s(3049323471, 3964484399), s(3921009573, 2173295548), s(961987163, 4081628472), s(1508970993, 3053834265), s(2453635748, 2937671579), s(2870763221, 3664609560), s(3624381080, 2734883394), s(310598401, 1164996542), s(607225278, 1323610764), s(1426881987, 3590304994), s(1925078388, 4068182383), s(2162078206, 991336113), s(2614888103, 633803317), s(3248222580, 3479774868), s(3835390401, 2666613458), s(4022224774, 944711139), s(264347078, 2341262773), s(604807628, 2007800933), s(770255983, 1495990901), s(1249150122, 1856431235), s(1555081692, 3175218132), s(1996064986, 2198950837), s(2554220882, 3999719339), s(2821834349, 766784016), s(2952996808, 2566594879), s(3210313671, 3203337956), s(3336571891, 1034457026), s(3584528711, 2466948901), s(113926993, 3758326383), s(338241895, 168717936), s(666307205, 1188179964), s(773529912, 1546045734), s(1294757372, 1522805485), s(1396182291, 2643833823), s(1695183700, 2343527390), s(1986661051, 1014477480), s(2177026350, 1206759142), s(2456956037, 344077627), s(2730485921, 1290863460), s(2820302411, 3158454273), s(3259730800, 3505952657), s(3345764771, 106217008), s(3516065817, 3606008344), s(3600352804, 1432725776), s(4094571909, 1467031594), s(275423344, 851169720), s(430227734, 3100823752), s(506948616, 1363258195), s(659060556, 3750685593), s(883997877, 3785050280), s(958139571, 3318307427), s(1322822218, 3812723403), s(1537002063, 2003034995), s(1747873779, 3602036899), s(1955562222, 1575990012), s(2024104815, 1125592928), s(2227730452, 2716904306), s(2361852424, 442776044), s(2428436474, 593698344), s(2756734187, 3733110249), s(3204031479, 2999351573), s(3329325298, 3815920427), s(3391569614, 3928383900), s(3515267271, 566280711), s(3940187606, 3454069534), s(4118630271, 4000239992), s(116418474, 1914138554), s(174292421, 2731055270), s(289380356, 3203993006), s(460393269, 320620315), s(685471733, 587496836), s(852142971, 1086792851), s(1017036298, 365543100), s(1126000580, 2618297676), s(1288033470, 3409855158), s(1501505948, 4234509866), s(1607167915, 987167468), s(1816402316, 1246189591)], xt = []; !function () { for (var t = 0; t < 80; t++)xt[t] = s() }(); var a = o.SHA512 = e.extend({ _doReset: function () { this._hash = new n.init([new i.init(1779033703, 4089235720), new i.init(3144134277, 2227873595), new i.init(1013904242, 4271175723), new i.init(2773480762, 1595750129), new i.init(1359893119, 2917565137), new i.init(2600822924, 725511199), new i.init(528734635, 4215389547), new i.init(1541459225, 327033209)]) }, _doProcessBlock: function (t, e) { for (var r = this._hash.words, i = r[0], n = r[1], o = r[2], s = r[3], a = r[4], c = r[5], h = r[6], l = r[7], f = i.high, u = i.low, d = n.high, p = n.low, _ = o.high, v = o.low, y = s.high, g = s.low, B = a.high, w = a.low, k = c.high, S = c.low, m = h.high, x = h.low, b = l.high, H = l.low, z = f, A = u, C = d, D = p, R = _, E = v, M = y, F = g, P = B, W = w, O = k, U = S, I = m, K = x, X = b, L = H, j = 0; j < 80; j++) { var N = xt[j]; if (j < 16) var T = N.high = 0 | t[e + 2 * j], Z = N.low = 0 | t[e + 2 * j + 1]; else { var q = xt[j - 15], G = q.high, J = q.low, $ = (G >>> 1 | J << 31) ^ (G >>> 8 | J << 24) ^ G >>> 7, Q = (J >>> 1 | G << 31) ^ (J >>> 8 | G << 24) ^ (J >>> 7 | G << 25), V = xt[j - 2], Y = V.high, tt = V.low, et = (Y >>> 19 | tt << 13) ^ (Y << 3 | tt >>> 29) ^ Y >>> 6, rt = (tt >>> 19 | Y << 13) ^ (tt << 3 | Y >>> 29) ^ (tt >>> 6 | Y << 26), it = xt[j - 7], nt = it.high, ot = it.low, st = xt[j - 16], at = st.high, ct = st.low; T = (T = (T = $ + nt + ((Z = Q + ot) >>> 0 < Q >>> 0 ? 1 : 0)) + et + ((Z = Z + rt) >>> 0 < rt >>> 0 ? 1 : 0)) + at + ((Z = Z + ct) >>> 0 < ct >>> 0 ? 1 : 0); N.high = T, N.low = Z } var ht, lt = P & O ^ ~P & I, ft = W & U ^ ~W & K, ut = z & C ^ z & R ^ C & R, dt = A & D ^ A & E ^ D & E, pt = (z >>> 28 | A << 4) ^ (z << 30 | A >>> 2) ^ (z << 25 | A >>> 7), _t = (A >>> 28 | z << 4) ^ (A << 30 | z >>> 2) ^ (A << 25 | z >>> 7), vt = (P >>> 14 | W << 18) ^ (P >>> 18 | W << 14) ^ (P << 23 | W >>> 9), yt = (W >>> 14 | P << 18) ^ (W >>> 18 | P << 14) ^ (W << 23 | P >>> 9), gt = mt[j], Bt = gt.high, wt = gt.low, kt = X + vt + ((ht = L + yt) >>> 0 < L >>> 0 ? 1 : 0), St = _t + dt; X = I, L = K, I = O, K = U, O = P, U = W, P = M + (kt = (kt = (kt = kt + lt + ((ht = ht + ft) >>> 0 < ft >>> 0 ? 1 : 0)) + Bt + ((ht = ht + wt) >>> 0 < wt >>> 0 ? 1 : 0)) + T + ((ht = ht + Z) >>> 0 < Z >>> 0 ? 1 : 0)) + ((W = F + ht | 0) >>> 0 < F >>> 0 ? 1 : 0) | 0, M = R, F = E, R = C, E = D, C = z, D = A, z = kt + (pt + ut + (St >>> 0 < _t >>> 0 ? 1 : 0)) + ((A = ht + St | 0) >>> 0 < ht >>> 0 ? 1 : 0) | 0 } u = i.low = u + A, i.high = f + z + (u >>> 0 < A >>> 0 ? 1 : 0), p = n.low = p + D, n.high = d + C + (p >>> 0 < D >>> 0 ? 1 : 0), v = o.low = v + E, o.high = _ + R + (v >>> 0 < E >>> 0 ? 1 : 0), g = s.low = g + F, s.high = y + M + (g >>> 0 < F >>> 0 ? 1 : 0), w = a.low = w + W, a.high = B + P + (w >>> 0 < W >>> 0 ? 1 : 0), S = c.low = S + U, c.high = k + O + (S >>> 0 < U >>> 0 ? 1 : 0), x = h.low = x + K, h.high = m + I + (x >>> 0 < K >>> 0 ? 1 : 0), H = l.low = H + L, l.high = b + X + (H >>> 0 < L >>> 0 ? 1 : 0) }, _doFinalize: function () { var t = this._data, e = t.words, r = 8 * this._nDataBytes, i = 8 * t.sigBytes; return e[i >>> 5] |= 128 << 24 - i % 32, e[30 + (i + 128 >>> 10 << 5)] = Math.floor(r / 4294967296), e[31 + (i + 128 >>> 10 << 5)] = r, t.sigBytes = 4 * e.length, this._process(), this._hash.toX32() }, clone: function () { var t = e.clone.call(this); return t._hash = this._hash.clone(), t }, blockSize: 32 }); t.SHA512 = e._createHelper(a), t.HmacSHA512 = e._createHmacHelper(a) }(), $ = (J = Ct).x64, Q = $.Word, V = $.WordArray, Y = J.algo, tt = Y.SHA512, et = Y.SHA384 = tt.extend({ _doReset: function () { this._hash = new V.init([new Q.init(3418070365, 3238371032), new Q.init(1654270250, 914150663), new Q.init(2438529370, 812702999), new Q.init(355462360, 4144912697), new Q.init(1731405415, 4290775857), new Q.init(2394180231, 1750603025), new Q.init(3675008525, 1694076839), new Q.init(1203062813, 3204075428)]) }, _doFinalize: function () { var t = tt._doFinalize.call(this); return t.sigBytes -= 16, t } }), J.SHA384 = tt._createHelper(et), J.HmacSHA384 = tt._createHmacHelper(et), Ct.lib.Cipher || (nt = (it = Ct).lib, ot = nt.Base, st = nt.WordArray, at = nt.BufferedBlockAlgorithm, (ct = it.enc).Utf8, ht = ct.Base64, lt = it.algo.EvpKDF, ft = nt.Cipher = at.extend({ cfg: ot.extend(), createEncryptor: function (t, e) { return this.create(this._ENC_XFORM_MODE, t, e) }, createDecryptor: function (t, e) { return this.create(this._DEC_XFORM_MODE, t, e) }, init: function (t, e, r) { this.cfg = this.cfg.extend(r), this._xformMode = t, this._key = e, this.reset() }, reset: function () { at.reset.call(this), this._doReset() }, process: function (t) { return this._append(t), this._process() }, finalize: function (t) { return t && this._append(t), this._doFinalize() }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function () { function n(t) { return "string" == typeof t ? wt : gt } return function (i) { return { encrypt: function (t, e, r) { return n(e).encrypt(i, t, e, r) }, decrypt: function (t, e, r) { return n(e).decrypt(i, t, e, r) } } } }() }), nt.StreamCipher = ft.extend({ _doFinalize: function () { return this._process(!0) }, blockSize: 1 }), ut = it.mode = {}, dt = nt.BlockCipherMode = ot.extend({ createEncryptor: function (t, e) { return this.Encryptor.create(t, e) }, createDecryptor: function (t, e) { return this.Decryptor.create(t, e) }, init: function (t, e) { this._cipher = t, this._iv = e } }), pt = ut.CBC = function () { var t = dt.extend(); function o(t, e, r) { var i = this._iv; if (i) { var n = i; this._iv = rt } else n = this._prevBlock; for (var o = 0; o < r; o++)t[e + o] ^= n[o] } return t.Encryptor = t.extend({ processBlock: function (t, e) { var r = this._cipher, i = r.blockSize; o.call(this, t, e, i), r.encryptBlock(t, e), this._prevBlock = t.slice(e, e + i) } }), t.Decryptor = t.extend({ processBlock: function (t, e) { var r = this._cipher, i = r.blockSize, n = t.slice(e, e + i); r.decryptBlock(t, e), o.call(this, t, e, i), this._prevBlock = n } }), t }(), _t = (it.pad = {}).Pkcs7 = { pad: function (t, e) { for (var r = 4 * e, i = r - t.sigBytes % r, n = i << 24 | i << 16 | i << 8 | i, o = [], s = 0; s < i; s += 4)o.push(n); var a = st.create(o, i); t.concat(a) }, unpad: function (t) { var e = 255 & t.words[t.sigBytes - 1 >>> 2]; t.sigBytes -= e } }, nt.BlockCipher = ft.extend({ cfg: ft.cfg.extend({ mode: pt, padding: _t }), reset: function () { ft.reset.call(this); var t = this.cfg, e = t.iv, r = t.mode; if (this._xformMode == this._ENC_XFORM_MODE) var i = r.createEncryptor; else { i = r.createDecryptor; this._minBufferSize = 1 } this._mode && this._mode.__creator == i ? this._mode.init(this, e && e.words) : (this._mode = i.call(r, this, e && e.words), this._mode.__creator = i) }, _doProcessBlock: function (t, e) { this._mode.processBlock(t, e) }, _doFinalize: function () { var t = this.cfg.padding; if (this._xformMode == this._ENC_XFORM_MODE) { t.pad(this._data, this.blockSize); var e = this._process(!0) } else { e = this._process(!0); t.unpad(e) } return e }, blockSize: 4 }), vt = nt.CipherParams = ot.extend({ init: function (t) { this.mixIn(t) }, toString: function (t) { return (t || this.formatter).stringify(this) } }), yt = (it.format = {}).OpenSSL = { stringify: function (t) { var e = t.ciphertext, r = t.salt; if (r) var i = st.create([1398893684, 1701076831]).concat(r).concat(e); else i = e; return i.toString(ht) }, parse: function (t) { var e = ht.parse(t), r = e.words; if (1398893684 == r[0] && 1701076831 == r[1]) { var i = st.create(r.slice(2, 4)); r.splice(0, 4), e.sigBytes -= 16 } return vt.create({ ciphertext: e, salt: i }) } }, gt = nt.SerializableCipher = ot.extend({ cfg: ot.extend({ format: yt }), encrypt: function (t, e, r, i) { i = this.cfg.extend(i); var n = t.createEncryptor(r, i), o = n.finalize(e), s = n.cfg; return vt.create({ ciphertext: o, key: r, iv: s.iv, algorithm: t, mode: s.mode, padding: s.padding, blockSize: t.blockSize, formatter: i.format }) }, decrypt: function (t, e, r, i) { return i = this.cfg.extend(i), e = this._parse(e, i.format), t.createDecryptor(r, i).finalize(e.ciphertext) }, _parse: function (t, e) { return "string" == typeof t ? e.parse(t, this) : t } }), Bt = (it.kdf = {}).OpenSSL = { execute: function (t, e, r, i) { i || (i = st.random(8)); var n = lt.create({ keySize: e + r }).compute(t, i), o = st.create(n.words.slice(e), 4 * r); return n.sigBytes = 4 * e, vt.create({ key: n, iv: o, salt: i }) } }, wt = nt.PasswordBasedCipher = gt.extend({ cfg: gt.cfg.extend({ kdf: Bt }), encrypt: function (t, e, r, i) { var n = (i = this.cfg.extend(i)).kdf.execute(r, t.keySize, t.ivSize); i.iv = n.iv; var o = gt.encrypt.call(this, t, e, n.key, i); return o.mixIn(n), o }, decrypt: function (t, e, r, i) { i = this.cfg.extend(i), e = this._parse(e, i.format); var n = i.kdf.execute(r, t.keySize, t.ivSize, e.salt); return i.iv = n.iv, gt.decrypt.call(this, t, e, n.key, i) } })), Ct.mode.CFB = function () { var t = Ct.lib.BlockCipherMode.extend(); function o(t, e, r, i) { var n = this._iv; if (n) { var o = n.slice(0); this._iv = void 0 } else o = this._prevBlock; i.encryptBlock(o, 0); for (var s = 0; s < r; s++)t[e + s] ^= o[s] } return t.Encryptor = t.extend({ processBlock: function (t, e) { var r = this._cipher, i = r.blockSize; o.call(this, t, e, i, r), this._prevBlock = t.slice(e, e + i) } }), t.Decryptor = t.extend({ processBlock: function (t, e) { var r = this._cipher, i = r.blockSize, n = t.slice(e, e + i); o.call(this, t, e, i, r), this._prevBlock = n } }), t }(), Ct.mode.ECB = ((kt = Ct.lib.BlockCipherMode.extend()).Encryptor = kt.extend({ processBlock: function (t, e) { this._cipher.encryptBlock(t, e) } }), kt.Decryptor = kt.extend({ processBlock: function (t, e) { this._cipher.decryptBlock(t, e) } }), kt), Ct.pad.AnsiX923 = { pad: function (t, e) { var r = t.sigBytes, i = 4 * e, n = i - r % i, o = r + n - 1; t.clamp(), t.words[o >>> 2] |= n << 24 - o % 4 * 8, t.sigBytes += n }, unpad: function (t) { var e = 255 & t.words[t.sigBytes - 1 >>> 2]; t.sigBytes -= e } }, Ct.pad.Iso10126 = { pad: function (t, e) { var r = 4 * e, i = r - t.sigBytes % r; t.concat(Ct.lib.WordArray.random(i - 1)).concat(Ct.lib.WordArray.create([i << 24], 1)) }, unpad: function (t) { var e = 255 & t.words[t.sigBytes - 1 >>> 2]; t.sigBytes -= e } }, Ct.pad.Iso97971 = { pad: function (t, e) { t.concat(Ct.lib.WordArray.create([2147483648], 1)), Ct.pad.ZeroPadding.pad(t, e) }, unpad: function (t) { Ct.pad.ZeroPadding.unpad(t), t.sigBytes-- } }, Ct.mode.OFB = (St = Ct.lib.BlockCipherMode.extend(), mt = St.Encryptor = St.extend({ processBlock: function (t, e) { var r = this._cipher, i = r.blockSize, n = this._iv, o = this._keystream; n && (o = this._keystream = n.slice(0), this._iv = void 0), r.encryptBlock(o, 0); for (var s = 0; s < i; s++)t[e + s] ^= o[s] } }), St.Decryptor = mt, St), Ct.pad.NoPadding = { pad: function () { }, unpad: function () { } }, bt = (xt = Ct).lib.CipherParams, Ht = xt.enc.Hex, xt.format.Hex = { stringify: function (t) { return t.ciphertext.toString(Ht) }, parse: function (t) { var e = Ht.parse(t); return bt.create({ ciphertext: e }) } }, function () { var t = Ct, e = t.lib.BlockCipher, r = t.algo, h = [], l = [], f = [], u = [], d = [], p = [], _ = [], v = [], y = [], g = []; !function () { for (var t = [], e = 0; e < 256; e++)t[e] = e < 128 ? e << 1 : e << 1 ^ 283; var r = 0, i = 0; for (e = 0; e < 256; e++) { var n = i ^ i << 1 ^ i << 2 ^ i << 3 ^ i << 4; n = n >>> 8 ^ 255 & n ^ 99, h[r] = n; var o = t[l[n] = r], s = t[o], a = t[s], c = 257 * t[n] ^ 16843008 * n; f[r] = c << 24 | c >>> 8, u[r] = c << 16 | c >>> 16, d[r] = c << 8 | c >>> 24, p[r] = c; c = 16843009 * a ^ 65537 * s ^ 257 * o ^ 16843008 * r; _[n] = c << 24 | c >>> 8, v[n] = c << 16 | c >>> 16, y[n] = c << 8 | c >>> 24, g[n] = c, r ? (r = o ^ t[t[t[a ^ o]]], i ^= t[t[i]]) : r = i = 1 } }(); var B = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], i = r.AES = e.extend({ _doReset: function () { if (!this._nRounds || this._keyPriorReset !== this._key) { for (var t = this._keyPriorReset = this._key, e = t.words, r = t.sigBytes / 4, i = 4 * ((this._nRounds = r + 6) + 1), n = this._keySchedule = [], o = 0; o < i; o++)if (o < r) n[o] = e[o]; else { var s = n[o - 1]; o % r ? 6 < r && o % r == 4 && (s = h[s >>> 24] << 24 | h[s >>> 16 & 255] << 16 | h[s >>> 8 & 255] << 8 | h[255 & s]) : (s = h[(s = s << 8 | s >>> 24) >>> 24] << 24 | h[s >>> 16 & 255] << 16 | h[s >>> 8 & 255] << 8 | h[255 & s], s ^= B[o / r | 0] << 24), n[o] = n[o - r] ^ s } for (var a = this._invKeySchedule = [], c = 0; c < i; c++) { o = i - c; if (c % 4) s = n[o]; else s = n[o - 4]; a[c] = c < 4 || o <= 4 ? s : _[h[s >>> 24]] ^ v[h[s >>> 16 & 255]] ^ y[h[s >>> 8 & 255]] ^ g[h[255 & s]] } } }, encryptBlock: function (t, e) { this._doCryptBlock(t, e, this._keySchedule, f, u, d, p, h) }, decryptBlock: function (t, e) { var r = t[e + 1]; t[e + 1] = t[e + 3], t[e + 3] = r, this._doCryptBlock(t, e, this._invKeySchedule, _, v, y, g, l); r = t[e + 1]; t[e + 1] = t[e + 3], t[e + 3] = r }, _doCryptBlock: function (t, e, r, i, n, o, s, a) { for (var c = this._nRounds, h = t[e] ^ r[0], l = t[e + 1] ^ r[1], f = t[e + 2] ^ r[2], u = t[e + 3] ^ r[3], d = 4, p = 1; p < c; p++) { var _ = i[h >>> 24] ^ n[l >>> 16 & 255] ^ o[f >>> 8 & 255] ^ s[255 & u] ^ r[d++], v = i[l >>> 24] ^ n[f >>> 16 & 255] ^ o[u >>> 8 & 255] ^ s[255 & h] ^ r[d++], y = i[f >>> 24] ^ n[u >>> 16 & 255] ^ o[h >>> 8 & 255] ^ s[255 & l] ^ r[d++], g = i[u >>> 24] ^ n[h >>> 16 & 255] ^ o[l >>> 8 & 255] ^ s[255 & f] ^ r[d++]; h = _, l = v, f = y, u = g } _ = (a[h >>> 24] << 24 | a[l >>> 16 & 255] << 16 | a[f >>> 8 & 255] << 8 | a[255 & u]) ^ r[d++], v = (a[l >>> 24] << 24 | a[f >>> 16 & 255] << 16 | a[u >>> 8 & 255] << 8 | a[255 & h]) ^ r[d++], y = (a[f >>> 24] << 24 | a[u >>> 16 & 255] << 16 | a[h >>> 8 & 255] << 8 | a[255 & l]) ^ r[d++], g = (a[u >>> 24] << 24 | a[h >>> 16 & 255] << 16 | a[l >>> 8 & 255] << 8 | a[255 & f]) ^ r[d++]; t[e] = _, t[e + 1] = v, t[e + 2] = y, t[e + 3] = g }, keySize: 8 }); t.AES = e._createHelper(i) }(), function () { var t = Ct, e = t.lib, r = e.WordArray, i = e.BlockCipher, n = t.algo, h = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4], l = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32], f = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28], u = [{ 0: 8421888, 268435456: 32768, 536870912: 8421378, 805306368: 2, 1073741824: 512, 1342177280: 8421890, 1610612736: 8389122, 1879048192: 8388608, 2147483648: 514, 2415919104: 8389120, 2684354560: 33280, 2952790016: 8421376, 3221225472: 32770, 3489660928: 8388610, 3758096384: 0, 4026531840: 33282, 134217728: 0, 402653184: 8421890, 671088640: 33282, 939524096: 32768, 1207959552: 8421888, 1476395008: 512, 1744830464: 8421378, 2013265920: 2, 2281701376: 8389120, 2550136832: 33280, 2818572288: 8421376, 3087007744: 8389122, 3355443200: 8388610, 3623878656: 32770, 3892314112: 514, 4160749568: 8388608, 1: 32768, 268435457: 2, 536870913: 8421888, 805306369: 8388608, 1073741825: 8421378, 1342177281: 33280, 1610612737: 512, 1879048193: 8389122, 2147483649: 8421890, 2415919105: 8421376, 2684354561: 8388610, 2952790017: 33282, 3221225473: 514, 3489660929: 8389120, 3758096385: 32770, 4026531841: 0, 134217729: 8421890, 402653185: 8421376, 671088641: 8388608, 939524097: 512, 1207959553: 32768, 1476395009: 8388610, 1744830465: 2, 2013265921: 33282, 2281701377: 32770, 2550136833: 8389122, 2818572289: 514, 3087007745: 8421888, 3355443201: 8389120, 3623878657: 0, 3892314113: 33280, 4160749569: 8421378 }, { 0: 1074282512, 16777216: 16384, 33554432: 524288, 50331648: 1074266128, 67108864: 1073741840, 83886080: 1074282496, 100663296: 1073758208, 117440512: 16, 134217728: 540672, 150994944: 1073758224, 167772160: 1073741824, 184549376: 540688, 201326592: 524304, 218103808: 0, 234881024: 16400, 251658240: 1074266112, 8388608: 1073758208, 25165824: 540688, 41943040: 16, 58720256: 1073758224, 75497472: 1074282512, 92274688: 1073741824, 109051904: 524288, 125829120: 1074266128, 142606336: 524304, 159383552: 0, 176160768: 16384, 192937984: 1074266112, 209715200: 1073741840, 226492416: 540672, 243269632: 1074282496, 260046848: 16400, 268435456: 0, 285212672: 1074266128, 301989888: 1073758224, 318767104: 1074282496, 335544320: 1074266112, 352321536: 16, 369098752: 540688, 385875968: 16384, 402653184: 16400, 419430400: 524288, 436207616: 524304, 452984832: 1073741840, 469762048: 540672, 486539264: 1073758208, 503316480: 1073741824, 520093696: 1074282512, 276824064: 540688, 293601280: 524288, 310378496: 1074266112, 327155712: 16384, 343932928: 1073758208, 360710144: 1074282512, 377487360: 16, 394264576: 1073741824, 411041792: 1074282496, 427819008: 1073741840, 444596224: 1073758224, 461373440: 524304, 478150656: 0, 494927872: 16400, 511705088: 1074266128, 528482304: 540672 }, { 0: 260, 1048576: 0, 2097152: 67109120, 3145728: 65796, 4194304: 65540, 5242880: 67108868, 6291456: 67174660, 7340032: 67174400, 8388608: 67108864, 9437184: 67174656, 10485760: 65792, 11534336: 67174404, 12582912: 67109124, 13631488: 65536, 14680064: 4, 15728640: 256, 524288: 67174656, 1572864: 67174404, 2621440: 0, 3670016: 67109120, 4718592: 67108868, 5767168: 65536, 6815744: 65540, 7864320: 260, 8912896: 4, 9961472: 256, 11010048: 67174400, 12058624: 65796, 13107200: 65792, 14155776: 67109124, 15204352: 67174660, 16252928: 67108864, 16777216: 67174656, 17825792: 65540, 18874368: 65536, 19922944: 67109120, 20971520: 256, 22020096: 67174660, 23068672: 67108868, 24117248: 0, 25165824: 67109124, 26214400: 67108864, 27262976: 4, 28311552: 65792, 29360128: 67174400, 30408704: 260, 31457280: 65796, 32505856: 67174404, 17301504: 67108864, 18350080: 260, 19398656: 67174656, 20447232: 0, 21495808: 65540, 22544384: 67109120, 23592960: 256, 24641536: 67174404, 25690112: 65536, 26738688: 67174660, 27787264: 65796, 28835840: 67108868, 29884416: 67109124, 30932992: 67174400, 31981568: 4, 33030144: 65792 }, { 0: 2151682048, 65536: 2147487808, 131072: 4198464, 196608: 2151677952, 262144: 0, 327680: 4198400, 393216: 2147483712, 458752: 4194368, 524288: 2147483648, 589824: 4194304, 655360: 64, 720896: 2147487744, 786432: 2151678016, 851968: 4160, 917504: 4096, 983040: 2151682112, 32768: 2147487808, 98304: 64, 163840: 2151678016, 229376: 2147487744, 294912: 4198400, 360448: 2151682112, 425984: 0, 491520: 2151677952, 557056: 4096, 622592: 2151682048, 688128: 4194304, 753664: 4160, 819200: 2147483648, 884736: 4194368, 950272: 4198464, 1015808: 2147483712, 1048576: 4194368, 1114112: 4198400, 1179648: 2147483712, 1245184: 0, 1310720: 4160, 1376256: 2151678016, 1441792: 2151682048, 1507328: 2147487808, 1572864: 2151682112, 1638400: 2147483648, 1703936: 2151677952, 1769472: 4198464, 1835008: 2147487744, 1900544: 4194304, 1966080: 64, 2031616: 4096, 1081344: 2151677952, 1146880: 2151682112, 1212416: 0, 1277952: 4198400, 1343488: 4194368, 1409024: 2147483648, 1474560: 2147487808, 1540096: 64, 1605632: 2147483712, 1671168: 4096, 1736704: 2147487744, 1802240: 2151678016, 1867776: 4160, 1933312: 2151682048, 1998848: 4194304, 2064384: 4198464 }, { 0: 128, 4096: 17039360, 8192: 262144, 12288: 536870912, 16384: 537133184, 20480: 16777344, 24576: 553648256, 28672: 262272, 32768: 16777216, 36864: 537133056, 40960: 536871040, 45056: 553910400, 49152: 553910272, 53248: 0, 57344: 17039488, 61440: 553648128, 2048: 17039488, 6144: 553648256, 10240: 128, 14336: 17039360, 18432: 262144, 22528: 537133184, 26624: 553910272, 30720: 536870912, 34816: 537133056, 38912: 0, 43008: 553910400, 47104: 16777344, 51200: 536871040, 55296: 553648128, 59392: 16777216, 63488: 262272, 65536: 262144, 69632: 128, 73728: 536870912, 77824: 553648256, 81920: 16777344, 86016: 553910272, 90112: 537133184, 94208: 16777216, 98304: 553910400, 102400: 553648128, 106496: 17039360, 110592: 537133056, 114688: 262272, 118784: 536871040, 122880: 0, 126976: 17039488, 67584: 553648256, 71680: 16777216, 75776: 17039360, 79872: 537133184, 83968: 536870912, 88064: 17039488, 92160: 128, 96256: 553910272, 100352: 262272, 104448: 553910400, 108544: 0, 112640: 553648128, 116736: 16777344, 120832: 262144, 124928: 537133056, 129024: 536871040 }, { 0: 268435464, 256: 8192, 512: 270532608, 768: 270540808, 1024: 268443648, 1280: 2097152, 1536: 2097160, 1792: 268435456, 2048: 0, 2304: 268443656, 2560: 2105344, 2816: 8, 3072: 270532616, 3328: 2105352, 3584: 8200, 3840: 270540800, 128: 270532608, 384: 270540808, 640: 8, 896: 2097152, 1152: 2105352, 1408: 268435464, 1664: 268443648, 1920: 8200, 2176: 2097160, 2432: 8192, 2688: 268443656, 2944: 270532616, 3200: 0, 3456: 270540800, 3712: 2105344, 3968: 268435456, 4096: 268443648, 4352: 270532616, 4608: 270540808, 4864: 8200, 5120: 2097152, 5376: 268435456, 5632: 268435464, 5888: 2105344, 6144: 2105352, 6400: 0, 6656: 8, 6912: 270532608, 7168: 8192, 7424: 268443656, 7680: 270540800, 7936: 2097160, 4224: 8, 4480: 2105344, 4736: 2097152, 4992: 268435464, 5248: 268443648, 5504: 8200, 5760: 270540808, 6016: 270532608, 6272: 270540800, 6528: 270532616, 6784: 8192, 7040: 2105352, 7296: 2097160, 7552: 0, 7808: 268435456, 8064: 268443656 }, { 0: 1048576, 16: 33555457, 32: 1024, 48: 1049601, 64: 34604033, 80: 0, 96: 1, 112: 34603009, 128: 33555456, 144: 1048577, 160: 33554433, 176: 34604032, 192: 34603008, 208: 1025, 224: 1049600, 240: 33554432, 8: 34603009, 24: 0, 40: 33555457, 56: 34604032, 72: 1048576, 88: 33554433, 104: 33554432, 120: 1025, 136: 1049601, 152: 33555456, 168: 34603008, 184: 1048577, 200: 1024, 216: 34604033, 232: 1, 248: 1049600, 256: 33554432, 272: 1048576, 288: 33555457, 304: 34603009, 320: 1048577, 336: 33555456, 352: 34604032, 368: 1049601, 384: 1025, 400: 34604033, 416: 1049600, 432: 1, 448: 0, 464: 34603008, 480: 33554433, 496: 1024, 264: 1049600, 280: 33555457, 296: 34603009, 312: 1, 328: 33554432, 344: 1048576, 360: 1025, 376: 34604032, 392: 33554433, 408: 34603008, 424: 0, 440: 34604033, 456: 1049601, 472: 1024, 488: 33555456, 504: 1048577 }, { 0: 134219808, 1: 131072, 2: 134217728, 3: 32, 4: 131104, 5: 134350880, 6: 134350848, 7: 2048, 8: 134348800, 9: 134219776, 10: 133120, 11: 134348832, 12: 2080, 13: 0, 14: 134217760, 15: 133152, 2147483648: 2048, 2147483649: 134350880, 2147483650: 134219808, 2147483651: 134217728, 2147483652: 134348800, 2147483653: 133120, 2147483654: 133152, 2147483655: 32, 2147483656: 134217760, 2147483657: 2080, 2147483658: 131104, 2147483659: 134350848, 2147483660: 0, 2147483661: 134348832, 2147483662: 134219776, 2147483663: 131072, 16: 133152, 17: 134350848, 18: 32, 19: 2048, 20: 134219776, 21: 134217760, 22: 134348832, 23: 131072, 24: 0, 25: 131104, 26: 134348800, 27: 134219808, 28: 134350880, 29: 133120, 30: 2080, 31: 134217728, 2147483664: 131072, 2147483665: 2048, 2147483666: 134348832, 2147483667: 133152, 2147483668: 32, 2147483669: 134348800, 2147483670: 134217728, 2147483671: 134219808, 2147483672: 134350880, 2147483673: 134217760, 2147483674: 134219776, 2147483675: 0, 2147483676: 133120, 2147483677: 2080, 2147483678: 131104, 2147483679: 134350848 }], d = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679], o = n.DES = i.extend({ _doReset: function () { for (var t = this._key.words, e = [], r = 0; r < 56; r++) { var i = h[r] - 1; e[r] = t[i >>> 5] >>> 31 - i % 32 & 1 } for (var n = this._subKeys = [], o = 0; o < 16; o++) { var s = n[o] = [], a = f[o]; for (r = 0; r < 24; r++)s[r / 6 | 0] |= e[(l[r] - 1 + a) % 28] << 31 - r % 6, s[4 + (r / 6 | 0)] |= e[28 + (l[r + 24] - 1 + a) % 28] << 31 - r % 6; s[0] = s[0] << 1 | s[0] >>> 31; for (r = 1; r < 7; r++)s[r] = s[r] >>> 4 * (r - 1) + 3; s[7] = s[7] << 5 | s[7] >>> 27 } var c = this._invSubKeys = []; for (r = 0; r < 16; r++)c[r] = n[15 - r] }, encryptBlock: function (t, e) { this._doCryptBlock(t, e, this._subKeys) }, decryptBlock: function (t, e) { this._doCryptBlock(t, e, this._invSubKeys) }, _doCryptBlock: function (t, e, r) { this._lBlock = t[e], this._rBlock = t[e + 1], p.call(this, 4, 252645135), p.call(this, 16, 65535), _.call(this, 2, 858993459), _.call(this, 8, 16711935), p.call(this, 1, 1431655765); for (var i = 0; i < 16; i++) { for (var n = r[i], o = this._lBlock, s = this._rBlock, a = 0, c = 0; c < 8; c++)a |= u[c][((s ^ n[c]) & d[c]) >>> 0]; this._lBlock = s, this._rBlock = o ^ a } var h = this._lBlock; this._lBlock = this._rBlock, this._rBlock = h, p.call(this, 1, 1431655765), _.call(this, 8, 16711935), _.call(this, 2, 858993459), p.call(this, 16, 65535), p.call(this, 4, 252645135), t[e] = this._lBlock, t[e + 1] = this._rBlock }, keySize: 2, ivSize: 2, blockSize: 2 }); function p(t, e) { var r = (this._lBlock >>> t ^ this._rBlock) & e; this._rBlock ^= r, this._lBlock ^= r << t } function _(t, e) { var r = (this._rBlock >>> t ^ this._lBlock) & e; this._lBlock ^= r, this._rBlock ^= r << t } t.DES = i._createHelper(o); var s = n.TripleDES = i.extend({ _doReset: function () { var t = this._key.words; this._des1 = o.createEncryptor(r.create(t.slice(0, 2))), this._des2 = o.createEncryptor(r.create(t.slice(2, 4))), this._des3 = o.createEncryptor(r.create(t.slice(4, 6))) }, encryptBlock: function (t, e) { this._des1.encryptBlock(t, e), this._des2.decryptBlock(t, e), this._des3.encryptBlock(t, e) }, decryptBlock: function (t, e) { this._des3.decryptBlock(t, e), this._des2.encryptBlock(t, e), this._des1.decryptBlock(t, e) }, keySize: 6, ivSize: 2, blockSize: 2 }); t.TripleDES = i._createHelper(s) }(), function () { var t = Ct, e = t.lib.StreamCipher, r = t.algo, i = r.RC4 = e.extend({ _doReset: function () { for (var t = this._key, e = t.words, r = t.sigBytes, i = this._S = [], n = 0; n < 256; n++)i[n] = n; n = 0; for (var o = 0; n < 256; n++) { var s = n % r, a = e[s >>> 2] >>> 24 - s % 4 * 8 & 255; o = (o + i[n] + a) % 256; var c = i[n]; i[n] = i[o], i[o] = c } this._i = this._j = 0 }, _doProcessBlock: function (t, e) { t[e] ^= n.call(this) }, keySize: 8, ivSize: 0 }); function n() { for (var t = this._S, e = this._i, r = this._j, i = 0, n = 0; n < 4; n++) { r = (r + t[e = (e + 1) % 256]) % 256; var o = t[e]; t[e] = t[r], t[r] = o, i |= t[(t[e] + t[r]) % 256] << 24 - 8 * n } return this._i = e, this._j = r, i } t.RC4 = e._createHelper(i); var o = r.RC4Drop = i.extend({ cfg: i.cfg.extend({ drop: 192 }), _doReset: function () { i._doReset.call(this); for (var t = this.cfg.drop; 0 < t; t--)n.call(this) } }); t.RC4Drop = e._createHelper(o) }(), Ct.mode.CTRGladman = function () { var t = Ct.lib.BlockCipherMode.extend(); function h(t) { if (255 == (t >> 24 & 255)) { var e = t >> 16 & 255, r = t >> 8 & 255, i = 255 & t; 255 === e ? (e = 0, 255 === r ? (r = 0, 255 === i ? i = 0 : ++i) : ++r) : ++e, t = 0, t += e << 16, t += r << 8, t += i } else t += 1 << 24; return t } var e = t.Encryptor = t.extend({ processBlock: function (t, e) { var r, i = this._cipher, n = i.blockSize, o = this._iv, s = this._counter; o && (s = this._counter = o.slice(0), this._iv = void 0), 0 === ((r = s)[0] = h(r[0])) && (r[1] = h(r[1])); var a = s.slice(0); i.encryptBlock(a, 0); for (var c = 0; c < n; c++)t[e + c] ^= a[c] } }); return t.Decryptor = e, t }(), function () { var t = Ct, e = t.lib.StreamCipher, r = t.algo, n = [], c = [], h = [], i = r.Rabbit = e.extend({ _doReset: function () { for (var t = this._key.words, e = this.cfg.iv, r = 0; r < 4; r++)t[r] = 16711935 & (t[r] << 8 | t[r] >>> 24) | 4278255360 & (t[r] << 24 | t[r] >>> 8); var i = this._X = [t[0], t[3] << 16 | t[2] >>> 16, t[1], t[0] << 16 | t[3] >>> 16, t[2], t[1] << 16 | t[0] >>> 16, t[3], t[2] << 16 | t[1] >>> 16], n = this._C = [t[2] << 16 | t[2] >>> 16, 4294901760 & t[0] | 65535 & t[1], t[3] << 16 | t[3] >>> 16, 4294901760 & t[1] | 65535 & t[2], t[0] << 16 | t[0] >>> 16, 4294901760 & t[2] | 65535 & t[3], t[1] << 16 | t[1] >>> 16, 4294901760 & t[3] | 65535 & t[0]]; for (r = this._b = 0; r < 4; r++)u.call(this); for (r = 0; r < 8; r++)n[r] ^= i[r + 4 & 7]; if (e) { var o = e.words, s = o[0], a = o[1], c = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), h = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8), l = c >>> 16 | 4294901760 & h, f = h << 16 | 65535 & c; n[0] ^= c, n[1] ^= l, n[2] ^= h, n[3] ^= f, n[4] ^= c, n[5] ^= l, n[6] ^= h, n[7] ^= f; for (r = 0; r < 4; r++)u.call(this) } }, _doProcessBlock: function (t, e) { var r = this._X; u.call(this), n[0] = r[0] ^ r[5] >>> 16 ^ r[3] << 16, n[1] = r[2] ^ r[7] >>> 16 ^ r[5] << 16, n[2] = r[4] ^ r[1] >>> 16 ^ r[7] << 16, n[3] = r[6] ^ r[3] >>> 16 ^ r[1] << 16; for (var i = 0; i < 4; i++)n[i] = 16711935 & (n[i] << 8 | n[i] >>> 24) | 4278255360 & (n[i] << 24 | n[i] >>> 8), t[e + i] ^= n[i] }, blockSize: 4, ivSize: 2 }); function u() { for (var t = this._X, e = this._C, r = 0; r < 8; r++)c[r] = e[r]; e[0] = e[0] + 1295307597 + this._b | 0, e[1] = e[1] + 3545052371 + (e[0] >>> 0 < c[0] >>> 0 ? 1 : 0) | 0, e[2] = e[2] + 886263092 + (e[1] >>> 0 < c[1] >>> 0 ? 1 : 0) | 0, e[3] = e[3] + 1295307597 + (e[2] >>> 0 < c[2] >>> 0 ? 1 : 0) | 0, e[4] = e[4] + 3545052371 + (e[3] >>> 0 < c[3] >>> 0 ? 1 : 0) | 0, e[5] = e[5] + 886263092 + (e[4] >>> 0 < c[4] >>> 0 ? 1 : 0) | 0, e[6] = e[6] + 1295307597 + (e[5] >>> 0 < c[5] >>> 0 ? 1 : 0) | 0, e[7] = e[7] + 3545052371 + (e[6] >>> 0 < c[6] >>> 0 ? 1 : 0) | 0, this._b = e[7] >>> 0 < c[7] >>> 0 ? 1 : 0; for (r = 0; r < 8; r++) { var i = t[r] + e[r], n = 65535 & i, o = i >>> 16, s = ((n * n >>> 17) + n * o >>> 15) + o * o, a = ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0); h[r] = s ^ a } t[0] = h[0] + (h[7] << 16 | h[7] >>> 16) + (h[6] << 16 | h[6] >>> 16) | 0, t[1] = h[1] + (h[0] << 8 | h[0] >>> 24) + h[7] | 0, t[2] = h[2] + (h[1] << 16 | h[1] >>> 16) + (h[0] << 16 | h[0] >>> 16) | 0, t[3] = h[3] + (h[2] << 8 | h[2] >>> 24) + h[1] | 0, t[4] = h[4] + (h[3] << 16 | h[3] >>> 16) + (h[2] << 16 | h[2] >>> 16) | 0, t[5] = h[5] + (h[4] << 8 | h[4] >>> 24) + h[3] | 0, t[6] = h[6] + (h[5] << 16 | h[5] >>> 16) + (h[4] << 16 | h[4] >>> 16) | 0, t[7] = h[7] + (h[6] << 8 | h[6] >>> 24) + h[5] | 0 } t.Rabbit = e._createHelper(i) }(), Ct.mode.CTR = (zt = Ct.lib.BlockCipherMode.extend(), At = zt.Encryptor = zt.extend({ processBlock: function (t, e) { var r = this._cipher, i = r.blockSize, n = this._iv, o = this._counter; n && (o = this._counter = n.slice(0), this._iv = void 0); var s = o.slice(0); r.encryptBlock(s, 0), o[i - 1] = o[i - 1] + 1 | 0; for (var a = 0; a < i; a++)t[e + a] ^= s[a] } }), zt.Decryptor = At, zt), function () { var t = Ct, e = t.lib.StreamCipher, r = t.algo, n = [], c = [], h = [], i = r.RabbitLegacy = e.extend({ _doReset: function () { for (var t = this._key.words, e = this.cfg.iv, r = this._X = [t[0], t[3] << 16 | t[2] >>> 16, t[1], t[0] << 16 | t[3] >>> 16, t[2], t[1] << 16 | t[0] >>> 16, t[3], t[2] << 16 | t[1] >>> 16], i = this._C = [t[2] << 16 | t[2] >>> 16, 4294901760 & t[0] | 65535 & t[1], t[3] << 16 | t[3] >>> 16, 4294901760 & t[1] | 65535 & t[2], t[0] << 16 | t[0] >>> 16, 4294901760 & t[2] | 65535 & t[3], t[1] << 16 | t[1] >>> 16, 4294901760 & t[3] | 65535 & t[0]], n = this._b = 0; n < 4; n++)u.call(this); for (n = 0; n < 8; n++)i[n] ^= r[n + 4 & 7]; if (e) { var o = e.words, s = o[0], a = o[1], c = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), h = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8), l = c >>> 16 | 4294901760 & h, f = h << 16 | 65535 & c; i[0] ^= c, i[1] ^= l, i[2] ^= h, i[3] ^= f, i[4] ^= c, i[5] ^= l, i[6] ^= h, i[7] ^= f; for (n = 0; n < 4; n++)u.call(this) } }, _doProcessBlock: function (t, e) { var r = this._X; u.call(this), n[0] = r[0] ^ r[5] >>> 16 ^ r[3] << 16, n[1] = r[2] ^ r[7] >>> 16 ^ r[5] << 16, n[2] = r[4] ^ r[1] >>> 16 ^ r[7] << 16, n[3] = r[6] ^ r[3] >>> 16 ^ r[1] << 16; for (var i = 0; i < 4; i++)n[i] = 16711935 & (n[i] << 8 | n[i] >>> 24) | 4278255360 & (n[i] << 24 | n[i] >>> 8), t[e + i] ^= n[i] }, blockSize: 4, ivSize: 2 }); function u() { for (var t = this._X, e = this._C, r = 0; r < 8; r++)c[r] = e[r]; e[0] = e[0] + 1295307597 + this._b | 0, e[1] = e[1] + 3545052371 + (e[0] >>> 0 < c[0] >>> 0 ? 1 : 0) | 0, e[2] = e[2] + 886263092 + (e[1] >>> 0 < c[1] >>> 0 ? 1 : 0) | 0, e[3] = e[3] + 1295307597 + (e[2] >>> 0 < c[2] >>> 0 ? 1 : 0) | 0, e[4] = e[4] + 3545052371 + (e[3] >>> 0 < c[3] >>> 0 ? 1 : 0) | 0, e[5] = e[5] + 886263092 + (e[4] >>> 0 < c[4] >>> 0 ? 1 : 0) | 0, e[6] = e[6] + 1295307597 + (e[5] >>> 0 < c[5] >>> 0 ? 1 : 0) | 0, e[7] = e[7] + 3545052371 + (e[6] >>> 0 < c[6] >>> 0 ? 1 : 0) | 0, this._b = e[7] >>> 0 < c[7] >>> 0 ? 1 : 0; for (r = 0; r < 8; r++) { var i = t[r] + e[r], n = 65535 & i, o = i >>> 16, s = ((n * n >>> 17) + n * o >>> 15) + o * o, a = ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0); h[r] = s ^ a } t[0] = h[0] + (h[7] << 16 | h[7] >>> 16) + (h[6] << 16 | h[6] >>> 16) | 0, t[1] = h[1] + (h[0] << 8 | h[0] >>> 24) + h[7] | 0, t[2] = h[2] + (h[1] << 16 | h[1] >>> 16) + (h[0] << 16 | h[0] >>> 16) | 0, t[3] = h[3] + (h[2] << 8 | h[2] >>> 24) + h[1] | 0, t[4] = h[4] + (h[3] << 16 | h[3] >>> 16) + (h[2] << 16 | h[2] >>> 16) | 0, t[5] = h[5] + (h[4] << 8 | h[4] >>> 24) + h[3] | 0, t[6] = h[6] + (h[5] << 16 | h[5] >>> 16) + (h[4] << 16 | h[4] >>> 16) | 0, t[7] = h[7] + (h[6] << 8 | h[6] >>> 24) + h[5] | 0 } t.RabbitLegacy = e._createHelper(i) }(), Ct.pad.ZeroPadding = { pad: function (t, e) { var r = 4 * e; t.clamp(), t.sigBytes += r - (t.sigBytes % r || r) }, unpad: function (t) { for (var e = t.words, r = t.sigBytes - 1; !(e[r >>> 2] >>> 24 - r % 4 * 8 & 255);)r--; t.sigBytes = r + 1 } }, Ct });
var btscroll = 0;
//btstore.setItem("wdsscrollTop",btscroll);
function lgwdsshow() {

    stopScrolling();
    // 绂佹椤甸潰婊氬姩鐨勬柟娉�
    function stopScrolling(e) {
        //          闅愯棌妗嗗嚭鐜�
        $("#overlay").css('display', 'block');
        // 鎵嬫満鐢佃剳鏈夌敤
        $('body,html').bind("touchstart,touchmove", function (e) {
            e.preventDefault();
        });
        $('body,html').css({ overflow: "hidden" })
    };
    btscroll = document.documentElement.scrollTop || document.body.scrollTop;
    $('body,html').animate({
        scrollTop: 0
    }, 10);

    if ($("#registerwds").length > 0) {
        $("#registerwds").remove();
    }
    if ($("#registermsgwds").length > 0) {
        $("#registermsgwds").remove();
    }
    if ($("#forgetpwdwds").length > 0) {
        $("#forgetpwdwds").remove();
    }
    if ($("#forgetpwdlgwds").length > 0) {
        $("#forgetpwdlgwds").remove();
    }
    var tmpua = window.navigator.userAgent.toLowerCase();
    $(document.body).append("<div class=\"lg_wds_pst\" id=\"loginwds\">"
        + "<div class=\"lg_pd10\">"
        + "<div class=\"lg_wds\">"
        + "  <div class=\"lg_wds_title\">鐧诲綍</div>"
        + "  <div class=\"lg_wds_prompt\">婢庡弸鍏堟潵鐧诲綍鍚э紒</div>"
        + "  <div class=\"lg_wds_tplg\">"
        + "    <span style=\"font-weight: bold;\">绀句氦璐﹀彿鐩存帴鐧诲綍</span>"
        + "    <a href=\"javascript:weibologin(\'DOUBAN\');\" class=\"tplgrr\"></a>"
        + "    <a href=\"javascript:weibologin(\'TENCENT\');\" class=\"tplgtx\"></a>"
        + "    <a href=\"javascript:weibologin(\'SINA\');\" class=\"tplgsn\"></a>"
        + "  </div>"
        + "  <div class=\"lg_wds_inp\"><input id=\"lg_wds_name\" type=\"text\" class=\"wds_input\" tabindex=\"1\" onFocus=\"if(this.value==\'鎵嬫満鍙穃'){this.value=\'\';document.getElementById(\'lg_wds_name\').style.color=\'#333\';}\" onBlur=\"if(this.value==\'\'){this.value=\'鎵嬫満鍙穃';document.getElementById(\'lg_wds_name\').style.color=\'#999\';};\" value=\"鎵嬫満鍙穃" ></div > "
        + "  <div class=\"lg_wds_inp\"><input id=\"lg_wds_pwd\" type=\"password\" class=\"wds_input\" tabindex=\"2\" style=\"display: none;\" onblur=\"showText(\'lg_wds_pwd_text\',\'lg_wds_pwd\',\'瀵嗙爜\');\" ><input style=\"color: #999;\" class=\"wds_input\" tabindex=\"2\" id=\"lg_wds_pwd_text\" type=\"text\" value=\"瀵嗙爜\" onfocus=\"showPassWord(\'lg_wds_pwd_text\',\'lg_wds_pwd\')\"></div>"
        //    +"  <div class=\"lg_wds_inp\"><input id=\"lg_wds_pwd\" type=\"password\" class=\"wds_input\" tabindex=\"2\" style=\"display: block;\"  placeholder=\"瀵嗙爜\"></div>"
        + "  <div class=\"lg_wds_inp\">"
        + "    <input id=\"lg_wds_dynCode\" type=\"text\" value=\"璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗" class=\"wds_input\" style=\"width:40%;\" tabindex=\"3\" onFocus=\"if(this.value==\'璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗'){this.value=\'\';document.getElementById(\'lg_wds_dynCode\').style.color=\'#333\';}\" onBlur=\"if(this.value==\'\'){this.value=\'璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗';document.getElementById(\'lg_wds_dynCode\').style.color=\'#999\';};\">"
        + "    <span class=\"lg_wds_dynCode\" onClick=\"document.getElementById(\'annexCode2\').src = \'/wap/RandomPicture?\'+new Date().getTime();$(\'#lg_wds_dynCode\').val(\'璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗');\">"
        + "        <img src=\"/wap/RandomPicture\" height=\"32\" id=\"annexCode2\"> <span class=\"lg_wds_dynCodetxt\">鎹竴寮�</span>"
        + "    </span>"
        + "  </div>"
        + "  <div class=\"lg_wds_ts\" id=\"login_msg\"></div>"
        + "  <div class=\"lg_wds_bt\" onclick=\"login()\">鐧� 褰�</div>"
        + "  <div class=\"lg_wds_rmmi\">"
        + "    <span class=\"lg_rem\"><input type=\"checkbox\" id=\"remember_me\" checked=\"checked\" style=\"vertical-align: middle; margin: -3px 6px 0 0;\"><label for=\"remember_me\">璁颁綇鎴�</label></span>"
        + "    <span class=\"lg_reg\" onclick=\"registerwdsshow()\" >娉ㄥ唽</span>"
        + "    <span class=\"lg_forget\" onclick=\"forgetpwdshow()\" >蹇樿瀵嗙爜</span>"
        + "    "
        + "  </div>"
        + "  <div class=\"wds_close\" onclick=\"wdscancer()\"></div>"
        + ""
        + "</div>"
        + "</div>"
    + "</div>");

    $("#loginwds").siblings(".lg_wds_pst").css("display", "none");
    $("#bg_overlay").css('display', 'block');
    //$("#loginwds").css('display', '');
    if (getPics) {
        clearTimeout(getPics);
    }
    document.getElementById('annexCode2').src = '/wap/RandomPicture?' + new Date().getTime();
    $('#lg_wds_dynCode').val('');
    $("#lg_wds_dynCode").blur();
    $("#lg_wds_name").val("");
    $("#lg_wds_name").blur();
    $("#lg_wds_pwd").val("");
    $("#lg_wds_pwd").blur();
    $('#login_msg').html("");
    //$("#v3cont_id").show();
    var loginName = "";
    var loginName = getLoginCookie();
    if (loginName != null && loginName != "") {
        $("#lg_wds_name").val(loginName);
    }
}

function promptwdsshow() {
    btscroll = document.documentElement.scrollTop || document.body.scrollTop;
    $('body,html').animate({
        scrollTop: 0
    }, 10);
    $("#promptwds").siblings(".lg_wds_pst").css("display", "none");
    $("#bg_overlay").css('display', 'block');
    $("#promptwds").css('display', '');
}

function wdscancer() {
    movestopScrolling();
    // 瑙ｉ櫎椤甸潰婊氬姩
    function movestopScrolling(e) {
        //  闅愯棌鐙傞殣钘�
        $("#overlay").css('display', 'none');
        $('body,html').unbind("touchstart,touchmove");
        $('body,html').css({ overflow: "visible" });
    };
    if ($("#loginwds").length > 0) {
        $("#loginwds").remove();
        $("#ds_tab").show();
    }
    if ($("#registerwds").length > 0) {
        $("#registerwds").remove();
    }
    if ($("#registermsgwds").length > 0) {
        $("#registermsgwds").remove();
    }
    if ($("#forgetpwdwds").length > 0) {
        $("#forgetpwdwds").remove();
    }
    if ($("#forgetpwdlgwds").length > 0) {
        $("#forgetpwdlgwds").remove();
    }
    if ($("#modifymailwds").length > 0) {
        $("#modifymailwds").remove();
    }
    if ($("#modifyphonewds").length > 0) {
        $("#modifyphonewds").remove();
    }
    if ($("#modifysnamewds").length > 0) {
        $("#modifysnamewds").remove();
    }
    if ($("#modifypwdwds").length > 0) {
        $("#modifypwdwds").remove();
    }

    if ($("#weibo_agree_panel").length > 0) {
        $("#weibo_agree_panel").remove();
    }

    //$(".lg_wds_pst").css('display', 'none');
    $("#bg_overlay").css('display', 'none');
    //$("#v3cont_id").hide();
    window.scrollTo(0, btscroll);
    //window.scrollTo(0,btstore.getItem("wdsscrollTop"));
}


function modifysnameshow() {
    btscroll = document.documentElement.scrollTop || document.body.scrollTop;
    $('body,html').animate({
        scrollTop: 0
    }, 10);

    $(document.body).append("<div class=\"lg_wds_pst\" id=\"modifysnamewds\">"
        + "<div class=\"lg_pd10\">"
        + "<div class=\"lg_wds\" style=\"padding-bottom:10px;\">"
        + "  <div class=\"lg_wds_title\">淇敼鏄电О</div>"
        + "  <div class=\"lg_wds_prompt\">璇疯緭鍏ユ柊鏄电О</div>"
        + "  <div class=\"lg_wds_inp\" style=\"margin-top:0px;\"><input id=\"mdf_sname_dynCode\" maxlength=\"20\" type=\"text\" class=\"wds_input\" tabindex=\"2\" onFocus=\"if(this.value==\'璇疯緭鍏�4-20涓瓧绗'){this.value=\'\';document.getElementById(\'mdf_sname_dynCode\').style.color=\'#333\';}\" onBlur=\"if(this.value==\'\'){this.value=\'璇疯緭鍏�4-20涓瓧绗';document.getElementById(\'mdf_sname_dynCode\').style.color=\'#999\';};\" value=\"璇疯緭鍏�4-20涓瓧绗" ></div > "
        + "  <div class=\"lg_wds_ts\" id=\"modifysname_msg\"></div>"
        + "  <div class=\"lg_wds_bt\" onClick=\"modifysname()\">鎻� 浜�</div>"
        + "  <div class=\"wds_close\" onclick=\"wdscancer()\"></div>"
        + ""
        + "</div>"
        + "</div>"
        + "</div>");

    $("#modifysnamewds").siblings(".lg_wds_pst").css("display", "none");
    $("#bg_overlay").css('display', 'block');
    //$("#modifysnamewds").css('display', '');
}


function modifyphoneshow() {
    btscroll = document.documentElement.scrollTop || document.body.scrollTop;
    $('body,html').animate({
        scrollTop: 0
    }, 10);

    $(document.body).append("<div class=\"lg_wds_pst\" id=\"modifyphonewds\">"
        + "<div class=\"lg_pd10\">"
        + "<div class=\"lg_wds\" style=\"padding-bottom:10px;\">"
        + "  <div class=\"lg_wds_title\">淇敼鎵嬫満</div>"
        + "  <div class=\"lg_wds_prompt\">璇疯緭鍏ユ柊鎵嬫満</div>"
        + "    <div class=\"lg_wds_inp\" style=\"margin-top:0px;\">"
        + "    <input id=\"modifyphone_dynCode\" type=\"text\" value=\"璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗" class=\"wds_input\" style=\"width:40%;\" tabindex=\"3\" onFocus=\"if(this.value==\'璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗'){this.value=\'\';document.getElementById(\'modifyphone_dynCode\').style.color=\'#333\';}\" onBlur=\"if(this.value==\'\'){this.value=\'璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗';document.getElementById(\'modifyphone_dynCode\').style.color=\'#999\';};\">"
        + "    <span class=\"lg_wds_dynCode\" onClick=\"document.getElementById(\'annexCode5\').src = \'/wap/RandomPicture?\'+new Date().getTime();$(\'#modifyphone_dynCode\').val(\'璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗');\">"
        + "        <img src=\"/wap/RandomPicture\" height=\"32\" id=\"annexCode5\"> <span class=\"lg_wds_dynCodetxt\">鎹竴寮�</span>"
        + "    </span>"
        + "  </div>"
        + "  <div class=\"lg_wds_inp\">"
        + "                <span class=\"getdynCode_wds\" id=\"getmodifyphonecode\" onClick=\"getmodifyphoneCode()\">鑾峰彇楠岃瘉鐮�</span>"
        + "    <input id=\"mdf_phone\" type=\"text\" class=\"wds_input\" style=\"width:71%;\" tabindex=\"1\" onFocus=\"if(this.value==\'鎵嬫満鍙穃'){this.value=\'\';document.getElementById(\'mdf_phone\').style.color=\'#333\';}\" onBlur=\"if(this.value==\'\'){this.value=\'鎵嬫満鍙穃';document.getElementById(\'mdf_phone\').style.color=\'#999\';};\" value=\"鎵嬫満鍙穃" > "
        + "  </div>"
        + "  <div class=\"lg_wds_inp\"><input id=\"mdf_phone_dynCode\" type=\"text\" class=\"wds_input\" tabindex=\"2\" onFocus=\"if(this.value==\'杈撳叆楠岃瘉鐮乗'){this.value=\'\';document.getElementById(\'mdf_phone_dynCode\').style.color=\'#333\';}\" onBlur=\"if(this.value==\'\'){this.value=\'杈撳叆楠岃瘉鐮乗';document.getElementById(\'mdf_phone_dynCode\').style.color=\'#999\';};\" value=\"杈撳叆楠岃瘉鐮乗" ></div > "
        + "  <div class=\"lg_wds_ts\" id=\"modifyphone_msg\"></div>"
        + "  <div class=\"lg_wds_bt\" onClick=\"modifyphone()\">鎻� 浜�</div>"
        + "  <div class=\"wds_close\" onclick=\"wdscancer()\"></div>"
        + ""
        + "</div>"
        + "</div>"
        + "</div>");

    $("#modifyphonewds").siblings(".lg_wds_pst").css("display", "none");
    $("#bg_overlay").css('display', 'block');
    //$("#modifyphonewds").css('display', '');
    document.getElementById('annexCode5').src = '/wap/RandomPicture?' + new Date().getTime();
    $('#modifyphone_dynCode').val('');
    $("#modifyphone_dynCode").blur();
}

function modifymailshow() {
    btscroll = document.documentElement.scrollTop || document.body.scrollTop;
    $('body,html').animate({
        scrollTop: 0
    }, 10);

    $(document.body).append("<div class=\"lg_wds_pst\" id=\"modifymailwds\">"
        + "<div class=\"lg_pd10\">"
        + "<div class=\"lg_wds\" style=\"padding-bottom:10px;\">"
        + "  <div class=\"lg_wds_title\">淇敼閭</div>"
        + "  <div class=\"lg_wds_prompt\">璇疯緭鍏ユ柊閭</div>"
        + "    <div class=\"lg_wds_inp\" style=\"margin-top:0px;\">"
        + "    <input id=\"modifymail_dynCode\" type=\"text\" value=\"璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗" class=\"wds_input\" style=\"width:40%;\" tabindex=\"3\" onFocus=\"if(this.value==\'璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗'){this.value=\'\';document.getElementById(\'modifymail_dynCode\').style.color=\'#333\';}\" onBlur=\"if(this.value==\'\'){this.value=\'璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗';document.getElementById(\'modifymail_dynCode\').style.color=\'#999\';};\">"
        + "    <span class=\"lg_wds_dynCode\" onClick=\"document.getElementById(\'annexCode6\').src = \'/wap/RandomPicture?\'+new Date().getTime();$(\'#modifymail_dynCode\').val(\'璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗');\">"
        + "        <img src=\"/wap/RandomPicture\" height=\"32\" id=\"annexCode6\"> <span class=\"lg_wds_dynCodetxt\">鎹竴寮�</span>"
        + "    </span>"
        + "  </div>"
        + "  <div class=\"lg_wds_inp\">"
        + "                <span class=\"getdynCode_wds\" id=\"getmodifymailcode\" onClick=\"getmodifymailCode()\">鑾峰彇楠岃瘉鐮�</span>"
        + "    <input id=\"mdf_mail\" type=\"text\" class=\"wds_input\" style=\"width:71%;\" tabindex=\"1\" onFocus=\"if(this.value==\'閭\'){this.value=\'\';document.getElementById(\'mdf_mail\').style.color=\'#333\';}\" onBlur=\"if(this.value==\'\'){this.value=\'閭\';document.getElementById(\'mdf_mail\').style.color=\'#999\';};\" value=\"閭\">"
        + "  </div>"
        + "  <div class=\"lg_wds_inp\"><input id=\"mdf_mail_dynCode\" type=\"text\" class=\"wds_input\" tabindex=\"2\" onFocus=\"if(this.value==\'杈撳叆楠岃瘉鐮乗'){this.value=\'\';document.getElementById(\'mdf_mail_dynCode\').style.color=\'#333\';}\" onBlur=\"if(this.value==\'\'){this.value=\'杈撳叆楠岃瘉鐮乗';document.getElementById(\'mdf_mail_dynCode\').style.color=\'#999\';};\" value=\"杈撳叆楠岃瘉鐮乗" ></div > "
        + "  <div class=\"lg_wds_ts\" id=\"modifymail_msg\"></div>"
        + "  <div class=\"lg_wds_bt\" onClick=\"modifymail()\">鎻� 浜�</div>"
        + "  <div class=\"wds_close\" onclick=\"wdscancer()\"></div>"
        + ""
        + "</div>"
        + "</div>"
        + "</div>");

    $("#modifymailwds").siblings(".lg_wds_pst").css("display", "none");
    $("#bg_overlay").css('display', 'block');
    //$("#modifymailwds").css('display', '');
}

function modifymailcancer() {
    $("#modifymailwds").css('display', 'none');
    $("#bg_overlay").css('display', 'none');
}

function forgetpwdshow() {
    btscroll = document.documentElement.scrollTop || document.body.scrollTop;
    $('body,html').animate({
        scrollTop: 0
    }, 10);

    if ($("#loginwds").length > 0) {
        $("#loginwds").remove();
    }

    $(document.body).append("<div class=\"lg_wds_pst\" id=\"forgetpwdwds\">"
        + "<div class=\"lg_pd10\">"
        + "<div class=\"lg_wds\">"
        + "  <div class=\"lg_wds_title\">蹇樿瀵嗙爜</div>"
        + "  <div class=\"lg_wds_prompt\">璇疯緭鍏ユ敞鍐屾椂鐨勬墜鏈哄彿鎴栫數瀛愰偖绠�</div>"
        + "    <div class=\"lg_wds_inp\" style=\"margin-top:0px;\">"
        + "    <input id=\"findpwd_dynCode\" type=\"text\" value=\"璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗" class=\"wds_input\" style=\"width:40%;\" tabindex=\"3\" onFocus=\"if(this.value==\'璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗'){this.value=\'\';document.getElementById(\'findpwd_dynCode\').style.color=\'#333\';}\" onBlur=\"if(this.value==\'\'){this.value=\'璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗';document.getElementById(\'findpwd_dynCode\').style.color=\'#999\';};\">"
        + "    <span class=\"lg_wds_dynCode\" onClick=\"document.getElementById(\'annexCode4\').src = \'/wap/RandomPicture?\'+new Date().getTime();$(\'#findpwd_dynCode\').val(\'璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗');\">"
        + "        <img src=\"/wap/RandomPicture\" height=\"32\" id=\"annexCode4\"> <span class=\"lg_wds_dynCodetxt\">鎹竴寮�</span>"
        + "    </span>"
        + "  </div>"
        + "  <div class=\"lg_wds_inp\">"
        + "                <span class=\"getdynCode_wds\" id=\"getforgetpwdcode\" onClick=\"getForgetpwdCode()\">鑾峰彇楠岃瘉鐮�</span>"
        + "    <input id=\"forgetpwd_mail\" type=\"text\" class=\"wds_input\" style=\"width:71%;\" tabindex=\"1\" onFocus=\"if(this.value==\'鎵嬫満鍙�/鐢靛瓙閭\'){this.value=\'\';document.getElementById(\'forgetpwd_mail\').style.color=\'#333\';}\" onBlur=\"if(this.value==\'\'){this.value=\'鎵嬫満鍙�/鐢靛瓙閭\';document.getElementById(\'forgetpwd_mail\').style.color=\'#999\';};\" value=\"鎵嬫満鍙�/鐢靛瓙閭\">"
        + "  </div>"
        + "  <div class=\"lg_wds_inp\"><input id=\"forgetpwd_dynCode\" type=\"text\" class=\"wds_input\" tabindex=\"2\" onFocus=\"if(this.value==\'杈撳叆楠岃瘉鐮乗'){this.value=\'\';document.getElementById(\'mdf_mail_dynCode\').style.color=\'#333\';}\" onBlur=\"if(this.value==\'\'){this.value=\'杈撳叆楠岃瘉鐮乗';document.getElementById(\'mdf_mail_dynCode\').style.color=\'#999\';};\" value=\"杈撳叆楠岃瘉鐮乗" ></div > "
        + "  <div class=\"lg_wds_ts\" id=\"forgetpwd_msg\"></div>"
        + "  <div class=\"lg_wds_bt\" onClick=\"findPwd()\">鎻� 浜�</div>"
        + ""
        + "  <div class=\"lg_wds_tplg\" style=\"width:118px;margin:12px 0 6px;\">"
        + "    <span>宸叉湁璐︽埛锛岄┈涓�<font onclick=\"lgwdsshow()\" style=\"color:#00a5eb;cursor: pointer;\">鐧诲綍</font></span>"
        + "  </div>"
        + "  <div class=\"lg_wds_tplg\" style=\"margin:12px 0 6px;\">"
        + "    <span>绀句氦璐﹀彿鐩存帴鐧诲綍</span>"
        + "    <a href=\"javascript:weibologin(\'DOUBAN\');\" class=\"tplgrr\"></a>"
        + "    <a href=\"javascript:weibologin(\'TENCENT\');\" class=\"tplgtx\"></a>"
        + "    <a href=\"javascript:weibologin(\'SINA\');\" class=\"tplgsn\"></a>"
        + "  </div>"
        + "  <div class=\"wds_close\" onclick=\"wdscancer()\"></div>"
        + ""
        + "</div>"
        + "</div>"
        + "</div>");

    $("#forgetpwdwds").siblings(".lg_wds_pst").css("display", "none");
    $("#bg_overlay").css('display', 'block');
    //$("#forgetpwdwds").css('display', '');
    document.getElementById('annexCode4').src = '/wap/RandomPicture?' + new Date().getTime();
    $('#findpwd_dynCode').val('');
    $("#findpwd_dynCode").blur();
    $("#forgetpwd_mail").val("");
    $("#forgetpwd_mail").blur();
    $("#forgetpwd_dynCode").val("");
    $("#forgetpwd_dynCode").blur();
    $('#forgetpwd_msg').html("");
}

function forgetpwdcancer() {
    //$("#forgetpwdwds").css('display', 'none');
    $("#forgetpwdwds").remove();
    $("#bg_overlay").css('display', 'none');
}

function forgetpwdlgshow() {
    btscroll = document.documentElement.scrollTop || document.body.scrollTop;
    $('body,html').animate({
        scrollTop: 0
    }, 10);
    $("#forgetpwdlgwds").siblings(".lg_wds_pst").css("display", "none");
    $("#bg_overlay").css('display', 'block');
    $("#forgetpwdlgwds").css('display', '');
}

function forgetpwdlgcancer() {
    $("#forgetpwdlgwds").css('display', 'none');
    $("#bg_overlay").css('display', 'none');
}

function modifypwdshow() {
    btscroll = document.documentElement.scrollTop || document.body.scrollTop;
    $('body,html').animate({
        scrollTop: 0
    }, 10);

    $(document.body).append("<div class=\"lg_wds_pst\" id=\"modifypwdwds\">"
        + "<div class=\"lg_pd10\">"
        + "<div class=\"lg_wds\" style=\"padding-bottom:10px;\">"
        + "  <div class=\"lg_wds_title\">淇敼瀵嗙爜</div>"
        + "  <div class=\"lg_wds_prompt\">璇疯緭鍏ュ師瀵嗙爜</div>"
        + "  <div class=\"lg_wds_inp\" style=\"margin-top:0px;\"><input id=\"mdfpwd_old\" type=\"password\" class=\"wds_input\" style=\"line-height:15px;padding: 10px 0 8px;\" tabindex=\"1\"  value=\"\" placeholder=\"璇疯緭鍏�6-12涓瓧绗" ></div > "
        + ""
        + "  <div class=\"lg_wds_prompt\">璇疯緭鍏ユ柊瀵嗙爜</div>"
        + "  <div class=\"lg_wds_inp\" style=\"margin-top:0px;\"><input id=\"mdfpwd_new\" type=\"password\" class=\"wds_input\" style=\"line-height:15px;padding: 10px 0 8px;\" tabindex=\"2\"  value=\"\" placeholder=\"璇疯緭鍏�6-12涓瓧绗" ></div > "
        + "  <div class=\"lg_wds_ts\" id=\"modifypwd_msg\"></div>"
        + "  <div class=\"lg_wds_bt\" onClick=\"modifypwd()\">鎻� 浜�</div>"
        + "  <div class=\"wds_close\" onclick=\"wdscancer()\"></div>"
        + ""
        + "</div>"
        + "</div>"
        + "</div>");

    $("#modifypwdwds").siblings(".lg_wds_pst").css("display", "none");
    $("#bg_overlay").css('display', 'block');
    //$("#modifypwdwds").css('display', '');
}

function registerwdsshow() {
    btscroll = document.documentElement.scrollTop || document.body.scrollTop;
    $('body,html').animate({
        scrollTop: 0
    }, 10);

    if ($("#loginwds").length > 0) {
        $("#loginwds").remove();
    }
    $(document.body).append("<div class=\"lg_wds_pst\" id=\"registerwds\">"
        + "<div class=\"lg_pd10\">"
        + "<div class=\"lg_wds\">"
        + "  <div class=\"lg_wds_title\">娉ㄥ唽</div>"
        + "  <div class=\"lg_wds_prompt\">璇峰～鍐欎互涓嬫敞鍐屼俊鎭�</div>"
        + "    <div class=\"lg_wds_inp\" style=\"margin-top:0px;\">"
        + "    <input id=\"register_dynCode\" type=\"text\" value=\"璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗" class=\"wds_input\" style=\"width:40%;\" tabindex=\"3\" onFocus=\"if(this.value==\'璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗'){this.value=\'\';document.getElementById(\'register_dynCode\').style.color=\'#333\';}\" onBlur=\"if(this.value==\'\'){this.value=\'璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗';document.getElementById(\'register_dynCode\').style.color=\'#999\';};\">"
        + "    <span class=\"lg_wds_dynCode\" onClick=\"document.getElementById(\'annexCode3\').src = \'/wap/RandomPicture?\'+new Date().getTime();$(\'#register_dynCode\').val(\'璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗');\">"
        + "            <img src=\"/wap/RandomPicture\" height=\"32\" id=\"annexCode3\"> <span class=\"lg_wds_dynCodetxt\">鎹竴寮�</span>"
        + "    </span>"
        + "  </div>"
        + "  <div class=\"lg_wds_inp\">"
        + "    <span class=\"getdynCode_wds\" id=\"getregistercode\" onClick=\"getRegisterCode()\">鑾峰彇閭€璇风爜</span>"
        + "    <input id=\"registerwds_mail\" type=\"text\" class=\"wds_input\" style=\"width:71%;\" tabindex=\"1\" onFocus=\"if(this.value==\'鎵嬫満鍙穃'){this.value=\'\';document.getElementById(\'registerwds_mail\').style.color=\'#333\';}\" onBlur=\"if(this.value==\'\'){this.value=\'鎵嬫満鍙穃';document.getElementById(\'registerwds_mail\').style.color=\'#999\';};\" value=\"鎵嬫満鍙穃" > "
        + "  </div>"
        + "  <div class=\"lg_wds_inp\"><input id=\"registerwds_dynCode\" type=\"text\" class=\"wds_input\" tabindex=\"2\" onFocus=\"if(this.value==\'杈撳叆閭€璇风爜\'){this.value=\'\';document.getElementById(\'registerwds_dynCode\').style.color=\'#333\';}\" onBlur=\"if(this.value==\'\'){this.value=\'杈撳叆閭€璇风爜\';document.getElementById(\'registerwds_dynCode\').style.color=\'#999\';};\" value=\"杈撳叆閭€璇风爜\"></div>"
        + "  <div class=\"lg_wds_ts\" id=\"register_msg\"></div>"
        + "  <div class=\"lg_wds_bt\" onclick=\"registermsgwdsshow()\">娉� 鍐�</div>"
        + "  <div class=\"lg_wds_tplg\" style=\"width:118px;margin:12px 0 6px;\">"
        + "    <span>宸叉湁璐︽埛锛岄┈涓�<font onclick=\"lgwdsshow()\" style=\"color:#00a5eb;cursor: pointer;\">鐧诲綍</font></span>"
        + "  </div>"
        + "  <div class=\"lg_wds_tplg\" style=\"margin:12px 0 6px;\">"
        + "    <span>绀句氦璐﹀彿鐩存帴鐧诲綍</span>"
        + "    <a href=\"javascript:weibologin(\'DOUBAN\');\" class=\"tplgrr\"></a>"
        + "    <a href=\"javascript:weibologin(\'TENCENT\');\" class=\"tplgtx\"></a>"
        + "    <a href=\"javascript:weibologin(\'SINA\');\" class=\"tplgsn\"></a>"
        + "  </div>"
        + "  <div class=\"wds_close\" onclick=\"wdscancer()\"></div>"
        + ""
        + "</div>"
        + "</div>"
    + "</div>");

    $("#registerwds").siblings(".lg_wds_pst").css("display", "none");
    $("#bg_overlay").css('display', 'block');
    //$("#registerwds").css('display', '');
    document.getElementById('annexCode3').src = '/wap/RandomPicture?' + new Date().getTime();
    $('#register_dynCode').val('');
    $("#register_dynCode").blur();
    $('#registerwds_mail').val('');
    $('#registerwds_mail').blur();
    $('#registerwds_dynCode').val('');
    $('#registerwds_dynCode').blur();
    $('#register_msg').html("");
}


function registerwdscancer() {
    $("#registerwds").css('display', 'none');
    $("#bg_overlay").css('display', 'none');
}

function registermsgwdscancer() {
    $("#registermsgwds").css('display', 'none');
    $("#bg_overlay").css('display', 'none');
}

function agreementshow() {
    btscroll = document.documentElement.scrollTop || document.body.scrollTop;
    $('body,html').animate({
        scrollTop: 0
    }, 10);
    //$("#agreementtxt").css('display','');
    $("#agreementtxt").toggle();
}
var loginWapNameCookie = "paper_wapckname";
//
function getLoginCookie() {
    var arr, reg = new RegExp("(^| )" + loginWapNameCookie + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return decodeURI(arr[2]);
    else
        return null;
}
function setLoginCookie(value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = loginWapNameCookie + "=" + encodeURI(value) + ";expires=" + exp.toGMTString();
}
function delLoginCookie() {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getLoginCookie();
    if (cval != null)
        document.cookie = loginWapNameCookie + "=" + cval + ";expires=" + exp.toGMTString();
}


function registerweiboshow() {
    btscroll = document.documentElement.scrollTop || document.body.scrollTop;
    $('body,html').animate({
        scrollTop: 0
    }, 10);

    if ($("#loginwds").length > 0) {
        $("#loginwds").remove();
    }
    $(document.body).append("<div class=\"lg_wds_pst\" id=\"registerwds\">"
        + "<div class=\"lg_pd10\">"
        + "<div class=\"lg_wds\">"
        + "  <div class=\"lg_wds_title\">缁戝畾鎵嬫満鍙�</div>"
        + "  <div class=\"lg_wds_prompt\">璇峰～鍐欎互涓嬩俊鎭�</div>"
        + "    <div class=\"lg_wds_inp\" style=\"margin-top:0px;\">"
        + "    <input id=\"register_dynCode\" type=\"text\" value=\"璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗" class=\"wds_input\" style=\"width:40%;\" tabindex=\"3\" onFocus=\"if(this.value==\'璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗'){this.value=\'\';document.getElementById(\'register_dynCode\').style.color=\'#333\';}\" onBlur=\"if(this.value==\'\'){this.value=\'璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗';document.getElementById(\'register_dynCode\').style.color=\'#999\';};\">"
        + "    <span class=\"lg_wds_dynCode\" onClick=\"document.getElementById(\'annexCode3\').src = \'/wap/RandomPicture?\'+new Date().getTime();$(\'#register_dynCode\').val(\'璇疯緭鍏ュ浘鐗囦腑鐨勫瓧绗');\">"
        + "            <img src=\"/wap/RandomPicture\" height=\"32\" id=\"annexCode3\"> <span class=\"lg_wds_dynCodetxt\">鎹竴寮�</span>"
        + "    </span>"
        + "  </div>"
        + "  <div class=\"lg_wds_inp\">"
        + "    <span class=\"getdynCode_wds\" id=\"getregistercode\" onClick=\"getRegisterCode(5)\">鑾峰彇閭€璇风爜</span>"
        + "    <input id=\"registerwds_mail\" type=\"text\" class=\"wds_input\" style=\"width:71%;\" tabindex=\"1\" onFocus=\"if(this.value==\'鎵嬫満鍙穃'){this.value=\'\';document.getElementById(\'registerwds_mail\').style.color=\'#333\';}\" onBlur=\"if(this.value==\'\'){this.value=\'鎵嬫満鍙穃';document.getElementById(\'registerwds_mail\').style.color=\'#999\';};\" value=\"鎵嬫満鍙穃" > "
        + "  </div>"
        + "  <div class=\"lg_wds_inp\"><input id=\"registerwds_dynCode\" type=\"text\" class=\"wds_input\" tabindex=\"2\" onFocus=\"if(this.value==\'杈撳叆閭€璇风爜\'){this.value=\'\';document.getElementById(\'registerwds_dynCode\').style.color=\'#333\';}\" onBlur=\"if(this.value==\'\'){this.value=\'杈撳叆閭€璇风爜\';document.getElementById(\'registerwds_dynCode\').style.color=\'#999\';};\" value=\"杈撳叆閭€璇风爜\"></div>"
        + "  <div class=\"lg_wds_ts\" id=\"register_msg\"></div>"
        + "  <div class=\"lg_wds_bt\" onclick=\"registermsgwdsshow(5)\">娉� 鍐�</div>"
        + "  <div class=\"wds_close\" onclick=\"wdscancer()\"></div>"
        + ""
        + "</div>"
        + "</div>"
    + "</div>");

    $("#registerwds").siblings(".lg_wds_pst").css("display", "none");
    $("#bg_overlay").css('display', 'block');
    if (getPics) {
        clearTimeout(getPics);
    }
    //$("#registerwds").css('display', '');
    document.getElementById('annexCode3').src = '/wap/RandomPicture?' + new Date().getTime();
    $('#register_dynCode').val('');
    $("#register_dynCode").blur();
    $('#registerwds_mail').val('');
    $('#registerwds_mail').blur();
    $('#registerwds_dynCode').val('');
    $('#registerwds_dynCode').blur();
    $('#register_msg').html("");

}
var NEED_BIND_STR = "isBindMobile=0";
$(document).ready(function () {
    var r = window.location.search.substr(1);
    if (r.indexOf(NEED_BIND_STR) != -1) {
        registerweiboshow();
    }
});
//缁戝畾鎴愬姛,鍏抽棴绐楀彛
function bindMobSucc() {
    var href = window.location.href;
    var bindInd = href.indexOf(NEED_BIND_STR);
    if (bindInd != -1) {
        var endInd = bindInd + NEED_BIND_STR.length;
        if (endInd <= href.length) {
            href = href.substr(0, bindInd) + href.substr(endInd);
        } else {
            href = href.substr(0, bindInd);
        }
    }
    wdscancer();
    window.location.href = href;
}