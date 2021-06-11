$(function(){
	// $('#root_tree').on('click', 'a', function (e) {
	// 	if (!e.ctrlKey) { //ctrlKey
	// 		e.preventDefault();
	// 		var href = $(this).attr('href');
	// 		if (href != 'javascript:;') {
	// 			$('#viewArea').find('iframe').attr('src', href);
	// 			$('#url').val(href);
	// 		}
	// 	}
	// });
	
	//filter
	$('#filter').treeListFilter('#root_tree', 200);

	$('#url').on('keypress', function (e) {
		if (e.keyCode == '13') {
			var url = $(this).val();
			$('#root_tree').find('a').each(function () {
				var href = $(this).attr('href');
				if (href == url) {
					$(this).click();
				}
			});
		}
	});    

	// $('#root_tree li').each(function () {
	// 	// var comment = $(this).children('dl').find('dd').length;
	// 	// if (comment > 0) {
	// 	// 	$(this).append('<span class="view-comment"><i class="fa fa-plus-circle" aria-hidden="true"><span>Modify</span></i></span>');
	// 	// 	$('.view-comment').bind('click', function () {
	// 	// 		$(this).hide().prev('dl').slideDown();
	// 	// 	});
	// 	// }
	// 	var date = $(this).data('date');
	// 	console.log(date)
	// 	if(date != undefined && date == '') $(this).append('<span class="date">' + date + '</span>');
	// });
	$('#root_tree a').each(function () {
		var $this = $(this);
		var url = $this.attr('href');
		var date = $(this).parent('li').data('date');
		var status = $(this).parent('li').attr('class');

		if(url != '' && url.indexOf('javascript') < 0 && url != '#'){
			if(url.indexOf('_layered.html#') >= 0){
				var address = url.split('#');			
				var pageID = address[address.length - 1];
			}else{
				var address = url.split('/');			
				var pageID = address[address.length - 1].replace('.html','');				
			}
			$(this).append(' [' + pageID.toUpperCase() + ']');
			if(date != undefined && date != '' && (status == 'dev' || status == 'modified')) $(this).prepend('(' + date + ') ');			
			$(this).attr('target','_blank');
		}	
		
		if ($this.next('ul').length) {		
			if (url == 'javascript:;' || url == '') {
				$this.addClass('close');
				$this.on('click', function () {
					var $list = $this.next('ul');
					if (!$list.is(':visible')) {
						$list.slideDown();
						$this.removeClass('open').addClass('close');
					} else {
						$list.slideUp();
						$this.removeClass('close').addClass('open');
					}
				});
			} else {
				$this.attr('title', 'Ctrl + Click : New Window');
			}
		}
	});

	// $('.device-group').on('click','button',function(){
	// 	var width = $(this).attr('data-x');
	// 	var height = $(this).attr('data-y');
	// 	if($('.macos').length){
	// 		width = $(this).attr('data-x') - 17;
	// 		height = $(this).attr('data-y') - 17;
	// 	}

	// 	$('.view-area').find('span').remove();
	// 	$('.view-area').css({'width':width+'px','height':height+'px'}).append('<span class="x">' + width + '</span><span class="y">' + height + '</span>');
	// });
});