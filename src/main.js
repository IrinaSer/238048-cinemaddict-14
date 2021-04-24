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
import { generateMovie } from './mock/movie.js';
import { generateFilter } from './mock/filter.js';
import { render, RenderPosition } from './utils.js';

const MOVIE_COUNT = 20;
const MOVIE_COUNT_PER_STEP = 5;
const EXTRA_MOVIE_COUNT = 2;

const movies = new Array(MOVIE_COUNT).fill().map(generateMovie);
const filters = generateFilter(movies);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterStatisticElement = document.querySelector('.footer__statistics');

render(siteHeaderElement, new UserView().getElement(), RenderPosition.BEFOREEND);

const renderMovie = (movieListElement, movie) => {
  const movieComponent = new MovieCardView(movie);
  const movieDetailInfoComponent = new PopupView(movie);

  const moviePoster = movieComponent.getElement().querySelector('.film-card__poster');
  const movieTitle = movieComponent.getElement().querySelector('.film-card__title');
  const movieComments = movieComponent.getElement().querySelector('.film-card__comments');
  const detailInfoCloseButton = movieDetailInfoComponent.getElement().querySelector('.film-details__close-btn');

  const showDetailInfoPopup = () => {
    siteMainElement.appendChild(movieDetailInfoComponent.getElement());
  };

  const hideDetailInfoPopup = () => {
    siteMainElement.removeChild(movieDetailInfoComponent.getElement());
  };

  moviePoster.addEventListener('click', showDetailInfoPopup);
  movieTitle.addEventListener('click', showDetailInfoPopup);
  movieComments.addEventListener('click', showDetailInfoPopup);
  detailInfoCloseButton.addEventListener('click', hideDetailInfoPopup);

  render(movieListElement, movieComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderMovies = (moviesContainer, movies) => {
  const filmsComponent = new FilmsView();
  const filmsListComponent = new FilmsListView('All movies. Upcoming');
  const filmsListContainerComponent = new FilmsListContainerView();
  render(moviesContainer, filmsComponent.getElement(), RenderPosition.BEFOREEND);
  render(filmsComponent.getElement(), filmsListComponent.getElement(), RenderPosition.BEFOREEND);
  render(filmsListComponent.getElement(), filmsListContainerComponent.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < Math.min(movies.length, MOVIE_COUNT_PER_STEP); i++) {
    renderMovie(filmsListContainerComponent.getElement(), movies[i]);
  }

  if (movies.length > MOVIE_COUNT_PER_STEP) {
    let renderedMovieCount = MOVIE_COUNT_PER_STEP;

    const loadMoreButtonComponent = new LoadMoreButtonView();

    render(filmsListComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    loadMoreButtonComponent.getElement().addEventListener('click', (evt) => {
      evt.preventDefault();
      movies
        .slice(renderedMovieCount, renderedMovieCount + MOVIE_COUNT_PER_STEP)
        .forEach((movie) => renderMovie(filmsListContainerComponent.getElement(), movie));

      renderedMovieCount += MOVIE_COUNT_PER_STEP;

      if (renderedMovieCount >= movies.length) {
        loadMoreButtonComponent.getElement().remove();
        loadMoreButtonComponent.removeElement();
      }
    });
  }

  const ratedFilmsListComponent = new FilmsListView('Top rated', true);
  const ratedFilmsListContainerComponent = new FilmsListContainerView();
  render(filmsComponent.getElement(), ratedFilmsListComponent.getElement(), RenderPosition.BEFOREEND);
  render(ratedFilmsListComponent.getElement(), ratedFilmsListContainerComponent.getElement(), RenderPosition.BEFOREEND);

  const topMovies = new Array(EXTRA_MOVIE_COUNT).fill().map(generateMovie);

  for (let i = 0; i < EXTRA_MOVIE_COUNT; i++) {
    renderMovie(ratedFilmsListContainerComponent.getElement(), topMovies[i]);
  }

  const commentedFilmsListComponent = new FilmsListView('Most commented', true);
  const commentedFilmsListContainerComponent = new FilmsListContainerView();
  render(filmsComponent.getElement(), commentedFilmsListComponent.getElement(), RenderPosition.BEFOREEND);
  render(commentedFilmsListComponent.getElement(), commentedFilmsListContainerComponent.getElement(), RenderPosition.BEFOREEND);

  const commentedMovies = new Array(EXTRA_MOVIE_COUNT).fill().map(generateMovie);

  for (let i = 0; i < EXTRA_MOVIE_COUNT; i++) {
    renderMovie(commentedFilmsListContainerComponent.getElement(), commentedMovies[i]);
  }
};

render(siteMainElement, new SiteMenuView(filters).getElement(), RenderPosition.AFTERBEGIN);
render(siteMainElement, new SortingView().getElement(), RenderPosition.BEFOREEND);

renderMovies(siteMainElement, movies);

render(siteFooterStatisticElement, new StatisticsView(movies.length).getElement(), RenderPosition.BEFOREEND);
