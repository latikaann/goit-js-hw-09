// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryBox = document.querySelector('.gallery');
const cardsMarkup = createCard(galleryItems);
// console.log(createCard(galleryItems));

galleryBox.insertAdjacentHTML('beforeend', cardsMarkup);
galleryBox.addEventListener('click', onCardClick);

function createCard(galleryItems) {
  const markup = galleryItems
    .map(({ preview, original, description }) => {
      return `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>
`;
    })
    .join('');
  return markup;
}
//
// =================  не потрібна, виконує бібліотека
//
// function onCardClick(event) {
//   event.preventDefault();
//   if (!event.target.classList.contains('gallery__image')) {
//     return;
//   }
// }
let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
