import MovieCardView from '../view/list-movie-card';
import PopupView from '../view/popup';
import { render, RenderPosition, remove, append, replace } from '../utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export default class Movie {

  constructor(movieListContainer, changeData, changeMode) {
    this._movieListContainer = movieListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._movieComponent = null;
    this._moviePopupComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleOpenPopupClick = this._handleOpenPopupClick.bind(this);
    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleToWatchlistClick = this._handleToWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(movie) {
    this._movie = movie;
    const prevMovieComponent = this._movieComponent;
    const prevMoviePopupComponent = this._moviePopupComponent;

    this._movieComponent = new MovieCardView(movie);
    this._moviePopupComponent = new PopupView(movie);

    this._movieComponent.setShowPopupHandler(this._handleOpenPopupClick);
    this._movieComponent.setToWatchlistClickHandler(this._handleToWatchlistClick);
    this._movieComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._movieComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevMovieComponent === null) {
      render(this._movieListContainer, this._movieComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._movieComponent, prevMovieComponent);

    if (this._mode === Mode.POPUP) {
      replace(this._moviePopupComponent, prevMoviePopupComponent);
      this._moviePopupComponent.setClosePopupHandler(this._handleClosePopupClick);
    }

    remove(prevMovieComponent);
    remove(prevMoviePopupComponent);
  }

  destroy() {
    remove(this._movieComponent);
    remove(this._moviePopupComponent);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._moviePopupComponent.close();
    }
  }

  _handleOpenPopupClick() {
    const siteBody = document.querySelector('body');
    append(siteBody, this._moviePopupComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._moviePopupComponent.setClosePopupHandler(this._handleClosePopupClick);
    this._changeMode();
    this._mode = Mode.POPUP;
  }

  _handleClosePopupClick(update) {
    remove(this._moviePopupComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
    this._changeData(
      update,
    );
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._handleClosePopupClick();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._movie,
        {
          isFavorite: !this._movie.isFavorite,
        },
      ),
    );
  }

  _handleToWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._movie,
        {
          isToWatchlist: !this._movie.isToWatchlist,
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._movie,
        {
          isWatched: !this._movie.isWatched,
        },
      ),
    );
  }
}
