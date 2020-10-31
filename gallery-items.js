import products from './js/exports.js';
console.log(products)

const linkImageItem = products

 


 const galleryEl = document.querySelector('.js-gallery')

 const modalImg = document.querySelector('.js-lightbox')

 const fullImg = document.querySelector('.lightbox__image')

 const btnOpenGallery = document.querySelector('button[data-action="open-modla-window"]')
 
 const btnAction = document.querySelector('button[data-action="close-lightbox"]')
  
  
  



btnAction.addEventListener('click', btnCloseImagePrevieW)

const markUp  = creatHTMEl(linkImageItem)

galleryEl.addEventListener('click', openModalWindow)
galleryEl.insertAdjacentHTML('beforeend', markUp)



function creatHTMEl(code) {
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

function openModalWindow(ev) {
  ev.preventDefault()

  if (ev.target.nodeName === 'IMG') {

   modalImg.classList.add('is-open');
    fullImg.src = ev.target.dataset.source;
   fullImg.alt = ev.target.dataset.alt;
  }



 
}

function btnCloseImagePrevieW(event) {
    event.preventDefault()

  if (event.target.nodeName === 'BUTTON') {
   modalImg.classList.remove('is-open');
    fullImg.src = ev.target.src('')

  }




}


btnOpenGallery.addEventListener('click',OpenGallery )


function OpenGallery(e) {


  if (e.target.nodeName === 'BUTTON') {
  galleryEl.classList.toggle('is-open')
  }

}