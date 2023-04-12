const mMenu = document.querySelector("#open_menu");
const body = document.querySelector(".body_container");
const scrollDOM = {
  scrollBody: document.querySelector("#scroll_section1"),
  chatNavigation: [
    document.querySelector("#chat_navigation1"),
    document.querySelector("#chat_navigation2"),
    document.querySelector("#chat_navigation3"),
    document.querySelector("#chat_navigation4"),
    document.querySelector("#chat_navigation5"),
  ],
  topScrollBody: document.querySelector("#scroll_sectionTop"),
};
const chatLeftItems = document.querySelectorAll("section.chat .pc .title_wrap");
const videos = document.querySelectorAll("section.chat .right video");
const scrollViews = document.querySelectorAll("section.chat .mobile .left");
const scrollVideos = document.querySelectorAll("section.chat .mobile video");
const floatMenu = document.querySelector("#float_menu");

const scrollShowFunction = (index) => {
  scrollDOM.chatNavigation.forEach((item) => {
    item.classList.remove("on");
  });
  scrollDOM.chatNavigation[index].classList.add("on");
  for (let i = 0; i < 5; i++) {
    if (scrollWrap.isMobile) {
      if (index === i) {
        scrollViews[i].style.opacity = "1";
        scrollViews[i].style.zIndex = "50";
        scrollVideos[i].play();
      } else {
        scrollViews[i].style.opacity = "0";
        scrollViews[i].style.zIndex = "-999";
        scrollVideos[i].pause();
      }
    } else {
      if (index === i) {
        videos[i].play();
        chatLeftItems[i].classList.add("on");
      } else {
        videos[i].pause();
        chatLeftItems[i].classList.remove("on");
      }
    }
  }

  if (!scrollWrap.isMobile) {
    videos.forEach((item) => (item.style.opacity = 0));
    videos[index].style.opacity = 1;
  }
};

const scrollWrap = {
  scrollBody: scrollDOM.scrollBody,
  scrollHeight: null,
  sectionOffsetTop: null,
  sectionScrollTop: null,
  scrollRealHeight: null,
  serviceSectionOffsetTop: null,
  winScrollTop: null,
  scrollPercent: null,
  percent: null,
  isMobile: false,
  isUp: true,
  // .phone_wrap 기본 min-width 550px + 좌우 padding 70px
  videoWidth: 620,
  nowPosition: -1,
  onMove: false,
  scrollFunc: () => {
    scrollWrap.setProperty();
    scrollWrap.contentIn();
    scrollWrap.showFloatMenu();
  },
  setProperty: () => {
    scrollWrap.scrollHeight = scrollWrap.scrollBody.offsetHeight;
    scrollWrap.winScrollTop = window.pageYOffset;
    scrollWrap.sectionOffsetTop =
      scrollWrap.scrollBody.getBoundingClientRect().top +
      scrollWrap.winScrollTop -
      80;
    scrollWrap.sectionScrollTop =
      scrollWrap.winScrollTop - scrollWrap.sectionOffsetTop;
    scrollWrap.scrollPercent =
      scrollWrap.sectionScrollTop / scrollWrap.scrollHeight;
    scrollWrap.percent = Math.round(scrollWrap.scrollPercent * 100);
    scrollWrap.serviceSectionOffsetTop =
      document.querySelector("#section_service").offsetTop;
  },
  contentIn: (arg) => {
    videos.forEach((item) => item.classList.remove("opacity"));

    if (scrollWrap.percent >= 0 && scrollWrap.percent < 10) {
      scrollShowFunction(0);
    } else if (scrollWrap.percent >= 10 && scrollWrap.percent < 30) {
      scrollShowFunction(1);
    } else if (scrollWrap.percent >= 30 && scrollWrap.percent < 50) {
      scrollShowFunction(2);
    } else if (scrollWrap.percent >= 50 && scrollWrap.percent < 70) {
      scrollShowFunction(3);
    } else if (scrollWrap.percent >= 70) {
      scrollShowFunction(4);
    }

    if (scrollDOM.topScrollBody) {
      const phone = document.querySelector(
        ".body_container main section.top .phone_wrap"
      );
      const videoTarget = document.querySelector(
        ".body_container main section.top .phone_wrap video"
      );

      const { bottom, width } = phone.getBoundingClientRect();
      const isFullSize = bottom < window.innerHeight;
      const isTop =
        ((scrollWrap.winScrollTop - 141) /
          (scrollDOM.topScrollBody.clientHeight - 141)) *
        100;

      if (scrollWrap.isMobile) {
        if (isTop > 10 && isTop <= 40) {
          phone.style.minWidth = null;
          phone.style.width = `${100 - isTop + 10}%`;
          videoTarget.play();
        }
      } else {
        if (isTop > 0 && isTop <= 100) {
          if (width <= scrollWrap.videoWidth && !isFullSize) {
            scrollWrap.videoWidth -= 5;
            // 좌우 padding : 70px
            phone.style.minWidth = `${scrollWrap.videoWidth - 70}px`;
          }

          videoTarget.play();
          phone.style.width = `${60 - isTop}%`;
        }
      }
    }

    if (!scrollWrap.isMobile) {
      document
        .querySelectorAll("main section.last .background_items img")
        .forEach((item, index) => {
          const y = scrollWrap.winScrollTop - 13800;
          item.style.transform = `translateY(${(y * (index + 1)) / 20}%)`;
        });
    } else {
      document
        .querySelectorAll("main section.last .background_items img")
        .forEach((item, index) => {
          const y = scrollWrap.winScrollTop - 9800;
          item.style.transform = `translateY(${(y * (index + 1)) / 30}%)`;
        });
    }

    const processSection = document.querySelector("section.process");
    // processSection 요소가 존재하지 않음
    if (!processSection) return;

    if (scrollWrap.winScrollTop + 100 > processSection.offsetTop) {
      const items = document.querySelectorAll(
        "section.process > .wrap .inner .item1 img.float"
      );
      const times = [0, 500, 1000];
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("on");
        }, times[index]);
      });
      $(".body_container main section.process .wrap .inner").slick("slickPlay");
    }
  },
  init: () => {
    scrollWrap.scrollFunc();
    const serviceAos = document.querySelectorAll("section.service [data-aos]");
    if (window.innerWidth <= 768) {
      scrollWrap.isMobile = true;
      serviceAos.forEach((item) => {
        item.removeAttribute("data-aos");
      });
      document.querySelectorAll(".different .box").forEach((item) => {
        item.removeAttribute("data-aos-delay");
      });
    } else {
      scrollWrap.isMobile = false;
      serviceAos.forEach((item) => {
        item.setAttribute("data-aos", "fade-up");
      });
      document.querySelectorAll(".different .box").forEach((item, index) => {
        item.setAttribute("data-aos-delay", `${index + 1}00`);
      });
    }
    scrollShowFunction(0);
  },
  showFloatMenu: () => {
    if (scrollWrap.isMobile) {
      if (scrollWrap.winScrollTop + 70 >= scrollWrap.serviceSectionOffsetTop) {
        floatMenu.classList.add("on");
      } else {
        floatMenu.classList.remove("on");
      }
    }
  },
};

/*
mMenu?.addEventListener('change', e => {
  const ch = e.target.checked
  if(ch) {
    body.style.cssText = `
      height: 100vh;
      overflow: hidden;
    `
  } else {
    body.style.cssText = ``
  }
})
*/
window.onload = () => {
  scrollWrap.init();
};

window.addEventListener("wheel", (e) => {
  scrollWrap.isUp = e.deltaY <= 0;
});

window.addEventListener("scroll", (e) => {
  scrollWrap.scrollFunc();
});
window.addEventListener("resize", (e) => {
  scrollWrap.init();
});

const pcChatList = document.querySelectorAll("section.chat .left ul li");
pcChatList.forEach((item) => {
  item.addEventListener("click", (e) => {
    const scrollPosition = e.target.getAttribute("data-scroll-position");
    let scrollTop = 0;

    if (scrollPosition === "1") {
      scrollTop += scrollWrap.sectionOffsetTop;
    } else if (scrollPosition === "2") {
      scrollTop += scrollWrap.sectionOffsetTop + scrollWrap.scrollHeight * 0.2;
    } else if (scrollPosition === "3") {
      scrollTop += scrollWrap.sectionOffsetTop + scrollWrap.scrollHeight * 0.4;
    } else if (scrollPosition === "4") {
      scrollTop += scrollWrap.sectionOffsetTop + scrollWrap.scrollHeight * 0.6;
    } else if (scrollPosition === "5") {
      scrollTop += scrollWrap.sectionOffsetTop + scrollWrap.scrollHeight - window.innerHeight;
    }

    window.scrollTo({
      top: scrollTop,
      left: 0,
    });
  });
});

$("main .slick-slider").on("afterChange", function () {
  document
    .querySelectorAll(
      'section.process .item_container[aria-hidden="false"] .float'
    )
    .forEach((item) => {
      item.classList.add("on");
    });
});

let isScrolling;
window.addEventListener(
  "scroll",
  function (event) {
    if (!scrollWrap.isMobile) {
      window.clearTimeout(isScrolling);

      isScrolling = setTimeout(function () {
        let scrollTop = 0;
        console.log("Scrolling has stopped.");

        if (scrollWrap.percent >= 0 && scrollWrap.percent < 10) {
          scrollTop += scrollWrap.sectionOffsetTop;
        } else if (scrollWrap.percent >= 10 && scrollWrap.percent < 30) {
          scrollTop +=
            scrollWrap.sectionOffsetTop + scrollWrap.scrollHeight * 0.2;
        } else if (scrollWrap.percent >= 30 && scrollWrap.percent < 50) {
          scrollTop +=
            scrollWrap.sectionOffsetTop + scrollWrap.scrollHeight * 0.4;
        } else if (scrollWrap.percent >= 50 && scrollWrap.percent < 70) {
          scrollTop +=
            scrollWrap.sectionOffsetTop + scrollWrap.scrollHeight * 0.6;
        } else if (scrollWrap.percent >= 70 && scrollWrap.percent <= 100) {
          scrollTop += scrollWrap.sectionOffsetTop + scrollWrap.scrollHeight - window.innerHeight;
        }

        if (scrollWrap.percent > 0 && scrollWrap.percent < 100 && window.pageYOffset < scrollWrap.sectionOffsetTop + scrollWrap.scrollHeight - window.innerHeight) {
          window.scrollTo({
            top: scrollTop,
            left: 0,
            behavior: "smooth",
          });
        }
      }, 66);
    }
  },
  false
);

// 기능 섹션 (기업에 필요한 모든 기능) 탭 전환 코드
const navigation = document.querySelector("#main_feature .feature_nav");
navigation.addEventListener("click", (e) => {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }

  for (child of navigation.children) {
    child.classList.remove("active");
  }
  e.target.classList.add("active");

  const menu = e.target.dataset.menu;
  const groups = document.querySelectorAll(
    "#main_feature .feature-content .feature-cgroup"
  );
  for (group of groups) {
    group.classList.remove("active");
  }
  const target = document.querySelector(
    `#main_feature .feature-content .feature-cgroup[data-menu='${menu}']`
  );
  target.classList.add("active");
});
