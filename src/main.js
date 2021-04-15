import {createSiteMenuTemplate} from './view/site-menu.js';
import {createUserTemplate} from './view/site-user.js';
import {createFilmsTemplate} from './view/films-template.js';
import {createAllFilmsTemplate} from './view/all-films.js';
import {createLoadMoreButtonTemplate} from './view/load-more-button.js';
import {createExtraFilmsTemplate} from './view/extra-films.js';
import {createPopupTemplate} from './view/popup.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

render(siteHeaderElement, createUserTemplate(), 'beforeend');
render(siteMainElement, createSiteMenuTemplate(), 'beforeend');

render(
  siteMainElement,
  createFilmsTemplate(
    createAllFilmsTemplate(),
    createExtraFilmsTemplate('Top rated'),
    createExtraFilmsTemplate('Most commented'),
    createLoadMoreButtonTemplate(),
  ),
  'beforeend',
);

render(siteMainElement, createPopupTemplate(), 'beforeend');
