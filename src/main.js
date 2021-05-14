import { generateMovie } from './mock/movie.js';
import BoardPresenter from './presenter/board.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';
import CommentsModel from './model/comments';
import { generateComment } from './mock/comment';

const MOVIE_COUNT = 20;

const commentsModel = new CommentsModel();
const comments = new Array(4).fill().map(generateComment);
commentsModel.setComments(comments);

const movies = new Array(MOVIE_COUNT).fill().map(() => {
  return generateMovie(commentsModel.getComments());
});

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterStatisticElement = document.querySelector('.footer__statistics');

const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);

const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter(siteMainElement, siteHeaderElement, siteFooterStatisticElement, moviesModel, filterModel, commentsModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);

filterPresenter.init();

boardPresenter.init();
