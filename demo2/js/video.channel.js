function videoSumToggle(videoId) {
    $("#vsummary_" + videoId).slideToggle("fast");
    $("#op_" + videoId).toggleClass("op_t");
    return false;
}
function disVideoList() {
    $(".column").eq(0).fadeIn("150");
    $(".nav_pad4").eq(0).fadeOut("150");
    $(".nav_pad4").eq(0).parent().css("position", "relative");
    var height = $(".column").offset().top - $(window).scrollTop() + $(".column").height();
    hiddenOrShow(false, height);
}
function hidVideoList() {
    $(".column").eq(0).fadeOut("150");
    $(".nav_pad4").eq(0).fadeIn("150");
    $(".nav_pad4").eq(0).parent().css("position", "");
    var height = $(".column").offset().top - $(window).scrollTop() + $(".column").height();
    hiddenOrShow(true, height);
}

function hidOrShowVideo() {
    $('div[id^="videoDiv_"]').each(function (i) {
        if ($(this).css("display") == "none") {
            $(this).css("display", "block");
        }
    });
    $('video[id^="video_"]').each(function (i) {
        if ($(this).css("display") != "none") {
            var video = $(this).get(0);
            if (video) video.pause();
            $(this).css("display", "block");
        }
    });
}

function voteOnCard(cid, voteTimes) {
    $("#card_praise_" + cid).attr("href", "javascript:void(0);");
    $("#news_praise_" + cid).addClass('v_praised');
    $("#news_praise_" + cid).html(voteTimes + "&nbsp;");
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

function jumpDetail(id, event) {
    if (event) {
        var obj = event.srcElement ? event.srcElement : event.target;
        if (obj.tagName.toLowerCase() == 'em' || obj.tagName.toLowerCase() == 'a') {
            return false;
        }
    }
    window.location.href = "newsDetail_forward_" + id;
    return;
}

function hasClass(ele, cls) {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function playVideo(id, isLive, obj, event) {

    if (event) {
        var obj = event.srcElement ? event.srcElement : event.target;
        if (obj.tagName.toLowerCase() == 'em' || (obj.tagName.toLowerCase() == 'a' && !hasClass(obj, 'video_play'))) {
            return false;
        }
    }
    if (isLive) {
        window.location.href = "newsDetail_forward_" + id;
        return;
    }
    $('video[id^="video_"]').each(function (i) {
        if ($(this).css("display") != "none" && $(this).attr("id") != id) {
            var video = $(this).get(0);
            if (video) video.pause();
        }
    });

    createVideo(id);
    var imgDom = $("#videoDiv_" + id);
    imgDom.css("display", "none");
    var videoDom = $("#video_" + id);
    videoDom.get(0).play();
    onPlayVideo(id, false);
    var video = videoDom.get(0);
    if (videoDom.css("display") == 'none') {
        videoDom.css("display", "block");
    }
    $.ajax({
        url: "/wap/addPlayTimes.msp",
        data: "contId=" + id,
        cache: false,
        success: function (html) {
        },
        failure: function (html) { }
    });
}

function onPlayVideo(id, isLive) {
    $("#videoDiv_" + id).css("display", "none");
    var video = $("#video_" + id).get(0);
    if (video && video.currentTime < 1) {
        if (!isLive) {
            $.ajax({
                url: "/wap/addPlayTimes.msp",
                data: "contId=" + id,
                cache: false,
                success: function (html) {
                },
                failure: function (html) { }
            });
            $.ajax({
                url: "/wap/pageVisit.msp",
                data: "contId=" + id + "&type=1",
                cache: false,
                success: function (html) {
                },
                failure: function (html) { }
            });
        }
    }
    video.onended = function (e) {
        video.autoplay = false;
        var vId = video.id;
        var vInd = vId.indexOf("_");
        if (vInd != -1) {
            vId = vId.substr(vInd + 1);
        }
        var v = video.currentSrc;
        video.src = '';
        video.src = v;
        $("#video_test_" + vId).css("display", "block");
        var vDiv = $("#videoDiv_" + vId);
        if (vDiv && vDiv.css("display") == 'none') {
            vDiv.css("display", "block");
        }
        if (document.getElementById("vPlay_" + vId)) {
            $("#video_" + vId).css("display", "none");
        };
        video.addEventListener("loadedmetadata", function () {
            var dur = video.duration;//鑾峰彇鎬绘椂闀�
        });
    }
    var idTmp = "video_" + id;
    $('video[id^="video_"]').each(function (i) {
        if ($(this).css("display") != "none" && $(this).attr("id") != idTmp) {
            var vtmp = $(this).get(0);
            if (vtmp) vtmp.pause();
        }
    });
}

function getContId(vId) {
    var vInd = vId.indexOf("_");
    if (vInd != -1) {
        vId = vId.substr(vInd + 1);
    }
    return vId;
}

function onVideoClick(id) {
    $("#video_" + id).mouseout(function toggleControls() {
        if (this.hasAttribute("controls")) {
            this.removeAttribute("controls")
        }
    });
    $("#video_" + id).mouseover(function toggleControls() {
        if (!this.hasAttribute("controls")) {
            this.setAttribute("controls", "controls");
        }
    });
}

function videoMouseOver(id) {
    $("#video_" + id).mouseover(function toggleControls() {
        if (!this.hasAttribute("controls")) {
            this.setAttribute("controls", "controls");
        }
    });
}

function videoMouseout(id) {
    $("#video_" + id).mouseout(function toggleControls() {
        if (this.hasAttribute("controls")) {
            this.removeAttribute("controls")
        }
    });
}


function createVideo(id) {
    var imgDivDom = $("#videoDiv_" + id);
    var videoDiv = imgDivDom.next();
    if (videoDiv == null || videoDiv.length == 0) {
        imgDivDom.after(getVideoDiv(id));
    }
}



function getVideoDiv(id) {
    var videoHref = $("#videoHref_" + id).val();
    var posterImg = $("#videoPoster_" + id).val();
    var str = "";
    str += "<div class=\'live_video\'  id=\'livetitle\' ><video width=\'100%\' webkit-playsinline playsinline x5-playsinline x-webkit-airplay=\'allow\' class=\'img100\' poster=\'" + posterImg + "\' id=\'video_" + id + "\'  style=\'display:block;\' autoplay=\'autoplay\'  controls=\'controls\'>";
    str += "<source src=\'" + videoHref + "\'><div class=\'picv\'><a href=\'" + videoHref + "\' class=\'m\'></a><a href=\'" + videoHref + "\' class=\'big_m\'><img src=\'" + posterImg + "\' alt=\'\'></a></div>";
    str += "</video></div>";
    return str;
}
function shareVideo(id) {
    shareHideOrShowVideo(false);
    $('.bg-opacity30').show();
    $(".header-v4").slideDown("150");
    $('.v3-shareBox').slideDown("150");
    var paperVideo = $("#paperVideo_" + id);
    var sharePic = paperVideo.attr("sharePic");
    var shareName = paperVideo.attr("shareName");
    var shareType = paperVideo.attr("shareType");
    var shareSummary = paperVideo.attr("shareSummary");
    currentVideoId = id;
    $("#news_weibo").attr("href", "javascript:ToSina('" + shareName + "','" + sharePic + "','" + shareType + "');");
    $("#news_qq").attr("href", "javascript:ToTencent('" + shareName + "','" + sharePic + "','" + shareType + "');");
    $("#news_renren").attr("href", "javascript:Torenren('" + shareName + "','" + sharePic + "','" + shareSummary + "','" + shareType + "');");
    $("#news_qzone").attr("href", "javascript:ToQzone('" + shareName + "','" + sharePic + "','" + shareType + "','" + shareSummary + "');");
}

function shareHideOrShowVideo(flag) {
    var shareHeight = $('.v3-shareBox').height();
    hiddenOrShow(flag, shareHeight);
}

var pausedId = "";
var parentIdTmp = "";
var playedId = "";

function hiddenOrShow(isShowVideo, height) {
    var videoCheckCss = isShowVideo ? "none" : "block";
    var videoShowCss = isShowVideo ? "block" : "none";
    var divShowCss = (videoShowCss == "none") ? "block" : "none";

    if (!isShowVideo) {
        parentIdTmp = "";
        $('video[id^="video_"]').each(function (i) {
            if ($(this).css("display") == videoCheckCss) {
                //		var top = $(this).scrollTop();
                var top = $(this).offset().top - $(window).scrollTop();
                var thisHeight = $(this).height();
                if (0 < top && (top <= height || (top + thisHeight) < height)) {
                    if (videoCheckCss == "block") {
                        if (!$(this).get(0).paused) {
                            $(this).get(0).pause();
                            playedId = $(this).attr("id");
                        }
                        parentIdTmp = parentIdTmp + $(this).attr("id") + ",";
                        $('.v3-shareBox span').bind("click", function () { shareHideOrShowVideo(true) });
                        $('.bg-opacity30').bind("click", function () { shareHideOrShowVideo(true) });
                        $("#videoDiv_" + getContId($(this).attr("id"))).css("display", divShowCss);
                        $(this).css("display", videoShowCss);
                    }
                }
            }
        });
        if (parentIdTmp != "") pausedId = parentIdTmp;
    } else {
        if (pausedId != "") {
            var arr = pausedId.split(",");
            $.each(arr, function (i, item) {
                if (item != "") {
                    if ($("#" + item).css("display") == 'none') {
                        if ($("#" + item).get(0).paused && playedId == $("#" + item).attr("id")) {
                            $("#" + item).get(0).play();
                            onPlayVideo(playedId, false);
                            playedId = "";
                        }
                        $("#" + item).css("display", "block");
                        $("#videoDiv_" + getContId(item)).css("display", "none");
                    }
                }
            });
            pausedId = "";
            parentIdTmp = "";
        }
    }
}