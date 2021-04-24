import {createElement} from '../utils.js';

const createFilmsListTemplate = (title, isExtra) => {
  return `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
      <h2 class="films-list__title ${isExtra ? '' : 'visually-hidden'}">${title}</h2>
    </section>`;
};

export default class FilmsList {
  constructor(title, isExtra) {
    this._element = null;
    this._title = title;
    this._isExtra = isExtra;
  }

  getTemplate() {
    return createFilmsListTemplate(this._title, this._isExtra);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
