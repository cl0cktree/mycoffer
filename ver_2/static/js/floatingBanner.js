
//Cookie
var cookie = {
    set : function(name, value, day) {
        var date = new Date();
        date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
        document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    },
    get : function(name) {
        var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return value? value[2] : null;
    },
    delete : function(name) {
        var date = new Date();
        document.cookie = name + "= " + "; expires=" + date.toUTCString() + "; path=/";
    }
}

//이벤트 스티커
$('body')
.on('click','.event-sticker .btn-close',function(){
    $(this).parents('.event-sticker').remove();
})
.on('click','.event-sticker a[data-call-layered]',function(){
    $(this).parents('.event-sticker').remove();
});

//Promotion (Global)
(function($) {

    //Floating Banner
    $.fn.fb = function(options) {
        var settings = $.extend({
            // 옵션의 기본 값입니다.
            fbName: "bsFloatingBannerOneQuarter",
            fbType: "1/5",
            fbAnimation: "fbBottomUp",
            fbTitle: "",
            fbMsg: "",
            fbLinkMsg: '바로가기',
            fbLink: '',
            fbTarget: false,
            fbCallLayered: '',
            fbFunction: '',
            fbImgSrc: "",
            fbFormId: "notToday",
            fbFormName: "promotionBanner",
            fbFormChecked:'',
            fbExpireDay: "1",
            fbFormMsg: "오늘 하루 보지 않기",
            fbShow: false
        }, options );

        // if(settings.fbCallLayered.length > 0 && settings.fbLink.indexOf('/') > 0){
        //     alert('링크, 바텀시트 호출 중 하나만 입력하세요');
        //     return false;
        // }

        var $promotionBanner = $('.floating-banner[data-layered-name=' + settings.fbName + ']');
        if(!$promotionBanner.length){
            var floatingBannerHTML = '<div class=\"floating-banner\" data-type=\"' + settings.fbType + '\" data-animation=\"' + settings.fbAnimation + '\" data-layered-name=\"' + settings.fbName + '\">';
                floatingBannerHTML += '<div class=\"floating-banner_contents\">';
                floatingBannerHTML += '<section class=\"kb-sec\">';
                floatingBannerHTML += '<p class=\"not-today\"><span class=\"form-checkbox\"><input type=\"checkbox\" class=\"cookie-hidden\" data-expire-day=\"' + settings.fbExpireDay + '\" id=\"' + settings.fbFormId + '\" name=\"' + settings.fbFormName + '\"><label for=\"' + settings.fbFormId + '\">' + settings.fbFormMsg + '</label></span></p>';
                floatingBannerHTML += '<div class=\"fb-content\">';
                floatingBannerHTML += '<div class=\"fb-msg\">';
                if(settings.fbImgSrc != '') floatingBannerHTML += '<img class=\"fb-img\" src=\"' + settings.fbImgSrc + '\" alt="">';
                floatingBannerHTML += settings.fbMsg;

                if(settings.fbLink != ''){
                    if(!settings.fbTarget){
                        floatingBannerHTML += '<br><a href=\"' + settings.fbLink + '\" class=\"link\"><span>' + settings.fbLinkMsg + '</span></a>';                    
                    }else{
                        floatingBannerHTML += '<br><a href=\"' + settings.fbLink + '\" target="_blank" class=\"link\"><span>' + settings.fbLinkMsg + '</span></a>';
                    }
                }else if(settings.fbCallLayered != ''){
                    floatingBannerHTML += '<br><button class="link" data-action="close" data-call-layered="' + settings.fbCallLayered + '"';
                    if(settings.fbFunction != '') floatingBannerHTML += ' onclick="' + settings.fbFunction + '\;"';
                    floatingBannerHTML += '><span>' + settings.fbLinkMsg + '</span></button>';
                }
                floatingBannerHTML += '</div>';
                floatingBannerHTML += '</div>';
                floatingBannerHTML += '</section>';
                floatingBannerHTML += '</div>';
                floatingBannerHTML += '<button class=\"btn-close\" data-action=\"close\"><span>닫기</span></button>';
                floatingBannerHTML += '</div>';
                
            this.append(floatingBannerHTML);
        }

        //바로 보여주기
        var cookieChecker = cookie.get(settings.fbFormName);
        if(settings.fbShow && !cookieChecker) gfn_layered.open(settings.fbName, 'event');   //수정: 2021-11-05 레이어 우선순위

        //return false;
    };

    //Event Sticker
    $.fn.sticker = function(options) {
        var settings = $.extend({
            // 옵션의 기본 값입니다.
            esPosition: "1",
            esLink: '',
            esTarget: false,
            esCallLayered: '',
            esAnimation: '',
            esImgSrc: '',
            esImgAlt: '',
            //esImgSize: '',
            esClose: true
        }, options );

        //Validation
        // if(settings.esPosition > 9 || settings.esPosition < 1){
        //     alert('1~9 사이의 숫자를 넣어주세요.');
        //     return false;
        // }
        // if(!isNumeric(settings.esImgSize)){
        //     alert('px로 숫자만 넣어주세요.');
        //     return false;
        // }else{
        //     settings.esImgSize = (settings.esImgSize / 10);//rem 으로 변환
        // }

        // if(settings.esCallLayered.length > 0 && settings.esLink.indexOf('/') > 0){
        //     alert('링크, 바텀시트 호출 중 하나만 입력하세요');
        //     return false;
        // }else if(settings.esCallLayered.length == false && settings.esLink.indexOf('/') < 0){
        //     alert('링크, 바텀시트 호출 중 하나를 입력하세요');
        //     return false;
        // }

        var eventStickerHTML = '<div class=\"event-sticker\" data-animation=\"' + settings.esAnimation + '\" data-position=\"' + settings.esPosition + '\">'
            if(settings.esLink != ''){
                if(!settings.esTarget){
                    eventStickerHTML += '<a href=\"' + settings.esLink + '\">';
                }else{
                    eventStickerHTML += '<a href=\"' + settings.esLink + '\" target=\"_blank\">';
                }
                eventStickerHTML += '<img src="' + settings.esImgSrc + '" alt="' + settings.esImgAlt + '">';
                eventStickerHTML += '</a>';
            }else if(settings.esCallLayered != ''){
                eventStickerHTML += '<a href=\"javascript:;\" role=\"button\" data-call-layered=\"'  + settings.esCallLayered +  '\">';
                eventStickerHTML += '<img src="' + settings.esImgSrc + '" alt="' + settings.esImgAlt + '">';
                eventStickerHTML += '</a>';
            }
            if(settings.esClose) eventStickerHTML += '<button class="btn-close"><i class=\"icon-sticker-close_20\">닫기</i></button>';
            eventStickerHTML += '</div>';

        this.append(eventStickerHTML);

        //return false;
    };

}(jQuery));