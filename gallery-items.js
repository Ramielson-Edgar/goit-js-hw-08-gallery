import products from './js/exports.js';

const refs = {

  $gallery:  document.querySelector('.gallery.js-gallery'),

  $lightbox:  document.querySelector('.lightbox.js-lightbox'),

  $lightboximage: document.querySelector('.lightbox__image'),
  
  $lightboxoverlay:  document.querySelector('.lightbox__overlay'),
 
  $button: document.querySelector('button[data-action="close-lightbox"]') 
    
}

const { $gallery, $lightbox, $lightboximage, $button , $lightboxoverlay} =refs

const markUp  = creatGalleryElement(products)

let initionalIdx = null


$gallery.addEventListener('click', hadleClickGallery)
$button.addEventListener('click', handleClickCloseButton)
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
    } else if (e.code === 'ArrowRight') {
          hadleNextImgaes()
    } else if (e.code === 'ArrowLeft') {
         hadlePrevImg() 
    }
    
  
}

function hadleNextImgaes() {
    initionalIdx = products.length - 1 === initionalIdx ? 0 :  initionalIdx + 1;
    const { description, original } = products[initionalIdx]
    $lightboximage.src = original
    $lightboximage.alt = description
}

function hadlePrevImg() {
    initionalIdx = initionalIdx === 0 ? products.length - 1  : initionalIdx -1;
    const { description, original } = products[initionalIdx]
    $lightboximage.src = original
    $lightboximage.alt = description
}

function creatGalleryElement(code) {
  return code.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>` 
    }).join('')

}

$gallery.insertAdjacentHTML('beforeend', markUp)