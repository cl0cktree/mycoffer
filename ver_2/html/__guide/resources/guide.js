var entityMap = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;' }; 

var escapeHtml = function(string) { 
    return String(string).replace(/[&<>"'`=\/]/g, function (s) { 
        return entityMap[s]; 
    }); 
}

//Code Change
$('.box .flex-dl > dd').not('.guide-description')
.each(function(){
    var desc = $(this).data('description');
    if(desc) $(this).prepend('<p class="g-desc">' + desc + '</p>');
    var $iframe = $(this).find('iframe');
    var $code = $(this).siblings('dt').find('code');            
    if(!$iframe.length){                
        var sample = escapeHtml(String($(this).html()));
        $code.append(sample);
    }else{
        var src = $iframe.attr('src');
        var link = '<a href="' + src + '" target="_blank">소스 바로 가기</a>';
        $code.append(link);
    }
})
.resizable({
    maxWidth: 768, //galaxy fold open
    minWidth: 320 //galaxy fold front
});

$('.box').on('click','.btn-view-source',function(){
    $(this).toggleClass('is-active');
});

$('.box:not(.fold)').find('.flex-dl > dt').prepend('<button class="btn-solid_form btn-view-source"><span></span></button>');
