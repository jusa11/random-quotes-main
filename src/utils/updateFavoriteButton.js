// Меняет цвет иконки в зависимости от есть цитата в избранном или нет
import favoritesQutes from '../favoritesHandler.js';

const updateFavoriteButton = (qoute, btn) => {
  favoritesQutes.find((q) => {
    return btn.classList.toggle('active', q.id === qoute.id);
  });
};

export default updateFavoriteButton;
