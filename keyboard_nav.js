/* 
 * Estrutura básica. Basic structure
 * Por favor note que #navContent, precisa ser maior que #scroller. Please note that #navContent must be greater than #scroller.
 * <div id="scroller" style="position:relative;overflow:hidden;">
 *      <div id="navContent"></div>
 * </div>
 * 
 * Como usar. How to use 
 * $(function(){
 *      $('#scroller').keyboard_nav({
 *          btnMouseRightObj: null,//Objeto que ao ser clicado navega para a direita. Object that onclick navigates to right
 *          btnMouseLeftObj: null,//Objeto que ao ser clicado navega para a esquerda. Object that onclick navigates to left
 *          btnMouseUpObj: null,//Objeto que ao ser clicado navega para cima. Object that onclick navigates to up
 *          btnMouseDownObj: null,//Objeto que ao ser clicado navega para baixo. Object that onclick navigates to down
 *          centerPageAt: null, //Objeto onde deve ser centralizada a página. Object that is centered on the page load.
 *          spollInterval: 50,//tempo para rodar o interval do efeito de rolagem. Interval time for the scroll effect
 *          spollPercent: .05//Porcentagem do tamanho da tela que deve scrollar cada vez. Percent of screen size for each scroll.
 *          onScrollCallback: function(obj,direction){}//função de callback quando for iniciado um scroll. Callback function for scroll initialize.
 *      });
 * });
 * 
 * @author ekbaumgarten Lucas Baumgarten
 * https://github.com/ekbaumgarten/keyboard_nav
 * http://facebook.com/ekbaumgarten
 * http://twitter.com/ekbaumgarten
 * 
 * 
 */
(function($){
    var settings = {};
    var intervalMouseEvent = false;
    $.fn.keyboard_nav = function(options){
        if(this.length == 0){
            return false;
        }
        if(!(this.width() < this.children().width()) || !(this.height() < this.children().height())){
            console.log('Content must be greater that parent object!');
        }
        this.css({position:'relative',overflow:'hidden'});
        settings = $.extend({}, $.fn.keyboard_nav.defaults, options);
        settings.isMobile = mobileDetect();
        $.fn.keyboard_nav.centerPage(this,settings);
        $.fn.keyboard_nav.setNavigation(this);
    };
    
    $.fn.keyboard_nav.navDirection = null;

    $.fn.keyboard_nav.centerPage = function(_scroller){
        if(!settings.centerPageAt || $(settings.centerPageAt).length === 0){
            return false;
        }
        var $scroller = $page = $(_scroller);
        if(settings.isMobile){
            $scroller = $('html,body');
            $page = $('body');
            $(_scroller).css('overflow','scroll');
        }
        var pageCenterX = $page.width()/2;
        var objectW = $(settings.centerPageAt).width();
        var objectL = $(settings.centerPageAt).offset().left;
        var pageCenterY = $page.height()/2;
        var objectH = $(settings.centerPageAt).height();
        var objectT = $(settings.centerPageAt).offset().top;
        $scroller.scrollLeft((objectW/2+objectL)-pageCenterX+$page.scrollLeft());
        $scroller.scrollTop((objectH/2+objectT)-pageCenterY+$page.scrollTop());
    };
    
    $.fn.keyboard_nav.setNavigation = function(_obj){//seta as funções de navegação
        if($(settings.btnMouseRightObj).length > 0){
            $(settings.btnMouseRightObj).on('mousedown',function(e){
                $(this).on('mouseup',function(){
                    $('.keyboard_bt_active').removeClass('keyboard_bt_active');
                    setTimeout(function(){
                        _obj.removeClass('keyboardnav-active');
                    }, 50);
                    $.fn.keyboard_nav.navDirection = null;
                    if (intervalMouseEvent !== false) {
                        clearInterval(intervalMouseEvent);
                        intervalMouseEvent = false;
                    };
                });
                e.preventDefault();
                _obj.addClass('keyboardnav-active');
                $(this).addClass('keyboard_bt_active');
                $.fn.keyboard_nav.navDirection = 'right';
                $.fn.keyboard_nav.navigate(_obj, $.fn.keyboard_nav.navDirection,true);
                if(typeof settings.onScrollCallback === 'function'){
                    settings.onScrollCallback(_obj,$.fn.keyboard_nav.navDirection);
                }
            });
        }
        if($(settings.btnMouseLeftObj).length > 0){
            $(settings.btnMouseLeftObj).on('mousedown',function(e){
                $(this).on('mouseup',function(){
                    $('.keyboard_bt_active').removeClass('keyboard_bt_active');
                    setTimeout(function(){
                        _obj.removeClass('keyboardnav-active');
                    }, 50);
                    $.fn.keyboard_nav.navDirection = null;
                    if (intervalMouseEvent !== false) {
                        clearInterval(intervalMouseEvent);
                        intervalMouseEvent = false;
                    };
                });
                e.preventDefault();
                _obj.addClass('keyboardnav-active');
                $(this).addClass('keyboard_bt_active');
                $.fn.keyboard_nav.navDirection = 'left';
                $.fn.keyboard_nav.navigate(_obj, $.fn.keyboard_nav.navDirection,true);
                if(typeof settings.onScrollCallback === 'function'){
                    settings.onScrollCallback(_obj,$.fn.keyboard_nav.navDirection);
                }
            });
        }
        if($(settings.btnMouseUpObj).length > 0){
            $(settings.btnMouseUpObj).on('mousedown',function(e){
                $(this).on('mouseup',function(){
                    $('.keyboard_bt_active').removeClass('keyboard_bt_active');
                    setTimeout(function(){
                        _obj.removeClass('keyboardnav-active');
                    }, 50);
                    $.fn.keyboard_nav.navDirection = null;
                    if (intervalMouseEvent !== false) {
                        clearInterval(intervalMouseEvent);
                        intervalMouseEvent = false;
                    };
                });
                e.preventDefault();
                _obj.addClass('keyboardnav-active');
                $(this).addClass('keyboard_bt_active');
                $.fn.keyboard_nav.navDirection = 'up';
                $.fn.keyboard_nav.navigate(_obj, $.fn.keyboard_nav.navDirection,true);
                if(typeof settings.onScrollCallback === 'function'){
                    settings.onScrollCallback(_obj,$.fn.keyboard_nav.navDirection);
                }
            });
        }   
        if($(settings.btnMouseDownObj).length > 0){
            $(settings.btnMouseDownObj).on('mousedown',function(e){
                $(this).on('mouseup',function(){
                    $('.keyboard_bt_active').removeClass('keyboard_bt_active');
                    setTimeout(function(){
                        _obj.removeClass('keyboardnav-active');
                    }, 50);
                    $.fn.keyboard_nav.navDirection = null;
                    if (intervalMouseEvent !== false) {
                        clearInterval(intervalMouseEvent);
                        intervalMouseEvent = false;
                    };
                });
                e.preventDefault();
                _obj.addClass('keyboardnav-active');
                $(this).addClass('keyboard_bt_active');
                $.fn.keyboard_nav.navDirection = 'down';
                $.fn.keyboard_nav.navigate(_obj, $.fn.keyboard_nav.navDirection,true);
                if(typeof settings.onScrollCallback === 'function'){
                    settings.onScrollCallback(_obj,$.fn.keyboard_nav.navDirection);
                }
            });
        }
        $(document).on('keydown',function(e){
            $(this).on('keyup',function(){
                $('.keyboard_bt_active').removeClass('keyboard_bt_active');
                setTimeout(function(){
                    _obj.removeClass('keyboardnav-active');
                }, 50);
                $.fn.keyboard_nav.navDirection = null;
            });
            var key = (e.keyCode)?e.keyCode:e.which;
            if(key === 37 || key === 38 || key === 39 || key === 40){
                e.preventDefault();
                _obj.addClass('keyboardnav-active');
                var direction = null;
                if(key === 39){
                    direction = 'right';
                }
                if(key === 37){
                    direction = 'left';
                }
                if(key === 38){
                    direction = 'up';
                }
                if(key === 40){
                    direction = 'down';
                }
                if (intervalMouseEvent !== false) {
                    clearInterval(intervalMouseEvent);
                    intervalMouseEvent = false;
                };
                $.fn.keyboard_nav.navigate(_obj, direction,false);
                if($.fn.keyboard_nav.navDirection != direction){
                    $.fn.keyboard_nav.navDirection = direction;
                    if(typeof settings.onScrollCallback === 'function'){
                        settings.onScrollCallback(_obj,$.fn.keyboard_nav.navDirection);
                    }
                }
            }
        });
    }
    
    $.fn.keyboard_nav.navigate = function(_obj,direction,mouse){
        if(typeof mouse === 'undefined'){
            mouse = false;
        }
        if(_obj.hasClass('keyboardnav-active') && direction != null){
            var objWidth = _obj.width();
            var objHeight = _obj.height();
            var objLeft = _obj.scrollLeft();
            var objTop = _obj.scrollTop();
            if(mouse){
                intervalMouseEvent = false;
                intervalMouseEvent = setInterval(function(){
                    $.fn.keyboard_nav.navigate(_obj, direction);
                },$.fn.keyboard_nav.defaults.spollInterval);
            }
            switch(direction){
                case 'right':
                    _obj.scrollLeft(objLeft+(objWidth*(settings.spollPercent)));
                    if (settings.btnMouseRightObj && settings.btnMouseRightObj.length > 0) {
                        settings.btnMouseRightObj.addClass('keyboard_bt_active');
                    };
                    break;
                case 'left':
                    _obj.scrollLeft(objLeft-(objWidth*(settings.spollPercent)));
                    if(settings.btnMouseLeftObj && settings.btnMouseLeftObj.length > 0){
                        settings.btnMouseLeftObj.addClass('keyboard_bt_active');
                    }
                    break;
                case 'up':
                    _obj.scrollTop(objTop-(objHeight*(settings.spollPercent)));
                    if(settings.btnMouseUpObj && settings.btnMouseUpObj.length > 0){
                        settings.btnMouseUpObj.addClass('keyboard_bt_active');
                    }
                    break;
                case 'down':
                    _obj.scrollTop(objTop+(objHeight*(settings.spollPercent)));
                    if(settings.btnMouseDownObj && settings.btnMouseDownObj.length > 0){
                        settings.btnMouseDownObj.addClass('keyboard_bt_active');
                    }
                    break;
            }
        }
    }
    
    $.fn.keyboard_nav.defaults = {
        btnMouseRightObj: null,//Objeto que ao ser clicado navega para a direita. Object that onclick navigates to right
        btnMouseLeftObj: null,//Objeto que ao ser clicado navega para a esquerda. Object that onclick navigates to left
        btnMouseUpObj: null,//Objeto que ao ser clicado navega para cima. Object that onclick navigates to up
        btnMouseDownObj: null,//Objeto que ao ser clicado navega para baixo. Object that onclick navigates to down
        centerPageAt: null, //Objeto onde deve ser centralizada a página. Object that is centered on the page load.
        spollInterval: 100,//tempo para rodar o interval do efeito de rolagem. Interval time for the scroll effect
        spollPercent: .05,//Porcentagem do tamanho da tela que deve scrollar cada vez. Percent of screen size for each scroll.
        onScrollCallback: function(obj,direction){}//função de callback quando for iniciado um scroll. Callback function for scroll initialize.
    };
    
    function mobileDetect() { 
        var navegador = navigator.userAgent;
        if( navegador.match(/Android/i)
            || navegador.match(/webOS/i)
            || navegador.match(/iPhone/i)
            || navegador.match(/iPad/i)
            || navegador.match(/iPod/i)
            || navegador.match(/BlackBerry/i)
            || navegador.match(/Windows Phone/i)
        ){
            return true;
        }
        else {
            return false;
        }
    }
}(jQuery));