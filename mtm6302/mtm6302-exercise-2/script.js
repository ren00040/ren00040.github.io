/*
 * @Date: 2022-02-18 21:11:35
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-02-22 22:33:41
 * @FilePath: /mtm6302-exercise-2/script.js
 */

class Item {
  constructor(id, image, author, date, camera) {
    this.id = id
    this.image = image;
    this.author = author;
    this.date = date;
    this.camera = camera;
  }
}

const galleryData = [
  ['Jacob Meissner', 'December 12, 2020', 'SONY, DSC-HX60V'],
  ['Alessio Patron', 'April 27, 2020', 'Apple, iPhone X'],
  ['Jessica Nzn', 'May 18, 2020', 'HUAWEI, YAL-L21'],
  ['Naveen Kumar', 'September 20, 2020', 'Canon, EOS REBEL T4i'],
  ['Marc-Olivier Jodoin', 'August 28, 2017', 'NIKON, D610'],
  ['Naveen Kumar', 'August 27, 2020', 'SONY, ILCE-7RM2'],
  ['Jeffrey Eisen', 'December 14, 2020', 'NIKON, D5600'],
  ['Pascal Bernardon', 'June 28, 2019', 'Panasonic, DMC-FZ1000'],
  ['AH Morgan', 'November 2, 2019', 'Canon, EOS M100'],
  ['Weigler Godoy', 'May 9, 2020', 'NIKON, D5100'],
  ['Shubham Sharan', 'August 11, 2021', 'SONY, ILCE-7M2'],
  ['Jeffrey Eisen', 'December 14, 2020', 'NIKON, D5600']
]

const $gallery = document.getElementById('gallery');
const $showroom = document.getElementById('showroom')
const gallery = []

// create all images
for (let index = 0; index < 12; index++) {
  const item = new Item
  item.id = index+1
  item.author = galleryData[index][0]
  item.image = new Image()
  item.image.src = './images/gallery'+item.id+'.jpeg'

  const $item = `
    <div class='gallery-item'>
      <picture>
        <source srcset="images/gallery${item.id}-320_x_240.jpeg 320w"
                media="(max-width: 320px)">
        <source srcset="images/gallery${item.id}-640_x_480.jpeg 640w"
                media="(max-width: 640px)">
        <source srcset="images/gallery${item.id}-1024_x_768.jpeg 1024w,"
                media="(max-width: 1024px)">
        <img class='gallery-item-img' src="images/gallery${item.id}-1024_x_768.jpeg" data-id="${item.id}" alt="placeholder">
      </picture>
      <!-- <img class='gallery-item-img' src= ${item.image.src} data-id="${item.id}" /> -->
      <p>${item.author}</p>
    </div>
  `
  gallery.push($item)
}

// render all images
$gallery.innerHTML += gallery.join('')

$gallery.addEventListener('mouseover',handleMouseover)
$gallery.addEventListener('mouseout',handleMouseout)
$gallery.addEventListener('click',handleItemClick)

function handleItemClick(e) {
  if(e.target.classList.contains('gallery-item-img')){
    const id = e.target.dataset.id-1
    console.log(e.target.src,galleryData[id][0])
    const showroomContent = `
    <div class = 'showroom-image'>
      <picture>
        <source srcset="images/gallery${id+1}-320_x_240.jpeg 320w"
                media="(max-width: 320px)">
        <source srcset="images/gallery${id+1}-640_x_480.jpeg 320w"
                media="(max-width: 640px)">
        <source srcset="images/gallery${id+1}-1024_x_768.jpeg 320w"
                media="(max-width: 1024px)">
        <img src='${e.target.src}'/>
      </picture>
    </div>
    <div class='image-detail'>
      <p>Author: ${galleryData[id][0]}</p>
      <hr>
      <p>Pubilish Date: ${galleryData[id][1]}</p>
      <hr>
      <p>Camera: ${galleryData[id][2]}</p>
      <hr>
      <button id = 'downloadBtn' data-id = '${id+1}'>Download</a></button>
    </div>
    `
    $showroom.innerHTML = showroomContent
    
    const $downloadBtn = document.getElementById('downloadBtn')
    $downloadBtn.addEventListener('click',downloadImage)
    // scroll back to the top
    window.scrollTo({top:0, behavior:'smooth'})
  }
}

function handleMouseover(e) {
  if(e.target.classList.contains('gallery-item-img')){
    e.target.style.opacity = '0.6'
    document.body.style.cursor = 'pointer'
  }
}

function handleMouseout(e) {
  e.target.style.opacity = '1'
  document.body.style.cursor = 'default'
}

// download this image
function downloadImage(e) {
  const img = document.createElement('a')
  const id = e.target.dataset.id
  const imageUrl = '/images/gallery'+id+'.jpeg'
  const fileName = 'gallery'+id+'.jpeg'

  img.href = imageUrl
  img.download = fileName
  img.click()
}