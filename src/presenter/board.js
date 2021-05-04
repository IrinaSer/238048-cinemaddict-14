import FilmsView from '../view/films';
import NoFilmView from '../view/no-film';
import FilmsListView from '../view/films-list';
import FilmsListContainerView from '../view/film-list-container';
import { render, RenderPosition, remove, append } from '../utils/render';
import UserView from '../view/site-user';
import StatisticsView from '../view/statistics';
import SiteMenuView from '../view/site-menu';
import { generateFilter } from '../mock/filter';
import SortingView from '../view/sorting';
import MovieCardView from '../view/list-movie-card';
import PopupView from '../view/popup';
import LoadMoreButtonView from '../view/load-more-button';

const MOVIE_COUNT_PER_STEP = 5;

export default class Board {

  constructor(boardContainer, headerContainer, footerContainer) {
    this._boardContainer = boardContainer;
    this._headerContainer = headerContainer;
    this._footerContainer = footerContainer;

    this._boardComponent = new FilmsView();
    this._sortComponent = new SortingView();
    this._movieListComponent = new FilmsListView('All movies. Upcoming');
    this._movieListContainer = new FilmsListContainerView();
    this._noMovieComponent = new NoFilmView();
    this._ratedFilmsList = new FilmsListView('Top rated', true);
    this._ratedFilmsListContainer = new FilmsListContainerView();
    this._commentedFilmsList = new FilmsListView('Most commented', true);
    this._commentedFilmsListContainer = new FilmsListContainerView();
  }

  init(movieItems, ratedMovies, commentedMovies) {
    this._movieItems = movieItems.slice();
    this._ratedMovieItems = ratedMovies.slice();
    this._commentedMovieItems = commentedMovies.slice();
    this._filterItems = generateFilter(movieItems);

    this._renderBoard();
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderMovie(movieListElement, movie) {
    const movieComponent = new MovieCardView(movie);

    const showDetailInfoPopup = () => {
      const movieDetailInfoComponent = new PopupView(movie);

      const onEscKeyDown = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          remove(movieDetailInfoComponent);
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };

      const onPopupCloseHandler = () => {
        remove(movieDetailInfoComponent);
        movieDetailInfoComponent.deleteClosePopupHandler();
        document.removeEventListener('keydown', onEscKeyDown);
      };

      append(this._boardContainer, movieDetailInfoComponent);
      document.addEventListener('keydown', onEscKeyDown);
      movieDetailInfoComponent.setClosePopupHandler(onPopupCloseHandler);
    };

    movieComponent.setShowPopupHandler(showDetailInfoPopup);

    render(movieListElement, movieComponent, RenderPosition.BEFOREEND);
  }

  _renderMovies(items, from, to, container) {
    items
      .slice(from, to)
      .forEach((movie) => this._renderMovie(container, movie));
  }

  _renderNoMovies() {
    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._noMovieComponent, RenderPosition.BEFOREEND);
  }

  _renderLoadMoreButton() {
    let renderedMovieCount = MOVIE_COUNT_PER_STEP;

    const loadMoreButtonComponent = new LoadMoreButtonView();

    render(this._movieListComponent, loadMoreButtonComponent, RenderPosition.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {
      this._renderMovies(this._movieItems, renderedMovieCount, renderedMovieCount + MOVIE_COUNT_PER_STEP,
        this._movieListContainer);

      renderedMovieCount += MOVIE_COUNT_PER_STEP;

      if (renderedMovieCount >= this._movieItems.length) {
        remove(loadMoreButtonComponent);
      }
    });
  }

  _renderMovieList() {
    this._renderMovies(this._movieItems, 0, Math.min(this._movieItems.length, MOVIE_COUNT_PER_STEP),
      this._movieListContainer);

    if (this._movieItems.length > MOVIE_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderBoard() {
    this._renderMenu();
    this._renderStatistics();

    if (this._movieItems.length === 0) {
      this._renderNoMovies();
      return;
    }
    this._renderUser();
    this._renderSort();

    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._movieListComponent, RenderPosition.BEFOREEND);
    render(this._movieListComponent, this._movieListContainer, RenderPosition.BEFOREEND);

    this._renderMovieList();
    this._renderExtraMovies(this._ratedFilmsList, this._ratedFilmsListContainer, this._ratedMovieItems);
    this._renderExtraMovies(this._commentedFilmsList, this._commentedFilmsListContainer, this._commentedMovieItems);
  }

  _renderUser() {
    render(this._headerContainer, new UserView(), RenderPosition.BEFOREEND);
  }

  _renderStatistics() {
    render(this._footerContainer, new StatisticsView(this._movieItems.length), RenderPosition.BEFOREEND);
  }

  _renderMenu() {
    render(this._boardContainer, new SiteMenuView(this._filterItems), RenderPosition.AFTERBEGIN);
  }

  _renderExtraMovies (component, container, items) {
    render(this._boardComponent, component, RenderPosition.BEFOREEND);
    render(component, container, RenderPosition.BEFOREEND);
    this._renderMovies(items, 0, items.length,
      container);
  }
}
