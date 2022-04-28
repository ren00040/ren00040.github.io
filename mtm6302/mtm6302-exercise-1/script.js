/*
 * @Date: 2022-01-24 13:20:31
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-01-29 21:44:46
 * @FilePath: /mtm6302-exercise-1/script.js
 */

// get gallery DOM
const gallery = document.querySelector('#gallery');
const showroom = document.querySelector('#showroom')
const emojisContent = []
const startIndex = 127780

for (let index = startIndex; index < (startIndex+200); index++) {   
    let emojiContent = `
        <div class='emoji' dec='${index}'>
            <p class='emojiIcon'>&#${index}</p>
            <p>Dec: ${index}</p>
            <p>Hex: ${index.toString(16)}</p>
        </div>
    `
    emojisContent.push(emojiContent)
}

gallery.innerHTML += emojisContent.join('')

const emojis = gallery.querySelectorAll('.emoji')


emojis.forEach(emoji => {
    let index = emoji.getAttribute('dec')
    emoji.addEventListener('click', function(){
        changeBackground(emoji)
        showroomChange(index)
    })
})

function showroomChange(index) {
    showroom.innerHTML = `
        <div class='showroom-emoji'>&#${index}</div>
        <div class='emoji-text'>
            <p> Dec: ${index}</p>
            <p> Hex: ${index.toString(16)}</p>
        </div>
    `
    // scroll back to the top
    window.scrollTo({top:0, behavior:'smooth'})
}

function changeBackground(emoji) {
    if(!emoji.classList.contains('selected')) {
        showroom.style.display = "flex"
        const allEmojis = document.querySelectorAll('.emoji')
        allEmojis.forEach(element => {
            element.classList.remove('selected')
        });
    
        emoji.classList.add('selected')
    }else{
        emoji.classList.remove('selected')
        showroom.classList.add("hide")
        showroom.style.display = "none"
    }

}