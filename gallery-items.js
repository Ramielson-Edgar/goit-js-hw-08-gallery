import items from './js/items.js';

const refs = {

  $gallery: document.querySelector('.gallery.js-gallery'),

  $lightbox: document.querySelector('.lightbox.js-lightbox'),

  $lightboximage: document.querySelector('.lightbox__image'),
  
  $lightboxoverlay: document.querySelector('.lightbox__overlay'),
 
  $buttonActionClose: document.querySelector('button[data-action="close-lightbox"]') 
    
}

const { $gallery, $lightbox, $lightboximage, $buttonActionClose , $lightboxoverlay} = refs

const markup  = creatGalleryElement(items)

let currentIdx = null


$gallery.addEventListener('click', hadleClickGallery)
$buttonActionClose.addEventListener('click', handleClickCloseButton)
$lightboxoverlay.addEventListener('click', handleCloseModal)
window.addEventListener('keydown', handleCloseModaShortcuts)

function hadleClickGallery(e) {
    e.preventDefault()
    
  if (e.target.nodeName === 'IMG') {
    $lightbox.classList.add('is-open');
    $lightboximage.src = e.target.dataset.source;
    $lightboximage.alt = e.target.dataset.alt;
 
  }
}

function handleClickCloseButton() {
   handleCloseModal()
   handleCloseModaShortcuts(e)

}

function handleCloseModal() {
    $lightbox.classList.remove('is-open');
    $lightboximage.src = ''
    $lightboximage.alt = ''
    initionalIdx = null
}

function handleCloseModaShortcuts(e) {
    if (e.code === 'Escape') {
      handleCloseModal()   
    }
    
     if (e.code === 'ArrowRight') {
       hadleNextImgaes()
    }
  
    if (e.code === 'ArrowLeft') {
      hadlePrevImg() 
  } 


}

function hadleNextImgaes() {
    currentIdx = items.length - 1 === currentIdx ? 0 : currentIdx + 1;
    const { description, original } = items[currentIdx]
    $lightboximage.src = original
    $lightboximage.alt = description
}

function hadlePrevImg() {
    currentIdx = currentIdx === 0 ? items.length - 1 : currentIdx -1;
    const { description, original } = items[currentIdx]
    $lightboximage.src = original
    $lightboximage.alt = description
}

function creatGalleryElement(array) {
  return array.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
 <a class="gallery__link" href="${original}">
<img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/>
</a> </li>` }).join('')

}

$gallery.insertAdjacentHTML('beforeend',markup)