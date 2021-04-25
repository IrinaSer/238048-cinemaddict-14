import AbstractView from './abstract.js';

const MOVIE_CARD = {
  poster: '',
  title: '',
  rating: 0,
  releaseYear: 0,
  duration: '',
  genre: '',
  description: '',
  commentsCount: 0,
};

const createListMovieCardTemplate = (movie) => {
  const {poster, title, rating, releaseYear, duration, genre, description, commentsCount} = movie;
  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${releaseYear}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
  <p class="film-card__description">${description}</p>
  <a class="film-card__comments">${commentsCount} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export default class MovieCard extends AbstractView {
  constructor(movie = MOVIE_CARD) {
    super();
    this._movie = movie;
    this._showPopupHandler = this._showPopupHandler.bind(this);
  }

  getTemplate() {
    return createListMovieCardTemplate(this._movie);
  }

  _showPopupHandler(evt) {
    evt.preventDefault();
    this._callback.showPopup();
  }

  setShowPopupHandler(callback) {
    this._callback.showPopup = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._showPopupHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._showPopupHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._showPopupHandler);
  }
}
