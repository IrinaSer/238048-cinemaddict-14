import SiteMenuView from './view/site-menu.js';
import {createListMovieCardTemplate} from './view/list-movie-card.js';
import {createFilmsTemplate} from './view/films.js';
import {createLoadMoreButtonTemplate} from './view/load-more-button.js';
import {createExtraFilmsTemplate} from './view/extra-films.js';
import {createUserTemplate} from './view/site-user.js';
import {createPopupTemplate} from './view/popup.js';
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

renderElement(siteMainElement, new SiteMenuView(filters).getElement(), RenderPosition.AFTERBEGIN);
renderTemplate(siteMainElement, createFilmsTemplate(), 'beforeend');

const filmsElement = siteMainElement.querySelector('.films');
const filmsListElement = filmsElement.querySelector('.films-list');
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(movies.length, MOVIE_COUNT_PER_STEP); i++) {
  renderTemplate(filmsListContainerElement, createListMovieCardTemplate(movies[i]), 'beforeend');
}

if (movies.length > MOVIE_COUNT_PER_STEP) {
  let renderedMovieCount = MOVIE_COUNT_PER_STEP;

  renderTemplate(filmsListElement, createLoadMoreButtonTemplate(), 'beforeend');

  const loadMoreButton = filmsListElement.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    movies
      .slice(renderedMovieCount, renderedMovieCount + MOVIE_COUNT_PER_STEP)
      .forEach((movie) => renderTemplate(filmsListContainerElement, createListMovieCardTemplate(movie), 'beforeend'));

    renderedMovieCount += MOVIE_COUNT_PER_STEP;

    if (renderedMovieCount >= movies.length) {
      loadMoreButton.remove();
    }
  });
}
renderTemplate(filmsElement, createExtraFilmsTemplate('Top rated'), 'beforeend');

const topFilmsContainerElement = filmsElement.querySelector('.films-list--extra');
const topFilmsListContainerElement = topFilmsContainerElement.querySelector('.films-list__container');

const topMovies = new Array(EXTRA_MOVIE_COUNT).fill().map(generateMovie);

for (let i = 0; i < EXTRA_MOVIE_COUNT; i++) {
  renderTemplate(topFilmsListContainerElement, createListMovieCardTemplate(topMovies[i]), 'beforeend');
}

renderTemplate(filmsElement, createExtraFilmsTemplate('Most commented'), 'beforeend');
const extraFilmsContainerElements = filmsElement.querySelectorAll('.films-list--extra');
const commentedFilmsContainerElement = extraFilmsContainerElements[extraFilmsContainerElements.length - 1];
const commentedFilmsListContainerElement = commentedFilmsContainerElement.querySelector('.films-list__container');

const commentedMovies = new Array(EXTRA_MOVIE_COUNT).fill().map(generateMovie);

for (let i = 0; i < EXTRA_MOVIE_COUNT; i++) {
  renderTemplate(commentedFilmsListContainerElement, createListMovieCardTemplate(commentedMovies[i]), 'beforeend');
}

renderTemplate(siteHeaderElement, createUserTemplate(), 'beforeend');
renderTemplate(siteMainElement, createPopupTemplate(movies[1]), 'beforeend');
