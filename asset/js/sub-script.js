
// const buttonArr = document.querySelectorAll('#navbar .container li');

// for (let i = 0; i < buttonArr.length; i++) {
//   buttonArr[i].addEventListener('click', function(e) {
//     e.preventDefault();
//     const targetElement = document.querySelector('.box' + (i + 1));
//     const targetRect = targetElement.getBoundingClientRect();
//     const targetY = window.pageYOffset + targetRect.top - 118;

//     window.scrollTo({
//       top: targetY,
//       behavior: 'smooth'
//     });
//   });
// }
// const buttonArr = document.querySelectorAll('#navbar .container li');


// for(let i = 0; i < buttonArr.length; i++){
//   buttonArr[i].addEventListener('click',function(e){
//     e.preventDefault();
//     document.querySelector('.box' + (i + 1)).scrollIntoView(true);
    
//   });
  
// } 

const buttonArr = document.querySelectorAll('#navbar .container li');

for (let i = 0; i < buttonArr.length; i++) {
  buttonArr[i].addEventListener('click', function(e) {
    e.preventDefault();
    const targetElement = document.querySelector('.box' + (i + 1));
    const targetRect = targetElement.getBoundingClientRect();
    const targetY = window.pageYOffset + targetRect.top - 150;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  });
}
  


var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop:true,

});