$(document).ready(function() {
  /* 메인 페이지 새로고침 시 최상단으로 이동 */
  history.scrollRestoration = 'manual';

  $(window).resize(function () {
    /* 
    메인 비주얼 섹션 반응형 처리
    - 모바일 첫 화면 로딩 시, 화면 고정하여 움찔 거리는 이슈 해결
    - 544px 이상일 경우에만 반응형 적용
    */
    var windowH = window.innerHeight;
    if(window.innerWidth >= 544){
      $(".mv-sec").css({height:windowH});
    }
    
    /* 
    메인 비주얼 섹션 스크롤 인터랙션 반응형 처리
    */
    var window_width = window.innerWidth;
    if (window_width >= mediaQuery.lg) {
      scrollAnimation.pcScrollDown();
    } else {
      scrollAnimation.mobileScrollDown();
    }
  }).resize();
  $(".mv-sec").css({height:window.innerHeight});
  
  /* 메인 진입 인터랙션 */
  asyncLoader.load("scrollTrigger", function () { 
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.matchMedia({
      // PC
      "all" : function() {
        let mvSec = gsap.timeline({
          scrollTrigger: {
            trigger: '.mv-sec',
            start : "top 100%",
            // end : "bottom 0%",
            // markers: true,
            toggleActions: "play none none reverse",
          }
        })
        mvSec.to($(".ani-wrap"), {opacity: 1, duration: 0.6, ease: "none"}); // three 페이드인
        mvSec.to($(".header .logo"), {opacity: 1, y: '-50%', duration: 0.45, ease: "cubic-bezier(.19,1.14,.51,.99)"},"<"); //로고 슬라이드다운
        mvSec.to($(".header .btn-login-pc"), {opacity: 1, y: '0', duration: 0.45, ease: "cubic-bezier(.19,1.14,.51,.99)"},'<0.05'); //login 버튼 슬라이드다운
        mvSec.to($(".header .menu-btn"), {opacity: 1, y: '0', duration: 0.45, ease: "cubic-bezier(.19,1.14,.51,.99)"},'<0.05'); //메뉴 버튼 슬라이드다운
        mvSec.to($(".mv-sec .ani-1"), {opacity: 1, y: '0', duration: 0.5, ease: "cubic-bezier(.19,1.14,.51,.99)"},'>-0.55'); //Agency 슬라이드업 페이드인
        mvSec.to($(".mv-sec .h-ani-1"), {y: '0', duration: 0.5, ease: "cubic-bezier(.19,1.14,.51,.99)"},'>-0.3'); //Agency 슬라이드업
        mvSec.to($(".mv-sec .ani-2"), {opacity: 1, y: '0', duration: 0.5, ease: "cubic-bezier(.19,1.14,.51,.99)"},'>-0.65'); //trading 슬라이드업 페이드인
        mvSec.to($(".mv-sec .h-ani-2"), {y: '0', duration: 0.5, ease: "cubic-bezier(.19,1.14,.51,.99)"},'>-0.3'); //trading 슬라이드업
        mvSec.to($(".mv-sec .ani-3"), {opacity: 1, y: '0', duration: 0.5, ease: "cubic-bezier(.19,1.14,.51,.99)"},'>-0.65'); //desk 슬라이드업 페이드인
        mvSec.to($(".mv-sec .h-ani-3"), {y: '0', duration: 0.5, ease: "cubic-bezier(.19,1.14,.51,.99)"},'>-0.3'); //desk 슬라이드업
        mvSec.to($(".mv-sec .ani-4"), {opacity: 1, y: '0', duration: 0.4, ease: "cubic-bezier(.19,1.14,.51,.99)"},'>-0.65'); //Digital 슬라이드업 페이드인
        mvSec.to($(".mv-sec .h-ani-4"), {y: '0', duration: 0.5, ease: "cubic-bezier(.19,1.14,.51,.99)"},'>-0.3'); //Digital 슬라이드업
        mvSec.to($(".mv-sec .ani-5"), {opacity: 1, y: '0', duration: 0.4, ease: "cubic-bezier(.19,1.14,.51,.99)"},'>-0.55'); //marketing 슬라이드업 페이드인
        mvSec.to($(".mv-sec .h-ani-5"), {y: '0', duration: 0.5, ease: "cubic-bezier(.19,1.14,.51,.99)"},'>-0.3'); //marketing 슬라이드업
        mvSec.to($(".mv-sec .ani-6"), {opacity: 1, y: '0', duration: 0.4, ease: "cubic-bezier(.19,1.14,.51,.99)"},'>-0.55'); //one-stop 슬라이드업 페이드인
        mvSec.to($(".mv-sec .h-ani-6"), {y: '0', duration: 0.5, ease: "cubic-bezier(.19,1.14,.51,.99)"},'>-0.3'); //one-stop 슬라이드업
        mvSec.to($(".mv-sec .ani-7"), {opacity: 1, y: '0', duration: 0.4, ease: "cubic-bezier(.19,1.14,.51,.99)"},'>-0.55'); //service 슬라이드업 페이드인
        mvSec.to($(".mv-sec .h-ani-7"), {y: '0', duration: 0.5, ease: "cubic-bezier(.19,1.14,.51,.99)"},'>-0.3'); //service 슬라이드업
        mvSec.to($(".mv-sec .sub-title"), {opacity: 1, duration: 1, ease: "cubic-bezier(.19,1.14,.51,.99)"},'>-0.6'); //지오앤플린이 전략.. 텍스트 페이드인
        mvSec.to($(".mv-sec .scroll-guide-wrap"), {opacity: 1, duration: 1, ease: "cubic-bezier(.19,1.14,.51,.99)"},'<'); //스크롤다운 버튼 페이드인
      }
    });
  });

  /* 스크롤 다운 버튼 클릭 시 about 섹션으로 이동*/
  const $scrollBtn = $('.scroll-btn'); // 스크롤 다운 버튼
  const $headerHeight = $('.header-inner').height(); // 헤더 영역
  $scrollBtn.click(function(e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;
    $("html, body").animate({ scrollTop: offsetTop}, 800);
  });
});

/*=================================================
메인 슬라이드 스크롤 애니메이션
=================================================*/
var scrollAnimation = scrollAnimation || {};

scrollAnimation.isScroll = 0;//스크롤 프로세스 상태변수(0스크롤전,1스크롤중)
var mousewheelevt = (/Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel");//파이어폭스를 위한 크로스브라우징 코드

scrollAnimation.pcScrollDown = function () {
scrollAnimation.targetSection = $(".mv-sec");
scrollAnimation.moveTagetSection = $(".about-sec");
scrollAnimation.moveTagetSectionTop = scrollAnimation.moveTagetSection.offset().top + 100;

scrollAnimation.targetSection.on(mousewheelevt, function (e) {
  $("body").addClass("is-scrolling");
  if (scrollAnimation.isScroll === 1) return false;//스크롤중 이벤트 막기
  e.preventDefault();
  var evt = window.event || e;// 이전 브라우저에서 window.event라고 표기해야 하는 경우가 있으므로 변수에 or 연산자를 사용하여 할당함.
  var delta = evt.detail ? evt.detail : evt.wheelDelta;
  if (/Firefox/i.test(navigator.userAgent)) delta = -evt.detail; //파이어폭스일때 스크롤 이벤트 방향이 다른 브라우저와 반대임.

  if (delta < 0) {
    scrollAnimation.isScroll = 1;
    scrollAnimation.scrollDown(scrollAnimation.moveTagetSectionTop, "pc");
  } else {
    scrollAnimation.isScroll = 1;
    scrollAnimation.scrollUp();
  }
});
if ($("body").hasClass("is-scrolling") === true) {
  scrollAnimation.moveTagetSection.on(mousewheelevt, function (e) {
    e.preventDefault();
  });
}
};
scrollAnimation.mobileScrollDown = function () {
scrollAnimation.targetSection = $(".mv-sec")[0];
scrollAnimation.moveTagetSectionTop = $(".about-sec").offset().top + 50;
var hammertime = new Hammer(scrollAnimation.targetSection);
hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });

// listen to events...
hammertime.on("panup pandown", function (ev) {
  if (ev.direction == "8") {
    scrollAnimation.scrollDown(scrollAnimation.moveTagetSectionTop);
  } else if (ev.direction == "16") {
    scrollAnimation.scrollUp();
  }
  });
};

scrollAnimation.scrollDown = function (moveTagetSection, divice) {
  $("html,body").stop().animate({
    scrollTop: moveTagetSection
  }, 600, function () {
    scrollAnimation.isScroll = 0;
    if (divice === "pc") {
      $("body").removeClass("is-scrolling");
      scrollAnimation.moveTagetSection.off(mousewheelevt);
    }
  });
};
scrollAnimation.scrollUp = function () {
  $("html,body").stop().animate({
    scrollTop: 0
  }, 600, function () {
    scrollAnimation.isScroll = 0;
    $("body").removeClass("is-scrolling");
  });
};
