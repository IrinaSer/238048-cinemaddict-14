import FilmsView from '../view/films';
import NoFilmView from '../view/no-film';
import FilmsListView from '../view/films-list';
import FilmsListContainerView from '../view/film-list-container';
import { render, RenderPosition, remove } from '../utils/render';
import UserView from '../view/site-user';
import StatisticsView from '../view/statistics';
import SiteMenuView from '../view/site-menu';
import { generateFilter } from '../mock/filter';
import SortingView from '../view/sorting';
import LoadMoreButtonView from '../view/load-more-button';
import MoviePresenter from './movie.js';
import {updateItem} from '../utils/common.js';
import {SortType} from '../const.js';
import {sortMoviesByDate, sortMoviesByRating} from '../utils/movies.js';

const MOVIE_COUNT_PER_STEP = 5;

export default class Board {

  constructor(boardContainer, headerContainer, footerContainer) {
    this._boardContainer = boardContainer;
    this._headerContainer = headerContainer;
    this._footerContainer = footerContainer;
    this._renderedMovieCount = MOVIE_COUNT_PER_STEP;
    this._moviePresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._boardComponent = new FilmsView();
    this._sortComponent = new SortingView();
    this._movieListComponent = new FilmsListView('All movies. Upcoming');
    this._movieListContainer = new FilmsListContainerView();
    this._noMovieComponent = new NoFilmView();
    this._ratedFilmsList = new FilmsListView('Top rated', true);
    this._ratedFilmsListContainer = new FilmsListContainerView();
    this._commentedFilmsList = new FilmsListView('Most commented', true);
    this._commentedFilmsListContainer = new FilmsListContainerView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._userComponent = new UserView();
    this._statisticsComponent = null;
    this._menuComponent = null;

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleMovieChange = this._handleMovieChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(movieItems, ratedMovies, commentedMovies) {
    this._movieItems = movieItems.slice();
    this._ratedMovieItems = ratedMovies.slice();
    this._commentedMovieItems = commentedMovies.slice();
    this._filterItems = generateFilter(movieItems);
    this._sourcedMovieItems = movieItems.slice();

    this._statisticsComponent = new StatisticsView(this._movieItems.length);
    this._menuComponent = new SiteMenuView(this._filterItems);

    this._renderBoard();
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderMovie(movieListElement, movie) {
    const moviePresenter = new MoviePresenter(movieListElement, this._boardContainer, this._handleMovieChange, this._handleModeChange);

    moviePresenter.init(movie);
    this._moviePresenter[movie.id] = moviePresenter;
  }

  _clearMovieList() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};
    this._renderedMovieCount = MOVIE_COUNT_PER_STEP;
    remove(this._loadMoreButtonComponent);
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
    render(this._movieListComponent, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _handleLoadMoreButtonClick() {
    this._renderMovies(this._movieItems, this._renderedMovieCount, this._renderedMovieCount + MOVIE_COUNT_PER_STEP,
      this._movieListContainer);

    this._renderedMovieCount += MOVIE_COUNT_PER_STEP;

    if (this._renderedMovieCount >= this._movieItems.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderMovieList() {
    this._renderMovies(this._movieItems, 0, Math.min(this._movieItems.length, MOVIE_COUNT_PER_STEP),
      this._movieListContainer);

    if (this._movieItems.length > MOVIE_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }

    this._renderExtraMovies(this._ratedFilmsList, this._ratedFilmsListContainer, this._ratedMovieItems);
    this._renderExtraMovies(this._commentedFilmsList, this._commentedFilmsListContainer, this._commentedMovieItems);
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
  }

  _renderUser() {
    render(this._headerContainer, this._userComponent, RenderPosition.BEFOREEND);
  }

  _renderStatistics() {
    render(this._footerContainer, this._statisticsComponent, RenderPosition.BEFOREEND);
  }

  _renderMenu() {
    render(this._boardContainer, this._menuComponent, RenderPosition.AFTERBEGIN);
  }

  _renderExtraMovies (component, container, items) {
    render(this._boardComponent, component, RenderPosition.BEFOREEND);
    render(component, container, RenderPosition.BEFOREEND);
    this._renderMovies(items, 0, items.length,
      container);
  }

  _handleMovieChange(updatedMovie) {
    this._movieItems = updateItem(this._movieItems, updatedMovie);
    this._sourcedMovieItems = updateItem(this._sourcedMovieItems, updatedMovie);
    this._moviePresenter[updatedMovie.id].init(updatedMovie);
  }

  _handleModeChange() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTasks(sortType);
    this._clearMovieList();
    this._renderMovieList();
  }

  _sortTasks(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._movieItems.sort(sortMoviesByDate);
        break;
      case SortType.RATING:
        this._movieItems.sort(sortMoviesByRating);
        break;
      default:
        this._movieItems = this._sourcedMovieItems.slice();
    }

    this._currentSortType = sortType;
  }
}
