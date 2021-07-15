
(function($) {

    //Floating Banner
    $.fn.fb = function(options) {
        var settings = $.extend({
            // 옵션의 기본 값입니다.
            fbName: "bsFloatingBannerOneQuarter",
            fbTitle: "",
            fbMsg: "",
            fbLink: 'javascript:;',
            fbLinkMsg: '바로가기',
            fbImgSrc: "",
            fbCheckboxId: "notToday",
            fbCheckboxName: "promotionBanner",
            fbCheckboxChecked:'',
            fbExpireDay: "1",
            fbCheckboxMsg: "오늘 하루 보지 않기",
            fbShow: false
        }, options );

        
        var floatingBannerHTML = '<div class=\"bottom-sheet\" data-layered-name=\"' + settings.fbName + '\">';
            if(settings.fbTitle.length > 0) floatingBannerHTML += '<div class=\"bottom-sheet_header\"><span class=\"tit\">' + settings.fbTitle + '</span></div>';
            floatingBannerHTML += '<div class=\"bottom-sheet_contents\">';
            floatingBannerHTML += '<section class=\"kb-sec\">';
            floatingBannerHTML += '<div class=\"fb-msg\">';
            floatingBannerHTML += '<p>' + settings.fbMsg + '</p>';
            floatingBannerHTML += '<a href=\"' + settings.fbLink + '\" class=\"link\"><span>' + settings.fbLinkMsg + '</span></a>';
            floatingBannerHTML += '<div class=\"img\"><img src=\"' + settings.fbImgSrc + '\" alt=""></div>';
            floatingBannerHTML += '</div>';
            floatingBannerHTML += '<p class=\"not-today\"><span class=\"form-checkbox_24\"><input type=\"checkbox\" class=\"cookie-hidden\" data-expire-day=\"' + settings.fbExpireDay + '\" id=\"' + settings.fbCheckboxId + '\" name=\"' + settings.fbCheckboxName + '\" ' + settings.fbCheckboxChecked + '><label for=\"' + settings.fbCheckboxId + '\">' + settings.fbCheckboxMsg + '</label></span></p>';
            floatingBannerHTML += '</section>';
            floatingBannerHTML += '</div>';
            floatingBannerHTML += '<button class=\"btn-close\" data-action=\"close\"><span>닫기</span></button>';
            floatingBannerHTML += '</div>';

        this.append(floatingBannerHTML);

        //바로 보여주기
        if(settings.fbShow) gfn_layered.open(settings.fbName);
        
        return false;
    };

    //Floating Banner
    $.fn.sticker = function(options) {
        var settings = $.extend({
            // 옵션의 기본 값입니다.
            esPosition: "1",
            esLink: '',
            esCallLayered: '',
            esImgSrc: '',
            esImgAlt: '',
            //esImgSize: '',
            esClose: true
        }, options );

        //Validation
        if(settings.esPosition > 9 || settings.esPosition < 1){
            alert('1~9 사이의 숫자를 넣어주세요.');
            return false;
        }
        // if(!isNumeric(settings.esImgSize)){
        //     alert('px로 숫자만 넣어주세요.');
        //     return false;
        // }else{
        //     settings.esImgSize = (settings.esImgSize / 10);//rem 으로 변환            
        // }
        
        if(settings.esCallLayered.length > 0 && settings.esLink.length > 0){
            alert('링크, 바텀시트 호출 중 하나만 입력하세요');
            return false;
        }else if(settings.esCallLayered.length == false && settings.esLink.length == false){
            alert('링크, 바텀시트 호출 중 하나를 입력하세요');
            return false;
        }

        var eventStickerHTML = '<div class=\"event-sticker\" data-position=\"' + settings.esPosition + '\">'
            if(settings.esLink != '') eventStickerHTML += '<a href=\"' + settings.esLink + '\">';
            if(settings.esCallLayered != '') eventStickerHTML += '<a href=\"javascript:;\" role=\"button\" data-call-layered=\"'  + settings.esCallLayered +  '\">';
            //eventStickerHTML += '<img src="' + settings.esImgSrc + '" alt="' + settings.esImgAlt + '" style="width:' + settings.esImgSize + 'rem;">';
            eventStickerHTML += '<img src="' + settings.esImgSrc + '" alt="' + settings.esImgAlt + 'rem;">';
            if(settings.esLink != '') eventStickerHTML += '</a>';
            if(settings.esCallLayered != '') eventStickerHTML += '</a>';
            if(settings.esClose) eventStickerHTML += '<button class="btn-close"><i class=\"icon-sticker-close_20\">닫기</i></button>';
            eventStickerHTML += '</div>';

        this.append(eventStickerHTML);

        return false;
    };
}(jQuery));




    
    











