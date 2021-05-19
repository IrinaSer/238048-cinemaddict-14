import SmartView from './smart.js';

const createFilmDetailsGenreTemplate = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

const createCommentTemplate = (_comment = {}) => {
  const {
    id,
    emotion,
    comment,
    author,
    date,
  } = _comment;
  return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
            </span>
            <div>
              <p class="film-details__comment-text">${comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${date}</span>
                <button class="film-details__comment-delete" data-comment="${id}">Delete</button>
              </p>
            </div>
          </li>`;
};

const createCommentFormTemplate = () => {
  return `<div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>`;
};

const createCommentsTemplate = (comments) => {
  const commentItemsTemplate = comments
    .map((comment) => createCommentTemplate(comment))
    .join('');

  return `<section class="film-details__comments-wrap">
  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
  <ul class="film-details__comments-list">${commentItemsTemplate}</ul>
    ${createCommentFormTemplate()}
  </section>`;
};

const createPopupTemplate = (data = {}, comments) => {
  const {
    fullPoster,
    ageRating,
    title,
    originalTitle,
    rating,
    director,
    writers,
    actors,
    releaseDate,
    country,
    duration,
    genres,
    fullDescription,
    isToWatchlist,
    isWatched,
    isFavorite,
  } = data;

  const filmDetailsGenresTemplate = genres
    .map((filter) => createFilmDetailsGenreTemplate(filter))
    .join('');

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${fullPoster}" alt="${title}">

          <p class="film-details__age">${ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${originalTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}/td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            ${genres.length ? `<tr class="film-details__row">
              <td class="film-details__term">${genres.length > 1 ? 'Genres' : 'Genre'}</td>
              <td class="film-details__cell">
                ${filmDetailsGenresTemplate}
              </td>
            </tr>` : ''}
          </table>

          <p class="film-details__film-description">
            ${fullDescription}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isToWatchlist ? 'checked' : ''}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? 'checked' : ''}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? 'checked' : ''}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      ${createCommentsTemplate(comments)}
    </div>
  </form>
</section>`;
};

export default class Popup extends SmartView {
  constructor(movie, comments) {
    super();
    this._data = movie;
    this._comments = comments;

    this._closePopupHandler = this._closePopupHandler.bind(this);
    this._toWatchlistClickHandler = this._toWatchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);
    this._commentDeleteHandler = this._commentDeleteHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this._data, this._comments);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this._closePopupHandler);
    this.getElement()
      .querySelector('.film-details__control-label--watchlist')
      .addEventListener('click', this._toWatchlistClickHandler);
    this.getElement()
      .querySelector('.film-details__control-label--watched')
      .addEventListener('click', this._watchedClickHandler);
    this.getElement()
      .querySelector('.film-details__control-label--favorite')
      .addEventListener('click', this._favoriteClickHandler);
    this.getElement()
      .querySelectorAll('.film-details__comment-delete')
      .forEach((item) => item.addEventListener('click', this._commentDeleteHandler));
    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this._commentInputHandler);
    this.getElement()
      .querySelectorAll('.film-details__emoji-item')
      .forEach((item) => item.addEventListener('change', this._emojiChangeHandler));
  }

  _closePopupHandler(evt) {
    evt.preventDefault();
    this._callback.closePopup(Popup.parseDataToMovie(this._data));
  }

  _toWatchlistClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isToWatchlist: !this._data.isToWatchlist,
    });
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isWatched: !this._data.isWatched,
    });
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isFavorite: !this._data.isFavorite,
    });
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      comment: evt.target.value,
    }, true);
  }

  _emojiChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emoji: evt.target.value,
      comment: this._data.comment,
    });
  }

  _commentDeleteHandler(evt) {
    evt.preventDefault();
    const comment = this._comments.find((item) => item.id === evt.target.dataset.comment);
    this._callback.deleteComment(comment);
    this.updateData({
      comment,
    });
  }

  setClosePopupHandler(callback) {
    this._callback.closePopup = callback;
    this.getElement()
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this._closePopupHandler);
  }

  setCommentDeleteHandler(callback) {
    this._callback.deleteComment = callback;
    this.getElement()
      .querySelectorAll('.film-details__comment-delete')
      .forEach((item) => item.addEventListener('click', this._commentDeleteHandler));
  }

  close() {
    this._callback.closePopup(Popup.parseDataToMovie(this._data));
  }

  static parseDataToMovie(data) {
    data = Object.assign({}, data);

    delete data.comment;
    delete data.emoji;

    return data;
  }
}
