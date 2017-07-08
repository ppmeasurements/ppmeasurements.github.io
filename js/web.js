jQuery(document).ready(function() {
	$("a.example4").fancybox({
		'opacity'		: true,
		'overlayShow'	: true,
		'titlePostion'	: 'inside',
		'transitionIn'	: 'elastic',
		'transitionOut'	: 'none',
		'onComplete'		: function() {
			$("#fancybox-wrap").hover(function() {
				$("#fancybox-title").show();
			}, function() {
				$("#fancybox-title").hide();
			});
		}
	});

	$("a.group_over").fancybox({
		'transitionIn'		: 'none',
		'transitionOut'		: 'none',
		'titlePosition' 	: 'over',
		'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
			return '<span id="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
		},
		'onComplete'		: function() {
			$("#fancybox-wrap").hover(function() {
				$("#fancybox-title").show();
			}, function() {
				$("#fancybox-title").hide();
			});
		}
	});

	$("a.montage").fancybox({
		'transitionIn'		: 'elastic',
		'transitionOut'		: 'fade',
		'titlePosition' 	: 'over',
		'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
			return '<span id="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
		},
		'onComplete'		: function() {
			$("#fancybox-wrap").hover(function() {
				$("#fancybox-title").show();
			}, function() {
				$("#fancybox-title").hide();
			});
		}
	});

	/* modified http://daringfireball.net/misc/2009/12/user_guide_demos */
	$("a.video").fancybox({
		'opacity'		: true,
		'overlayShow'	: true,
		'transitionIn'	: 'elastic',
		'transitionOut'	: 'none',
		'titlePosition' : 'inside',
	    onComplete	: function() {
	    	var done = 0;
	    	$('#fancybox-img').addClass('swap-video controls noborder middle-vertical pixel-tweak'),
	    	$('#fancybox-img').click(function(){
				if (Modernizr.video) {
					var codecs = {'webm':'video/webm', 'mp4':'video/mp4', 'ogv':'video/ogv', 'm4v':'video/mp4'};
					var a, c, d = '<br/><span>Download: ', p, s = '';
				
					a = 'autoplay';
					if ($(this).is('.controls')) a += ' controls';
					if ($(this).is('.autobuffer')) a += ' autobuffer';
					a += ' poster="' + $(this).attr('src') + '"';
					a += ' width="' + $(this).attr('width') + '"';
					a += ' height="' + $(this).attr('height') + '"';
					p = $(this).attr('src').substr(0, $(this).attr('src').lastIndexOf('.')+1);
					s = '';
					for (c in codecs) {
						s += '<source src="' + p + c + '" type="' + codecs[c] + '"';
						d += ' <a href="' + p + c + '">' + c + '</a>';
					}
					s += 'No supported format, try downloads.';
					$(this).replaceWith('<video ' + a + ' class="middle-vertical">' + s + '</video>');
					d += '</span>';
			        $('#fancybox-title-inside').append(d);
				} else {
					if (done == 0) {
					var codecs = {'webm':'video/webm', 'mp4':'video/mp4', 'ogv':'video/ogv', 'm4v':'video/mp4', 'avi':'video/avi'};
					var c, d = '<br/><span>Download: ', p;
					p = $(this).attr('src').substr(0, $(this).attr('src').lastIndexOf('.')+1);
					for (c in codecs) {
						d += ' <a href="' + p + c + '">' + c + '</a>';
					}
					d += '</span>';
			        $('#fancybox-title-inside').append(d);
			        done = 1;
					}
					alert("HTML5 <video> is not supported by your browser.  Try the download links, or use Chrome, Firefox, or Safari.");
				}
	        }),
	        $('#fancybox-img').trigger('click')
	    }
	});
	
	$("#emailbox").fancybox({
		'scrolling'		: 'no',
		'titleShow'		: false,
		'onClosed'	: function() {
		    $("#fname_error").hide();
		    $("#lname_error").hide();
		    $("#email_error").hide();
		    $("#emailconf_error").hide();
		    $("#msg_error").hide();
		},
		'onStart'	: function() {
		    $("#fname_error").hide();
		    $("#lname_error").hide();
		    $("#email_error").hide();
		    $("#emailconf_error").hide();
		    $("#msg_error").hide();
		}
	});
	
	$("#email_form").bind("submit", function() {
		var fmerr = 0;
		
		str = jQuery.trim($("#first_name").val());
		if (str.length < 1) {
		    $("#fname_error").show();
		    fmerr = fmerr + 1;
		} else {
		    $("#fname_error").hide();
		}
		
		str = jQuery.trim($("#last_name").val());
		if (str.length < 1) {
		    $("#lname_error").show();
		    fmerr = fmerr + 1;
		} else {
		    $("#lname_error").hide();
		}
	
		str = jQuery.trim($("#email_addr").val());
		if (str.length < 1) {
		    $("#email_error").show();
		    fmerr = fmerr + 1;
		} else {
		    $("#email_error").hide();
		}

		if ($("#email_addr").val() != $("#email_conf").val()) {
		    $("#emailconf_error").show();
		    fmerr = fmerr + 1;
		} else {
		    $("#emailconf_error").hide();
		}
		
		str = jQuery.trim($("#message").val());
		if (str.length < 1) {
		    $("#msg_error").show();
		    fmerr = fmerr + 1;
		} else {
		    $("#msg_error").hide();
		}

		if (fmerr > 0) {
		    $.fancybox.resize();
			return false;
		}
		
		$.fancybox.showActivity();
	
		$.ajax({
			type		: "POST",
			cache	: false,
			url		: "data/email.php",
			data		: $(this).serializeArray(),
			success: function(data) {
				$.fancybox(data);
			}
		});
	
		return false;
	});

});
