import { generateMovie } from './mock/movie.js';
import BoardPresenter from './presenter/board.js';

const MOVIE_COUNT = 20;
const EXTRA_MOVIE_COUNT = 2;

const movies = new Array(MOVIE_COUNT).fill().map(generateMovie);
const ratedMovies = new Array(EXTRA_MOVIE_COUNT).fill().map(generateMovie);
const commentedMovies = new Array(EXTRA_MOVIE_COUNT).fill().map(generateMovie);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterStatisticElement = document.querySelector('.footer__statistics');

const boardPresenter = new BoardPresenter(siteMainElement, siteHeaderElement, siteFooterStatisticElement);

boardPresenter.init(movies, ratedMovies, commentedMovies);
