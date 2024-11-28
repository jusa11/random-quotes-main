import {
  localStorageSetItem,
  localStorageGetItem,
} from './utils/localStorage.js';
import updateFavoriteButton from './utils/updateFavoriteButton.js';

const FAVORITE_QUTES = 'favoriteQoute';
let favoritesQutes = localStorageGetItem(FAVORITE_QUTES) || [];

// Создает карточку для избранной цитаты
function createFavoriteCard(qoute) {
  const favoritesQoute = document.createElement('div');
  const favoritesCard = document.querySelector('.favorites-qoutes-item');
  favoritesQoute.classList.add('favorites-qoute');
  favoritesQoute.setAttribute('data-qoute-id', qoute.id);

  const qouteText = document.querySelector('.quotes-content-text');
  qouteText.setAttribute('is-favorit', 'true');
  favoritesQoute.innerHTML = `${qoute.text} (${qoute.author}) <span class="remove-btn">★</span>`;
  favoritesCard.prepend(favoritesQoute);
}

// Отрисовывает карточки с избранными цитатами из localStorage
function renderFavoritesCardLocalStorage() {
  const qoutes = localStorageGetItem(FAVORITE_QUTES);
  if (qoutes && qoutes.length > 0) {
    qoutes.forEach((qoute) => createFavoriteCard(qoute));
  } else {
    console.log('У вас нет избранных цитат');
  }
}

// Убирает карточку с избранное цитатой
function hideFavoriteCard(qoute, btn) {
  favoritesQutes = favoritesQutes.filter((q) => q.id !== qoute.id);
  localStorageSetItem(FAVORITE_QUTES, favoritesQutes);

  const cardQute = document.querySelector(
    `.favorites-qoute[data-qoute-id = '${qoute.id}']`
  );
  cardQute.remove();
  updateFavoriteButton(favoritesQutes, btn);
}

// Показывает карточку с избранной цитатой
function showFavoriteCard(qoute, btn) {
  favoritesQutes.push(qoute);
  localStorageSetItem(FAVORITE_QUTES, favoritesQutes);
  createFavoriteCard(qoute);
  updateFavoriteButton(qoute, btn);
}

// Убирает карточку с избранное цитатой при клике на нее
function initFavoritesHandler(btn) {
  const favoriteItem = document.querySelector('.favorites-qoutes-item');
  if (!favoriteItem.hasAttribute('data-handler-initialized')) {
    favoriteItem.addEventListener('click', (event) => {
      if (event.target.classList.contains('remove-btn')) {
        const card = event.target.parentElement;
        // По какой именно цитате кликнули
        const quteId = card.getAttribute('data-qoute-id');
        const qoute = favoritesQutes.find((q) => q.id === +quteId);
        hideFavoriteCard(qoute, btn);

        /* favoritesQutes = favoritesQutes.filter((q) => q.id !== qoute.id);
        localStorageSetItem(FAVORITE_QUTES, favoritesQutes);
        const cardQute = document.querySelector(
          `.favorites-qoute[data-qoute-id = '${qoute.id}']`
        );
        cardQute.remove();
        const currentQute = document
          .querySelector('.quotes-content-text')
          .getAttribute('data-qoute-id');
        quteId === currentQute ? btn.classList.remove('active') : false;
        card.remove(); */
      }
    });
  }
}

export {
  hideFavoriteCard,
  showFavoriteCard,
  initFavoritesHandler,
  renderFavoritesCardLocalStorage,
};

export default favoritesQutes;

/* 
1. Сделать снова кнопку избранного
*/
