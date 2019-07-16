/*--------------------- Copyright (c) 2018 -----------------------
[Master Javascript]

Project: Portfolio Responsive HTML Template
Version: 1.0.0
Assigned to: ThemeForest
-------------------------------------------------------------------*/
(function($){
  "use strict";
	
	// Preloader Js
	jQuery(window).on('load', function() {
		jQuery("#status").fadeOut();
		jQuery("#preloader").delay(200).fadeOut("slow");
	});
	
	// ready function
	jQuery(document).ready(function($){
   		var $this = $(window);
	
	//bg window height Js
	var window_height = window.innerHeight;
		$(".prt_home_wrapper").css("height", window_height);
	
	//Portfolio Load More
	$(".prt_loadmore").slice(0, 3).show();
    $("#loadMore").on('click', function (e) {
        e.preventDefault();
        $(".prt_loadmore:hidden").slice(0, 5).slideDown();
        if ($(".prt_loadmore:hidden").length == 0) {
            $("#load").fadeOut('slow');
        }
    });
	
	// for counter 
	$('.timer').appear(function() {
		$(this).countTo();
	});
	
	// About Page Profile Slider Js
	$('.prt_profile_slider .owl-carousel').owlCarousel({
		loop:true,
		margin:10,
		nav:false,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:3
			},
			1000:{
				items:3
			}
		}
	});
	
	//Skills Charts
	$('.prt_skills_wrapper').appear(function() {
		var circle1 = Circles.create({
			id: 'circles-1',
			value: 90,
			radius: 100,
			number: 90,
			text: '90%',
			width: 8,
			colors: ["#202020", "#00c8ff"],
			duration: 900
		});
		var circle2 = Circles.create({
			id: 'circles-2',
			value: 80,
			radius: 100,
			number: 80,
			text: '80%',
			width: 8,
			colors: ["#202020", "#ff8511"],
			duration: 900
		});
		var circle3 = Circles.create({
			id: 'circles-3',
			value: 75,
			radius: 100,
			number: 75,
			text: '75%',
			width: 8,
			colors: ["#202020", "#f26525"],
			duration: 900
		});
		var circle4 = Circles.create({
			id: 'circles-4',
			value: 70,
			radius: 100,
			number: 70,
			text: '70%',
			width: 8,
			colors: ["#202020", "#1d8bbe"],
			duration: 900
		});
	});
	
	// Service Page Client Slider Js
	$('.prt_client_slider .owl-carousel').owlCarousel({
		loop:true,
		margin:10,
		autoplay:true,
		nav:false,
		dots:false,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:3
			},
			1000:{
				items:5
			}
		}
	});
	
	// Portfolio popup Js
	$('.popup-gallery').magnificPopup({
		delegate: 'a.imageopen',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1]
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<small></small>';
			}
		}
	});
	
	// Portfolio video Popup js
	$('a.popup-youtube').magnificPopup({
		disableOn: 0,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});
	
	// Service Page Image Slides Js
	$('div.prt_img_click').on('click' , function(){
		if(!$(this).hasClass('active')){
			$('div.prt_services_slider_imgs img').removeClass('active');
			var target = $('div.prt_services_slider_imgs .img_'+$(this).attr('id'));
			var targetImg = target[0].outerHTML;
			target.remove();
			$('div.prt_services_slider_imgs').prepend(targetImg);
			$('div.prt_services_slider_imgs img:first').addClass('active');
			$('div.prt_services_slider_box .prt_img_click').removeClass('active');
			$(this).addClass('active');	
		}
	});
	
	// Open Close main Section Js
	var AplCss;
	var targetSection;
	var tar;
	var timing = 500;
	$('div.prt_menu_wrapper a').on('click' , function(e){
		e.preventDefault();
		tar = $(this).attr('href').split('#')[1];
		targetSection = $('.prt_'+tar+'_wrapper');
		if(tar == 'about'){
			AplCss  = {'top':0};
		}else if(tar == 'contact'){
			AplCss  = {'left':0};
		}else if(tar == 'services'){
			AplCss  = {'bottom':0 , 'top':0};
		}else if(tar == 'portfolio'){
			AplCss  = {'right':0};
		}
		targetSection.css('display', 'block');
		targetSection.animate(AplCss, timing);
	});
	$('img.prt_close').on('click' , function(){
		hide_section();
	});
	
	$('img#prt_close_tab').on('click' , function(){
		hide_section();
	});
	function hide_section(){
		if(tar == 'about'){
			AplCss  = {'display':'none', 'top':'-100%'};
		}else if(tar == 'contact'){
			AplCss  = {'display':'none','left':'100%'};
		}else if(tar == 'services'){
			AplCss  = {'display':'none','bottom':'0' , 'top':'100%'};
		}else if(tar == 'portfolio'){
			AplCss  = {'display':'none','right':'100%'};
		}
		setTimeout(function(){ targetSection.css('display', 'none'); }, timing);
		targetSection.animate(AplCss, timing);
	};
	
	// Contact Form Submission
	function checkRequire(formId , targetResp){
		targetResp.html('');
		var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
		var url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
		var image = /\.(jpe?g|gif|png|PNG|JPE?G)$/;
		var mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
		var facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
		var twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/;
		var google_plus = /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/;
		var check = 0;
		$('#er_msg').remove();
		var target = (typeof formId == 'object')? $(formId):$('#'+formId);
		target.find('input , textarea , select').each(function(){
			if($(this).hasClass('require')){
				if($(this).val().trim() == ''){
					check = 1;
					$(this).focus();
					targetResp.html('You missed out some fields.');
					$(this).addClass('error');
					return false;
				}else{
					$(this).removeClass('error');
				}
			}
			if($(this).val().trim() != ''){
				var valid = $(this).attr('data-valid');
				if(typeof valid != 'undefined'){
					if(!eval(valid).test($(this).val().trim())){
						$(this).addClass('error');
						$(this).focus();
						check = 1;
						targetResp.html($(this).attr('data-error'));
						return false;
					}else{
						$(this).removeClass('error');
					}
				}
			}
		});
		return check;
	}
	$(".submitForm").on("click", function() {
		var _this = $(this);
		var targetForm = _this.closest('form');
		var errroTarget = targetForm.find('.response');
		var check = checkRequire(targetForm , errroTarget);
		if(check == 0){
			var formDetail = new FormData(targetForm[0]);
			formDetail.append('form_type' , _this.attr('form-type'));
			$.ajax({
				method : 'post',
				url : 'ajax.php',
				data:formDetail,
				cache:false,
				contentType: false,
				processData: false
			}).done(function(resp){
				if(resp == 1){
					targetForm.find('input').val('');
					targetForm.find('textarea').val('');
					errroTarget.html('<p style="color:green;">Mail has been sent successfully.</p>');
				}else{
					errroTarget.html('<p style="color:red;">Something went wrong please try again latter.</p>');
				}
			});
		}
	});
		
	});
	
})();