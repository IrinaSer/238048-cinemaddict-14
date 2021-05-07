import FilmsView from '../view/films';
import NoFilmView from '../view/no-film';
import FilmsListView from '../view/films-list';
import FilmsListContainerView from '../view/film-list-container';
import { render, RenderPosition, remove, replace } from '../utils/render';
import UserView from '../view/site-user';
import StatisticsView from '../view/statistics';
import SortView from '../view/sorting';
import LoadMoreButtonView from '../view/load-more-button';
import MoviePresenter from './movie.js';
import {SortType, UpdateType, UserAction} from '../const.js';
import {sortMoviesByDate, sortMoviesByRating} from '../utils/movies.js';
import {filter} from '../utils/filter.js';

const MOVIE_COUNT_PER_STEP = 5;

export default class Board {

  constructor(boardContainer, headerContainer, footerContainer, moviesModel, filterModel) {
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._boardContainer = boardContainer;
    this._headerContainer = headerContainer;
    this._footerContainer = footerContainer;
    this._renderedMovieCount = MOVIE_COUNT_PER_STEP;
    this._moviePresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = null;
    this._loadMoreButtonComponent = null;

    this._boardComponent = new FilmsView();
    this._movieListComponent = new FilmsListView('All movies. Upcoming');
    this._movieListContainer = new FilmsListContainerView();
    this._noMovieComponent = new NoFilmView();
    this._ratedFilmsList = new FilmsListView('Top rated', true);
    this._ratedFilmsListContainer = new FilmsListContainerView();
    this._commentedFilmsList = new FilmsListView('Most commented', true);
    this._commentedFilmsListContainer = new FilmsListContainerView();
    this._userComponent = new UserView();
    this._statisticsComponent = null;

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._statisticsComponent = new StatisticsView(this._getMovies().length);

    this._renderBoard();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._boardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderMovie(movieListElement, movie) {
    const moviePresenter = new MoviePresenter(movieListElement, this._handleViewAction, this._handleModeChange);

    moviePresenter.init(movie);
    this._moviePresenter[movie.id] = moviePresenter;
  }

  _renderMovies(movies, container) {
    movies.forEach((movie) => this._renderMovie(container, movie));
  }

  _renderNoMovies() {
    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._noMovieComponent, RenderPosition.BEFOREEND);
  }

  _renderLoadMoreButton() {
    if (this._loadMoreButtonComponent !== null) {
      this._loadMoreButtonComponent = null;
    }

    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);

    render(this._movieListComponent, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _handleLoadMoreButtonClick() {
    const movieCount = this._getMovies().length;
    const newRenderedMovieCount = Math.min(movieCount, this._renderedMovieCount + MOVIE_COUNT_PER_STEP);
    const movies = this._getMovies().slice(this._renderedMovieCount, newRenderedMovieCount);

    this._renderMovies(movies, this._movieListContainer);
    this._renderedMovieCount = newRenderedMovieCount;

    if (this._renderedMovieCount >= movieCount) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderBoard() {
    this._renderStatistics();

    const movies = this._getMovies();
    const moviesCount = movies.length;

    if (moviesCount === 0) {
      this._renderNoMovies();
      return;
    }
    this._renderUser();
    this._renderSort();

    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._movieListComponent, RenderPosition.BEFOREEND);
    render(this._movieListComponent, this._movieListContainer, RenderPosition.BEFOREEND);

    this._renderMovies(movies.slice(0, Math.min(moviesCount, this._renderedMovieCount)), this._movieListContainer);

    if (moviesCount > this._renderedMovieCount) {
      this._renderLoadMoreButton();
    }
  }

  _renderUser() {
    render(this._headerContainer, this._userComponent, RenderPosition.BEFOREEND);
  }

  _renderStatistics() {
    render(this._footerContainer, this._statisticsComponent, RenderPosition.BEFOREEND);
  }

  _renderExtraMovies (component, container, items) {
    render(this._boardComponent, component, RenderPosition.BEFOREEND);
    render(component, container, RenderPosition.BEFOREEND);
    this._renderMovies(items, container);
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this._moviesModel.updateMovie(updateType, update);
        break;
      case UserAction.ADD_TASK:
        break;
      case UserAction.DELETE_TASK:
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._moviePresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedMovieCount: true, resetSortType: true});
        this._renderBoard();
        break;
    }
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

    this._currentSortType = sortType;
    this._clearBoard({resetRenderedMovieCount: true});
    this._renderBoard();

    const prevSortComponent = this._sortComponent;
    this._sortComponent = new SortView(sortType);
    replace(this._sortComponent, prevSortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _getMovies() {
    const filterType = this._filterModel.getFilter();
    const movies = this._moviesModel.getMovies();
    const filteredTasks = filter[filterType](movies);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredTasks.sort(sortMoviesByDate);
      case SortType.RATING:
        return filteredTasks.sort(sortMoviesByRating);
    }

    return filteredTasks;
  }

  _clearBoard({resetRenderedMovieCount = false, resetSortType = false} = {}) {
    const movieCount = this._getMovies().length;

    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};

    remove(this._sortComponent);
    remove(this._noMovieComponent);
    remove(this._loadMoreButtonComponent);

    if (resetRenderedMovieCount) {
      this._renderedMovieCount = MOVIE_COUNT_PER_STEP;
    } else {
      this._renderedMovieCount = Math.min(movieCount, this._renderedMovieCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }
}
