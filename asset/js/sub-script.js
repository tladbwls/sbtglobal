

const buttonArr = document.querySelectorAll('#navbar .container li');


for(let i = 0; i < buttonArr.length; i++){
  buttonArr[i].addEventListener('click',function(e){
    e.preventDefault();
    document.querySelector('.box' + (i + 1)).scrollIntoView(true);
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