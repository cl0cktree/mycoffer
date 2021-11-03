
//Swiper fix 6 - 7
$('.swiper').addClass('swiper-container');

var $window = $(window);
var winW = $window.outerWidth();
var winH = $window.outerHeight();
var st = $window.scrollTop();
var $body = $('body');


var gfn_body = {
    hold: function(tf){
        tf = tf != undefined ? tf : true;
        if(tf){
            $body.addClass('is-hold');
        }else{
            $body.removeClass('is-hold');
        }
    }
};

//vh 문제점(변수화)
var vhFix = function(){    
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
};
vhFix();

//layered check
var openLayeredCheck = function(){
    if($('.modal-popup-dimm:visible').length || $('.bottom-sheet-dimm:visible').length || $('.dim').length){
        return true;
    }else{
        return false;
    }
}


var $appHeader = $('.app-header');
var $appMenu = $('.app-menu');
if($appMenu.length){
    //header 타입별 분기
    var headerType = $appHeader.data('type');

    if(headerType != undefined) headerType = headerType.toLowerCase();
    
    switch (headerType){        
        case 'close':
            $appHeader.find('.btn-history-back').remove();
            $appHeader.find('.btn-close').siblings().remove();
            $appMenu.remove();
            break;
        case 'title':
            $appHeader.find('.page-tit').siblings().remove();
            $appMenu.remove();
            break;
        case 'back':
            $appHeader.find('.header-btn').remove();
            $appMenu.remove();
            break;
        case 'submain':
            $appHeader.find('.btn-history-back, .btn-home ,.btn-close, .btn-cancel').remove();
            break;
        case 'step01':
            $appHeader.find('.btn-history-back, .btn-notice-box, .btn-close, .btn-cancel').remove();            
            $appMenu.remove();
            break;
        case 'step':
            $appHeader.find('.btn-home, .btn-notice-box, .btn-allmenu, .btn-close').remove();            
            $appMenu.remove();
            break;
        case 'complete':            
            $appHeader.find('.btn-history-back, .btn-notice-box, .btn-close, .btn-cancel').remove();                        
            break;
        case 'kb':            
            $appHeader.find('.page-tit').siblings().remove();                        
            break;
        case 'trans-step01':            
            $appHeader.find('.btn-history-back, .btn-home, .btn-notice-box, .btn-cancel, .btn-allmenu').remove();                        
            $appMenu.remove();
            break;
        case 'trans-step':            
            $appHeader.find('.btn-notice-box, .btn-close, .btn-home, .btn-allmenu').remove();                        
            $appMenu.remove();
            break;
        case 'home':
            $appHeader.find('.btn-notice-box, .btn-close, .btn-cancel').remove();
            break;
        default:
            $appHeader.find('.btn-notice-box, .btn-close, .btn-cancel').remove();
            $appHeader.attr('data-type','home');
            //console.log('There is no Type ' + headerType);
    }

    //header button
    $appHeader
    .on('click','.btn-allmenu',function(){
        $appMenu.addClass('is-active');
        gfn_body.hold(true);
    });

    $appMenu.on('click','.btn-close',function(){
        $appMenu.removeClass('is-active');
        gfn_body.hold(false);
    });

    $('.all-menu-list').on('click','a',function(){
        $(this).parent('li').addClass('is-active').siblings('li').removeClass('is-active');
    });
}




var nav = '<div class="app-gnb-wrap">';
    nav += '<div class="app-gnb tab swiper-container">';
    nav += '<ul class="swiper-wrapper">';
    nav += '</ul>';
    nav += '</div>';
    nav += '</div>';
    // nav += '<div class="app-sub-wrap">';
    // nav += '<div class="tab depth2 swiper-container app-sub">';
    // nav += '<ul class="swiper-wrapper">';
    // nav += '</ul>';
    // nav += '</div>';
    // nav += '</div>';

//LNB가 비어있으면 지우기
if($('.app-lnb').is(':empty')) $('.app-lnb').remove();

//Bridge, Submain 페이지(Starbanking 채널 아닐때)
var pageType = $('.app').data('page');
if(channel == "ch_star" && pageType == 'bridge'){    
    //Starbanking Brige Page
    if(!$('.app-lnb').length) $('.app-container').prepend('<div class="app-lnb"></div>');
    $('.app-lnb').empty().html(nav);

}else if(channel != "ch_star" && pageType == 'submain' || pageType == 'bridge'){
    //My Money Submain Page
    if(!$('.app-lnb').length) $('.app-container').prepend('<div class="app-lnb"></div>');
    $('.app-lnb').empty().html(nav);
}


var gnbMenuSwiper;
var subMenuSwiper;

$('.app-lnb').find('.tab.swiper-container').each(function(){
    var $tab = $(this);

    //GNB
    if($tab.hasClass('app-gnb')){
        gnbMenuSwiper = new Swiper('.app-gnb',{
            slidesPerView: 'auto',
            //spaceBetween: 32,
            watchOverflow: true,
            on: {
                init: function(swiper, event){
                    var idx = $tab.find('.is-active').index();
                    swiper.slideTo(idx);
                },
                click : function(swiper, event){
                    //swiper.slideTo(swiper.clickedIndex);
                    $(swiper.clickedSlide).addClass('is-active').siblings('.swiper-slide').removeClass('is-active');
                },
            }
        });
    }

    //GNB SUB
    // if($tab.hasClass('app-sub')){
    //     subMenuSwiper = new Swiper('.app-sub',{
    //         slidesPerView: 'auto',
    //         //spaceBetween: 34,
    //         watchOverflow: true,
    //         on: {
    //             click : function(swiper, event){
    //                 //swiper.slideTo(swiper.clickedIndex);
    //                 $(swiper.clickedSlide).addClass('is-active').siblings('.swiper-slide').removeClass('is-active');
    //             },
    //         }
    //     });
    // }    
});

//GNB
var depth1 = 0;
var depth2 = 0;
var subShow;
var $gnb = $('.app-gnb');
var gnbMenuList = [];
var subMenuList = [];
var $subMenu = $('.app-sub-wrap');
var gfn_gnb = {
    init : function(){
        // console.log(gnbArr)
        $.each(gnbArr, function(index, item){
            gnbMenuList[index] = '<li class="swiper-slide" data-index="' + item.number+ '"><a href="' + item.link + '" data-sub="' + item.sub + '">' + item.name + '</a></li>';
        });
        gnbMenuSwiper.removeAllSlides();
        gnbMenuSwiper.appendSlide(gnbMenuList);
        gnbMenuSwiper.updateSize()
    },
    select: function(gnb, sub, subExposure){
        depth1 = gnb;
        // depth2 = sub;
        // subShow = subExposure;
    },
    //메뉴 선택
    choose: function(gnbIdx, subIdx){
        if($gnb.length){
            if(gnbIdx == undefined) gnbIdx = depth1;
            // if(subIdx == undefined) subIdx = depth2;
            // if(subShow == undefined) subShow = true;

            if(isNumeric(gnbIdx)){//숫자로 입력
                // var sub = $gnb.find('.swiper-slide[data-index="' + gnbIdx + '"]').find('a').data('sub');
                // if(sub == '' || !sub || !subShow){
                //     $subMenu.hide();
                //     $('.app-lnb').removeClass('app-sub-active');
                // }else{
                //     $subMenu.show();
                //     subMenuList = [];
                //     $.each(subMenu[0][sub], function(index, item){
                //         subMenuList[index] = '<li class="swiper-slide" data-index="' + item.number+ '"><a href="' + item.link + '">' + item.name + '</a></li>';
                //     });
                //     subMenuSwiper.removeAllSlides();
                //     subMenuSwiper.appendSlide(subMenuList);
                //     subMenuSwiper.updateSize();

                //     //2depth activation
                //     if(!subIdx) subIdx = 0;
                //     $subMenu.find('.swiper-slide[data-index="' + subIdx + '"]').addClass('is-active').siblings('li').removeClass('is-active');
                //     $('.app-lnb').addClass('app-sub-active');
                //     subMenuSwiper.slideTo(subIdx)
                //     //if(depth2 >= 2) subMenuSwiper.slideTo(depth2 - 2)
                // }
            }else{//문자 입력(에러)
                alert('index 번호를 입력하세요');
            }

            //1depth activation
            $gnb.find('.swiper-slide[data-index="' + gnbIdx + '"]').addClass('is-active').siblings('li').removeClass('is-active');
            gnbMenuSwiper.slideTo(gnbIdx);

            depth1 = gnbIdx;
            //depth2 = subIdx;
        }
    }
};

$(window)
.on('load',function(){
    if($gnb.length){
        gfn_gnb.init();
        gfn_gnb.choose();
    }
    //remove unneccessary LNB
    if($('.app-lnb').is(':empty')) $('.app-lnb').remove();
})
.on('resize',function(){
    if($gnb.length){
        gnbMenuSwiper.update();
        //subMenuSwiper.update();
        //console.log('resized')
    }
});

//Web A11Y
var waHTML = '<div class=\"skip-nav\"><a href=\"#content\">본문으로 이동하기</a></div>'    
if(!$('.skip-nav').length) $('body').prepend(waHTML);
if($('.app-content').attr('id') != 'content') $('.app-content').attr('id','content');


//공통 스크롤 이벤트
var scrollDown = false;// down (true = up)
var $processStep = $('.process-step');
var fixedTop;
if($gnb.length) fixedTop = $('.app-lnb').offset().top;

var currentST;
var scrollDirection = function(st){
    if(!st) st = 0;
    if(st > currentST){
        scrollDown = true;
    }else if(st < currentST){
        scrollDown = false;
    }
    //console.log(scrollDown, st, currentST);
    currentST = st;
    return scrollDown;
};

function isNumeric(str) {
    if (typeof str != "number"){
        return !isNaN(str) && !isNaN(parseFloat(str));
    }else{
        return true;
    }
}

// 스크롤 여부 (true of false) 
$.fn.hasScrollBar = function() {
    return (this.prop("scrollHeight") == 0 && this.prop("clientHeight") == 0) || (this.prop("scrollHeight") > this.prop("clientHeight"));
};

//부분 영역 loader
var gfn_partitialLoader = {    
    show : function($target, msg){
        //gfn_partitialLoader.show($target); //메세지가 필요 없을때
        if(!msg) msg = '';
        $target.addClass('is-loading');
        $target.append('<div class="partitial-loader"><div class="msg">' + msg + '</div></div>');
    },
    hide : function($target){
        $target.removeClass('is-loading');
        $target.find('.partitial-loader').remove();
    },
};

//Page Loader
var gfn_pageLoader = {
    show : function(){
        $('body').append('<div class="page-loader"><div class="animation"><span>로딩중</span></div></div>');
        $('.page-loader').fadeIn();
    },
    hide : function($target){
        $('body').find('.page-loader').fadeOut(200, function(){
            $(this).remove();
        });
    },
};

//IE Browser Check
var agent = navigator.userAgent.toLowerCase();
if (agent.indexOf("trident") != -1) {
    $('html').addClass('ie');
}