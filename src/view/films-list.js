import AbstractView from './abstract.js';

const createFilmsListTemplate = (title, isExtra) => {
  return `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
      <h2 class="films-list__title ${isExtra ? '' : 'visually-hidden'}">${title}</h2>
    </section>`;
};

export default class FilmsList extends AbstractView {
  constructor(title, isExtra) {
    super();
    this._title = title;
    this._isExtra = isExtra;
  }

  getTemplate() {
    return createFilmsListTemplate(this._title, this._isExtra);
  }
}
