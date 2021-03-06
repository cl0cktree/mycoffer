(function($, window, document) {

    "use strict";
    
    $.fn.modalPopup = function(parameters) {
        var $allModules = (typeof this === "function") ? $(window) : $(this);
    
        var query = arguments[0];
        var methodInvoked = (typeof query == 'string');
        var queryArguments = [].slice.call(arguments, 1);
    
        var returnedValue;
    
        $allModules.each(function(){
            var settings = ($.isPlainObject(parameters)) 
                ? $.extend(true, {}, $.fn.modalPopup.settings, parameters) 
                : $.extend({}, $.fn.modalPopup.settings);
    
            var namespace = settings.namespace;
    
            var eventNamespace = '.' + namespace;
            var moduleNamespace = 'module-' + namespace;
    
            var selector = settings.selector;
    
            var $module = $(this);
            var $body = $("body");
            var $dimm;
            var $wrap = $module;
            
            if($wrap.find('[data-action=close]').length){
                $wrap.find('[data-action=close]').addClass('cancel').removeAttr('data-action');
            }
            var $btnOk = $module.find(selector.buttonOk);
            var $btnCancel = $module.find(selector.buttonCancel);
    
            var instance = $module.data(moduleNamespace);
    
            var element = this;
            var module;
    
            module = {
                initialize: function() {
                    //if(!$module.prev('.dim').length) $module.before('<div class="dim" style="z-index:' + (layeredLevel - 1) + ';display:none;"></div>');
                    
                    module.bind.events();
                    module.instantiate();
                },
    
                instantiate: function() {
                    instance = module;
                    $module.data(moduleNamespace, module);
                },
    
                destroy: function() {
                    $module.removeData(moduleNamespace).off(eventNamespace);
                    $dimm.off(eventNamespace);
                    $btnOk.off(eventNamespace);
                    $btnCancel.off(eventNamespace);
                    if (settings.autoDestroy) {
                        $module.remove();
                        $dimm.remove();
                    }
                },
    
                bind: {
                    events: function() {
                        //$dimm.on('click' + eventNamespace, module.close);
                        // $dimm.on('click' + eventNamespace, function(e) {
                        // 	e.stopPropagation();
                        // 	module.close();
                        // });
                        $btnOk.on('click' + eventNamespace, module.event.clickOk);
                        $btnCancel.on('click' + eventNamespace, module.event.clickCancel);
                    }
                },
    
                event: {
                    clickOk: function() {
                        settings.onOk.call(this);
                        module.close();
                    },
                    clickCancel: function() {
                        settings.onCancel.call(this);
                        module.close();
                    }
                },
    
                open: function() {
                    gfn_body.hold(true);
                    
                    if(!settings.autoDestroy){
                        if(!$module.prev('.dim').length) $module.before('<div class="dim" style="z-index:' + (layeredLevel - 1) + ';"></div>');                    
                        $wrap.addClass("is-active").css('z-index', layeredLevel);                        
                    }else{
                        if(!$module.prev('.dim').length) $module.before('<div class="dim" style="z-index:999999;"></div>');                    
                        $wrap.addClass("is-active").css('z-index', 1000000);
                    }
                    $dimm = $module.prev('.dim');

                    $module.prev('.dim').fadeIn(settings.duration);
                    $wrap.attr('tabindex','0');
                    $wrap.fadeIn(settings.duration,function(){
                        $(this).focus();
                    });                    
                    //focusTrap($wrap);

                    layeredLevel = layeredLevel + 10;
                },
    
                close: function() {                                  
                    gfn_body.hold(false);
                    $module.prev('.dim').fadeOut(settings.duration,function(){
                        $(this).remove();
                        focusA11Y.back();
                    });
                    $wrap.addClass('modal-out');
                    $wrap.one('animationend',function(){
                        if($wrap.hasClass('modal-out')) $wrap.removeClass('is-active is-expanded modal-out').removeAttr('style');
                        if (settings.autoDestroy) {
                            module.destroy();
                        }
                    });
                },
    
                invoke: function(query, passedArguments, context) {
                    var object = instance;
                    var maxDepth;
                    var found;
                    var response;
    
                    passedArguments = passedArguments || queryArguments;
                    context = element || context;
    
                    if (typeof query == 'string' && object !== undefined) {
                        query = query.split(/[\. ]/);
                        maxDepth = query.length - 1;
                        $.each(query, function(depth, value) {
                            var camelCaseValue = (depth != maxDepth)
                                ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                                : query;
    
                            if ($.isPlainObject(object[camelCaseValue]) && (depth != maxDepth)) {
                                object = object[camelCaseValue];
                            } else if (object[camelCaseValue] !== undefined) {
                                found = object[camelCaseValue];
                                return false;
                            } else if ($.isPlainObject(object[value]) && (depth != maxDepth)) {
                                object = object[value];
                            } else if (object[value] !== undefined) {
                                found = object[value];
                                return false;
                            } else {
                                return false;
                            }
                        });
                    }
                    if (typeof found === "function") {
                        response = found.apply(context, passedArguments);
                    } else if (found !== undefined) {
                        response = found;
                    }
                    if (Array.isArray(returnedValue)) {
                        returnedValue.push(response);
                    } else if (returnedValue !== undefined) {
                        returnedValue = [returnedValue, response];
                    } else if (response !== undefined) {
                        returnedValue = response;
                    }
                    return found;
                }
            };
    
            if (methodInvoked) {
                if (instance === undefined) {
                    module.initialize();
                }
                module.invoke(query);
            } else {
                if (instance !== undefined) {
                    instance.invoke('destroy');
                }
                module.initialize();
            }
    
        });
        return (returnedValue !== undefined) ? returnedValue : this;
    };
    
    $.fn.modalPopup.settings = {
        name: 'ModalPopup',
        namespace: 'modalpopup',
        selector: {
            buttonOk:     '.btn-area button.ok',
            buttonCancel: '.btn-area button.cancel'
        },
        onOk: function() {},
        onCancel: function() {},
        autoDestroy: false,
        duration: 300,
        commonUse : ''  //????????????(?????? ?????? ?????? ??????)
    }
    
    var modalPopupIdx = 0;
    
    function modalPopup(parameters) {
        var defaultSettings = {
            title: "??????",
            message: "?????? ?????????",
            type: "alert",	// alert , confirm
            target: '',
            textOkButton: "??????",
            textCancelButton: "??????",
            onOk: undefined,
            commonUse : ''
        }
    
        var settings = ($.isPlainObject(parameters))
            ? $.extend(true, {}, defaultSettings, parameters)
            : $.extend({}, defaultSettings);
    
        modalPopupIdx++;
    
        var id = "MD" + modalPopupIdx;
        var zIdex = layeredLevel;
        var html = '';
        // html += `	<div class="modal-popup" id="${id}">`;
        // html += `		<div class="modal-popup-dimm"></div>`;
        // html += `		<div class="modal-popup-container">`;
        // html += `			<div class="popup-wrap">`;
        // html += `				<div class="popup-header">`;
        // html += `					<strong class="title">${settings.title}</strong>`;
        // html += `				</div>`;
        // html += `				<div class="popup-body">`;
        // html += `					<p class="static">`;
        // html += `						${settings.message}`;
        // html += `					</p>`;
        // html += `				</div>`;
        // html += `				<div class="popup-button">`;
        // if (settings.type === "confirm") {
        // 	html += `					<button class="cancel" type="button">${settings.textCancelButton}</button>`;
        // }
        // html += `					<button class="ok" type="button">${settings.textOkButton}</button>`;
        // html += `				</div>`;
        // html += `			</div>`;
        // html += `		</div>`;
        // html += `	</div>`;
        if(settings.commonUse != ''){
            html += `	<div class="modal" data-layered-name="${id}" id="${id}" data-common-use="${settings.commonUse}" tabindex="0">`;
        }else{
            html += `	<div class="modal" data-layered-name="${id}" id="${id}" tabindex="0">`;
        }        
        if (settings.title != "") {
            html += `		<div class="modal_header">`;
            html += `			<strong class="tit">${settings.title}</strong>`;
            html += `		</div>`;
        }
        html += `		<div class="modal_contents">`;
        html += `			${settings.message}`;
        html += `		</div>`;
        html += `		<div class="modal_buttons btn-area">`;
        if (settings.type === "confirm") {
            html += `					<button class="btn-solid gray cancel"><span>${settings.textCancelButton}</span></button>`;
        }        
        if ($.trim(settings.target).length > 0) {
            html += `					<button class="btn-solid ok" title="${settings.target}"><span>${settings.textOkButton}</span></button>`;
        }else{
            html += `			<button class="btn-solid ok"><span>${settings.textOkButton}</span></button>`;
        }
        html += `		</div>`;
        html += `	</div>`;
    
        $(".app").append(html);
    
        var $id = $("#"+id);
        var opts = {};
        opts.autoDestroy = true;
        
        if (typeof settings.onOk === "function") {
            opts.onOk = settings.onOk;
        }
        if (typeof settings.onCancel === "function") {
            opts.onCancel = settings.onCancel;            
        }
        
        $id.modalPopup(opts);
        $id.modalPopup("open");
        $id.focus();

        //Ntm Log
        var name = id;
        var logTitle = $id.find('[class*=_header]').text();
        var logContent = $id.find('[class*=_content]').text();

        
        
        try {
            Ntm.Event.fireUserDefined('popup',{ccMapId : name, ccMapName: logTitle, pageName: logContent});
        } catch(excption_var){
            //console.log('Ntm ?????? ??????',name, logTitle, logContent);
        }
    }
    
    window.modalPopup = modalPopup;
    
    })(jQuery, window, document);
    