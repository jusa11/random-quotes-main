'use strict';
import qoutes from './data/qoutes.js';
import {
  hideFavoriteCard,
  showFavoriteCard,
  initFavoritesHandler,
  renderFavoritesCardLocalStorage,
} from './src/favoritesHandler.js';
import favoritesQutes from './src/favoritesHandler.js';
import { generateRandomInt } from './src/utils/generateRandomInt.js';
import {
  localStorageSetItem,
  clearLocalStorage,
  localStorageGetItem,
} from './src/utils/localStorage.js';
import updateFavoriteButton from './src/utils/updateFavoriteButton.js';

const generateBtn = document.getElementById('generate-btn');
const favoritesBtn = document.querySelector('.favorites-btn');
const deleteBtn = document.querySelector('.delete-btn');
let currentQute = null;

// Показывает цитату
function showQute(qoute) {
  const qouteAuthor = document.querySelector('.quotes-content-author');
  const qouteText = document.querySelector('.quotes-content-text');
  qouteText.setAttribute('data-qoute-id', qoute.id);
  const { text, author } = qoute;
  qouteText.textContent = `"${text}"`;
  qouteAuthor.textContent = author;
}

// Выдает цитату из массива цитат
const generateRandomQoutes = () => {
  currentQute = generateRandomInt(qoutes);
  showQute(currentQute);
  localStorageSetItem(`currentQuteID`, currentQute.id);
  updateFavoriteButton(currentQute, favoritesBtn);
};

// Добавляет/убирает цитату в избранное
const addToFavorites = () => {
  if (
    document.querySelector(
      `.favorites-qoute[data-qoute-id = '${currentQute.id}']`
    )
  ) {
    hideFavoriteCard(currentQute, favoritesBtn);
  } else {
    showFavoriteCard(currentQute, favoritesBtn);
  }
};

// Удаляет все цитаты из избранного
const deleteAllQutes = () => {
  const favarr = Array.from(document.querySelectorAll('.favorites-qoute'));
  if (favarr) {
    favarr.forEach((card) => {
      card.remove();
      favoritesQutes.length = 0;
      clearLocalStorage();
    });

    const cards = document.querySelectorAll('.favorites-qoutes-qoute');
    favoritesBtn.classList.toggle('active', cards === 0);
  }
};

function defineCurrentQute() {
  const getCurrentQuteID = localStorageGetItem('currentQuteID');
  currentQute = qoutes.find((el) => el.id === +getCurrentQuteID);
  return currentQute ? showQute(currentQute) : generateRandomQoutes();
}

// Запуск приложения
function initApp() {
  defineCurrentQute();
  renderFavoritesCardLocalStorage(favoritesBtn);
  updateFavoriteButton(currentQute, favoritesBtn);
}

// Убирает карточку с избранное цитатой при клике на нее
initFavoritesHandler(favoritesBtn);

generateBtn.addEventListener('click', generateRandomQoutes);
favoritesBtn.addEventListener('click', addToFavorites);
deleteBtn.addEventListener('click', deleteAllQutes);
window.addEventListener('load', initApp);

export { showQute, generateRandomQoutes };
