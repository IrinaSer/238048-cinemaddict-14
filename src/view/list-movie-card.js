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

const createListMovieCardTemplate = (movie, comments) => {
  const {
    poster,
    title,
    rating,
    releaseYear,
    duration,
    genre,
    description,
    isToWatchlist,
    isWatched,
    isFavorite,
  } = movie;
  const commentsCount = comments.length;

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
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist
    ${isToWatchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched
    ${isWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite
    ${isFavorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export default class MovieCard extends AbstractView {
  constructor(movie = MOVIE_CARD, comments) {
    super();
    this._movie = movie;
    this._comments = comments;
    this._showPopupHandler = this._showPopupHandler.bind(this);
    this._toWatchlistClickHandler = this._toWatchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createListMovieCardTemplate(this._movie, this._comments);
  }

  _showPopupHandler(evt) {
    evt.preventDefault();
    this._callback.showPopup();
  }

  setShowPopupHandler(callback) {
    this._callback.showPopup = callback;
    this.getElement()
      .querySelector('.film-card__poster')
      .addEventListener('click', this._showPopupHandler);
    this.getElement()
      .querySelector('.film-card__title')
      .addEventListener('click', this._showPopupHandler);
    this.getElement()
      .querySelector('.film-card__comments')
      .addEventListener('click', this._showPopupHandler);
  }

  _toWatchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.toWatchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setToWatchlistClickHandler(callback) {
    this._callback.toWatchlistClick = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this._toWatchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this._favoriteClickHandler);
  }
}
