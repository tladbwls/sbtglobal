/* Navigation */
var NAV = (function () {
  var body = document.querySelector('body'),
      header = document.querySelector('.header'),
      isNavOpen = null,
      isHide = false,  // 마우스휠에 따라 헤더가 보이기 / 숨기기 : ture / false
      last_pos = 0;

  function settings() {
    isNavOpen = body.classList.contains("pc-nav-open");
  }

  function navScrollLitsener() {
    isHide ? wheelEvt() : '';

    window.addEventListener('scroll', function (e) {
      var nowTop = window.pageYOffset;

      isHide ? scrollDeltaEvt() : '';
      scrollFixed(nowTop);
    });
  }

  function wheelEvt() {
    var mousewheelevt = (/Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel");

    $(window).on(mousewheelevt, function (e) {
      var evt = window.event || e;
      var delta = evt.detail ? evt.detail : evt.wheelDelta;
      if (/Firefox/i.test(navigator.userAgent)) {
        delta = -evt.detail;
      }

      if ($("[class*='modal-open'], .select2-dropdown").length == 0 && (window.innerHeight < document.body.clientHeight) ) {
        if (delta < 0) { // 마우스휠 내릴 때
          if (!body.classList.contains('pc-nav-open') &&  !header.classList.contains('is-hide')) {
            header.classList.add('is-hide');
          }

        } else {
          if( header.classList.contains('is-hide')){
            header.classList.remove('is-hide');
          }
        }
      }
    });
  }

  function scrollDeltaEvt() {
    var scrolltop_pos = $(this).scrollTop();

    if (Math.abs(last_pos - scrolltop_pos) <= 15) return;

    if ($("[class*='modal-open'], .select2-dropdown").length == 0 && (window.innerHeight < document.body.clientHeight) ) {
      if ((scrolltop_pos > last_pos) && (last_pos > 0)) {
        if( !header.classList.contains('is-hide')){
          header.classList.add('is-hide');
        }

      } else {
        if( header.classList.contains('is-hide')){
          header.classList.remove('is-hide');
        }
      }
      
      last_pos = scrolltop_pos;
    }
  }

  function scrollFixed(nowTop) {
    if (nowTop === 0) {
      header.classList.remove('fixed');
    } else {
      header.classList.add('fixed');
    }
  }

  function stickyMenu() {
    var winH = window.innerHeight;
    $(".open-nav-wrap").css({ height: winH });
    if (body.classList.contains('pc-nav-open')) {
      body.classList.remove('pc-nav-open');
      $('.inner-wrap').removeClass("active")
    } else {
      setTimeout(function() {
        $('.inner-wrap').addClass("active");
      }, 600);
      body.classList.add('pc-nav-open');
    }
  }

  function event(target, evtType, fn) {
    var elList = document.querySelectorAll(target);

    Array.prototype.slice.call(elList).forEach(function (el) {
      el.addEventListener(evtType, fn);
    });
  }

  function isHoverAni() {
    $(this).addClass('is-hover').siblings().removeClass('is-hover');
    $(this).removeClass('not-hover').siblings().addClass('not-hover');
  }
  
  function notHoverAni() {
    $(this).removeClass('is-hover').siblings().removeClass('not-hover');
  }

  function init() {
    settings();
    event(".btnPcNav", "click", stickyMenu);
    event(".menu-list", "mouseover", isHoverAni);
    event(".menu-list", "mouseout", notHoverAni);
    navScrollLitsener();
  }

  return {
    init: init,
  }

})();

NAV.init();
