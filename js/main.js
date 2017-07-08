jQuery.extend(jQuery.browser,{SafariMobile : navigator.userAgent.toLowerCase().match(/iP(hone|ad)/i) });
jQuery.fn.cleanWhitespace = function() {
    this.contents().each(function(){
        if(this.nodeType == 3){
            $(this).remove();
        }
    });
}

var thumbsAreLoaded=true;
var thumbsLoadTimer=false
var THUMBS = {
    thumbWidth: 148,
    thumbHeight: 148,
    
    checkLoaded:function(){
        thumbsAreLoaded=true;
        $('.thumb-item img').each(function(){
            if(thumbsAreLoaded && !$(this).attr('complete')){
                thumbsAreLoaded=false;
            }else if($(this).attr('complete')){
                $(this).attr({'isLoaded':'1','isLandscape' : (($(this).height() >= $(this).width()) ? 0 : 1 )});
            }
        });
        if(!thumbsAreLoaded){
            thumbsLoadTimer = setTimeout('THUMBS.checkLoaded()',150);
        }else{
            clearTimeout(thumbsLoadTimer);
            thumbsLoadTimer=false;
            $(window).resize(function(){THUMBS.fixSizes();});
            THUMBS.fixSizes(true);              
        }
    },
    
    fixSizes:function(){
        $('.thumb-item').each(function(){
            var img=$(this).find('img:first');
            if($(img).attr('isLandscape')==1){
                $(img).css({'width' : THUMBS.thumbWidth + 'px','height' : 'auto'});
                if($(img).height() < THUMBS.thumbHeight){ $(img).css({'position' : 'absolute','top' : '50%', 'left' : 0, 'margin-top' :  (0 - parseInt( ($(img).height() / 2) ) ) + 'px'}); }
            }
            if($(img).attr('isLandscape')==1 && $(img).height() > THUMBS.thumbHeight){ $(img).css({'width' : 'auto','height' : THUMBS.thumbHeight + 'px'}); }
            if($(img).attr('isLandscape')==0){ $(img).css({'width' : 'auto','height' : THUMBS.thumbHeight + 'px'}); }
            if($(img).attr('isLandscape')==0 && $(img).width() > THUMBS.thumbWidth){ 
                $(img).css({'width' : THUMBS.thumbWidth + 'px','height' : 'auto'}); 
                if($(img).height() < THUMBS.thumbHeight){ $(img).css({'position' : 'absolute','top' : '50%', 'margin-top' :  (0 - parseInt( ($(img).height() / 2) ) ) + 'px'}); }
            }
        });
        var wHeight=((window.innerHeigh) ? window.innerHeight : document.documentElement.clientHeight);
            var cHeight= ((wHeight > 580) ? (wHeight-160) : 420);
            $('.content').height(cHeight);
            $('.content').css({'overflow':'auto'});
        
    }
}

var pictureLoadTimes=false;
var pictureMaxWidth = 1100;
var pictureMinWidth = 980;
var pictureMaxHeight= 850;
var pictureMinHeight= 420;
var winViewModus='normal';
var picSettings=Array();

    picSettings['normal'] = Array();
        picSettings['normal']['maxWidth'] = 1100;
        picSettings['normal']['minWidth'] = 980;
        picSettings['normal']['maxHeight'] = 850;
        picSettings['normal']['minHeight'] = 420;
    picSettings['portrait'] = Array();
        picSettings['portrait']['maxWidth'] = 728;
        picSettings['portrait']['minWidth'] = 728;
        picSettings['portrait']['maxHeight'] = 630;
        picSettings['portrait']['minHeight'] = 420; 
var PICTURE = {
    checkLoaded : function(){
        $('.picture-inner').css({'width' : $('.content').width(true) + 'px', 'height' : ($('.content').height() - 31 )+ 'px','overflow' : 'hidden'});
        if($('#picture').attr('complete')){
            PICTURE.fixAfterLoad();
        }else{
            pictureLoadTimes=setTimeout('PICTURE.checkLoaded()',350);
        }
    },
    fixAfterLoad : function(){
        $('.picture-container').cleanWhitespace();
        $('#loading').css({'display':'none'});
        $('#picture').css({'visibility' :'visible'});
        $('#loading').remove();             
        clearTimeout(pictureLoadTimes);
        pictureLoadTimes=false;
        $('#picture').attr({'isLoaded' : 1, 'isLandscape' : (($('#picture').height() < $('#picture').width()) ? 1 : 0), 'rel' : ($('#picture').width() / $('#picture').height())});
        $(window).resize(function(){PICTURE.fixSizes();});
        PICTURE.fixSizes();
    },
    fixSizes : function(){
        if(!$.browser.SafariMobile || window.orientation!=0){
            winViewModus='normal';
        }else{
            winViewModus='portrait';
        }
        pictureMaxWidth = picSettings[winViewModus]['maxWidth'];
        pictureMinWidth = picSettings[winViewModus]['minWidth'];
        pictureMaxHeight= picSettings[winViewModus]['maxHeight'];
        pictureMinHeight= picSettings[winViewModus]['minHeight'];
        
        if(($(window).width()-40) > pictureMaxWidth){
            $('.wrapper').css({'width' : pictureMaxWidth + 'px'});
        } else if (($(window).width()-40) >  pictureMinWidth ){
            $('.wrapper').css({'width' : ($(window).width()-40) + 'px'});
        } else {
            $('.wrapper').css({'width' : pictureMinWidth + 'px'});
        }
        $('.content').css({'overflow' : 'hidden'});
        
        
        $('.picture-inner').css({'width' : $('.content').width(true) + 'px', 'height' : ($('.content').height() - 31 )+ 'px','overflow' : 'hidden'});
        $('#picture').css({'position' : '','top' : '','left' : '','width' : '', 'margin' : '' });
        
        if($('#picture').attr('isLoaded')){
            if($('#picture').attr('isLandscape')!=1){ 
                $('#picture').css({'width' : '', 'height' : $('.picture-inner').height() + 'px'});  
            }
            if($('#picture').width() > $('.picture-inner').width() || $('#picture').attr('isLandscape')==1){ 
                $('#picture').css({'height' : '', 'width' : $('.picture-inner').width() + 'px'}); 
            }
            if( ($('#picture').height() >  $('.picture-inner').height() && !$('#picture').height() > pictureMaxHeight) || ($('#picture').height() > pictureMinHeight && $('#picture').height() > $('.picture-inner').height())){
                $('#picture').css({'width' : '', 'height' : $('.picture-inner').height() + 'px'}); 
            }else if($('#picture').height() > pictureMaxHeight){
                $('#picture').css({'width' : '', 'height' : pictureMaxHeight + 'px'}); 
            }
            if($('#picture').width() != ($('#picture').height() * $('#picture').attr('rel'))){
                $('#picture').css({'width' : parseInt($('#picture').height() * $('#picture').attr('rel')) + 'px'}); 
            }
            
            PICTURE.fixPosition();
        }else{
            PICTURE.checkLoaded();
        }
    },
    fixPosition : function(){
        if($('#picture').height() < $('.picture-inner').height()){
            $('#picture').css({'position' : 'absolute','top' : '50%','left' : '50%', 'margin-top' : ( 0 - parseInt( $('#picture').height() / 2) ) + 'px', 'margin-left' : (0 - ($('#picture').width() / 2)) + 'px'});
        }
    }

}


$(function(){
    $('.navi ul li').find('ul').each(function(){
        $(this).parent().addClass('has-children');
    });
    $('.navi ul').find('li:last').addClass('last');
    if($.browser.opera || $.browser.SafariMobile){
        $(window).resize(function(){
            var wHeight=((window.innerHeigh) ? window.innerHeight : document.documentElement.clientHeight);
            var cHeight= ((wHeight > 580) ? (wHeight-160) : 420);
            $('.content').height(cHeight);
            $('.content').css({'overflow':'auto'});
        });
    }
    if($('.thumb-container').length){
        THUMBS.checkLoaded();
    }
    if($('.picture-container').length){
        $('.inner').addClass('fullWidth');
        PICTURE.checkLoaded();
    }
    $('.col-2-exhibitions .right-col').find('.block:last').addClass('last');
    if($('.col-3-contact').length){
        $('.inner').addClass('fullWidth');
    }
});


var myContentScroll;
var myBodyScroll;
function iScrollLoaded() {
    $('BODY').attr('id','mainBody');
    
    $('.content .inner:first').attr('id','mainContent');
    $('.content .inner:first').css({'overflow':'auto'});
    
    //document.addEventListener('touchmove', function(e){ e.preventDefault(); });
        //myBodyScroll = new iScroll('mainBody');
        //setInerval(function () { myBodyScroll.refresh(); }, 150);
    myContentScroll = new iScroll('mainContent');
    setInerval(function () { myContentScroll.refresh(); }, 50);
}

function fixColImageWidth(obj_class,act,single){
    if(!single){
        if($(obj_class).hasClass('manual-col-split')){
            $(obj_class).find('div.new-col').each(function(col_idx,col_this){
                $(col_this).find('img').each(function(img_idx,img_this){
                    if(act && $(img_this).attr('origWidth')){
                        $(img_this).css({'width' : $(img_this).attr('origWidth') + 'px','height' : $(img_this).attr('origHeight') + 'px'});
                    }else if($(img_this).width() > $(col_this).width()){
                        $(img_this).attr('origWidth',$(img_this).width());
                        $(img_this).attr('origHeight',$(img_this).height());
                        $(img_this).css({'width' : $(col_this).width() + 'px','height' : 'auto'});
                    }
                });
            });
        }else if($(obj_class).hasClass('dynamic-col-split')){
            $(obj_class).find('div.dyn-col').each(function(col_idx,col_this){
                $(col_this).find('img').each(function(img_idx,img_this){
                    if(act && $(img_this).attr('origWidth')){
                        $(img_this).css({'width' : $(img_this).attr('origWidth') + 'px','height' : $(img_this).attr('origHeight') + 'px'});
                    }else if($(img_this).width() > $(col_this).width()){
                        $(img_this).attr('origWidth',$(img_this).width());
                        $(img_this).attr('origHeight',$(img_this).height());
                        $(img_this).css({'width' : $(col_this).width() + 'px','height' : 'auto'});
                    }
                });
            });
        }
    }else{
        $(obj_class).each(function(col_idx,col_this){
            $(col_this).find('img').each(function(img_idx,img_this){
                if(act && $(img_this).attr('origWidth')){
                    $(img_this).css({'width' : $(img_this).attr('origWidth') + 'px','height' : $(img_this).attr('origHeight') + 'px'});
                }else if($(img_this).width() > $(col_this).width()){
                    $(img_this).attr('origWidth',$(img_this).width());
                    $(img_this).attr('origHeight',$(img_this).height());
                    $(img_this).css({'width' : $(col_this).width() + 'px','height' : 'auto'});
                }
            });
        });
    }
    
}
function fixColWidth(act){
    var pContWidth=$('.m-col').width();
        
    if(act){
        if($('.dyn-col').length){
            var xWidth=((pContWidth - ( parseInt($('.dyn-col:last').css('paddingLeft')) * ($('.dyn-col').length - 1))) / $('.dyn-col').length);
            $('.dyn-col').each(function(idx,col){           
                $(col).css({'width' : xWidth + 'px'});
            });
        }else if($('.new-col').length){
            var xWidth=((pContWidth - ( parseInt($('.new-col:first').css('marginRight')) * ($('.new-col').length - 1))) / $('.new-col').length);
            $('.new-col').each(function(idx,col){           
                $(col).css({'width' : xWidth + 'px'});
            });
        }
        fixColImageWidth('.m-col',false);
    }else{
        if($('.dyn-col').length){
            var xWidth=((pContWidth - ( parseInt($('.dyn-col:last').css('paddingLeft')) * ($('.dyn-col').length - 1))) / $('.dyn-col').length);
            $('.dyn-col').each(function(idx,col){           
                $(col).css({'width' : xWidth + 'px'});
            });
        }else if($('.new-col').length){
            var xWidth=((pContWidth - ( parseInt($('.new-col:first').css('marginRight')) * ($('.new-col').length - 1))) / $('.new-col').length);
            $('.new-col').each(function(idx,col){           
                $(col).css({'width' : xWidth + 'px'});
            });
        }
        fixColImageWidth('.m-col',true);
    }
}
function updateOrientation(){
    var orientation=window.orientation;
    if(orientation==0){
        $('.logo').find('img:first').attr('src','/images/vivian_maier_logo_portrait.gif');
        if($('.col-3-book').length){
             if(!$('.col-3-book').attr('portrait')){
                $('.col-3-book').attr('portrait',1);
                $('.col-3-book .left-col').find('img:first').addClass('alignleft')
                        .after('<span class="img-float">' + $('.col-3-book .middle-col').html() + '</span>');               
             }
            $('.img-float').css({'display' : 'block'});
        }
        if($('.col-2').length || $('.col-3').length){
            fixColWidth(true);
        }
        fixColImageWidth('.left-col .txt-block',false,true);
    }else{
        $('.logo').find('img:first').attr('src','/images/vivian_maier_logo.gif');
        if($('.col-3-book').length){
            $('.img-float').css({'display' : 'none'});
        }
        if($('.col-2').length || $('.col-3').length){
            fixColWidth(false);
        }
        fixColImageWidth('.left-col .txt-block',true,true);
    }
    
    /*if(orientation==0){
        
    }else{
        if($('#iAppleMetaViewPortTag').attr('content').indexOf('0.75',0)!=-1){
            $('#iAppleMetaViewPortTag').attr('content','width=device-width, initial-scale=1.33, maximum-scale=1.33');
        }else{
            $('#iAppleMetaViewPortTag').attr('content','width=device-width, initial-scale=1.0, maximum-scale=1.0');
        }
    }*/
    /*var orientation=window.orientation;
    switch(orientation) {
        case 0:
            $("body > div").css("-webkit-transform", "rotate(90deg)");
            break;
        case 90:
            $("body > div").css("-webkit-transform","");
            break;
        case -90:
            $("body > div").css("-webkit-transform","");
            break;
    }*/

}
if($.browser.SafariMobile){
    window.onorientationchange=updateOrientation;
    $(function(){
        updateOrientation();
    });
    document.addEventListener('DOMContentLoaded', iScrollLoaded);
}