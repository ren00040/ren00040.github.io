/*
 * @Date: 2022-03-25 02:23:53
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-03-29 01:37:36
 * @FilePath: /mtm6302-exercise-4/script.js
 */

//cuntom picker's icons
const picker = new tempusDominus.TempusDominus(document.getElementById('customIcons'), {
  display: {
    icons: {
      time: 'bi bi-clock',
      date: 'bi bi-calendar',
      up: 'bi bi-arrow-up',
      down: 'bi bi-arrow-down',
      previous: 'bi bi-chevron-left',
      next: 'bi bi-chevron-right',
      today: 'bi bi-calendar-check',
      clear: 'bi bi-trash',
      close: 'bi bi-x',
    },
    buttons: {
      today: true,
      clear: true,
      close: true,
    },
  }
});

// retrieve the form
const $form = document.getElementById('countdownForm')

// if localStorage exists, goto countdown
if(localStorage.length !=0) {
  turnToCount()
  // retrieve the future date from localStorage
  let local = localStorage.getItem('future')
  // turn to a date
  const date = new Date(local)
  document.getElementById('title').innerText = localStorage.getItem('title')
  renderCount(date)
  update(date)
}


// set submit event
$form.addEventListener('submit',(e)=>{
  e.preventDefault()

  if(picker.viewDate <= new Date()) {
    document.getElementById('warning').classList.remove('hide')
    console.log('warning')
  } else{
    turnToCount()
    localStorage.setItem('future',picker.viewDate)
    localStorage.setItem('title',document.getElementById('inputTitle').value)
    renderCount(picker.viewDate)
    update(picker.viewDate)
  }
})

// render count down elements
function renderCount(future,updateInterval) {
  const $countdown = document.getElementById('countdown')
  let newDate= new Date()
  let date = dateDiff(newDate, future)
  let danger = ''
  let btnStyle = 'btn-primary'
  
  if((future-newDate) <= 60000) { 
    danger = 'text-danger'
    btnStyle = 'btn-danger'
   } 

  $countdown.innerHTML = `
    <div class='date row text-center ${danger}' id='date'>
      <div class='col'>
        <div class='display-4'>${date.days}</div>
        <div>days</div>
      </div>
      <div class='col display-4'>:</div>
      <div class='col'>
        <div class='display-4'>${date.hours}</div>
        <div>hours</div>
      </div>
      <div class='col display-4'>:</div>
      <div class='col'>
        <div class='display-4'>${date.minutes}</div>
        <div>minutes</div>
      </div>
      <div class='col display-4'>:</div>
      <div class='col'>
        <div class='display-4'>${date.seconds}</div>
        <div>seconds</div>
      </div>
    </div>
    <div class='row'>
      <div class='col text-center'>
        <button class='btn ${btnStyle} my-3' id='clear'>Clear</button>
      </div>
    </div>
  `
  // Handle clear button click event
  const $clear = document.getElementById('clear')
  $clear.addEventListener('click',()=>{
    clearInterval(updateInterval)
    localStorage.clear()
    $countdown.innerHTML = ``
    turnToForm()
  })
}

// Update date per second
function update(future) {
  const updateInterval = setInterval(()=>{
    renderCount(future,updateInterval)
    if(future<= new Date()) {
      clearInterval(updateInterval)
      localStorage.clear()
    }
  },1000)
}

// from form turn to countdown
function turnToCount() {
  // hide warning tip and form
  document.getElementById('warning').classList.add('hide') //hide warning tip
  $form.classList.add('hide')

  // show title
  document.getElementById('title').innerText = document.getElementById('inputTitle').value
}

// from countdown turn to form
function turnToForm() {
  // hide warning tip and form
  document.getElementById('warning').classList.add('hide') //hide warning tip
  $form.classList.remove('hide')

  // show title
  document.getElementById('title').innerText = ''

  // clear form
  $form.reset()
}

// get the difference
function dateDiff (start, end) {
  const diff = end - start > 0 ? end - start : 0
  const format = (num) => num < 10 ? `0${num}` : num
  
  return {
    days: format(Math.floor(diff / 1000 / 60 / 60 / 24)),
    hours: format(Math.floor(diff / 1000 / 60 / 60 % 24)),
    minutes: format(Math.floor(diff / 1000 / 60 % 60)),
    seconds: format(Math.floor(diff / 1000 % 60))
  }
}