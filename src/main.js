import SiteMenuView from './view/site-menu.js';
import UserView from './view/site-user.js';
import SortingView from './view/sorting.js';
import FilmsView from './view/films.js';
import FilmsListView from './view/films-list.js';
import FilmsListContainerView from './view/film-list-container.js';
import LoadMoreButtonView from './view/load-more-button.js';
import StatisticsView from './view/statistics.js';
import MovieCardView from './view/list-movie-card.js';
import PopupView from './view/popup.js';
import NoFilmView from './view/no-film.js';
import { generateMovie } from './mock/movie.js';
import { generateFilter } from './mock/filter.js';
import { render, RenderPosition, remove } from './utils/render.js';

const MOVIE_COUNT = 20;
const MOVIE_COUNT_PER_STEP = 5;
const EXTRA_MOVIE_COUNT = 2;

const movies = new Array(MOVIE_COUNT).fill().map(generateMovie);
const filters = generateFilter(movies);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterStatisticElement = document.querySelector('.footer__statistics');

render(siteHeaderElement, new UserView(), RenderPosition.BEFOREEND);

const renderMovie = (movieListElement, movie) => {
  const movieComponent = new MovieCardView(movie);

  const showDetailInfoPopup = () => {
    const movieDetailInfoComponent = new PopupView(movie);

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        hideDetailInfoPopup(movieDetailInfoComponent.getElement());
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const onPopupCloseHandler = () => {
      hideDetailInfoPopup(movieDetailInfoComponent.getElement());
      movieDetailInfoComponent.deleteClosePopupHandler();
      document.removeEventListener('keydown', onEscKeyDown);
    };

    siteMainElement.appendChild(movieDetailInfoComponent.getElement());
    document.addEventListener('keydown', onEscKeyDown);
    movieDetailInfoComponent.setClosePopupHandler(onPopupCloseHandler);
  };

  const hideDetailInfoPopup = (element) => {
    siteMainElement.removeChild(element);
  };

  movieComponent.setShowPopupHandler(showDetailInfoPopup);

  render(movieListElement, movieComponent, RenderPosition.BEFOREEND);
};

const renderMovies = (moviesContainer, movies) => {
  const filmsComponent = new FilmsView();
  const filmsListComponent = new FilmsListView('All movies. Upcoming');
  const filmsListContainerComponent = new FilmsListContainerView();

  if (movies.length === 0) {
    render(moviesContainer, filmsComponent, RenderPosition.BEFOREEND);
    render(filmsComponent, new NoFilmView(), RenderPosition.BEFOREEND);
    return;
  }

  render(siteMainElement, new SortingView(), RenderPosition.BEFOREEND);
  render(moviesContainer, filmsComponent, RenderPosition.BEFOREEND);

  render(filmsComponent, filmsListComponent, RenderPosition.BEFOREEND);
  render(filmsListComponent, filmsListContainerComponent, RenderPosition.BEFOREEND);

  for (let i = 0; i < Math.min(movies.length, MOVIE_COUNT_PER_STEP); i++) {
    renderMovie(filmsListContainerComponent.getElement(), movies[i]);
  }

  if (movies.length > MOVIE_COUNT_PER_STEP) {
    let renderedMovieCount = MOVIE_COUNT_PER_STEP;

    const loadMoreButtonComponent = new LoadMoreButtonView();

    render(filmsListComponent, loadMoreButtonComponent, RenderPosition.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {
      movies
        .slice(renderedMovieCount, renderedMovieCount + MOVIE_COUNT_PER_STEP)
        .forEach((movie) => renderMovie(filmsListContainerComponent.getElement(), movie));

      renderedMovieCount += MOVIE_COUNT_PER_STEP;

      if (renderedMovieCount >= movies.length) {
        remove(loadMoreButtonComponent);
      }
    });
  }

  const ratedFilmsListComponent = new FilmsListView('Top rated', true);
  const ratedFilmsListContainerComponent = new FilmsListContainerView();
  render(filmsComponent, ratedFilmsListComponent, RenderPosition.BEFOREEND);
  render(ratedFilmsListComponent, ratedFilmsListContainerComponent, RenderPosition.BEFOREEND);

  const topMovies = new Array(EXTRA_MOVIE_COUNT).fill().map(generateMovie);

  for (let i = 0; i < EXTRA_MOVIE_COUNT; i++) {
    renderMovie(ratedFilmsListContainerComponent.getElement(), topMovies[i]);
  }

  const commentedFilmsListComponent = new FilmsListView('Most commented', true);
  const commentedFilmsListContainerComponent = new FilmsListContainerView();
  render(filmsComponent, commentedFilmsListComponent, RenderPosition.BEFOREEND);
  render(commentedFilmsListComponent, commentedFilmsListContainerComponent, RenderPosition.BEFOREEND);

  const commentedMovies = new Array(EXTRA_MOVIE_COUNT).fill().map(generateMovie);

  for (let i = 0; i < EXTRA_MOVIE_COUNT; i++) {
    renderMovie(commentedFilmsListContainerComponent.getElement(), commentedMovies[i]);
  }
};

render(siteMainElement, new SiteMenuView(filters), RenderPosition.AFTERBEGIN);

renderMovies(siteMainElement, movies);

render(siteFooterStatisticElement, new StatisticsView(movies.length), RenderPosition.BEFOREEND);
