const startBtn = document.querySelector('#startBtn')
const timer = document.querySelector('#timer')
let time = 75;


startBtn.addEventListener('click', function() {
  //add timer
  setInterval(function(){
    time--
    timer.textContent = time;
  }, 1000)
})