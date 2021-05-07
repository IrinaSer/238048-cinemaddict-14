import { generateMovie } from './mock/movie.js';
import BoardPresenter from './presenter/board.js';
import MoviesModel from './model/movies.js';

const MOVIE_COUNT = 20;

const movies = new Array(MOVIE_COUNT).fill().map(generateMovie);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterStatisticElement = document.querySelector('.footer__statistics');

const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);

const boardPresenter = new BoardPresenter(siteMainElement, siteHeaderElement, siteFooterStatisticElement, moviesModel);

boardPresenter.init();
