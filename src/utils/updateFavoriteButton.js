import { localStorageGetItem } from './localStorage.js';
// Меняет цвет иконки в зависимости от есть цитата в избранном или нет

const updateFavoriteButton = (qoute, btn) => {
  const favoriteQoutes = localStorageGetItem('favoriteQoute');
  if (favoriteQoutes !== null) {
    localStorageGetItem('favoriteQoute').find((q) => {
      return btn.classList.toggle('active', q.id === qoute.id);
    });
  }
};

export default updateFavoriteButton;
