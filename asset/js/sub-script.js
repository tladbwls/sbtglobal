
const buttonArr = document.querySelectorAll('#navbar .container li');

for (let i = 0; i < buttonArr.length; i++) {
  buttonArr[i].addEventListener('click', function(e) {
    e.preventDefault();
    const targetElement = document.querySelector('.box' + (i + 1));
    const targetRect = targetElement.getBoundingClientRect();
    const targetY = window.pageYOffset + targetRect.top - 100;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  });
}

console.log(buttonArr);

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

});