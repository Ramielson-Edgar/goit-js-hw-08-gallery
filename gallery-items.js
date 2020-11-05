import galleryImg from './js/items.js';

const refs = {

  $gallery: document.querySelector('.gallery.js-gallery'),

  $lightbox: document.querySelector('.lightbox.js-lightbox'),

  $lightboximage: document.querySelector('.lightbox__image'),
  
  $lightboxoverlay: document.querySelector('.lightbox__overlay'),
 
  $buttonActionClose: document.querySelector('button[data-action="close-lightbox"]') 
    
}

const { $gallery, $lightbox, $lightboximage, $buttonActionClose, $lightboxoverlay } = refs

let currentIdx = null


$gallery.addEventListener('click', hadleClickGallery)
$buttonActionClose.addEventListener('click', handleClickCloseButton)
$lightboxoverlay.addEventListener('click', handleCloseModal)

function hadleClickGallery(e) {
  e.preventDefault()
  
  const { dataset, alt, nodeName } = e.target 
  
  if (nodeName === 'IMG') {
    const { source, id } = dataset
    hendelModalOpen(source, alt, +id )
  }
}

function hendelModalOpen(src, alt, id) {

   $lightbox.classList.add('is-open');
   $lightboximage.src = src
   $lightboximage.alt = alt
   currentIdx = id
  window.addEventListener('keydown', hendKeypress)
  
}

function handleClickCloseButton() {
  handleCloseModal()
}

function handleCloseModal() {
    $lightbox.classList.remove('is-open');
    $lightboximage.src = ''
    $lightboximage.alt = ''
  currentIdx = null
  
   window.removeEventListener('keypress', hendKeypress)
    

}

function hendKeypress({code}) {
  code === 'Escape' && handleCloseModal()
  code === 'ArrowRight' && hadleNextImgaes()
  code === 'ArrowLeft' && hadlePrevImg()


}

function hadleNextImgaes() {
    currentIdx =  galleryImg.length - 1 === currentIdx ? 0 : currentIdx + 1;
    const {original, description } =  galleryImg[currentIdx]
    $lightboximage.src = original
    $lightboximage.alt = description
}

function hadlePrevImg() {
    currentIdx = currentIdx === 0 ? galleryImg.length - 1 : currentIdx - 1;
    const { original, description} = galleryImg[currentIdx]
    $lightboximage.src = original
    $lightboximage.alt = description
}

function creatGalleryElementMarkup({ preview, original, description }, i) {
    return `<li class="gallery__item">
 <a class="gallery__link" href="${original}">

<img data-id="${i}"class="gallery__image" 
src="${preview}" data-source="${original}" 
alt="${description}"/>
</a> </li>` 

}

function creatGalleryMarkup(items) {
  return items.map(creatGalleryElementMarkup).join('')
}


function renderGallery(markup) {
  $gallery.insertAdjacentHTML('beforeend', markup)
}


renderGallery(creatGalleryMarkup(galleryImg))

window