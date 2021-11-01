//touch Event
var clickEvent = (function() {
    if ('ontouchstart' in document.documentElement === true) {
        return 'touchstart';
    } else {
        return 'click';
    }
})();

//세자리수 콤마
function gfn_comma3Digit(number){
    if (number === "") return;
    if (typeof number === "number") number = String(number);
    number = number.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    return Number(number).toLocaleString();
}
function gfn_removeComma3Digit(number){
    if (number === "") return;
    return Number(number.replace(/,/g, ""));
}

//Format
function gfn_dateFormatter(ydm){
    var dateVal;
    ydm = ydm.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    if(ydm !== undefined && String(ydm) !== ''){
        var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
        var tmp = String(ydm).replace(/(^\s*)|(\s*$)/gi, '').replace(regExp, ''); // 공백 및 특수문자 제거
        if(tmp.length <= 4){
            dateVal = tmp;
        }else if(tmp.length > 4 && tmp.length <= 6){
            dateVal = tmp.substr(0, 4) + '.' + tmp.substr(4, 2);
        }else {
            dateVal = tmp.substr(0, 4) + '.' + tmp.substr(4, 2) + '.' + tmp.substr(6, 2);

        }
    }
    return dateVal;
}
function gfn_timeFormatter(time){
    var timeVal;
    time = time.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    if(time !== undefined && String(time) !== ''){
        var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
        var tmp = String(time).replace(/(^\s*)|(\s*$)/gi, '').replace(regExp, ''); // 공백 및 특수문자 제거
        if(tmp.length <= 2){
            timeVal = tmp;
        }else{
            timeVal = tmp.substr(0, 2) + ':' + tmp.substr(2, 2);
        }
    }
    return timeVal;
}

//Textarea calc bytes
function gfn_fnChkByte($target, maxByte){
    maxByte = maxByte.replace(/[\D\s\._\-]+/g, "");
    var str = $target.val();
    var str_len = str.length;

    var rbyte = 0;
    var rlen = 0;
    var one_char = "";
    var str2 = "";

    for(var i=0; i < str_len; i++){
        one_char = str.charAt(i);
        if(escape(one_char).length > 4){
            rbyte += 2;                                          //한글2Byte
        }else{
            rbyte++;                                            //영문 등 나머지 1Byte
        }

        if(rbyte <= maxByte){
            rlen = i+1;                                          //return할 문자열 갯수
        }
    }

    if(rbyte > maxByte){
        var errorMsg = "한글 "+(maxByte/2)+"자 / 영문 "+maxByte+"자를 초과 입력할 수 없습니다.";
        modalPopup({
            title: "",
            message: errorMsg
        });
        str2 = str.substr(0,rlen);                                  //문자열 자르기
        $target.val(str2);
        gfn_fnChkByte($target, maxByte);
        //$target.parents('.textarea').after("<p class='error-msg'>" + errorMsg + "</p>");

    }else{
        $target.parent('.textarea').find('.current').text(gfn_comma3Digit(rbyte));
        //$target.parents('.textarea').next('.error-msg').remove();
    }
}

function gfn_koreanUnit(number, unit) {				
    var unit = unit;
    var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    var inputNumber = String(number).replace(/(^\s*)|(\s*$)/gi, '').replace(regExp, '');
    var unitWords = ["<span class='unit'>원</span>", "<span class='unit'>만&nbsp;</span>", "<span class='unit'>억&nbsp;</span>", "<span class='unit'>조&nbsp;</span> ", "<span class='unit'>경&nbsp;</span>", "<span class='unit'>해&nbsp;</span>"];
    var splitUnit = 10000;
    var splitCount = unitWords.length;
    var resultArray = [];
    var resultString = "";

    if(unit == '만원') unitWords[1] = "<span class='unit'>만원</span>";

    for (var i = 0; i < splitCount; i++) {
        var unitResult =
            (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);
        if (unitResult > 0) {
            resultArray[i] = '<span class="num">'+ unitResult +'</span>';
        }
    }
    for (var i = 0; i < resultArray.length; i++) {
        if (!resultArray[i]) continue;
        
        if(unit == '만원') {        
            resultString = String(gfn_comma3Digit(resultArray[i])) + unitWords[i + 1] + resultString;            
        }else if(unit == '억'){
            resultString = String(gfn_comma3Digit(resultArray[i])) + unitWords[i + 2] + resultString;            
        }else{
            resultString = String(gfn_comma3Digit(resultArray[i])) + unitWords[i] + resultString;
        }
        
    }
    
    return resultString;
}

function gfn_NumberToKorean(number, unit){ 
    var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    var number = String(number).replace(/(^\s*)|(\s*$)/gi, '').replace(regExp, '');
    var numKor = ["", "일", "이", "삼", "사","오","육","칠","팔","구","십"]; // 숫자 문자 
    var unitKor = ["", "십", "백", "천", "", "십", "백", "천", "", "십", "백", "천", "", "십", "백", "천","", "십", "백", "천", "", "십", "백", "천", "", "십", "백", "천", "", "십", "백", "천"]; // 만위 문자열 
    var unitSlice = ["만","억","조","경","해","자"]

    if(unit == '만원'){
        unitKor.splice(0,4);
        unitSlice.splice(0,1);
    }else if(unit == '억'){
        unitKor.splice(0,8);
        unitSlice.splice(0,2);
    }
    var result = ""; 
    if(number && !isNaN(number)){ // CASE: 금액이 공란/NULL/문자가 포함된 경우가 아닌 경우에만 처리         
        for(i=0; i < number.length; i++) { 
            var str = ""; 
            var num = numKor[number.charAt(number.length - (i + 1))]; 
            if(num != "") str += num + unitKor[i]; // 숫자가 0인 경우 텍스트를 표현하지 않음 
            switch(i){ 
                case 4: str += String(unitSlice[0]); break;
                case 8: str += String(unitSlice[1]); break;
                case 12: str += String(unitSlice[2]); break;
            } 
            result = str + result; 
        } 
        result = result + String(unit); 
    } 
    return result ; 
}



//WA focus
var focusA11Y = {
    memory: function($selector){
        $selector = $selector != undefined ? $selector : $(this);
        $selector.addClass('focus-memory');
    },
    forget: function(){
        var $focusBack = $('.focus-memory');
        if(!$focusBack.is(':focusable')){
            $focusBack.find(':focusable').eq(0).focus();
        }else{
            $focusBack.focus();
        }
        $focusBack.removeClass('focus-memory');
    },
    focus: function($selector){
        $selector = $selector != undefined ? $selector : $(this);
        if(!$selector.is(':focusable')){
            $selector.find(':focusable').eq(0).focus();
        }else{
            $selector.focus();
        }            
    },
    blur: function($selector){
        $selector = $selector != undefined ? $selector : $(this);
        $selector.blur();
    }
};


//Foucs Trap (for WA)
var focusTrap = function($target) {
    var tabbable = $target.find('select, input, textarea, button, a').filter(':visible');

    var firstTabbable = tabbable.first();
    var lastTabbable = tabbable.last();

    /*set focus on first input*/
    firstTabbable.focus();

    /*redirect last tab to first input*/
    lastTabbable.on('keydown', function (e) {
       if ((e.which === 9 && !e.shiftKey)) {
           e.preventDefault();
           firstTabbable.focus();
       }
    });

    /*redirect first shift+tab to last input*/
    firstTabbable.on('keydown', function (e) {
        if ((e.which === 9 && e.shiftKey)) {
            e.preventDefault();
            lastTabbable.focus();
        }
    });

    /* allow escape key to close insiders div */
    $target.on('keyup', function(e){
      if (e.keyCode === 27 ) {
        $target.hide();
      };
    });
};

var st = $window.scrollTop();
var $body = $('body');
var $layered = $('.layered');

//Device Check
/*
    Homebar 가 있는 모델 및 비율 , livv, new starbanking 에는 webview 상단 48~72 (예상)
    iPhone 12 Pro Max	        428*926 (0.46 / 0.50)
    iPhone 12, 12 Pro	        390*844 (0.46 / 0.51)
    iPhone 11 Pro Max, XS Max	414*896 (0.46 / 0.50)
    iPhone 11, XR	            414*896 (0.46 / 0.50)
    iPhone X, XS, 11 Pro	    375*812 (0.46 / 0.51)

    iPhone 7,8	                375*667	(0.56 / 0.63)
    iPhone 6+,7+,8+	            414*736	(0.56 / 0.62)
    iPhone 6, SE2	            375*667	(0.56 / 0.63)
    iPhone 5, SE	            320*568	(0.56 / 0.65)
*/
//if((winW / winH) <div 0.52 && $('html').hasClass('ios')) $('html').addClass('homebar');


var gfn_dim = {
    show : function($target, level, duration){
        duration = duration != undefined ? duration : 20;
        if(!$target.prev('.dim').length) $('<div class="dim"/>').insertBefore($target);
        $target.prev('.dim').fadeIn(duration).css('z-index',(level - 1));
    },
    hide : function($target, duration){
        var $dim = $(".dim");
        duration = duration != undefined ? duration : 20;
        if($target != undefined){
            $target = !$target.is('.dim') ? $dim : $target;
        }else{
            $target = $dim;
        }
        $target.fadeOut(duration,function(){
            $(this).remove();
        });
    }
};

$('body').on('click','.dim',function(){
    if($(this).next('div').is('.bottom-sheet') || $(this).next('div').is('.floating-banner')){
        // gfn_dim.hide($(this));
        gfn_layered.close($(this).next('div').attr('data-layered-name'));        
    }
});

// var _btnTop = {
//     click : function(){
//         $('.btn-top').on('click',function(){
//             $('html,body').stop().animate({'scrollTop' : 0},200);
//         });
//     },
//     scroll : function(st){
//         var footerTop = $('.app-footer').offset().top;
//         if(st >= footerTop - winH){
//             $('.btn-top').addClass('no-fixed');
//         }else{
//             $('.btn-top').removeClass('no-fixed');
//         }
//     }
// };
// if($('.btn-top').length){
//     _btnTop.scroll(st);
//     _btnTop.click();
// }

var layeredLevel = 301;
var gfn_layered = {
    open: function(name, dim, duration){
        dim = dim == undefined ? true : dim;
        duration = duration == undefined ? 200 : duration;
        if(name != '' && name != undefined){

            var $selectedLayer = $('div[data-layered-name=' + name + ']');

            if ($selectedLayer.length === 0) return;

            if(dim){
                //스크롤 원위치
                $selectedLayer.find('.popup_contents, .botttom-sheet_contents, .modal_contents').scrollTop(0);
               
                //DIM SHOW
                gfn_dim.show($selectedLayer, layeredLevel, duration);
            }
            $selectedLayer.addClass('is-active').css('z-index', layeredLevel);
            focusTrap($selectedLayer);  //focus loop in layered
            // $selectedLayer.find(':focusable').eq(0).focus();
            
            //Transform 50% : Blur Issue 발생시
            // if($selectedLayer.hasClass('modal')){
            //     $selectedLayer.one('animationend',function(){
            //         if($(this).hasClass('is-active')){
            //             var modalWidth = $selectedLayer.outerWidth();
            //             var modalHeight = $selectedLayer.outerHeight();
            //             if(modalWidth % 2 != 0) modalWidth = modalWidth - 1;
            //             if(modalHeight % 2 != 0) modalHeight = modalHeight - 1;
            //             $selectedLayer.css({'width': modalWidth, 'height': modalHeight});
            //         }
            //     });
            // }
            gfn_body.hold(true);

            layeredLevel = layeredLevel + 10;
        }
    },
    close: function(name, duration){
        duration = duration == undefined ? 200 : duration;
        if(name != '' && name != undefined){
            var $selectedLayer = $('div[data-layered-name=' + name + ']');
            gfn_body.hold(false);            
            //$selectedLayer.removeClass('is-active is-expanded').removeAttr('style');
            if($selectedLayer.hasClass('popup') || $selectedLayer.hasClass('floating-banner')){
                $selectedLayer.removeClass('is-active').removeAttr('style');
                gfn_dim.hide($selectedLayer.prev('.dim'), duration);
            }else if($selectedLayer.hasClass('bottom-sheet')){
                //$selectedLayer.removeClass('is-active is-expanded').removeAttr('style');
                $selectedLayer.addClass('bs-out');
                $selectedLayer.one('animationend',function(){
                    if($selectedLayer.hasClass('bs-out')) $selectedLayer.removeClass('is-active is-expanded bs-out').removeAttr('style');
                    gfn_dim.hide($selectedLayer.prev('.dim'), duration);
                });                
            }else if($selectedLayer.hasClass('modal')){
                $selectedLayer.addClass('modal-out');
                $selectedLayer.one('animationend',function(){
                    if($selectedLayer.hasClass('modal-out')) $selectedLayer.removeClass('is-active is-expanded modal-out').removeAttr('style');
                    gfn_dim.hide($selectedLayer.prev('.dim'), duration);
                });
            }
        }else{
            gfn_dim.hide();
            $layered.children('div').removeClass('is-active is-expanded').removeAttr('style');
        }

        focusA11Y.forget();
        
    }
};
//markup 상 is-active 가 있으면 호출
$layered.children('div').each(function(){
    if($(this).hasClass('is-active')) gfn_layered.open($(this).attr('data-layered-name'));
});


//레이어 닫기, 호출(순서변경)
$('body')
.on('click','[data-action=close]',function(){
    var name = $(this).parents('div[data-layered-name]').data('layered-name');
    var duration = $(this).data('call-layered') != undefined ? 0 : undefined;
    gfn_layered.close(name, duration);
})
.on('click','[data-call-layered]',function(){    
    var name = $(this).data('call-layered');
    gfn_layered.open(name);
    //if($(this).closest('.kb-form').length) $(this).closest('.kb-form').addClass('is-active');    
});

//modal 호출(data-call-modal 이름과 modal의 ID가 같아야함)
$('body').on('click','button[data-call-modal]',function(){
    var id = $(this).data('call-modal');
    $('#'+id).modalPopup('open');
});


//is-disabled 공통
$('.is-disabled, button:disabled').on('click focusin', function(){
    return false;
});

//form-select
var gfn_formText = {
    fill: function($target){
        var $thisForm = $target.parent('.kb-form');
        var value = $target.find('input').val();
        if(value!=''){
            $thisForm.removeClass('not-ready');
            $thisForm.find('.form-text').addClass('is-filled');
        }else{
            $thisForm.addClass('not-ready')
            $thisForm.find('.form-text').removeClass('is-filled');
        }
    },
    calculate: function($target){
        var $thisForm = $target.parent('.kb-form');
        var $input = $target.find('input');
        var unit = $target.find('.unit').text();
        
        
        if($thisForm.find('.hangul').length) {            
            $thisForm.find('.hangul').html(gfn_koreanUnit($input.val(), unit));         //단위 한글 변환
        }else if($thisForm.find('.all-hangul').length) {
            $thisForm.find('.all-hangul').text(gfn_NumberToKorean($input.val(), unit));   //전체 한글 변환
        }

        //세자리수 콤마 실행
        if($input.data('action') == 'autoSeperator'){
            $input.val(gfn_comma3Digit($input.val()));
        }
        
        //unit 위치 (정렬 변경으로 불필요)
        // if($target.find('.measurement').length){
        //     $target.find('.measurement').text($input.val());
        //     $target.find('.unit').css({'left' : $target.find('.measurement').outerWidth() + 4 + 'px'});
        // }
        //console.log($target.find('.measurement').outerWidth())
    },
    empty: function($target){
        $target.parent('.kb-form').addClass('not-ready');
        $target.find('input').val('').focus();
        $target.find('.measurement').text('');
    },
    write: function(id, val){
        var $this = $('input[type=text]');
        if(typeof(id) == 'string'){
            $this = $('#'+id);
        }else if(typeof(id) == 'object'){
            $this = $(id);
        }

        if($this.attr('data-action') != 'autoSeperator'){
            $this.val(val);
            $this.closest('.kb-form').removeClass('not-ready').addClass('is-active');
        }else{
            $this.val(val);
            $this.closest('.kb-form').removeClass('not-ready').addClass('is-active');
            gfn_formText.calculate($this.closest('.kb-form'));
        }
    },
    clear: function(id){
        var $this = $('input[type=text]');
        if(typeof(id) == 'string'){
            $this = $('#'+id);
        }else if(typeof(id) == 'object'){
            $this = $(id);
        }

        $this.val('');
        $this.closest('.kb-form').removeClass('is-active').addClass('not-ready');
    },
    //Warning
    warning: function(id, status, msg) { // status  => '', 'success', 'error'
        var $select = $('#'+id);        
        var $thisForm = $select.parents('.kb-form');
        status = status != undefined ? status : '';        
        $thisForm.attr('data-status', status);
        $thisForm.find('.validation').text(msg);
    }
};

$('.form-text')
.each(function(){
    var $input = $(this).find('input');
    var $thisForm = $(this).parent('.kb-form');

    //disabled
    if($thisForm.hasClass('is-disabled') || $thisForm.hasClass('is-readonly')) $input.prop('readonly',true).siblings('button:not(.btn-data-clear)').prop('disabled',true);

    //init (단위가 있으면 : 단위 삽입 & input 넓이 확인용 span 삽입)
    if($input.data('unit') != '' && $input.data('unit') != undefined ){
        //console.log($input.data('unit') != '' , $input.data('unit') != undefined )
        $('<span class="unit">' + $input.data('unit') + '</span>').insertAfter($input);
        $(this).append('<span class="measurement"/>'); //input 넓이 확인용
        //console.log('순서 확인')
        $('.unit').on('click',function(){
            $(this).siblings('input').focus();
        });
    }
    if($input.attr('inputmode') == 'numeric') $input.siblings('.btn-data-clear').remove();

    //value가 있는지 확인
    gfn_formText.fill($(this));

    //계산
    gfn_formText.calculate($(this));
})
.on('click keypress','input',function(){
    var $thisForm = $(this).parents('.kb-form');
    var $thisFormSelect = $(this).parents('.kb-form_inner');

    if(!$thisForm.hasClass('is-disabled') && !$thisForm.hasClass('is-readonly')){
        $('.kb-form').removeClass('is-active').find('.kb-form_inner').removeClass('is-focused');

        if($(this).data('call-layered') != '' && $(this).data('call-layered') != undefined){
            gfn_layered.open($(this).data('call-layered'));
        }else{
            $thisForm.addClass('is-active').find('.kb-form_inner').addClass('is-focused');
        }
    }
    //Multi form
    $thisFormSelect.siblings('.kb-form_inner').removeClass('is-focused');
})
.on('click','.btn-data-clear',function(e){
    e.stopPropagation();
    var $thisForm = $(this).parents('.kb-form');
    var $thisFormText = $(this).parent('.form-text');
    gfn_formText.empty($thisFormText);
    gfn_formText.calculate($thisFormText);
    $thisForm.addClass('is-active').find('.kb-form_inner').addClass('is-focused');
})
.on('keyup','input',function(){
    var $this = $(this).parent('.form-text');
    gfn_formText.fill($this);
    gfn_formText.calculate($this);
});

//form select
var gfn_bsSelect = {
    bind: function(){
        $bsSelect.find('.bottom-sheet_select').on('click','button',function(e){
            e.stopPropagation();
            var idx = $(this).parent('li').index();
            var $activeForm = $('.kb-form.is-active');
            var $activeFormSelect = $activeForm.find('.form-select');
            $(this).parent('li').addClass('is-active').siblings('li').removeClass('is-active');

            //활성화된 select
            $activeFormSelect.find('option').eq(idx + 1).prop('selected',true);
            $activeFormSelect.find('.selected-option').text($activeFormSelect.find('option:selected').text());
            $activeFormSelect.parent('.kb-form').removeClass('is-active not-ready').find('.kb-form_inner').removeClass('is-focused');
            // bsSelect 스크롤 위치를 $activeForm data-bsScroll에 저장
            $activeForm.data("bsScroll", $bsSelect.find('.bottom-sheet_contents').scrollTop());
            gfn_layered.close('bsSelect');
            $activeForm.find('.kb-form_inner').addClass('is-selected');
            gfn_bsSelect.unbind();
            $activeFormSelect.find('select').trigger('change');
        });
    },
    unbind: function(){
        $bsSelect.find('.bottom-sheet_select').off('click','button');
    },
    // bsSelect 스크롤 위치 제어
    scroll: function(n) {
        n = n | 0;
        $bsSelect.find('.bottom-sheet_contents').scrollTop(n);
    }
};

var gfn_formSelect = {
    open: function($target){
        var $thisForm = $target.parent('.kb-form');
        var $thisFormSelect = $target;
        if(!$thisForm.hasClass('is-disabled')){
            $thisForm.addClass('is-active');
            $thisFormSelect.addClass('is-focused');
            var dataLayerName = $thisFormSelect.children('button').data('call-layered');

            if(dataLayerName != '' && dataLayerName != undefined){
                //gfn_layered.open(dataLayerName);
            }else if($bsSelect.length){
                //make select option
                $bsSelect.find('.bottom-sheet_header').children('.tit').text($target.find('select').attr('title'));
                $bsSelect.find('.bottom-sheet_contents').empty().append('<ul class="bottom-sheet_select"/>');

                var $options = $target.find('select').find('option');
                $options.each(function(idx) {
                    var selectedClass = $(this).is(":selected") ? "is-selected" : "";
                    if(idx != 0){
                        if($(this).css('display') != 'none'){
                            $bsSelect.find('.bottom-sheet_select').append('<li class="'+selectedClass+'"><button type="button">'+$(this).text()+'</button></li>');
                        }else{
                            $bsSelect.find('.bottom-sheet_select').append('<li class="is-hidden"><button type="button">'+$(this).text()+'</button></li>');
                        }
                    }
                });
                
                //call bottom sheet
                gfn_layered.open('bsSelect');
                gfn_bsSelect.bind();
                // data-bsScroll에 저장된 스크롤 위치 값으로 bsSelect의 스크롤 제어
                gfn_bsSelect.scroll($thisForm.data("bsScroll"));
            }
            focusA11Y.memory($thisForm);
        }
    },
    // form-select 의 선택 옵션 바꾸는 메소드
    select: function(id, idx) {
        var $select = $('#'+id);
        var $options = $select.find('option');
        var $thisForm = $select.parents('.kb-form');
        var $selectedOption = $thisForm.find('.selected-option');
        $options.eq(idx).prop('selected', true);
        $selectedOption.text($options.eq(idx).text());
        $thisForm.find('.kb-form_inner').addClass('is-selected');
        $select.trigger('change');
    },
    // form-select 초기화
    init: function(id) {
        var $select = $('#'+id);
        var $options = $select.find('option');
        var $thisForm = $select.parents('.kb-form');
        var $selectedOption = $thisForm.find('.selected-option');
        $thisForm.addClass('not-ready');
        $selectedOption.text($options.eq(0).text());
    },
    //Warning
    warning: function(id, status, msg) { // status  => '', 'success', 'error'
        var $select = $('#'+id);        
        var $thisForm = $select.parents('.kb-form');
        status = status != undefined ? status : '';        
        $thisForm.attr('data-status', status);
        $thisForm.find('.validation').text(msg);
    }
};

//이메일폼
if($('.kb-form_email').length){
    $('.kb-form_email')
    .on('change','select',function(){
        if($(this).val() != 'writingemail'){
            $('.kb-form_email').find('.add-email-input').hide();
            //$('.kb-form_email').find('.add-email-input').addClass('is-disabled').find('input').prop('disabled',true)
        }else{
            $('.kb-form_email').find('.add-email-input').show();
            //$('.kb-form_email').find('.add-email-input').removeClass('is-disabled').find('input').prop('disabled',false)
        }
    })
    .on('change','input[type=checkbox]',function(){
        var $thisEmailForm = $(this).parents('.kb-form_email');
        if($(this).prop('checked')){
            $thisEmailForm.find('.kb-form').addClass('is-disabled').find('input').prop('disabled',true);
        }else{
            $thisEmailForm.find('.kb-form').removeClass('is-disabled').find('input').prop('disabled',false);
        }
    });
    $('.kb-form_email').each(function(){
        $(this).find('select').trigger('change');
    });
}

$('.select-list').on('click','button',function(){
    var $selectList = $(this).parents('.select-list');
    if(!$selectList.hasClass('is-disabled')){
        if($selectList.data('selection') != 'multiple'){
            $(this).parent('li').addClass('is-active').siblings('li').removeClass('is-active');
        }else{
            $(this).parent('li').toggleClass('is-active');
        }
    }
});

// $('[data-action=text]').on('click',function(){
//     var txt = $(this).text();
//     var layeredName = $(this).closest('.popup').length ? $(this).closest('.popup').data('layered-name') : $(this).closest('.bottom-sheet').data('layered-name');
//     gfn_layered.close(layeredName);
//     $('.kb-form.is-active').find('input').val(txt);
//     $('[data-call-layered=' + layeredName + ']').closest('.kb-form').removeClass('is-active');
// });

//바텀시트에서 셀렉트 값 넣기
$('.bottom-sheet').on('click','[data-action=select]',function(){
    var thisBSName = $(this).closest('.bottom-sheet').data('layered-name');
    var value = $(this).data('value');
    var $activeForm = $('.kb-form.is-active');
    $activeForm.removeClass('not-ready').find('select option[value=' + value + ']').prop('selected',true);
    var txt = $activeForm.find('option:selected').text();
    $activeForm.find('.selected-option').text(txt);
    gfn_layered.close(thisBSName);
});

//Layer layout(버튼이 있는 경우, 없는 경우 여백 다름)

// if($('.popup').length){
//     $('.popup').each(function(){
//         if($(this).find('.popup_buttons').length) $(this).addClass('with-button');//버튼이 있는 경우 하단 여백이 큼
//     });
// }
if($('.bottom-sheet').length){
    var bsTouchDirection;
    var startY = 0;
    var endY = 0;
    $('.bottom-sheet').each(function(i){
        if($(this).find('.tab').length) {
            $(this).addClass('bs-tab');     //TAB이 있는 바텀시트 구분 (스크롤시 확장이 되야함)
            $(this).find('.bottom-sheet_contents').attr('id','bsTabScroll' + i);            
            var $bsCont = document.getElementById('bsTabScroll' + i);

            $bsCont.addEventListener("touchstart", touchStart, false);
            $bsCont.addEventListener("touchend", function(ev){
                touchEnd(ev);
                var scrollStatus = this.getAttribute('data-scroll');
                if(scrollStatus == 0 && bsTouchDirection < 0){
                    //터치시 scroll이 꼭대기일때 작아짐
                    this.closest('.bottom-sheet').classList.remove("is-expanded");
                }
            }, false);
        }
    });

    //Tab 이 있는 바텀시트는 스크롤시 확장됨
    $('.bs-tab .bottom-sheet_contents').on('scroll',function(){
        var st = $(this).scrollTop();
        var $bs = $(this).closest('.bottom-sheet');
        $(this).attr('data-scroll',st);
        scrollDirection(st);
        if(scrollDown) $bs.addClass('is-expanded');
    });

    function touchStart(ev) {
        startY = ev.changedTouches[0].clientY;
        return startY;
    }
    function touchEnd(ev) {
        endY = ev.changedTouches[0].clientY;
        bsTouchDirection = startY - endY;
        return bsTouchDirection;
    }
}

//datepicker 입력
$('body')
.on('keyup','.datepicker input, .period-selector input', function(){
    var val = $(this).val();
    var date = gfn_dateFormatter(val);
    $(this).val(date);
})
.on('keyup','.timepicker input', function(){
    var val = $(this).val();
    var time = gfn_timeFormatter(val);
    $(this).val(time);
})
.on('click','.btn-datepicker',function(e){
    e.preventDefault();
    //if(!$(this).closest('.is-disabled').length) gfn_layered.open('bsCalendar');
    gfn_layered.open('bsCalendar');
});

//datapicker 버튼 삽입후 필요시 binding
var btnDatepicker = {
    "on" : function(){
        btnDatepicker.off();
        $('.btn-datepicker').on('click',function(){
            gfn_layered.open('bsCalendar');
        });
    },
    "off" : function(){
        $('.btn-datepicker').off('click');
    }
}
var btnTimepicker = {
    "on" : function(){
        btnTimepicker.off();
        $('.btn-timepicker').on('click',function(){
            gfn_layered.open('bsTime');
        });
    },
    "off" : function(){
        $('.btn-datepicker').off('click');
    }
}

//날짜 선택
$('.datepicker').each(function(){
    if($(this).hasClass('is-disabled')){
        $(this).find('input').prop('readonly',true);
    }else{
        $(this).find('input').prop('readonly',false);
    }
    //init
    $(this).find('input').attr('inputmode','numeric');
    $(this).find('.btn-data-clear, .btn-datepicker').remove();
    $(this).find('input').after('<button class="btn-data-clear"><i class="icon-data-clear_24">지우기</i></button><button class="btn-datepicker" type="button"><span>날짜선택</span></button>');
    btnDatepicker.on();
});

//날짜 선택
$('.timepicker').each(function(){
    if($(this).hasClass('is-disabled')){
        $(this).find('input').prop('readonly',true);
    }else{
        $(this).find('input').prop('readonly',false);
    }
    $(this).find('input').attr('inputmode','numeric');
    $(this).find('.btn-data-clear, .btn-timepicker').remove();
    $(this).find('input').after('<button class="btn-data-clear"><i class="icon-data-clear_24">지우기</i></button><button class="btn-timepicker" type="button"><span>시간선택</span></button>');
    btnTimepicker.on();
});

//기간 선택
$('.period-selector').each(function(){
    if($(this).hasClass('is-disabled')){
        $(this).find('input').prop({'readonly': true});
    }else{
        $(this).find('input').prop({'readonly': false});
    }
    $(this).find('input').attr('inputmode','numeric');
    $(this).find('input').after('<button class="btn-datepicker" type="button"><span>날짜선택</span></button>');
    btnDatepicker.on();
});

if($('.form-select').length){
    //select bs가 없는 경우 써주기
    if($('.bottom-sheet[data-layered-name=bsSelect]').length == 0){
        var $bsSelectHtml = '<div class="bottom-sheet" data-layered-name="bsSelect">';
            $bsSelectHtml += '<div class="bottom-sheet_header">';
            $bsSelectHtml += '<span class="tit"></span>';
            $bsSelectHtml += '</div>';
            $bsSelectHtml += '<div class="bottom-sheet_contents"></div>';
            $bsSelectHtml += '<button class="btn-close" data-action="close"><span>닫기</span></button>';
            $bsSelectHtml += '</div>';
        $('.layered').append($bsSelectHtml);
    }
    var $bsSelect = $('.bottom-sheet[data-layered-name=bsSelect]');

    $('.form-select')
    .each(function(){
        var $thisFormSelect = $(this);
        var $thisForm = $thisFormSelect.parent('.kb-form');
        if($thisFormSelect.find('option:selected').index() != 0){
            $thisFormSelect.addClass('is-selected');
            $thisForm.removeClass('not-ready')
        }else{
            $thisForm.addClass('not-ready')
        }
        $thisFormSelect.find('.selected-option').text($(this).find('option:selected').text());        
    })
    .on('click','button',function(e){
        //e.stopPropagation();
        if($(this).data('layered-name') == undefined || $(this).data('layered-name') == ''){

            var $thisForm = $(this).parents('.kb-form');
            var $thisFormSelect = $(this).parent('.form-select');

            $('.kb-form').not($thisForm).removeClass('is-active').find('.kb-form_inner').removeClass('is-focused');
            if(!$thisFormSelect.hasClass('is-disabled')) gfn_formSelect.open($thisFormSelect);

            //Multi form
            $thisFormSelect.siblings('.kb-form_inner').removeClass('is-focused');

        }
    });
}
$('.kb-form')
.on('click','label',function(){
    var $thisFormSelect = $(this).siblings('.form-select');
    if($thisFormSelect.length) $thisFormSelect.find('.selected-option').trigger('click');
});

//form 공통 (상대적 비활성화, body 클릭시 비활성화)
$body.on('click',function(e){
    if($('.kb-form').hasClass('is-active') && !$('.kb-form').has(e.target).length){
        $('.kb-form').removeClass('is-active').find('.kb-form_inner').removeClass('is-focused');
    }
});

if($('.textarea').length){
    $('.textarea').each(function(){
        var $textarea = $(this);
        var textarea = $textarea.find('textarea');
        var $byte = $textarea.find('.byte');
        if($textarea.hasClass('is-disabled')) textarea.prop('disabled',true);        
        textarea.prop('maxlength',gfn_removeComma3Digit($textarea.find('.total').text()));

        //calc byte
        if($byte.length){
            var max = $textarea.find('.total').text();        
            max = max.replace(/,/g, "");
            gfn_fnChkByte(textarea, max);
        }
        
        //filled
        if(textarea.val() != ''){
            $textarea.addClass('is-filled');
        }else{
            $textarea.removeClass('is-filled');
        }
    });

    $('.textarea')
    .on('keyup mouseup','textarea',function(){
        var $textarea = $(this).parent('.textarea');
        var textarea = $(this);
        var $byte = $textarea.find('.byte');
        
        //calc byte
        if($byte.length){
            var max = $textarea.find('.total').text();        
            max = max.replace(/,/g, "");
            gfn_fnChkByte(textarea, max);
        }
        
        //filled
        if(textarea.val() != ''){
            $textarea.addClass('is-filled');
        }else{
            $textarea.removeClass('is-filled');
        }
    })
    .on('focus','textarea',function(){
        if(!$(this).prop('disabled') && !$(this).prop('readonly')){
            $(this).parent('.textarea').addClass('is-focused');
        }
    })
    .on('focusout','textarea',function(){
        var $textarea = $(this).parent('.textarea');
        $(this).parent('.textarea').removeClass('is-focused');
        if($(this).val() != ''){
            $textarea.addClass('is-filled');
        }else{
            $textarea.removeClass('is-filled');
        }
    });
}

$('input[type=checkbox], input[type=radio]').on('change',function(){
    // 전체 동의에서 오류 발생 해결을 위해 추가....
    if ($(this).parents(".agreement-to-terms.expansion-mode").length) return;

    var tf = $(this).prop('checked');
    var name = $(this).next('label').data('call-layered');
    if(tf && name) gfn_layered.open(name);
});



//TAB
/*
var $tab = $('.tab');
var tab = function(){
    var tabSwiper = new Swiper('.tab',{
        slidesPerView: 'auto',
        spaceBetween: 32,
        watchOverflow: true,
        on: {
            init : function(){

            },
            click : function(swiper, event){
                swiper.slideTo(swiper.clickedIndex)
            },
        }
    });
    $('.tab').on('click','a',function(){
        var idx = $(this).parent('li').index();
        var $tabCont = $(this).parents('.tab').next('.tab_contents');
        $(this).parent('li').addClass('is-active').siblings('li').removeClass('is-active');
        if($tabCont.length) {
            $tabCont.children('div').eq(idx).addClass('is-active').siblings('div').removeClass('is-active');
            return false;
        }
    });
};
if($tab.length) tab();
*/

$('.tab.swiper-container').each(function(idx) {
    var $tab = $(this);
    var $tabLinks = $tab.find("a, button");
    var $tabContents = $tab.nextUntil('.app-container','.tab_contents').find('> div');
    var isContentsTab = $tab.nextUntil('.app-container','.tab_contents');
    var isContentsSwiper = $tab.parent().hasClass('tab-swiper-wrap');
    
    

    //WAI-ARIA
    $tab.attr('role','tablist');
    $tab.find('li > button, li > a').attr('role','tab');

    if(!$tab.hasClass('app-sub') && !$tab.hasClass('app-gnb')){

        $tab.addClass('tab-'+idx);
        $tab.data('swiper',new Swiper('.tab.tab-'+idx,{
            slidesPerView: 'auto',
            //spaceBetween: space,
            watchOverflow: true,
            on: {
                init : function(swiper){
                    var width = 0;
                    var $swiper = $('.tab.tab-'+idx);
                    var index = $swiper.find('.is-active').index();
                    swiper.slideTo(index);
                    if($swiper.is(':visible')){
                        $swiper.find('.swiper-slide').each(function(){
                            width += $(this).width();
                        });
                        if(width <= $(window).outerWidth() - 24) swiper.allowTouchMove = false;                        
                    }
                },
                click : function(swiper, event){
                    swiper.slideTo(swiper.clickedIndex);
                },
            }
        }));
        $tabLinks.on('click', function() {
            var $link = $(this);
            var idx = $link.parent('li').index();
            if (isContentsTab) {
                $tabLinks.parent('li').removeClass('is-active');
                $tabLinks.eq(idx).parent('li').addClass('is-active');
                $tabContents.removeClass('is-active');
                $tabContents.eq(idx).addClass('is-active');
                if ($tabContents.eq(idx).data('swiper')) {
                    $tabContents.eq(idx).data('swiper').update();
                }
                if ($tabContents.eq(idx).find(".swiper-container").data('swiper')) {
                    $tabContents.eq(idx).find(".swiper-container").data('swiper').update();
                }
                //return false;
            }
        });
        if (isContentsSwiper) {
            $tabContents.each(function(i) {
                var $content = $(this);
                $content.find('.swiper-container').each(function(){
                    var swiperClass = 'swiper-container-'+idx+'-'+i;
                    $(this).addClass(swiperClass);
                    // slide 가 하나 이하인 경우 swiper 적용 안함
                    if ($(this).find(".swiper-slide").length <= 1) return;
                    var options = {};
                    if ($(this).find(".swiper-pagination").length) {
                        options.pagination = {};
                        options.pagination.el = ".swiper-pagination";
                        if ($(this).find(".swiper-pagination").data("type") !== undefined) {
                            options.pagination.type = $(this).find(".swiper-pagination").data("type");
                        }
                    }
                    if ($(this).data("swiper-options") != "") {
                        options = window[$(this).data("swiper-options")];
                    }
                    $content.data('swiper', new Swiper('.'+swiperClass, options));
                });
            });
        }
    }
});

//Slider
if($('.js-slider').length){
    $('.js-slider').each(function(i){
        var theme = $(this).data('theme');
        var $graph = $(this).find('.graph-area');
        var graph_width = $graph.outerWidth();
        var $handle = $(this).find('.handle');
        var dft = $(this).find('.graph-area').data('default');
        var $min = $(this).find('.start-txt');
        var $max = $(this).find('.end-txt');
        var min = gfn_removeComma3Digit($min.text());
        var max = gfn_removeComma3Digit($max.text());
        var defaultNum = (max - min) * dft * 0.01;

        var min_width = Math.floor((1 - ((graph_width - $min.outerWidth()) / graph_width)) * 100);
        var max_width = Math.floor((1 - ((graph_width - $max.outerWidth()) / graph_width)) * 100);

        // console.log(min, max, defaultNum);
        $graph.slider({
            value: dft,
            orientation: "horizontal",
            range: "min",
            animate: true,
            create: function(event, ui) {                
                var val = defaultNum;
                var $value = $handle.find('.value');

                if($value.hasClass('integer')){
                    val = Math.floor(defaultNum);
                }else{
                    val = gfn_comma3Digit(defaultNum);
                }
                $handle.find('.value').text(val);
            },
            slide: function(event, ui) {
                var val;
                var $value = $handle.find('.value');
                var value_width = Math.floor((1 - ((graph_width - $value.outerWidth()) / graph_width)) * 100);                
                
                if($value.hasClass('integer')){
                    val = Math.floor((max - min) * ui.value * 0.01);
                }else{
                    val = gfn_comma3Digit((max - min) * ui.value * 0.01);
                }                
                $handle.find('.value').text( val );
                if(ui.value >= (100 - max_width - value_width)){
                    $(this).removeClass('left').addClass('right');
                }else if(ui.value <= min_width + value_width){
                    $(this).removeClass('right').addClass('left');
                }else{
                    $(this).removeClass('right left');
                }
            }
          });
    });
}

//accordion
if($('.accordion').length){
    $('.accordion').each(function(i){
        var accordionNum = i;
        $(this).children().each(function(i){
            var accordionEach = i;
            var tagName = this.tagName.toLowerCase();
            var $trigger = $(this).find('.accordion-trigger');
            if(tagName == 'dt'){
                $trigger.attr('id','accordion' + accordionNum + accordionEach);
                !$(this).hasClass('is-active') ? $trigger.attr('aria-expanded', false) : $trigger.attr('aria-expanded',true)
            }else if(tagName == 'dd'){
                $(this).attr('aria-labelledby','accordion' + accordionNum + accordionEach);
            }
        });
    })
    $('.accordion')
    .on('click','.accordion-trigger',function(e){
        e.stopPropagation();
        var $btn = $(this);
        var $dt = $(this).parent('dt');
        if(!$dt.hasClass('is-active')){
            $btn.attr('aria-expanded',true);
            $dt.addClass('is-active').siblings('dt').removeClass('is-active').find('.accordion-trigger').attr('aria-expanded','false');
        }else{
            $btn.attr('aria-expanded',false);
            $dt.removeClass('is-active');
        }
    })
    .on('click','a[href]',function(e){
        if($(this).attr('href').indexOf('#') >= 0 || $(this).attr('href') != '') e.stopPropagation();
    })
    .on('click','dt',function(e){
        e.stopPropagation();
        $(this).find('.accordion-trigger').trigger('click');
        if(e.target.nodeName.toLowerCase() == 'label') return;
    });
}

//btn-more-view
$('body').on('click','.more-view-box .btn-more-view',function(){
    $(this).closest('.more-view-box').toggleClass('is-show');
})



//폼 수정 및 추가
if($('.add-form-box').length){
    $('.edit-user')
    .on('click', function(e){
        e.stopPropagation();
        var chkStatus = $(this).hasClass('is-edit');
        if(chkStatus){
            return;
        }
    })
    .on('click', 'button', function(){
        var $this = $(this);
        var $editBox = $this.parents('.edit-user');
        var resetVal = $editBox.find('input[type="text"]').attr('name');
        var valChk = $editBox.find('input[type="text"]').val();
        var valEdit = $this.hasClass('btn-edit-form');
        var valSave = $this.hasClass('btn-save-form');
        var valCancel = $this.hasClass('btn-edit-cancel');
        var chkModal = $this.is('[data-call-layered]');
        //btn-edit-form
        if(valEdit){
            $editBox.addClass('is-edit').attr('data-status', 'edit');
            $editBox.find('input[type="text"]').val(resetVal).removeAttr('readonly');
        }
        //btn-save-form
        if(valSave){
            $editBox.removeClass('is-edit').attr('data-status', 'normal');
            $editBox.find('input[type="text"]').attr('readonly');
            if(valChk == ''){
                $editBox.find('input[type="text"]').val(resetVal);
            }
        }
        //btn-edit-cancel
        if(valCancel){
            $editBox.removeClass('is-edit').attr('data-status', 'normal');
            $editBox.find('input[type="text"]').val(resetVal).attr('readonly');
        }
        //modal
        if(chkModal && $editBox.hasClass('is-edit')){
            var name = $(this).data('call-layered');
            gfn_layered.open(name);
        }
    });
    $('.btn-add-form').on('click', function(){
        //btn-add-form
        var $this = $(this);
        var formVal = $this.data('form-name');
        var $target = $this.closest('.add-form-box').find('.add-form-target[data-form-name="'+ formVal +'"]');
        var $addItem = $this.closest('.kb-sec').find('.template.add-form-item[data-form-name="'+ formVal +'"] > .kb-form');
        var isCount = $this.data('add-count') == 'once';
        var isLength =  $this.closest('.add-form-target').find('.kb-form[data-form-name="'+ formVal +'"]').length;
        $('.btn-edit-delete').on('click', function(){
            $(this).closest('.add-category').remove();
            $(this).closest('.add-sub-category').remove();
        });
        if(isCount && isLength){
            return false;
        }else{
            $addItem.clone().appendTo($target);
        }
    });
}

// 알려드립니다 (토글)
if($('.toggle-notice').length){
    $(".toggle-notice").each(function(){
        var $this = $(this);
        var $button = $this.find('.header button');
        var $list = $this.find('.notice-list');
        $button.on('click', function() {
            if ($this.hasClass('is-closed')) {
                $this.removeClass('is-closed');
                $list.slideDown(300);
            } else {
                $this.addClass('is-closed');
                $list.slideUp(300);
            }
        });
        // default가 is-closed인 경우
        if ($this.hasClass('is-closed')) {
            $list.slideUp(0);
        }
    });
}

//체크박스 하위 선택
$('.js-checkbox-selector').not("dl").each(function(){
    var $checkboxSelector = $(this);
    var $checkbox = $checkboxSelector.find('input:checkbox');
    var $exception = $checkboxSelector.find('.exception');
    var checkboxLen = $checkbox.length;
    var exceptionLen = $exception.length;

    $checkbox.each(function(i){
        var $this = $(this);

        //init
        $this.attr('data-index',i);
        var $allSelector = $checkboxSelector.find('input:checkbox[data-index=0]');

        $this.on('change',function(){
            if(!$(this).hasClass('exception')){
                var tf = $(this).prop('checked');
                if($this.data('index') == 0){   //상단 전체 선택 checkbox
                    if(tf){
                        $checkbox.not('.exception').prop('checked',true);
                    }else{
                        $checkbox.not('.exception').prop('checked',false);
                    }
                }else{  //하단 개별 선택
                    if(tf){
                        if($checkboxSelector.find('input:checkbox:checked').length == (checkboxLen - exceptionLen - 1)) $allSelector.not('.exception').prop('checked',true);
                    }else{
                        $allSelector.not('.exception').prop('checked',false);
                    }
                }
            }
        });
    });
});
//체크박스 하위 선택 (DL 구성)
$('dl.js-checkbox-selector').on('change','input:checkbox',function(){
    var tf = $(this).prop('checked');

    if($(this).closest('dt').length){   //상단 전체 선택
        if(tf){
            $(this).closest('dt').next('dd').find('input:checkbox').prop('checked',true);
        }else{
            $(this).closest('dt').next('dd').find('input:checkbox').prop('checked',false);
        }
    }else{  //하단 개별 선택
        if(tf){
            if($(this).closest('dd').find('input:checkbox').not(':checked').length == 0){
                $(this).closest('dd').prev('dt').find('input:checkbox').prop('checked',true);
            }
        }else{
            $(this).closest('dd').prev('dt').find('input:checkbox').prop('checked',false);
        }
    }
    // btn-switch 분리되어있을 때
    if($(this).closest('.list-controls').length){
        var targetName = $(this).closest('.js-checkbox-selector').data('target');
        if(tf){
            $(this).closest('section').find('dl[data-target="' + targetName + '"]').find('input:checkbox').prop('checked',true);
        }else{
            $(this).closest('section').find('dl[data-target="' + targetName + '"]').find('input:checkbox').prop('checked',false);
        }
    }
});

$('.js-checkbox-selector-trigger').on('change','input:checkbox',function(){
    var targetName = $(this).closest('.js-checkbox-selector-trigger').data('target');
    var tf = $(this).prop('checked');
    var $target = $('.js-checkbox-selector[data-target=' + targetName + ']');
    if(!tf){
        $target.find('input:checkbox').prop({'checked':false, 'disabled': true});
    }else{
        $target.find('input:checkbox').prop({'checked':false, 'disabled': false});
    }
    // console.log(targetName);
});

// 목록 더보기 토글
if($('[data-action=moreViewList]').length) {
    $('[data-action=moreViewList]').each(function(){
        var $this = $(this);
        var $button = $this.find('[data-moreview=toggle]');
        var $list = $this.find('[data-moreview=list]');
        var showClass = "is-moreview-show";
        $button.on('click', function() {
            if ($this.hasClass(showClass)) {
                $this.removeClass(showClass);
            } else {
                $this.addClass(showClass);
            }
        });
    });
}

// 전체동의
var gfn_agreementToTerms = function(){
    $('.agreement-to-terms').each(function(){
        var $this = $(this);
        var $allCheck = $this.find('.header input[type=checkbox]');
        var $checkboxs = $this.find('.checkbox-group input[type=checkbox]');
        var $childCheckboxs = $this.find('.agreement-service-choice input[type=checkbox]'); //하위 서비스
        var isExpansionMode = $this.hasClass("expansion-mode");

        $allCheck.on('click', allCheckChange);
        $checkboxs.on('change', function() {
            var isAllCheck = true;
            $checkboxs.each(function(){
                if(!$(this).closest('.agreement-service-choice').length){ //하위 서비스 제외
                    if ($(this).prop('checked') === false) {
                        isAllCheck = false;
                    }
                }
            });
            $allCheck.prop('checked', isAllCheck);
            $allCheck.trigger('change');
        });

        function allCheckChange() {
            if ($allCheck.is(':checked')) {
                $checkboxs.prop('checked', true);
                if($childCheckboxs.length) $childCheckboxs.prop({'checked': true, 'disabled': false});
            } else {
                $checkboxs.prop('checked', false);
                if($childCheckboxs.length) $childCheckboxs.prop({'checked': false, 'disabled' : false});
            }
        }

        $this.find("[data-call-layered]").on("click", function(e) {
            var $this = $(this);
            var id = $this.siblings('input[type=checkbox]').prop('id');
            var $checkbox = $("#"+id);
            var isAllCheckbox = $checkbox.parent().parent().hasClass("header");
            var layered = $this.data('call-layered');
            var $layered = $("[data-layered-name="+layered+"]");

            $layered.find("[data-confirm=true]").off("click").on("click", function() {
                $checkbox.prop("checked", true);
                $checkbox.trigger('change');
                if (isAllCheckbox) {
                    allCheckChange();
                }
            });

            if ($this.prop('tagName') === "LABEL" && !$checkbox.is(":checked")) {
                gfn_layered.open($(this).data("call-layered"));
                e.preventDefault();
            }
        });

        if (isExpansionMode) {
            $this.find("label").on("click", function(e) {
                var $checkbox = $("#"+$(this).prop("for"));
                var $buttonLink = $(this).siblings("button.link");

                if (!$checkbox.is(":checked")) {
                    if ($buttonLink.length > 0) {
                        $buttonLink.trigger("click");
                        e.preventDefault();
                    } else if ($(this).parent().parent().hasClass("header") && $(this).data("call-layered")) {
                        gfn_layered.open($(this).data("call-layered"));
                        e.preventDefault();
                    }
                }
            });
        }
    });
}

// 동일 data 값 체크박스 동시 변경, 전체동의 타입2, CO_05_02_01, MN_03_03_01_01
function simultaneousCheckbox(){
    var $simulContainer = $('.form-simul-mode');
    var $simulCheckboxes = $simulContainer.find('.form-simul');    
    var t = 0; 
    
    // 전체동의 타입2
    var $checkContainer = $('.js-checkbox-selector02');
    var $checkAll = $checkContainer.find('.checkbox-selector-all');
    var $checkboxWrap = $checkContainer.find('.checkbox-selector-items');
    var $checkboxLength;
    var $checkboxUncheckedLength;

    // util
    function toggleCheckbox(item, tf, dis){
        item.find('input:checkbox').prop('checked', tf);

        if(dis !== undefined && !dis){
            item.find('input:checkbox').prop({'checked':tf, 'disabled': false});
        }else if(dis !== undefined && dis){
            item.find('input:checkbox').prop({'checked':tf, 'disabled': true});
        }
    }

    // 동일 데이터 값을 가진 체크박스 찾기
    function checkDataValue(e){
        $this = $(e.currentTarget);
        var thisDataValue = $this.data('check-simul');
        var simulTF = $this.find('input:checkbox').prop('checked');

        $simulCheckboxes.each(function(idx, item){
            var temp = $(item).eq(0).data('check-simul');
            
            if(thisDataValue == temp){
                toggleCheckbox($(item), simulTF);
            }
        });
        findCheckboxAllWidthData(thisDataValue, simulTF);
    }

    // 전체동의 타입2의 데이터값과 동일한 데이터 값을 가진 체크박스 찾아서 연동하기
    function findCheckboxAllWidthData(dataValue, tf){
        var selector02TF = $simulContainer.find('[data-check-simul=' + dataValue + ']').hasClass('js-checkbox-selector02');
        if(selector02TF){
            toggleCheckbox($checkAll, tf, !tf);
            toggleCheckbox($checkboxWrap, tf, !tf);
        }
        
        // 연동되는 체크박스 전체 토글 
        if(tf){
            $simulContainer.find('[data-check-simul=' + dataValue + ']').addClass('is-expand');
        } 
        else{
            $simulContainer.find('[data-check-simul=' + dataValue + ']').removeClass('is-expand');
        }
        
    }
    
    // 전체동의 타입2 : 전체동의 선택시
    function checkAllType2(e){
        $this = $(e.currentTarget);
        var tf = $checkAll.find('input:checkbox').prop('checked');
        toggleCheckbox($checkContainer, tf);

        var dataValue = $this.closest('.js-checkbox-selector02').data('check-simul');
        if(dataValue !== ''){
            var $thisSimulCheckboses = $simulContainer.find('[data-check-simul=' + dataValue + ']');
            toggleCheckbox($thisSimulCheckboses, tf);
            // toggleCheckbox($checkContainer, tf, !tf);

            // 연동되는 체크박스 전체 토글 
            console.log(tf)
            if(tf)
            {
                $simulContainer.find('[data-check-simul=' + dataValue + ']').addClass('is-expand');
            }
            else if(!tf && t > 0){
                $simulContainer.find('[data-check-simul=' + dataValue + ']').removeClass('is-expand');
            } 
            else{
                if($checkboxUncheckedLength > 0){
                    $simulContainer.find('[data-check-simul=' + dataValue + ']').addClass('is-expand');
                }
                else{
                    console.log(999)
                    $simulContainer.find('[data-check-simul=' + dataValue + ']').removeClass('is-expand');
                }
            }
        }
    }
    
    // 전체동의 타입2 개별선택 
    function checkItemsType2(e){
        ++t;
        var $this = $(e.currentTarget);
        var $checkboxes = $checkboxWrap.find('input:checkbox');
        $checkboxLength = $checkboxes.length;
        $checkboxUncheckedLength = $checkboxes.not(':checked').length;

        // 전부 체크된것 : 체크 안된 갯수 == 0
        if($checkboxUncheckedLength == 0){
            toggleCheckbox($checkAll, true);
        }
        // 전부 안됐을 때 : 체크 안된 갯수 == 체크리스트 갯수
        else if($checkboxUncheckedLength == $checkboxLength){
            toggleCheckbox($checkAll, false);
        }
        // 체크 안된 갯수 > 0
        else{
            toggleCheckbox($checkAll, false);
        }

        // 동일 데이터값을 가진 체크박스 연동 
        var dataValue = $this.closest('.js-checkbox-selector02').data('check-simul');
        if(dataValue !== '' && $checkboxUncheckedLength == $checkboxLength){
            var $thisSimulCheckboses = $simulContainer.find('[data-check-simul=' + dataValue + ']');
            toggleCheckbox($thisSimulCheckboses, false);
            toggleCheckbox($checkAll, false, true);
            toggleCheckbox($checkboxWrap, false, true);
            $simulContainer.find('[data-check-simul=' + dataValue + ']').removeClass('is-expand');
        }
    }

    // 약관 전체동의하기가 있을 경우 세부 조건 전체 동의하기 토글 
    function findAgreementTermsTotal(e){
        var $this = $(e.currentTarget);
        var tf = $this.prop('checked');
        if(tf){
            $simulContainer.find('.js-checkbox-selector02').addClass('is-expand')
        }else{
            $simulContainer.find('.js-checkbox-selector02').removeClass('is-expand')
        }
    }

    // .agreement-to-terms.form-simul-mode 인 경우 헤더의 전체동의 이벤터 하단 체크박스와 연동하기
    // TBD
    function init(){
        var tf = $simulContainer.is('.agreement-to-terms');
        if(tf){
            $simulContainer.find('.header input:checkbox');
        }
    }
    init();
    
    // event handler
    $simulCheckboxes.on('click', checkDataValue);
    $checkAll.on('click', checkAllType2);
    $checkboxWrap.on('click', 'input:checkbox', checkItemsType2);
    $simulContainer.on('click', '.header input:checkbox', findAgreementTermsTotal);
}
simultaneousCheckbox();

// let checkTogether = function(){
//     var $checkTogetherWrap = $('.mode-optional');
//     var $checkTogether = $checkTogetherWrap.find('[data-check-together]');
    
//     var togetherTF;
//     $checkTogether.on('click', function(e){
//         var dataValue = $(this).data('check-together');
//         togetherTF = $(this).find('input').prop('checked'); 
        
//         $checkTogether.each(function(){
//             var temp = $(this).data('check-together');
            
//             if(temp == dataValue){
//                 $(this).find('input').prop('checked', togetherTF);
                
//                 if($(this).hasClass('js-checkbox-selector-trigger02')){
//                     var targetName = $('.js-checkbox-selector-trigger02').data('target');
//                     var $target = $('.js-checkbox-selector[data-target=' + targetName + ']');
//                     if(!togetherTF){
//                         $target.find('input:checkbox').prop({'checked':false, 'disabled':true});
//                     }else{
//                         $target.find('input:checkbox').prop({'checked':true, 'disabled':false});
//                     }
//                 }
//             }
//         });
//     });
    
//     $('.js-checkbox-selector').on('click', 'dt input:checkbox', function(){
//         var tf = $(this).prop('checked');
//         if(!tf){
//             $checkTogether.find('input').prop('checked', false);
//             $('.js-checkbox-selector').find('input:checkbox').prop({'checked':false, 'disabled':true});
//         }
//     });

//     $('.js-checkbox-selector').on('click', 'dd input:checkbox', function(){
//         var tf = $(this).prop('checked');
//         if(!tf){
//             if($('.js-checkbox-selector dd input:checkbox').not(':checked').length == $('.js-checkbox-selector dd input:checkbox').length){
//                 $checkTogether.find('input').prop('checked', false);
//                 $('.js-checkbox-selector').find('input:checkbox').prop({'checked':false, 'disabled':true});
//             }
//         }else{
//             $checkTogether.find('input').prop('checked', true)
//         }
//     });
    
// }
// checkTogether();


if($('.agreement-to-terms').length) gfn_agreementToTerms();

//Tooltip
if($('.btn-question').length){
    $('.btn-question').on('click',function(){
        $(this).next('.tooltip').fadeIn(200);
    });
}
if($('.tooltip').length){
    $('.tooltip').on('click','.btn-close',function(){
        $(this).parent('.tooltip').fadeOut(200);
    });
}

// 폰트 로딩 시간 차이로 인하여 계산이 잘못 되어 겹치는 경우 방지를 위해 추가
$(window).on('load', function(){
    $('.form-text').each(function(){
        gfn_formText.calculate($(this));
    });
});

// 내 차로 만드는 금융전략 스크립트
function wishCarStrategyInit() {
    var $section = $(".wishcar-strategy").eq(0);
    if ($section.length === 0) return;

    var $strategyProgressBar = $section.find(".strategy-progress-bar");
    // var $carMovingZone = $section.find(".car-moving-zone");
    // var $progressBarZone = $section.find(".progress-bar-zone");
    var $barMyCar = $section.find(".bar-mycar");
    var $barMyAsset = $section.find(".bar-myasset");
    var $checkboxs = $section.find("input[type=checkbox]");
    var $checkboxCar = $section.find("#toggleMyCar");
    var $checkboxAsset = $section.find("#toggleMyAsset");
    var $need = $section.find(".need");
    var $notEnough =  $section.parents(".app-content").find(".not.enough");
    var $enough = $section.parents(".app-content").find(".enough").not(".not");
    var $car = $section.find(".car-moving-zone .car");

    var price = parseInt($strategyProgressBar.data("price"));   // Wish car 시세
    var car = parseInt($strategyProgressBar.data("car"));     // My Car 자산
    var asset = parseInt($strategyProgressBar.data("asset"));   // My 금융 자산
    var car_isChecked = false;
    var asset_isChecked = false;

    if (!price) return;   // 시세가 지정되어 있지 않으면

    var need = price;
    var per = {
        car: car / price * 100,
        asset: asset / price * 100
    };

    $checkboxs.on('change', assetChange);
    setBind();
    setMessage();
    assetChange();

    function assetChange() {
        car_isChecked = $checkboxCar.is(":checked");
        asset_isChecked = $checkboxAsset.is(":checked");
        barChange();
        need = price;
        if (car_isChecked) { need -= car; }
        if (asset_isChecked) { need -= asset; }
        setMessage();
    }

    function barChange() {
        var v = 0;
        var add = 0;
        if (car_isChecked) {
            v = (per.car > 100) ? 100 : per.car;
            $barMyCar.css("width", v + "%");
            add = v;
        } else {
            $barMyCar.css("width", "0%");
        }

        if (asset_isChecked) {
            v = ((per.asset + add) > 100) ? 100 : (per.asset + add);
            $barMyAsset.css("width", v + "%");
        } else {
            $barMyAsset.css("width", "0%");
        }

        $car.css("left", v+"%");
        $car.css("transform", "scale("+(0.7 + (0.3 * v / 100))+")");
    }

    function setMessage() {
        if (need > 0) {
            $notEnough.show();
            $enough.hide();
        } else {
            $notEnough.hide();
            $enough.show();
        }
        // $need.text(need.toLocaleString() + "만원");
        $need.html('<span class="num" data-unit-after="만원">' + need.toLocaleString() + "</span>");
        $strategyProgressBar.data("need", need);
    }

    function setBind() {
        $section.find(".num.price").text(price.toLocaleString());
        $section.find(".num.car").text(car.toLocaleString());
        $section.find(".num.asset").text(asset.toLocaleString());
    }
}
$(window).on("load.wishcar", wishCarStrategyInit);

// 저축을 한다면?
function ifYouSaveInit() {
    var $section = $(".if-you-save");
    if ($section.length === 0) return;

    var $monthIncome = $section.find("input#myMonthlyIncome");
    var $saveRadios = $section.find("input[name=saveRadio]");

    var $resultCaseA = $section.find(".result-case.case-a");
    var $resultCaseB = $section.find(".result-case.case-b");
    var $resultCaseC = $section.find(".result-case.case-c");
    var $resultCaseD = $section.find(".result-case.case-d");

    function updateResult() {
        if ($monthIncome.val() == 0) {      // 월 수입금액 0원
            changeResult("D");
        } else if (getRadioValue() == 0) {  // 저축비율이 0%
            changeResult("C");
        } else {
            var need = getNeedValue();
            var totalMonths = Math.ceil(need / ($monthIncome.val().replace(",","") * (getRadioValue() / 100)));
            var y = Math.floor(totalMonths / 12);
            var m = totalMonths % 12;
            if (y >= 30) {      // 30년 이상
                changeResult("B");
            } else {
                if (y == 0) {
                    $resultCaseA.find(".y").hide();
                } else {
                    $resultCaseA.find(".y").show().find(".num").text(y);
                }
                if (m == 0) {
                    $resultCaseA.find(".m").hide();
                } else {
                    $resultCaseA.find(".m").show().find(".num").text(m);
                }
                changeResult("A");
            }
        }
    }

    function getRadioValue() {
        return parseInt($("input[name=saveRadio]:checked").val());
    }

    function getNeedValue() {
        return $(".strategy-progress-bar").data("need");
    }

    function changeResult(c) {
        $resultCaseA.hide();
        $resultCaseB.hide();
        $resultCaseC.hide();
        $resultCaseD.hide();
        if (c === "A") {
            $resultCaseA.show();
        } else if (c === "B") {
            $resultCaseB.show();
        } else if (c === "C") {
            $resultCaseC.show();
        } else if (c === "D") {
            $resultCaseD.show();
        }
    }

    $monthIncome.on("keyup.savefunc", updateResult);
    $saveRadios.on("click.savefunc", updateResult);

    updateResult();
}

// Form text 에 data-default 가 지정 되어 있을 경우
$(".kb-form .form-text input[data-default]").each(function(){
    var $input = $(this);
    var $kbForm = $input.parents(".kb-form");
    if ($input.val() == '') {
        $input.val($input.data('default'));
        $kbForm.removeClass("not-ready");
    }
    $input.on("keyup", function(){
        if ($input.data("default") != undefined && $input.val() == "") {
            $input.val($input.data("default"));
        }
    });
    $input.parents(".form-text").find(".btn-data-clear").on("click", function(e){
        $input.val($input.data("default"));
        gfn_formText.calculate($input.parents(".form-text"));
        $input.trigger("keyup.savefunc");
        e.stopPropagation();
    });
});




//DATEPICKER
$.datepicker.parseDate = function(format, value) {
    return moment(value, format).toDate();
};
$.datepicker.formatDate = function (format, value) {
    return moment(value).format(format);
};

$('#datepicker').datepicker({
    dateFormat: "yyyy.MM.DD",
    regional: 'ko',
    beforeShow: function(){
        var date = $('#datepicker').datepicker('getDate');
        calendarDateSet(date);
    }
});

var date = $('#datepicker').datepicker('getDate');
calendarDateSet(date);

var now = moment();
var today = now.format('yyyy.MM.DD');
$('.calendar-nav').on('click','button',function(){
    var cls = $(this).attr('class');
    if(cls == 'btn-text'){
        now = moment();
    }else if(cls == 'btn-prev'){
        now = now.subtract(1, 'M');
    }else if(cls == 'btn-next'){
        now = now.add(1, 'M');
    }else if(cls == 'btn-first'){
        now = now.subtract(1, 'Y');
    }else if(cls == 'btn-last'){
        now = now.add(1, 'Y');
    }
    $('#datepicker').datepicker('setDate', now.format("yyyy.MM.DD"));
    var changedDate = $('#datepicker').datepicker('getDate');
    calendarDateSet(changedDate);

});

function calendarDateSet(date){
    $('.calendar-nav').find('strong').text($.datepicker.formatDate("yyyy", date) + '.' + $.datepicker.formatDate("MM", date));
    //console.log($.datepicker.formatDate("yyyy", date) + '년 ' + $.datepicker.formatDate("MM", date) + '월')
}

//DATEPICKER [e]

//button 형 세그먼트
$('body').on('click','.btn-segmented button, .btn-segmented a',function(){
    var tagName = this.tagName.toLowerCase();
    if(tagName == 'a'){
        if(!$(this).hasClass('is-disabled')){
            $(this).addClass('is-selected').parent('li').siblings('li').find('a').removeClass('is-selected');
        }
    }else if(tagName == 'button'){
        if(!$(this).prop('disabled')){
            $(this).addClass('is-selected').parent('li').siblings('li').find('button').removeClass('is-selected');
        }
    }
});

//권유 직원 검색
var $recommendEmployees = $('.recommend-employees');
if($recommendEmployees.length){
    $recommendEmployees.find('.btn-segmented_radio').on('change','input:radio',function(){
        
        var idx = $(this).parent('li').index();        
        //$(this).addClass('is-selected').parent('li').siblings('li').find('button').removeClass('is-selected');

        var $recommendEmployeesFrom = $recommendEmployees.find('.recommend-employees-form');
        
        $recommendEmployeesFrom.children('.kb-form').hide();
        if(idx == 3){
            $recommendEmployeesFrom.find('p').hide();
        }else{
            $recommendEmployeesFrom.find('p').show();
            if(idx == 2){
                $recommendEmployeesFrom.children('.kb-form:eq(3)').show();
            }else if(idx == 1){
                $recommendEmployeesFrom.children('.kb-form:eq(2)').show();
            }else if(idx == 0){
                $recommendEmployeesFrom.children('.kb-form:eq(1)').show();
                $recommendEmployeesFrom.children('.kb-form:eq(0)').show();
            }
        }
    });
}


// swiper
$(".js-swiper").each(function() {
    var $this = $(this);
    if ($this.data('init-call')) {
        window[$this.data('init-call')] = function() {
            jsSwiperInit($this);
        }
    } else {
        jsSwiperInit($this);
    }
});

function jsSwiperInit($elem) {
    var id = new Date().getTime();
    var $jsSwiper = $elem;
    var options = $jsSwiper.data('swiper-options');
    if (typeof options === "string") {
        options = window[options];
    }
    $jsSwiper.addClass("js-swiper-"+id);
    $jsSwiper.data('swiper', new Swiper('.js-swiper-'+id, options));
}

//Page Step
var $pageStepWrap = $('.page-step-wrap');
var $pageStepSwiper = $('.page-step-swiper');
if($pageStepSwiper.length){    
    
    var pageStepSwiper = new Swiper('.page-step-swiper', {
        allowTouchMove : false,
        on: {
            init : function(swiper){                
                pageStepFn(swiper.activeIndex);
            },
            slideChangeTransitionStart: function(swiper){
                pageStepFn(swiper.activeIndex);
            }
        }        
    });

    function pageStepFn(idx){
        var activeIdx = idx;
        var tit = $pageStepSwiper.find('.swiper-slide').eq(activeIdx).find('.step-tit').text();
        var buttons = $pageStepSwiper.find('.swiper-slide').eq(activeIdx).find('.btn-area').html();
        $pageStepWrap.find('.page-step .current').text((activeIdx) + 1);
        $pageStepWrap.find('.page-step h2').attr('data-step', (activeIdx + 1) + '. ');
        $pageStepWrap.find('.page-step h2').text(tit)
        $pageStepWrap.find('.sticky-bottom .btn-area').empty().append(buttons);
    }

    $pageStepWrap
    .on('click','[data-action=prevStep]',function(){
        pageStepSwiper.slidePrev();
    })
    .on('click','[data-action=nextStep]',function(){
        pageStepSwiper.slideNext();
    });
}




// SVG Gauge Functions
function drawInsuranceGauge(selector, current) {
    var status = $(selector).parents(".report-circle").data("status");
    var colors = {
        "good": "#4dabff",
        "caution": "#ffd338",
        "short": "#d672f6"
    }
    setGauge(selector, current, 100, colors[status]);
}

function drawCreditGauge(selector, current, max) {
    setGauge(selector, current, max, "#ffcf53");
}

function drawDdayGauge(selector, current, max) {
    setGauge(selector, current, max, "#ffba53");
}

function setGauge(selector, current, max, strokeColor) {
    var current = current || 0;
    var max = max || 100;
    var strokeColor = strokeColor || "#ff0000";
    var barFg = document.querySelector(selector + " .bar-fg");
    var path = document.querySelector(barFg.getAttribute("xlink:href"));
    var barFgLength = path.getTotalLength();
    var percent = current / max;
    var startPer = 0;
    var ttl = 60;
    var tick = 0;

    if (percent >= 1) percent = 1;
    barFg.style.strokeDasharray = barFgLength;
    barFg.style.stroke = strokeColor;

    var changePer = percent - startPer;

    function draw() {
        var progress = easeOutQuad(tick / ttl);
        var per = (changePer * progress);
        var gpal = (startPer + per) * barFgLength;

        barFg.style.strokeDashoffset = barFgLength * (1 - startPer - per);

        if (tick < ttl) {
            tick++;
            requestAnimationFrame(draw);
        } else {
            startPer = percent;
        }
    }
    function easeOutQuad(x) {
        return 1 - (1 - x) * (1 - x);
    }
    draw();
}

// 캐릭터 그래프 사이즈 처리
if($('.character-graph').length > 0){
    $('.character-graph').each(function(){
        var $this = $(this);
        var $span = $this.find(".graph-area > span[data-goal]");
        var dataGoal = $span.data("goal");
        var $spanSub = $this.find(".graph-area.sub > span[data-goal]");
        var dataGoalSub = $spanSub.data("goal");

        if (dataGoal !== undefined) {
            $span.css("width", dataGoal + "%");
        }

        //비교군 있을 시
        if (dataGoalSub !== undefined) {
            $spanSub.css("width", dataGoalSub + "%");
        }

        // 캐릭터 그래프 최소사이즈
        var item = $this.find(".graph-area > span > i");
        var itemBar = item.parent();

        
        if(itemBar.width() - 8 < item.width()){
            itemBar.addClass('min-size');
            if(itemBar.width() < 10){
                itemBar.css("border", "none")
            }
        }else{
            itemBar.removeClass('min-size');
        }
    });
}

// 대시보다 상단 알림 메시지 animate
// function dashboardAlarmMessage() {
//     var msgWidth = $('.dashboard .link-bell .message > span').width();
//     $('.dashboard .link-bell .message').delay(500).animate({
//         'width': msgWidth
//     }, 1000, function() {
//         setTimeout(function() {
//             $('.dashboard .link-bell .message').animate({
//                 'width': 0
//             }, 1000);
//         }, 2000);
//     });
// }
// if($('.dashboard .link-bell').length > 0){
//     $(window).on('load.ui', dashboardAlarmMessage);
// }

//percentage-graph.type2 current-txt 위치값 제어
function currentTxtPosition(obj){
    var $obj = $(obj);
    $obj.each(function(){
        var graphWidth = parseInt($(this).find('.graph-area').css('width'));
        var targetWidth = parseInt($(this).find('.graph-area > span').css('width'));
        var currentWidth = parseInt($(this).find('.current-txt').css('width'))/2;
        var currentGap = graphWidth - targetWidth;
        if(targetWidth < currentWidth){
            $(this).find('.current-txt').css('margin-left','0');
        }else if(currentGap < currentWidth){
            $(this).find('.current-txt').css('margin-left','-'+currentWidth*2+"px");
        }else{
            $(this).find('.current-txt').css('margin-left','-'+currentWidth+"px");
        }
    })
}





//BS 조건 선택
$('.select-period').on('change','input:radio',function(){
    if($(this).parent('li').is(':last-child') && $(this).val()){
        $('.select-period').find('.period-selector').removeClass('is-disabled').find('input').prop({'readonly': false});
    }else{
        $('.select-period').find('.period-selector').addClass('is-disabled').find('input').prop({'readonly': true});
    }
});

//class만 toggle로 넣고 싶을때
$('body').on('click','button[data-toggle-class]',function(){
    var toggleName = $(this).data('toggle-class');
    $(this).toggleClass(toggleName);
})


var jsFixed = {
    init: function(){
        $('.js-fixed').each(function(){
            var top = $(this).offset().top + $(this).outerHeight();
            // 전송요구 수정
            if($(this).children('.page-step-desc').length){
                top -= $(this).find('.page-step-desc').outerHeight();
            }
            $(this).attr('data-fix',top);
        });
    },
    scroll : function(st, $this){
        if($('.js-fixed').length){
            var fixedTop = $this.data('fix');
            if(st >= fixedTop - 48){//fixed header
                $this.addClass('is-fixed');
            }else{
                $this.removeClass('is-fixed');
            }
        }
    }
};

if($('.js-fixed').length) jsFixed.init();

//Scroll 하단 체크
var jsScrollDone = {
    init: function(){
        $('.js-scroll-done').each(function(){
            $(this).addClass('scroll-done');
            var $btnSticky = $(this).find('.sticky-bottom');
            if($('body').hasScrollBar()){
                $btnSticky.find('button').prop('disabled', true);
                $btnSticky.find('a').addClass('is-disabled');
                $btnSticky.find('.btn-area').append('<button type="button" class="btn-transparent"><span>스크롤 체크</span></button>');
            }else{
                $btnSticky.find('button').prop('disabled', false);
                $btnSticky.find('a').removeClass('is-disabled');
                $btnSticky.find('.btn-area .btn-transparent').remove();
            }
        });

        $('.js-scroll-done').on('click','.btn-transparent',function(){
            modalPopup({
                title: '',
                message: "화면을 스크롤하여 전송요구서/동의서 내용을 모두 확인해 주세요.",
            });
        });
    },
    scroll : function(st, $this){
        st = Math.ceil(st) + 10;    // 수정 2021-10-25 : 하단 여백
        if (st >= $(document).outerHeight() - $this.outerHeight()) { 
            var $btnSticky = $('.js-scroll-done .sticky-bottom');
            $btnSticky.find('button').prop('disabled', false);
            $btnSticky.find('a').removeClass('is-disabled');
            $btnSticky.find('.btn-transparent').remove();
        }         
    }
};

if($('.js-scroll-done').length) jsScrollDone.init();


$(window).on('scroll',function(){
    st = $(this).scrollTop();
    jsFixed.scroll(st, $('.page-step'));
    jsScrollDone.scroll(st, $(this));
    jsScrollAction.scroll(st, $('[data-scroll-fn]'));
});


//순서 변경
if($('.order-change-list').length){
    $('.order-change-list').find('.order-change > button').on('click',function(){
        var isDisabled = $(this).parents("li").hasClass("disabled");
        if (isDisabled) return;
        var $eachList = $(this).parents('li');
        if($(this).hasClass('btn-order-next')){
            $eachList.insertAfter($eachList.next('li'));
        }else if($(this).hasClass('btn-order-prev')){
            $eachList.insertBefore($eachList.prev('li'));
        }
    });
}

//filter button 제거 (버튼 제거가 필요하다고 하면...)
// $('.filter-result').each(function(){
//     $(this).find('button span').unwrap();
// });

//동작해야하는 부분이 화면 안으로 들어왔을때 동작
var jsScrollAction = {
    scroll: function(st, $target){
        var winH = $(window).outerHeight();
        $target.each(function(){
            var fnName = $(this).data('scroll-fn');
            // console.log(st + winH >= $(this).offset().top + $(this).outerHeight())
            if (st + winH >= $(this).offset().top + $(this).outerHeight()) {                                    
                if(!$(this).hasClass('is-finished')) window[fnName]();
                $(this).addClass('is-finished');
            }
        });
    }
}
$(window).on('load',function(){
    if('[data-scroll-fn]'.length) jsScrollAction.scroll(st, $('[data-scroll-fn]'));
});

console.log("ui.js");