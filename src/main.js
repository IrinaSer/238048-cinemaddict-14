import SiteMenuView from './view/site-menu.js';
import UserView from './view/site-user.js';
import SortingView from './view/sorting.js';
import {createListMovieCardTemplate} from './view/list-movie-card.js';
import FilmsView from './view/films.js';
import FilmsListView from './view/films-list.js';
import FilmsListContainerView from './view/film-list-container.js';
import LoadMoreButtonView from './view/load-more-button.js';
import StatisticsView from './view/statistics.js';
import PopupView from './view/popup.js';
import {generateMovie} from './mock/movie.js';
import {generateFilter} from './mock/filter.js';
import {renderTemplate, renderElement, RenderPosition} from './utils.js';

const MOVIE_COUNT = 20;
const MOVIE_COUNT_PER_STEP = 5;
const EXTRA_MOVIE_COUNT = 2;

const movies = new Array(MOVIE_COUNT).fill().map(generateMovie);
const filters = generateFilter(movies);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterStatisticElement = document.querySelector('.footer__statistics');

renderElement(siteHeaderElement, new UserView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SortingView().getElement(), RenderPosition.BEFOREEND);

const filmsComponent = new FilmsView();
const filmsListComponent = new FilmsListView('All movies. Upcoming');
const filmsListContainerComponent = new FilmsListContainerView();
renderElement(siteMainElement, new SiteMenuView(filters).getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteMainElement, filmsComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(filmsComponent.getElement(), filmsListComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(filmsListComponent.getElement(), filmsListContainerComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(movies.length, MOVIE_COUNT_PER_STEP); i++) {
  renderTemplate(filmsListContainerComponent.getElement(), createListMovieCardTemplate(movies[i]), 'beforeend');
}

if (movies.length > MOVIE_COUNT_PER_STEP) {
  let renderedMovieCount = MOVIE_COUNT_PER_STEP;

  const loadMoreButtonComponent = new LoadMoreButtonView();

  renderElement(filmsListComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();
    movies
      .slice(renderedMovieCount, renderedMovieCount + MOVIE_COUNT_PER_STEP)
      .forEach((movie) => renderTemplate(filmsListContainerComponent.getElement(), createListMovieCardTemplate(movie), 'beforeend'));

    renderedMovieCount += MOVIE_COUNT_PER_STEP;

    if (renderedMovieCount >= movies.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}

const ratedFilmsListComponent = new FilmsListView('Top rated', true);
const ratedFilmsListContainerComponent = new FilmsListContainerView();
renderElement(filmsComponent.getElement(), ratedFilmsListComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(ratedFilmsListComponent.getElement(), ratedFilmsListContainerComponent.getElement(), RenderPosition.BEFOREEND);

const topMovies = new Array(EXTRA_MOVIE_COUNT).fill().map(generateMovie);

for (let i = 0; i < EXTRA_MOVIE_COUNT; i++) {
  renderTemplate(ratedFilmsListContainerComponent.getElement(), createListMovieCardTemplate(topMovies[i]), 'beforeend');
}

const commentedFilmsListComponent = new FilmsListView('Most commented', true);
const commentedFilmsListContainerComponent = new FilmsListContainerView();
renderElement(filmsComponent.getElement(), commentedFilmsListComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(commentedFilmsListComponent.getElement(), commentedFilmsListContainerComponent.getElement(), RenderPosition.BEFOREEND);

const commentedMovies = new Array(EXTRA_MOVIE_COUNT).fill().map(generateMovie);

for (let i = 0; i < EXTRA_MOVIE_COUNT; i++) {
  renderTemplate(commentedFilmsListContainerComponent.getElement(), createListMovieCardTemplate(commentedMovies[i]), 'beforeend');
}

renderElement(siteFooterStatisticElement, new StatisticsView(movies.length).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new PopupView(movies[1]).getElement(), RenderPosition.BEFOREEND);
