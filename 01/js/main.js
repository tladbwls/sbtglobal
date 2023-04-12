/* *******************************************************
 * filename : main.js
 * description : 메인에만 사용되는 JS
 * date : 2022-08-08
******************************************************** */

var visualTit = undefined;
var whoTilt = undefined;
$(window).on('load', function  () {
	main_visual_txt_effect ();
	if ( !isMobile() ) {
		tilt_who_effect();
	}
});
$(window).on('resize', function(){
	main_visual_txt_effect ();
	tilt_who_effect();
});
$(document).ready(function  () {
	// fadeIn
	$(".ms-preloader").animate({"opacity":"0"},1300,"easeInOutCubic",function  () {
		$(".ms-preloader").css("visibility", "hidden");
	});
	
	/* ************************
	* Func : 메인 비주얼 높이 설정 및 slick 슬라이드
	* slick.js , getWindowWidth(), getWindowHeight() 필요
	************************ */
	// 메인 비주얼 높이값 설정
	if ($.exists('#mainVisual.full-height')) {
		mainVisualHeight();
		$(window).on('resize', mainVisualHeight);

		function mainVisualHeight () {
			var visual_height = getWindowHeight();
			if ( getWindowWidth () < mobileWidth ) {
				$("#mainVisual").height("auto");
			}else{
				$("#mainVisual").height(visual_height);
			}
		}
	}

	// 메인 비주얼
	addClassName($("#mainVisual"), "active-start");

	/* ************************
	* Func : 제품 파장 일러스트
	************************ */
	$(".cm-svg-effect").each(function  () {
		$(this).find("path").each(function  (idx) {
			$(this).css({
				"-webkit-animation-delay": (-1*0.05*idx)+"s",
				"animation-delay": (-1*0.05*idx)+"s",
			});
		});
		$(this).find("circle").each(function  (idx) {
			$(this).css({
				"-webkit-animation-delay": (-1*0.05*idx)+"s",
				"animation-delay": (-1*0.05*idx)+"s",
			});
		});
	});

	/* ************************
	* Func : 메인 BB IS STRANGE 리스트 active
	************************ */
	rollingActive(".main-technology-con03-list");

	/* ************************
	* Func : 메인 제품 light delay 지정하기
	************************ */
	var lightNum = $(".light-container").length;

	for (var i=0; i<lightNum; i++) {
		$(".light-container .light").eq(i).css("transition-delay",(i*0.02)+"s");
	}

	/* ************************
	* Func : 메인 Parallax Image
	************************ */
	var parallaxContainer = gsap.utils.toArray(".parallax-img-wrap");
	parallaxContainer.forEach((cont) => {
		var img = cont.querySelector(".parallax-img-item");
		gsap.fromTo(img, {y:200},{
			y: -200, // img.offsetHeight - cont.offsetHeight,
			ease: "none",
			scrollTrigger: {
				trigger: cont,
				// markers: true,
				scrub: true
			}
		});
	});	

	/* ************************
	* Func : 메인 제품 슬라이드
	************************ */
	var mainPrdSwiper = new Swiper(".main-product-con05-container", {
		slidesPerView:1,
		watchSlidesVisibility: true,
		loop: true,
		speed : 1000,
		autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
    });
});

// Who we are Tilt
function tilt_who_effect () {
	if(getWindowWidth() < 801 && whoTilt != undefined) {
		whoTilt.tilt.destroy.call(whoTilt);
		whoTilt = undefined;
		$('.main-who-img-con').removeAttr('style');
	} else if (getWindowWidth() > 800 && whoTilt == undefined) { 
		whoTilt = $('.main-who-img-con').tilt();
		whoTilt.tilt({
			maxTilt: 20,
			perspective: 3000,
			speed: 5000,
			disableAxis:'X'
		});
	}
}

// 메인 비주얼 텍스트 효과
function main_visual_txt_effect () {
	if(getWindowWidth() < 801) {
		var txtHeight = '-6rem';
	} else if (getWindowWidth() > 800) { 
		var txtHeight = '-12rem';
	}
	if(visualTit == undefined) {
		var ticker = function () {
			timer = setTimeout(function () {
				//console.log("작동중");
				$('.main-visual-txt2 .rolling-box .ani-text:first').animate({
					marginTop: txtHeight
				}, 600, "swing", function () {
					$(this).detach().appendTo('.main-visual-txt2 .rolling-box').removeAttr('style');
				});
				ticker();
			}, 4000);
		};
		ticker();
	}
	visualTit = 1;
}

/* ************************
* Func : 스크롤 트리거
************************ */
var controller = new ScrollMagic.Controller();
var timeline = new TimelineMax();
var timeline2 = new TimelineMax();
var timeline3 = new TimelineMax();
var timeline4 = new TimelineMax();
var timeline5 = new TimelineMax();

//오른쪽 제품
new ScrollMagic.Scene({triggerElement: '.main-technology-con01 .main-technology-img', triggerHook: 0.6, duration: '30%'})
.setTween('.main-technology-con01 img', {xPercent : -100, opacity: '1', ease: Linear.easeNone})
.addTo(controller);

//왼쪽 제품
new ScrollMagic.Scene({triggerElement: '.main-technology-con02 .main-technology-img', triggerHook: 0.6, duration: '30%'})
.setTween('.main-technology-con02 img', {xPercent : 100, opacity: '1', ease: Linear.easeNone})
.addTo(controller);

//어렵지 않습니다.
new ScrollMagic.Scene({triggerElement: '.main-product-con02', triggerHook: 0.6, duration: '50%'})
.setTween('.main-product-con02-txt', {
	yPercent : 100, 
	scale: 1, 
	opacity: '1', 
	ease: Linear.easeNone,
	onUpdate: updateBlur,
    onComplete: resetBlur
})
.addTo(controller);
function updateBlur() {
   $(".main-product-con02-txt").css("textShadow", "0 -5rem 3rem rgba(255,255,255,0.5)");
 }
function resetBlur() {
    $(".main-product-con02-txt").css("textShadow", "0 0 0 rgba(255,255,255,0.5)");
}

//장착, 1초, 분리
var tween0 = TweenMax.to(".main-product-con03-inner", 0, {
	className:'main-product-con03-inner active',
});
var tween1 = TweenMax.to(".main-product-con03-inner .txt01", 1, {
	xPercent : 100,
	opacity: 1,
	ease: Linear.easeNone,
	onUpdate: updateBlurL,
    onComplete: resetBlurL
});
var tween2 = TweenMax.to(".main-product-con03-inner .txt02", .5, {
	scale: 1,
	opacity: 1,
	ease: Linear.easeNone,
});
var tween3 = TweenMax.to(".main-product-con03-inner .txt03", 1, {
	xPercent : -100,
	opacity: 1,
	ease: Linear.easeNone,
	onUpdate: updateBlurR,
    onComplete: resetBlurR
});
var scene1 = new ScrollMagic.Scene({
	triggerElement: ".main-product-con03-inner",
	triggerHook: 0.6, 
	duration: '40%'
});
timeline.add(tween1).add(tween0).add(tween2).add(tween3);
scene1.setTween(timeline)
scene1.addTo(controller);
function updateBlurL() {
   $(".main-product-con03-inner .txt01").css("textShadow", "-5rem 0 3rem rgba(255,255,255,0.5)");
 }
function resetBlurL() {
    $(".main-product-con03-inner .txt01").css("textShadow", "0 0 0 rgba(255,255,255,0.5)");
}
function updateBlurR() {
   $(".main-product-con03-inner .txt03").css("textShadow", "5rem 0 3rem rgba(255,255,255,0.5)");
 }
function resetBlurR() {
    $(".main-product-con03-inner .txt03").css("textShadow", "0 0 0 rgba(255,255,255,0.5)");
}

//가볍다, 간편하다, 안전하다
var tween4 = TweenMax.to(".main-product-con04 .txt01", 1, {
	xPercent : 0,
	opacity: 1,
	ease: Linear.easeNone,
	className:'txt01 active',
	onUpdate: updateBlurL1,
    onComplete: resetBlurL1
});
var tween5 = TweenMax.to(".main-product-con04 .txt02", 1, {
	xPercent : -50,
	opacity: 1,
	ease: Linear.easeNone,
	className:'txt02 active',
	onUpdate: updateBlurR1,
    onComplete: resetBlurR1
});
var tween6 = TweenMax.to(".main-product-con04 .txt03", 1, {
	xPercent : 0,
	opacity: 1,
	ease: Linear.easeNone,
	className:'txt03 active',
	onUpdate: updateBlurL2,
    onComplete: resetBlurL2
});
var scene2 = new ScrollMagic.Scene({
	triggerElement: ".main-product-con04",
	triggerHook: 0.6, 
	duration: '40%'
});
timeline2.add(tween4).add(tween5).add(tween6);
scene2.setTween(timeline2)
scene2.addTo(controller);
function updateBlurL1() {
   $(".main-product-con04 .txt01").css("textShadow", "-5rem 0 3rem rgba(255,255,255,0.5)");
 }
function resetBlurL1() {
    $(".main-product-con04 .txt01").css("textShadow", "0 0 0 rgba(255,255,255,0.5)");
}
function updateBlurR1() {
   $(".main-product-con04 .txt02").css("textShadow", "5rem 0 3rem rgba(255,255,255,0.5)");
 }
function resetBlurR1() {
    $(".main-product-con04 .txt02").css("textShadow", "0 0 0 rgba(255,255,255,0.5)");
}
function updateBlurL2() {
   $(".main-product-con04 .txt03").css("textShadow", "-5rem 0 3rem rgba(255,255,255,0.5)");
 }
function resetBlurL2() {
    $(".main-product-con04 .txt03").css("textShadow", "0 0 0 rgba(255,255,255,0.5)");
}

//제품 마우스 이미지
var tween7 = TweenMax.to(".main-product-con05-center", .5, {
	scale: 1,
	opacity: 1,
	ease: Linear.easeNone,
});
var scene3 = new ScrollMagic.Scene({
	triggerElement: ".main-product-con05",
	triggerHook: 0.9, 
	duration: '50%'
});
timeline3.add(tween7);
scene3.setTween(timeline3)
scene3.addTo(controller);

//기술 파장 이미지
var tech1SvgX = 110,
	tech1SvgY = $(".main-technology-con01").outerHeight() - 20;
	tech2SvgX = -110;
	tech2SvgY = $(".main-technology-con01").outerHeight() + $(".main-technology-con02").outerHeight() + 450;
$(window).on("resize",function  () {
	var tech1SvgX = 110,
		tech1SvgY = $(".main-technology-con01").outerHeight() - 20;
		tech2SvgX = -110;
		tech2SvgY = $(".main-technology-con01").outerHeight() + $(".main-technology-con02").outerHeight() + 450;
});
var tweenTech0 = TweenMax.set(".main-technology-svg", {
	opacity: 1,
	ease:Power1.easeInOut,
});
var tweenTech1 = TweenMax.to(".main-technology-svg", 10, {
	xPercent: tech1SvgX,	
	y: tech1SvgY,
	scale: 0.5,
	opacity:  (i) => {return i < 1 ? 0.5 : 0.2},
	ease:Power1.easeInOut,
});
var tweenTech1_1 = TweenMax.set(".main-technology-svg", {
	opacity: 1,
	ease:Power1.easeInOut,
});
var scene4 = new ScrollMagic.Scene({
	triggerElement: ".main-technology-con01",
	triggerHook: 0.5, 
	duration: '100%',
});
timeline4.add(tweenTech0).add(tweenTech1).add(tweenTech1_1);
scene4.setTween(timeline4)
scene4.addTo(controller);

var tweenTech2 = TweenMax.set(".main-technology-svg", {
	opacity: 1,
	ease:Power1.easeInOut,
});
var tweenTech3 = TweenMax.to(".main-technology-svg", 2, {
	xPercent: tech2SvgX,	
	y: tech2SvgY,
	scale: 3.5,
	opacity:  (i) => {return i < 0.5 ? 0.8 : 0.1},
	ease:Power1.easeInOut,
});
var scene5 = new ScrollMagic.Scene({
	triggerElement: ".main-technology-con02",
	triggerHook: 0.1, 
	duration: '100%'
});
timeline5.add(tweenTech2).add(tweenTech3);
scene5.setTween(timeline5)
scene5.addTo(controller);